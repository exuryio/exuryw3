/**
 * Pricing Engine - Core Module
 * Calculates quotes, spreads, fees, and exchange rates
 */
import { v4 as uuidv4 } from 'uuid';
import { Quote, QuoteRequest, QuoteResponse } from '../../types';
import { binanceService } from '../binance/binance.service';
import { logger } from '../../config/logger';
import { quoteRepository } from '../../repositories/quote.repository';

class PricingService {
  private readonly FEE_PERCENTAGE = parseFloat(
    process.env.EXCHANGE_FEE_PERCENTAGE || '0.5'
  );
  private readonly SPREAD_PERCENTAGE = parseFloat(
    process.env.EXCHANGE_SPREAD_PERCENTAGE || '1.5'
  );
  private readonly QUOTE_TTL = parseInt(
    process.env.QUOTE_TTL_SECONDS || '30'
  );

  /**
   * Generate a quote for EUR → Crypto conversion
   */
  async generateQuote(request: QuoteRequest): Promise<QuoteResponse> {
    try {
      const { base, asset, amount } = request;

      // Validate inputs
      if (base !== 'EUR') {
        throw new Error('Only EUR base currency is supported');
      }

      if (amount <= 0) {
        throw new Error('Amount must be greater than 0');
      }

      // Get real-time price from Binance
      const binancePrice = await binanceService.getPrice(asset);
      if (!binancePrice) {
        throw new Error(`Failed to fetch price for ${asset}`);
      }

      const cryptoPrice = parseFloat(binancePrice.price);

      // Calculate spread (we add a small spread for profit)
      const spreadAmount = (cryptoPrice * this.SPREAD_PERCENTAGE) / 100;
      const adjustedPrice = cryptoPrice + spreadAmount;

      // Calculate fee
      const fee = (amount * this.FEE_PERCENTAGE) / 100;
      const amountAfterFee = amount - fee;

      // Calculate crypto amount user will receive
      const cryptoAmount = amountAfterFee / adjustedPrice;

      // Calculate exchange rate (1 EUR = X crypto)
      const exchangeRate = 1 / adjustedPrice;

      // Create quote
      const quoteId = uuidv4();
      const expiresAt = new Date(Date.now() + this.QUOTE_TTL * 1000);

      const quote: Quote = {
        id: quoteId,
        base,
        asset,
        amount,
        cryptoPrice,
        spread: this.SPREAD_PERCENTAGE,
        fee,
        exchangeRate,
        cryptoAmount,
        expiresAt,
        createdAt: new Date(),
      };

      // Save quote to database
      await quoteRepository.create(quote);

      logger.info(`Quote generated: ${quoteId}`, {
        quoteId,
        base,
        asset,
        amount,
        cryptoAmount,
      });

      // Return formatted response
      return {
        quote_id: quoteId,
        base,
        asset,
        fiat_amount: amount,
        crypto_amount: cryptoAmount,
        exchange_rate: exchangeRate,
        fee,
        spread: this.SPREAD_PERCENTAGE,
        expires_at: expiresAt.toISOString(),
        ttl: this.QUOTE_TTL,
      };
    } catch (error) {
      logger.error('Error generating quote', { error, request });
      throw error;
    }
  }

  /**
   * Lock a quote (prevent it from expiring)
   */
  async lockQuote(quoteId: string): Promise<Quote> {
    try {
      const quote = await quoteRepository.findById(quoteId);

      if (!quote) {
        throw new Error('Quote not found');
      }

      if (quote.expiresAt < new Date()) {
        throw new Error('Quote has expired');
      }

      // Extend expiration by TTL
      const newExpiresAt = new Date(
        Date.now() + this.QUOTE_TTL * 1000
      );
      quote.expiresAt = newExpiresAt;

      await quoteRepository.update(quoteId, {
        expiresAt: newExpiresAt,
      });

      logger.info(`Quote locked: ${quoteId}`);

      return quote;
    } catch (error) {
      logger.error('Error locking quote', { error, quoteId });
      throw error;
    }
  }

  /**
   * Validate quote is still valid
   */
  async validateQuote(quoteId: string): Promise<boolean> {
    try {
      const quote = await quoteRepository.findById(quoteId);

      if (!quote) {
        return false;
      }

      if (quote.expiresAt < new Date()) {
        return false;
      }

      return true;
    } catch (error) {
      logger.error('Error validating quote', { error, quoteId });
      return false;
    }
  }

  /**
   * Get quote by ID
   */
  async getQuote(quoteId: string): Promise<Quote | null> {
    return quoteRepository.findById(quoteId);
  }
}

export const pricingService = new PricingService();

