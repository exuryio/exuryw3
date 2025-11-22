/**
 * Order Controller
 * Handles order-related API requests
 */
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { orderRepository } from '../repositories/order.repository';
import { pricingService } from '../services/pricing/pricing.service';
import { binanceService } from '../services/binance/binance.service';
import { paydoService } from '../services/paydo/paydo.service';
import { ledgerService } from '../services/ledger/ledger.service';
import { transactionRepository } from '../repositories/transaction.repository';
import { OrderStatus, TransactionType, PaymentStatus } from '../types';
import { logger } from '../config/logger';
import { pool } from '../config/database';

export class OrderController {
  /**
   * POST /v1/orders
   * Create a new buy order
   */
  async createOrder(req: Request, res: Response): Promise<void> {
    const client = await pool.connect();
    
    try {
      const { quote_id } = req.body;
      const userId = req.user?.id || 'test-user-id'; // TODO: Get from auth middleware

      if (!quote_id) {
        res.status(400).json({
          error: 'quote_id is required',
        });
        return;
      }

      // Validate quote
      const isValid = await pricingService.validateQuote(quote_id);
      if (!isValid) {
        res.status(410).json({
          error: 'Quote has expired or is invalid',
        });
        return;
      }

      const quote = await pricingService.getQuote(quote_id);
      if (!quote) {
        res.status(404).json({
          error: 'Quote not found',
        });
        return;
      }

      await client.query('BEGIN');

      // Create order
      const orderId = uuidv4();
      const order = await orderRepository.create({
        id: orderId,
        userId,
        quoteId: quote_id,
        type: 'buy',
        base: quote.base,
        asset: quote.asset,
        fiatAmount: quote.amount,
        cryptoAmount: quote.cryptoAmount,
        exchangeRate: quote.exchangeRate,
        fee: quote.fee,
        status: OrderStatus.QUOTE_LOCKED,
      });

      // Create PayDo deposit payment
      const payment = await paydoService.createDeposit(
        userId,
        quote.amount,
        orderId
      );

      // Update order with payment ID
      await orderRepository.update(orderId, {
        paymentId: payment.id,
        status: OrderStatus.PAYMENT_PENDING,
      });

      // Create transaction record
      const transactionId = uuidv4();
      await transactionRepository.create({
        id: transactionId,
        userId,
        orderId,
        type: TransactionType.DEPOSIT,
        asset: 'EUR',
        amount: quote.amount,
        status: PaymentStatus.PENDING,
        paydoTransactionId: payment.id,
      });

      await client.query('COMMIT');

      res.status(201).json({
        order_id: orderId,
        status: order.status,
        payment_id: payment.id,
        payment_url: payment.payment_url || null, // PayDo might return a payment URL
      });
    } catch (error: any) {
      await client.query('ROLLBACK');
      logger.error('Error creating order', { error: error.message });
      res.status(500).json({
        error: 'Failed to create order',
        message: error.message,
      });
    } finally {
      client.release();
    }
  }

  /**
   * GET /v1/orders/:id
   * Get order details
   */
  async getOrder(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.user?.id || 'test-user-id'; // TODO: Get from auth middleware

      const order = await orderRepository.findById(id);

      if (!order) {
        res.status(404).json({
          error: 'Order not found',
        });
        return;
      }

      if (order.userId !== userId) {
        res.status(403).json({
          error: 'Access denied',
        });
        return;
      }

      res.json(order);
    } catch (error: any) {
      logger.error('Error getting order', { error: error.message });
      res.status(500).json({
        error: 'Failed to get order',
        message: error.message,
      });
    }
  }

  /**
   * GET /v1/orders
   * Get user's orders
   */
  async getUserOrders(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id || 'test-user-id'; // TODO: Get from auth middleware

      const orders = await orderRepository.findByUserId(userId);

      res.json({ orders });
    } catch (error: any) {
      logger.error('Error getting user orders', { error: error.message });
      res.status(500).json({
        error: 'Failed to get orders',
        message: error.message,
      });
    }
  }
}

export const orderController = new OrderController();

