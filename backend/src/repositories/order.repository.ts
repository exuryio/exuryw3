/**
 * Order Repository
 * Database operations for orders
 */
import { pool } from '../config/database';
import { Order, OrderStatus } from '../types';
import { logger } from '../config/logger';

class OrderRepository {
  async create(order: Omit<Order, 'createdAt' | 'updatedAt'>): Promise<Order> {
    const query = `
      INSERT INTO orders (
        id, user_id, quote_id, type, base, asset, fiat_amount,
        crypto_amount, exchange_rate, fee, status, payment_id, binance_order_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *
    `;

    const values = [
      order.id,
      order.userId,
      order.quoteId,
      order.type,
      order.base,
      order.asset,
      order.fiatAmount,
      order.cryptoAmount,
      order.exchangeRate,
      order.fee,
      order.status,
      order.paymentId || null,
      order.binanceOrderId || null,
    ];

    try {
      const result = await pool.query(query, values);
      return this.mapRowToOrder(result.rows[0]);
    } catch (error) {
      logger.error('Error creating order', { error, order });
      throw error;
    }
  }

  async findById(id: string): Promise<Order | null> {
    const query = 'SELECT * FROM orders WHERE id = $1';
    try {
      const result = await pool.query(query, [id]);
      if (result.rows.length === 0) {
        return null;
      }
      return this.mapRowToOrder(result.rows[0]);
    } catch (error) {
      logger.error('Error finding order', { error, id });
      throw error;
    }
  }

  async findByUserId(userId: string): Promise<Order[]> {
    const query = 'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC';
    try {
      const result = await pool.query(query, [userId]);
      return result.rows.map((row) => this.mapRowToOrder(row));
    } catch (error) {
      logger.error('Error finding orders by user', { error, userId });
      throw error;
    }
  }

  async update(id: string, updates: Partial<Order>): Promise<Order> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    Object.keys(updates).forEach((key) => {
      if (key !== 'id' && updates[key as keyof Order] !== undefined) {
        const dbKey = key === 'userId' ? 'user_id' : 
                     key === 'quoteId' ? 'quote_id' :
                     key === 'fiatAmount' ? 'fiat_amount' :
                     key === 'cryptoAmount' ? 'crypto_amount' :
                     key === 'exchangeRate' ? 'exchange_rate' :
                     key === 'paymentId' ? 'payment_id' :
                     key === 'binanceOrderId' ? 'binance_order_id' :
                     key === 'createdAt' ? 'created_at' :
                     key === 'updatedAt' ? 'updated_at' : key;
        fields.push(`${dbKey} = $${paramCount}`);
        values.push(updates[key as keyof Order]);
        paramCount++;
      }
    });

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    values.push(id);
    const query = `UPDATE orders SET ${fields.join(', ')}, updated_at = NOW() WHERE id = $${paramCount} RETURNING *`;

    try {
      const result = await pool.query(query, values);
      return this.mapRowToOrder(result.rows[0]);
    } catch (error) {
      logger.error('Error updating order', { error, id, updates });
      throw error;
    }
  }

  private mapRowToOrder(row: any): Order {
    return {
      id: row.id,
      userId: row.user_id,
      quoteId: row.quote_id,
      type: row.type,
      base: row.base,
      asset: row.asset,
      fiatAmount: parseFloat(row.fiat_amount),
      cryptoAmount: parseFloat(row.crypto_amount),
      exchangeRate: parseFloat(row.exchange_rate),
      fee: parseFloat(row.fee),
      status: row.status as OrderStatus,
      paymentId: row.payment_id,
      binanceOrderId: row.binance_order_id,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    };
  }
}

export const orderRepository = new OrderRepository();

