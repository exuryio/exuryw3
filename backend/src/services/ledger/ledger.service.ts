/**
 * Ledger Service
 * Tracks all financial transactions and balances
 */
import { v4 as uuidv4 } from 'uuid';
import { pool } from '../../config/database';
import { LedgerEntry, TransactionType, UserBalance } from '../../types';
import { logger } from '../../config/logger';

class LedgerService {
  /**
   * Create a ledger entry
   */
  async createEntry(
    userId: string,
    transactionId: string,
    asset: string,
    amount: number,
    type: TransactionType
  ): Promise<LedgerEntry> {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // Get current balance
      const balanceResult = await client.query(
        'SELECT balance FROM ledger_entries WHERE user_id = $1 AND asset = $2 ORDER BY created_at DESC LIMIT 1',
        [userId, asset]
      );

      const previousBalance =
        balanceResult.rows.length > 0
          ? parseFloat(balanceResult.rows[0].balance)
          : 0;

      // Calculate new balance
      let newBalance = previousBalance;
      if (type === TransactionType.DEPOSIT || type === TransactionType.BUY) {
        newBalance += amount;
      } else if (
        type === TransactionType.WITHDRAWAL ||
        type === TransactionType.SELL ||
        type === TransactionType.FEE
      ) {
        newBalance -= amount;
      }

      // Create ledger entry
      const entryId = uuidv4();
      const query = `
        INSERT INTO ledger_entries (
          id, user_id, transaction_id, asset, amount, balance, type, created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
        RETURNING *
      `;

      const result = await client.query(query, [
        entryId,
        userId,
        transactionId,
        asset,
        amount,
        newBalance,
        type,
      ]);

      // Update user balance
      await this.updateUserBalance(userId, asset, newBalance, client);

      await client.query('COMMIT');

      logger.info('Ledger entry created', {
        entryId,
        userId,
        asset,
        amount,
        type,
        newBalance,
      });

      return this.mapRowToEntry(result.rows[0]);
    } catch (error) {
      await client.query('ROLLBACK');
      logger.error('Error creating ledger entry', {
        error,
        userId,
        transactionId,
        asset,
        amount,
      });
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Get user balance for an asset
   */
  async getUserBalance(
    userId: string,
    asset: string
  ): Promise<UserBalance | null> {
    const query = `
      SELECT 
        user_id,
        asset,
        balance,
        available,
        locked,
        updated_at
      FROM user_balances
      WHERE user_id = $1 AND asset = $2
    `;

    try {
      const result = await pool.query(query, [userId, asset]);
      if (result.rows.length === 0) {
        return null;
      }

      return this.mapRowToBalance(result.rows[0]);
    } catch (error) {
      logger.error('Error getting user balance', { error, userId, asset });
      throw error;
    }
  }

  /**
   * Get all balances for a user
   */
  async getUserBalances(userId: string): Promise<UserBalance[]> {
    const query = `
      SELECT 
        user_id,
        asset,
        balance,
        available,
        locked,
        updated_at
      FROM user_balances
      WHERE user_id = $1
    `;

    try {
      const result = await pool.query(query, [userId]);
      return result.rows.map((row) => this.mapRowToBalance(row));
    } catch (error) {
      logger.error('Error getting user balances', { error, userId });
      throw error;
    }
  }

  /**
   * Update user balance (internal method)
   */
  private async updateUserBalance(
    userId: string,
    asset: string,
    balance: number,
    client: any
  ): Promise<void> {
    const query = `
      INSERT INTO user_balances (user_id, asset, balance, available, locked, updated_at)
      VALUES ($1, $2, $3, $3, 0, NOW())
      ON CONFLICT (user_id, asset)
      DO UPDATE SET
        balance = $3,
        available = $3,
        updated_at = NOW()
    `;

    await client.query(query, [userId, asset, balance]);
  }

  /**
   * Lock balance (for pending orders)
   */
  async lockBalance(
    userId: string,
    asset: string,
    amount: number
  ): Promise<void> {
    const query = `
      UPDATE user_balances
      SET
        locked = locked + $3,
        available = available - $3,
        updated_at = NOW()
      WHERE user_id = $1 AND asset = $2 AND available >= $3
    `;

    try {
      const result = await pool.query(query, [userId, asset, amount]);
      if (result.rowCount === 0) {
        throw new Error('Insufficient balance');
      }
    } catch (error) {
      logger.error('Error locking balance', { error, userId, asset, amount });
      throw error;
    }
  }

  /**
   * Unlock balance
   */
  async unlockBalance(
    userId: string,
    asset: string,
    amount: number
  ): Promise<void> {
    const query = `
      UPDATE user_balances
      SET
        locked = locked - $3,
        available = available + $3,
        updated_at = NOW()
      WHERE user_id = $1 AND asset = $2
    `;

    try {
      await pool.query(query, [userId, asset, amount]);
    } catch (error) {
      logger.error('Error unlocking balance', { error, userId, asset, amount });
      throw error;
    }
  }

  private mapRowToEntry(row: any): LedgerEntry {
    return {
      id: row.id,
      userId: row.user_id,
      transactionId: row.transaction_id,
      asset: row.asset,
      amount: parseFloat(row.amount),
      balance: parseFloat(row.balance),
      type: row.type as TransactionType,
      createdAt: new Date(row.created_at),
    };
  }

  private mapRowToBalance(row: any): UserBalance {
    return {
      userId: row.user_id,
      asset: row.asset,
      balance: parseFloat(row.balance),
      available: parseFloat(row.available),
      locked: parseFloat(row.locked),
      updatedAt: new Date(row.updated_at),
    };
  }
}

export const ledgerService = new LedgerService();

