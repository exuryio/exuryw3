/**
 * Transaction Repository
 * Database operations for transactions
 */
import { pool } from '../config/database';
import { Transaction, PaymentStatus, TransactionType } from '../types';
import { logger } from '../config/logger';

class TransactionRepository {
  async create(
    transaction: Omit<Transaction, 'createdAt' | 'updatedAt'>
  ): Promise<Transaction> {
    const query = `
      INSERT INTO transactions (
        id, user_id, order_id, type, asset, amount, status,
        paydo_transaction_id, binance_transaction_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;

    const values = [
      transaction.id,
      transaction.userId,
      transaction.orderId || null,
      transaction.type,
      transaction.asset,
      transaction.amount,
      transaction.status,
      transaction.paydoTransactionId || null,
      transaction.binanceTransactionId || null,
    ];

    try {
      const result = await pool.query(query, values);
      return this.mapRowToTransaction(result.rows[0]);
    } catch (error) {
      logger.error('Error creating transaction', { error, transaction });
      throw error;
    }
  }

  async findById(id: string): Promise<Transaction | null> {
    const query = 'SELECT * FROM transactions WHERE id = $1';
    try {
      const result = await pool.query(query, [id]);
      if (result.rows.length === 0) {
        return null;
      }
      return this.mapRowToTransaction(result.rows[0]);
    } catch (error) {
      logger.error('Error finding transaction', { error, id });
      throw error;
    }
  }

  async findByOrderId(orderId: string): Promise<Transaction[]> {
    const query = 'SELECT * FROM transactions WHERE order_id = $1 ORDER BY created_at DESC';
    try {
      const result = await pool.query(query, [orderId]);
      return result.rows.map((row) => this.mapRowToTransaction(row));
    } catch (error) {
      logger.error('Error finding transactions by order', { error, orderId });
      throw error;
    }
  }

  async update(id: string, updates: Partial<Transaction>): Promise<Transaction> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    Object.keys(updates).forEach((key) => {
      if (key !== 'id' && updates[key as keyof Transaction] !== undefined) {
        const dbKey = key === 'userId' ? 'user_id' :
                     key === 'orderId' ? 'order_id' :
                     key === 'paydoTransactionId' ? 'paydo_transaction_id' :
                     key === 'binanceTransactionId' ? 'binance_transaction_id' :
                     key === 'createdAt' ? 'created_at' :
                     key === 'updatedAt' ? 'updated_at' : key;
        fields.push(`${dbKey} = $${paramCount}`);
        values.push(updates[key as keyof Transaction]);
        paramCount++;
      }
    });

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    values.push(id);
    const query = `UPDATE transactions SET ${fields.join(', ')}, updated_at = NOW() WHERE id = $${paramCount} RETURNING *`;

    try {
      const result = await pool.query(query, values);
      return this.mapRowToTransaction(result.rows[0]);
    } catch (error) {
      logger.error('Error updating transaction', { error, id, updates });
      throw error;
    }
  }

  private mapRowToTransaction(row: any): Transaction {
    return {
      id: row.id,
      userId: row.user_id,
      orderId: row.order_id,
      type: row.type as TransactionType,
      asset: row.asset,
      amount: parseFloat(row.amount),
      status: row.status as PaymentStatus,
      paydoTransactionId: row.paydo_transaction_id,
      binanceTransactionId: row.binance_transaction_id,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    };
  }
}

export const transactionRepository = new TransactionRepository();

