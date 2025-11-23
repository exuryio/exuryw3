/**
 * Balance Controller
 * Handles balance-related API requests
 */
import { Request, Response } from 'express';
import { ledgerService } from '../services/ledger/ledger.service';
import { logger } from '../config/logger';

export class BalanceController {
  /**
   * GET /v1/users/me/balances
   * Get user balances
   */
  async getBalances(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id || 'test-user-id'; // TODO: Get from auth middleware

      const balances = await ledgerService.getUserBalances(userId);

      res.json({ balances });
    } catch (error: any) {
      logger.error('Error getting balances', { error: error.message });
      res.status(500).json({
        error: 'Failed to get balances',
        message: error.message,
      });
    }
  }

  /**
   * GET /v1/users/me/balances/:asset
   * Get user balance for specific asset
   */
  async getBalance(req: Request, res: Response): Promise<void> {
    try {
      const { asset } = req.params;
      const userId = (req as any).user?.id || 'test-user-id'; // TODO: Get from auth middleware

      const balance = await ledgerService.getUserBalance(userId, asset);

      if (!balance) {
        res.json({
          asset,
          balance: 0,
          available: 0,
          locked: 0,
        });
        return;
      }

      res.json(balance);
    } catch (error: any) {
      logger.error('Error getting balance', { error: error.message });
      res.status(500).json({
        error: 'Failed to get balance',
        message: error.message,
      });
    }
  }
}

export const balanceController = new BalanceController();

