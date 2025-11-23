# Exury Phase 1 - Setup Guide

Complete setup instructions for Exury EU Crypto Exchange On/Off-Ramp Platform.

## 📋 Prerequisites

- **Node.js** 20+ ([Install Node.js](https://nodejs.org/))
- **PostgreSQL** 14+ ([Install PostgreSQL](https://www.postgresql.org/download/))
- **Yarn** or npm
- **Git**

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Clone the repository (if not already done)
git clone https://github.com/exuryio/exuryw3.git
cd exuryw3

# Install frontend dependencies
yarn install

# Install backend dependencies
cd backend
yarn install
cd ..
```

### 2. Database Setup

```bash
# Create PostgreSQL database
createdb exury_db

# Or using psql:
psql -U postgres
CREATE DATABASE exury_db;
\q

# Run database migrations
psql exury_db < backend/migrations/001_initial_schema.sql
```

### 3. Environment Configuration

#### Backend Environment

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with your configuration:

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/exury_db
DB_HOST=localhost
DB_PORT=5432
DB_NAME=exury_db
DB_USER=postgres
DB_PASSWORD=postgres

# Binance API (optional for development - will use mocks)
BINANCE_API_KEY=your_binance_api_key
BINANCE_API_SECRET=your_binance_api_secret
BINANCE_BASE_URL=https://api.binance.com
BINANCE_TESTNET=false

# PayDo API (optional for development - will use mocks)
PAYDO_API_KEY=your_paydo_api_key
PAYDO_API_SECRET=your_paydo_api_secret
PAYDO_BASE_URL=https://paydo.com/api/v1
PAYDO_WEBHOOK_SECRET=your_webhook_secret

# Exchange Configuration
EXCHANGE_FEE_PERCENTAGE=0.5
EXCHANGE_SPREAD_PERCENTAGE=0.1
QUOTE_TTL_SECONDS=30

# Server
PORT=3001
NODE_ENV=development
```

#### Frontend Environment

Create `/.env` in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3001
```

### 4. Start Development Servers

#### Terminal 1 - Backend

```bash
cd backend
yarn dev
```

Backend will run on `http://localhost:3001`

#### Terminal 2 - Frontend

```bash
# From project root
yarn dev
```

Frontend will run on `http://localhost:5173`

### 5. Verify Setup

1. **Backend Health Check:**
   ```bash
   curl http://localhost:3001/health
   ```
   Should return: `{"status":"ok",...}`

2. **Test Quote Endpoint:**
   ```bash
   curl "http://localhost:3001/v1/quotes?base=EUR&asset=BTC&amount=1000"
   ```
   Should return a quote with crypto amount, exchange rate, fee, etc.

3. **Open Frontend:**
   - Navigate to `http://localhost:5173`
   - Go to `/exchange` page
   - Enter amount and select crypto
   - You should see a quote appear

## 🧪 Testing the Flow

### Complete User Flow

1. **Get Quote:**
   - Frontend: Enter EUR amount (e.g., 1000)
   - Select crypto asset (e.g., BTC)
   - Quote appears with exchange rate and fee

2. **Create Order:**
   - Click "Buy Crypto"
   - Order is created
   - PayDo payment is initiated (mock in dev)

3. **Payment Confirmation:**
   - PayDo webhook confirms payment
   - Order status updates to `payment_received`
   - Binance order executes (mock in dev)
   - Crypto is credited to user balance

4. **Check Balance:**
   - Call `GET /v1/users/me/balances/:asset`
   - See updated crypto balance

## 📁 Project Structure

```
exuryw3/
├── backend/                 # Backend API
│   ├── src/
│   │   ├── config/         # Database, logger config
│   │   ├── controllers/    # HTTP handlers
│   │   ├── services/       # Business logic
│   │   │   ├── pricing/    # Pricing engine ⭐
│   │   │   ├── binance/    # Binance integration
│   │   │   ├── paydo/      # PayDo integration
│   │   │   └── ledger/     # Ledger service
│   │   ├── repositories/  # Database access
│   │   ├── routes/         # API routes
│   │   └── server.ts       # Express server
│   ├── migrations/         # Database migrations
│   └── package.json
├── src/                     # Frontend (Vue 3)
│   ├── pages/
│   │   └── exchange.vue    # Exchange UI
│   ├── services/
│   │   └── api.ts          # API client
│   └── ...
└── package.json
```

## 🔑 Key Features

### Pricing Engine (Most Important)
- Real-time price fetching from Binance
- Spread calculation
- Fee calculation
- Quote generation with TTL
- Quote locking mechanism

### PayDo Integration
- SEPA deposit creation
- SEPA withdrawal creation
- Webhook handling
- Payment status tracking

### Binance Integration
- Real-time price fetching
- Market order execution
- Order status tracking

### Ledger System
- Double-entry ledger
- Balance tracking
- Transaction history

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Check PostgreSQL is running
pg_isready

# Test connection
psql -U postgres -d exury_db
```

### Port Already in Use

```bash
# Backend (3001)
lsof -ti:3001 | xargs kill

# Frontend (5173)
lsof -ti:5173 | xargs kill
```

### API Not Responding

1. Check backend logs
2. Verify database connection
3. Check environment variables
4. Ensure migrations ran successfully

### Mock Mode

If API keys are not set, services will use mock data:
- Binance: Returns mock prices
- PayDo: Returns mock payments
- All operations work but use fake data

## 📚 API Documentation

See `backend/README.md` for detailed API documentation.

## 🚧 Next Steps

1. **Authentication:** Add JWT authentication
2. **Rate Limiting:** Implement rate limiting
3. **Testing:** Add unit and integration tests
4. **Monitoring:** Add logging and monitoring
5. **Production:** Deploy to production environment

## 💡 Development Tips

- Backend uses TypeScript with strict mode
- Frontend uses Vue 3 Composition API
- All database operations use transactions
- Logs are written to `backend/logs/`
- Use mock mode for development without API keys

## 📞 Support

For issues or questions:
- Email: direccion@exury.io
- GitHub Issues: [Create an issue](https://github.com/exuryio/exuryw3/issues)

