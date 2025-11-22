/**
 * Quote Controller
 * Handles quote-related API requests
 */
import { Request, Response } from 'express';
import { pricingService } from '../services/pricing/pricing.service';
import { logger } from '../config/logger';
import { QuoteRequest, LockQuoteRequest } from '../types';

export class QuoteController {
  /**
   * GET /v1/quotes
   * Generate a new quote
   */
  async getQuote(req: Request, res: Response): Promise<void> {
    try {
      const { base, asset, amount } = req.query;

      // Validate query parameters
      if (!base || !asset || !amount) {
        res.status(400).json({
          error: 'Missing required parameters: base, asset, amount',
        });
        return;
      }

      const quoteRequest: QuoteRequest = {
        base: base as string,
        asset: asset as string,
        amount: parseFloat(amount as string),
      };

      // Validate amount
      if (isNaN(quoteRequest.amount) || quoteRequest.amount <= 0) {
        res.status(400).json({
          error: 'Invalid amount. Must be a positive number',
        });
        return;
      }

      const quote = await pricingService.generateQuote(quoteRequest);

      res.json(quote);
    } catch (error: any) {
      logger.error('Error generating quote', { error: error.message });
      res.status(500).json({
        error: 'Failed to generate quote',
        message: error.message,
      });
    }
  }

  /**
   * POST /v1/quotes/:id/lock
   * Lock a quote to prevent expiration
   */
  async lockQuote(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          error: 'Quote ID is required',
        });
        return;
      }

      const quote = await pricingService.lockQuote(id);

      res.json({
        quote_id: quote.id,
        expires_at: quote.expiresAt.toISOString(),
        ttl: Math.floor((quote.expiresAt.getTime() - Date.now()) / 1000),
      });
    } catch (error: any) {
      logger.error('Error locking quote', { error: error.message });
      
      if (error.message === 'Quote not found') {
        res.status(404).json({ error: error.message });
        return;
      }
      
      if (error.message === 'Quote has expired') {
        res.status(410).json({ error: error.message });
        return;
      }

      res.status(500).json({
        error: 'Failed to lock quote',
        message: error.message,
      });
    }
  }
}

export const quoteController = new QuoteController();

