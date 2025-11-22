-- Exury Database Schema
-- PostgreSQL Migration

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  google_id VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Quotes table
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY,
  base VARCHAR(10) NOT NULL,
  asset VARCHAR(10) NOT NULL,
  amount DECIMAL(20, 8) NOT NULL,
  crypto_price DECIMAL(20, 8) NOT NULL,
  spread DECIMAL(5, 2) NOT NULL,
  fee DECIMAL(20, 8) NOT NULL,
  exchange_rate DECIMAL(20, 8) NOT NULL,
  crypto_amount DECIMAL(20, 8) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL
);

CREATE INDEX idx_quotes_expires_at ON quotes(expires_at);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  quote_id UUID NOT NULL REFERENCES quotes(id),
  type VARCHAR(10) NOT NULL CHECK (type IN ('buy', 'sell')),
  base VARCHAR(10) NOT NULL,
  asset VARCHAR(10) NOT NULL,
  fiat_amount DECIMAL(20, 8) NOT NULL,
  crypto_amount DECIMAL(20, 8) NOT NULL,
  exchange_rate DECIMAL(20, 8) NOT NULL,
  fee DECIMAL(20, 8) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  payment_id VARCHAR(255),
  binance_order_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  order_id UUID REFERENCES orders(id),
  type VARCHAR(20) NOT NULL CHECK (type IN ('deposit', 'withdrawal', 'buy', 'sell', 'fee')),
  asset VARCHAR(10) NOT NULL,
  amount DECIMAL(20, 8) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  paydo_transaction_id VARCHAR(255),
  binance_transaction_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_order_id ON transactions(order_id);

-- Ledger entries table
CREATE TABLE IF NOT EXISTS ledger_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  transaction_id UUID NOT NULL REFERENCES transactions(id),
  asset VARCHAR(10) NOT NULL,
  amount DECIMAL(20, 8) NOT NULL,
  balance DECIMAL(20, 8) NOT NULL,
  type VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_ledger_user_asset ON ledger_entries(user_id, asset);
CREATE INDEX idx_ledger_created_at ON ledger_entries(created_at);

-- User balances table
CREATE TABLE IF NOT EXISTS user_balances (
  user_id UUID NOT NULL REFERENCES users(id),
  asset VARCHAR(10) NOT NULL,
  balance DECIMAL(20, 8) NOT NULL DEFAULT 0,
  available DECIMAL(20, 8) NOT NULL DEFAULT 0,
  locked DECIMAL(20, 8) NOT NULL DEFAULT 0,
  updated_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (user_id, asset)
);

CREATE INDEX idx_user_balances_user_id ON user_balances(user_id);

-- PayDo events table (for webhook tracking)
CREATE TABLE IF NOT EXISTS paydo_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type VARCHAR(50) NOT NULL,
  payment_id VARCHAR(255) NOT NULL,
  payload JSONB NOT NULL,
  processed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_paydo_events_payment_id ON paydo_events(payment_id);
CREATE INDEX idx_paydo_events_processed ON paydo_events(processed);

