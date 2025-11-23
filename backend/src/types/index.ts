/**
 * Core Type Definitions for Exury Backend
 */

export enum OrderStatus {
  PENDING = 'pending',
  QUOTE_LOCKED = 'quote_locked',
  PAYMENT_PENDING = 'payment_pending',
  PAYMENT_RECEIVED = 'payment_received',
  EXECUTING = 'executing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

export enum TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
  BUY = 'buy',
  SELL = 'sell',
  FEE = 'fee'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

export interface Quote {
  id: string;
  base: string; // EUR
  asset: string; // BTC, ETH, etc.
  amount: number; // EUR amount
  cryptoPrice: number; // Price from Binance
  spread: number; // Spread percentage
  fee: number; // Fee amount
  exchangeRate: number; // Final rate (1 EUR = X crypto)
  cryptoAmount: number; // Amount of crypto user will receive
  expiresAt: Date;
  createdAt: Date;
}

export interface QuoteRequest {
  base: string;
  asset: string;
  amount: number;
}

export interface QuoteResponse {
  quote_id: string;
  base: string;
  asset: string;
  fiat_amount: number;
  crypto_amount: number;
  exchange_rate: number;
  fee: number;
  spread: number;
  expires_at: string;
  ttl: number; // seconds
}

export interface LockQuoteRequest {
  quote_id: string;
}

export interface Order {
  id: string;
  userId: string;
  quoteId: string;
  type: 'buy' | 'sell';
  base: string;
  asset: string;
  fiatAmount: number;
  cryptoAmount: number;
  exchangeRate: number;
  fee: number;
  status: OrderStatus;
  paymentId?: string;
  binanceOrderId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  userId: string;
  orderId?: string;
  type: TransactionType;
  asset: string; // EUR, BTC, ETH, etc.
  amount: number;
  status: PaymentStatus;
  paydoTransactionId?: string;
  binanceTransactionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LedgerEntry {
  id: string;
  userId: string;
  transactionId: string;
  asset: string;
  amount: number;
  balance: number; // Balance after this entry
  type: TransactionType;
  createdAt: Date;
}

export interface UserBalance {
  userId: string;
  asset: string;
  balance: number;
  available: number;
  locked: number;
  updatedAt: Date;
}

export interface PayDoWebhook {
  event: string;
  data: {
    id: string;
    status: string;
    amount: number;
    currency: string;
    type: string;
    [key: string]: any;
  };
}

export interface BinancePrice {
  symbol: string;
  price: string;
}

export interface BinanceOrderResponse {
  orderId: number;
  symbol: string;
  status: string;
  executedQty: string;
  cummulativeQuoteQty: string;
}

