/**
 * PayDo Webhook Controller
 * Handles PayDo webhook events
 */
import { Request, Response } from 'express';
import { paydoService } from '../services/paydo/paydo.service';
import { orderRepository } from '../repositories/order.repository';
import { transactionRepository } from '../repositories/transaction.repository';
// Removed unused import
import { ledgerService } from '../services/ledger/ledger.service';
import { OrderStatus, PaymentStatus, TransactionType } from '../types';
import { logger } from '../config/logger';
import { pool } from '../config/database';

export class PayDoController {
  /**
   * POST /v1/payments/paydo/webhook
   * Handle PayDo webhook events
   */
  async handleWebhook(req: Request, res: Response): Promise<void> {
    const client = await pool.connect();

    try {
      // Verify webhook signature
      const signature = req.headers['x-paydo-signature'] as string;
      const payload = JSON.stringify(req.body);

      if (
        process.env.NODE_ENV === 'production' &&
        !paydoService.verifyWebhookSignature(payload, signature)
      ) {
        res.status(401).json({ error: 'Invalid signature' });
        return;
      }

      const webhook = req.body;
      const { event, data } = webhook;

      logger.info('PayDo webhook received', { event, paymentId: data.id });

      await client.query('BEGIN');

      // Find transaction by PayDo payment ID
      const transaction = await transactionRepository.findById(
        data.reference || ''
      );

      if (!transaction) {
        // Try to find by PayDo transaction ID
        const transactions = await pool.query(
          'SELECT * FROM transactions WHERE paydo_transaction_id = $1',
          [data.id]
        );

        if (transactions.rows.length === 0) {
          logger.warn('Transaction not found for PayDo payment', {
            paymentId: data.id,
          });
          await client.query('COMMIT');
          res.status(200).json({ received: true });
          return;
        }

        // Process the transaction
        await this.processPayment(
          transactions.rows[0],
          data.status,
          client
        );
      } else {
        await this.processPayment(transaction, data.status, client);
      }

      await client.query('COMMIT');

      res.status(200).json({ received: true });
    } catch (error: any) {
      await client.query('ROLLBACK');
      logger.error('Error processing PayDo webhook', {
        error: error.message,
        body: req.body,
      });
      res.status(500).json({ error: 'Webhook processing failed' });
    } finally {
      client.release();
    }
  }

  /**
   * Process payment status update
   */
  private async processPayment(
    transaction: any,
    status: string,
    _client: any
  ): Promise<void> {
    // Update transaction status
    let newStatus: PaymentStatus;
    if (status === 'completed' || status === 'success') {
      newStatus = PaymentStatus.COMPLETED;
    } else if (status === 'failed') {
      newStatus = PaymentStatus.FAILED;
    } else {
      newStatus = PaymentStatus.PROCESSING;
    }

    await transactionRepository.update(transaction.id, {
      status: newStatus,
    });

    // If payment completed, process the order
    if (newStatus === PaymentStatus.COMPLETED && transaction.order_id) {
      const order = await orderRepository.findById(transaction.order_id);

      if (order && order.status === OrderStatus.PAYMENT_PENDING) {
        // Update order status
        await orderRepository.update(order.id, {
          status: OrderStatus.PAYMENT_RECEIVED,
        });

        // Create ledger entry for EUR deposit
        await ledgerService.createEntry(
          transaction.user_id,
          transaction.id,
          'EUR',
          transaction.amount,
          TransactionType.DEPOSIT
        );

        // Execute Binance buy order using order service
        try {
          const { orderService } = await import('../services/order.service');
          await orderService.processOrderAfterPayment(order.id);
        } catch (error: any) {
          logger.error('Error executing Binance order', {
            error: error.message,
            orderId: order.id,
          });
          await orderRepository.update(order.id, {
            status: OrderStatus.FAILED,
          });
        }
      }
    }
  }
}

export const paydoController = new PayDoController();

