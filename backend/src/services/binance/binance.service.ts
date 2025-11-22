/**
 * Binance Integration Service
 * Handles price fetching and order execution
 */
import axios, { AxiosInstance } from 'axios';
import crypto from 'crypto';
import { BinancePrice, BinanceOrderResponse } from '../../types';
import { logger } from '../../config/logger';

class BinanceService {
  private apiKey: string;
  private apiSecret: string;
  private baseURL: string;
  private client: AxiosInstance;
  private testnet: boolean;

  constructor() {
    this.apiKey = process.env.BINANCE_API_KEY || '';
    this.apiSecret = process.env.BINANCE_API_SECRET || '';
    this.testnet = process.env.BINANCE_TESTNET === 'true';
    this.baseURL =
      process.env.BINANCE_BASE_URL ||
      (this.testnet
        ? 'https://testnet.binance.vision'
        : 'https://api.binance.com');

    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
    });
  }

  /**
   * Get current price for a crypto asset
   * Converts asset symbol to Binance trading pair (e.g., BTC -> BTCEUR)
   */
  async getPrice(asset: string): Promise<BinancePrice | null> {
    try {
      // Map asset to Binance trading pair
      const symbol = this.getTradingPair(asset);

      const response = await this.client.get<BinancePrice>(
        '/api/v3/ticker/price',
        {
          params: { symbol },
        }
      );

      // If price needs inversion (e.g., EURUSDC returns 1 EUR = X USDC, we need 1 USDC = X EUR)
      let price = response.data.price;
      if (this.needsPriceInversion(asset)) {
        const invertedPrice = (1 / parseFloat(price)).toFixed(8);
        price = invertedPrice;
        logger.info(`Binance price inverted for ${asset}: ${response.data.price} -> ${price}`);
      }

      logger.info(`Binance price fetched: ${symbol}`, {
        symbol,
        originalPrice: response.data.price,
        finalPrice: price,
        asset,
      });

      return {
        symbol: response.data.symbol,
        price: price,
      };
    } catch (error: any) {
      logger.error('Error fetching Binance price', {
        error: error.message,
        asset,
      });

      // In development, return mock price if API fails
      if (process.env.NODE_ENV === 'development' && !this.apiKey) {
        return this.getMockPrice(asset);
      }

      throw error;
    }
  }

  /**
   * Execute a buy order on Binance
   */
  async executeBuy(
    asset: string,
    eurAmount: number
  ): Promise<BinanceOrderResponse> {
    try {
      const symbol = this.getTradingPair(asset);

      // For now, we'll use market order
      // In production, you might want to use limit orders for better execution
      const params = {
        symbol,
        side: 'BUY',
        type: 'MARKET',
        quoteOrderQty: eurAmount.toString(), // Buy with EUR amount
        timestamp: Date.now(),
      };

      const signature = this.generateSignature(params);
      const response = await this.client.post<BinanceOrderResponse>(
        '/api/v3/order',
        null,
        {
          params: {
            ...params,
            signature,
          },
          headers: {
            'X-MBX-APIKEY': this.apiKey,
          },
        }
      );

      logger.info(`Binance buy order executed`, {
        orderId: response.data.orderId,
        symbol,
        eurAmount,
      });

      return response.data;
    } catch (error: any) {
      logger.error('Error executing Binance buy order', {
        error: error.message,
        asset,
        eurAmount,
      });

      // In development, return mock response if API fails
      if (process.env.NODE_ENV === 'development' && !this.apiKey) {
        return this.getMockOrderResponse(asset, eurAmount, 'BUY');
      }

      throw error;
    }
  }

  /**
   * Execute a sell order on Binance
   */
  async executeSell(
    asset: string,
    cryptoAmount: number
  ): Promise<BinanceOrderResponse> {
    try {
      const symbol = this.getTradingPair(asset);

      const params = {
        symbol,
        side: 'SELL',
        type: 'MARKET',
        quantity: cryptoAmount.toString(),
        timestamp: Date.now(),
      };

      const signature = this.generateSignature(params);
      const response = await this.client.post<BinanceOrderResponse>(
        '/api/v3/order',
        null,
        {
          params: {
            ...params,
            signature,
          },
          headers: {
            'X-MBX-APIKEY': this.apiKey,
          },
        }
      );

      logger.info(`Binance sell order executed`, {
        orderId: response.data.orderId,
        symbol,
        cryptoAmount,
      });

      return response.data;
    } catch (error: any) {
      logger.error('Error executing Binance sell order', {
        error: error.message,
        asset,
        cryptoAmount,
      });

      // In development, return mock response if API fails
      if (process.env.NODE_ENV === 'development' && !this.apiKey) {
        return this.getMockOrderResponse(asset, cryptoAmount, 'SELL');
      }

      throw error;
    }
  }

  /**
   * Convert asset symbol to Binance trading pair
   */
  private getTradingPair(asset: string): string {
    // Map common assets to Binance pairs
    const pairMap: Record<string, string> = {
      BTC: 'BTCEUR',
      ETH: 'ETHEUR',
      BNB: 'BNBEUR',
      USDT: 'EURT', // Tether EUR
      USDC: 'EURUSDC', // USDC/EUR pair (price is 1 EUR = X USDC, need to invert)
      SOL: 'SOLEUR',
    };

    return pairMap[asset] || `${asset}EUR`;
  }
  
  /**
   * Check if trading pair needs price inversion
   * Some pairs like EURUSDC return price as 1 EUR = X USDC, but we need 1 USDC = X EUR
   */
  private needsPriceInversion(asset: string): boolean {
    // Pairs where base currency is EUR and quote is the asset
    return asset === 'USDC';
  }

  /**
   * Generate signature for authenticated requests
   */
  private generateSignature(params: Record<string, any>): string {
    const queryString = Object.keys(params)
      .sort()
      .map((key) => `${key}=${params[key]}`)
      .join('&');

    return crypto
      .createHmac('sha256', this.apiSecret)
      .update(queryString)
      .digest('hex');
  }

  /**
   * Mock price for development/testing
   */
  private getMockPrice(asset: string): BinancePrice {
    const mockPrices: Record<string, string> = {
      BTC: '45000',
      ETH: '2800',
      BNB: '350',
      USDT: '0.92',
      USDC: '0.87', // 1 USDC = 0.87 EUR (inverted from EURUSDC which would be ~1.151)
      SOL: '120',
    };

    return {
      symbol: this.getTradingPair(asset),
      price: mockPrices[asset] || '1000',
    };
  }

  /**
   * Mock order response for development/testing
   */
  private getMockOrderResponse(
    asset: string,
    amount: number,
    side: 'BUY' | 'SELL'
  ): BinanceOrderResponse {
    return {
      orderId: Math.floor(Math.random() * 1000000),
      symbol: this.getTradingPair(asset),
      status: 'FILLED',
      executedQty: side === 'SELL' ? amount.toString() : (amount / parseFloat(this.getMockPrice(asset).price)).toString(),
      cummulativeQuoteQty: side === 'BUY' ? amount.toString() : (amount * parseFloat(this.getMockPrice(asset).price)).toString(),
    };
  }
}

export const binanceService = new BinanceService();

