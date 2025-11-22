# Exury Backend API

Backend API for Exury - EU Crypto Exchange On/Off-Ramp Platform (Phase 1)

## 🏗️ Architecture

Clean architecture with separation of concerns:

```
backend/
├── src/
│   ├── config/          # Configuration (database, logger)
│   ├── controllers/      # HTTP request handlers
│   ├── services/         # Business logic
│   │   ├── pricing/     # Pricing engine (MOST IMPORTANT)
│   │   ├── binance/      # Binance integration
│   │   ├── paydo/        # PayDo integration
│   │   └── ledger/       # Ledger service
│   ├── repositories/     # Database access layer
│   ├── routes/           # API routes
│   ├── types/            # TypeScript types
│   └── server.ts         # Express server
├── migrations/           # Database migrations
└── package.json
```

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- PostgreSQL 14+
- Yarn or npm

### Installation

1. **Install dependencies:**
```bash
cd backend
yarn install
```

2. **Set up environment variables:**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Set up PostgreSQL database:**
```bash
# Create database
createdb exury_db

# Run migrations
psql exury_db < migrations/001_initial_schema.sql
```

4. **Start the server:**
```bash
# Development mode (with hot reload)
yarn dev

# Production mode
yarn build
yarn start
```

The API will be available at `http://localhost:3001`

## 📡 API Endpoints

### Quotes

- `GET /v1/quotes?base=EUR&asset=BTC&amount=1000` - Generate a quote
- `POST /v1/quotes/:id/lock` - Lock a quote to prevent expiration

### Orders

- `POST /v1/orders` - Create a new buy order
- `GET /v1/orders` - Get user's orders
- `GET /v1/orders/:id` - Get order details

### Payments

- `POST /v1/payments/paydo/webhook` - PayDo webhook handler

### Balances

- `GET /v1/users/me/balances` - Get all user balances
- `GET /v1/users/me/balances/:asset` - Get balance for specific asset

## 🔧 Configuration

### Environment Variables

See `.env.example` for all available configuration options.

Key variables:
- `DATABASE_URL` - PostgreSQL connection string
- `BINANCE_API_KEY` / `BINANCE_API_SECRET` - Binance API credentials
- `PAYDO_API_KEY` / `PAYDO_API_SECRET` - PayDo API credentials
- `EXCHANGE_FEE_PERCENTAGE` - Exchange fee (default: 0.5%)
- `EXCHANGE_SPREAD_PERCENTAGE` - Spread percentage (default: 0.1%)
- `QUOTE_TTL_SECONDS` - Quote expiration time (default: 30s)

## 🧪 Development

### Mock Mode

In development, if API keys are not set, the services will use mock data:
- Binance: Returns mock prices and order responses
- PayDo: Returns mock payment objects

### Testing

```bash
# Run tests (when implemented)
yarn test

# Lint code
yarn lint
```

## 📊 Database Schema

See `migrations/001_initial_schema.sql` for the complete schema.

Key tables:
- `users` - User accounts
- `quotes` - Price quotes
- `orders` - Exchange orders
- `transactions` - All transactions
- `ledger_entries` - Double-entry ledger
- `user_balances` - User balances per asset
- `paydo_events` - PayDo webhook events

## 🔐 Security

- Helmet.js for security headers
- CORS enabled
- Webhook signature verification (PayDo)
- Rate limiting (to be implemented)

## 📝 Logging

Logs are written to:
- `logs/error.log` - Error logs
- `logs/combined.log` - All logs

Console logging in development mode.

## 🚧 Next Steps

- [ ] Authentication middleware (JWT)
- [ ] Rate limiting
- [ ] Unit tests
- [ ] Integration tests
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Monitoring and metrics
- [ ] Error tracking (Sentry)

