/**
 * API Routes
 */
import { Router } from 'express';
import { quoteController } from '../controllers/quote.controller';
import { orderController } from '../controllers/order.controller';
import { paydoController } from '../controllers/paydo.controller';
import { balanceController } from '../controllers/balance.controller';

const router = Router();

// Quote routes
router.get('/quotes', (req, res) => quoteController.getQuote(req, res));
router.post('/quotes/:id/lock', (req, res) =>
  quoteController.lockQuote(req, res)
);

// Order routes
router.post('/orders', (req, res) => orderController.createOrder(req, res));
router.get('/orders', (req, res) => orderController.getUserOrders(req, res));
router.get('/orders/:id', (req, res) => orderController.getOrder(req, res));

// PayDo webhook
router.post('/payments/paydo/webhook', (req, res) =>
  paydoController.handleWebhook(req, res)
);

// Balance routes
router.get('/users/me/balances', (req, res) =>
  balanceController.getBalances(req, res)
);
router.get('/users/me/balances/:asset', (req, res) =>
  balanceController.getBalance(req, res)
);

export default router;

