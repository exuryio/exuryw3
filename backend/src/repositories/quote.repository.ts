/**
 * Quote Repository
 * Database operations for quotes
 */
import { pool } from '../config/database';
import { Quote } from '../types';
import { logger } from '../config/logger';

class QuoteRepository {
  async create(quote: Quote): Promise<Quote> {
    const query = `
      INSERT INTO quotes (
        id, base, asset, amount, crypto_price, spread, fee,
        exchange_rate, crypto_amount, expires_at, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `;

    const values = [
      quote.id,
      quote.base,
      quote.asset,
      quote.amount,
      quote.cryptoPrice,
      quote.spread,
      quote.fee,
      quote.exchangeRate,
      quote.cryptoAmount,
      quote.expiresAt,
      quote.createdAt,
    ];

    try {
      const result = await pool.query(query, values);
      return this.mapRowToQuote(result.rows[0]);
    } catch (error) {
      logger.error('Error creating quote', { error, quote });
      throw error;
    }
  }

  async findById(id: string): Promise<Quote | null> {
    const query = 'SELECT * FROM quotes WHERE id = $1';
    try {
      const result = await pool.query(query, [id]);
      if (result.rows.length === 0) {
        return null;
      }
      return this.mapRowToQuote(result.rows[0]);
    } catch (error) {
      logger.error('Error finding quote', { error, id });
      throw error;
    }
  }

  async update(id: string, updates: Partial<Quote>): Promise<Quote> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    Object.keys(updates).forEach((key) => {
      if (key !== 'id' && updates[key as keyof Quote] !== undefined) {
        fields.push(`${key} = $${paramCount}`);
        values.push(updates[key as keyof Quote]);
        paramCount++;
      }
    });

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    values.push(id);
    const query = `UPDATE quotes SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`;

    try {
      const result = await pool.query(query, values);
      return this.mapRowToQuote(result.rows[0]);
    } catch (error) {
      logger.error('Error updating quote', { error, id, updates });
      throw error;
    }
  }

  private mapRowToQuote(row: any): Quote {
    return {
      id: row.id,
      base: row.base,
      asset: row.asset,
      amount: parseFloat(row.amount),
      cryptoPrice: parseFloat(row.crypto_price),
      spread: parseFloat(row.spread),
      fee: parseFloat(row.fee),
      exchangeRate: parseFloat(row.exchange_rate),
      cryptoAmount: parseFloat(row.crypto_amount),
      expiresAt: new Date(row.expires_at),
      createdAt: new Date(row.created_at),
    };
  }
}

export const quoteRepository = new QuoteRepository();

