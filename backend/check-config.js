/**
 * Script to check backend configuration
 */
require('dotenv').config();

console.log('=== Backend Configuration Check ===\n');

// Check NODE_ENV
const nodeEnv = process.env.NODE_ENV || 'development';
console.log(`NODE_ENV: ${nodeEnv}`);
console.log(`Mode: ${nodeEnv === 'production' ? 'PRODUCTION' : 'DEVELOPMENT'}\n`);

// Check Binance API Keys
const binanceKey = process.env.BINANCE_API_KEY || '';
const binanceSecret = process.env.BINANCE_API_SECRET || '';
console.log('Binance API Configuration:');
console.log(`  BINANCE_API_KEY: ${binanceKey ? 'SET (' + binanceKey.substring(0, 10) + '...)' : 'NOT SET'}`);
console.log(`  BINANCE_API_SECRET: ${binanceSecret ? 'SET' : 'NOT SET'}`);
console.log(`  BINANCE_TESTNET: ${process.env.BINANCE_TESTNET || 'false'}\n`);

// Important note about price API
console.log('📌 IMPORTANT:');
console.log('  - Binance price API (/api/v3/ticker/price) is PUBLIC and does NOT require API keys');
console.log('  - API keys are only needed for trading (buy/sell orders)');
console.log('  - For price fetching, the backend will work WITHOUT API keys\n');

// Check if using mock prices
if (nodeEnv === 'development' && !binanceKey) {
  console.log('⚠️  WARNING:');
  console.log('  - Running in DEVELOPMENT mode without BINANCE_API_KEY');
  console.log('  - Price fetching will use REAL Binance API (public endpoint)');
  console.log('  - If API fails, will fallback to MOCK prices\n');
} else if (binanceKey) {
  console.log('✅ Binance API keys configured');
  console.log('  - Can fetch real-time prices');
  console.log('  - Can execute trades (if keys have trading permissions)\n');
} else {
  console.log('✅ Configuration OK for price fetching');
  console.log('  - Will use public Binance API for prices');
  console.log('  - No API keys needed for price data\n');
}

// Check other important variables
console.log('Exchange Configuration:');
console.log(`  EXCHANGE_FEE_PERCENTAGE: ${process.env.EXCHANGE_FEE_PERCENTAGE || '0.5'}%`);
console.log(`  EXCHANGE_SPREAD_PERCENTAGE: ${process.env.EXCHANGE_SPREAD_PERCENTAGE || '1.5'}%`);
console.log(`  QUOTE_TTL_SECONDS: ${process.env.QUOTE_TTL_SECONDS || '30'}s\n`);

console.log('=== Summary ===');
if (nodeEnv === 'development') {
  console.log('✅ Backend is in DEVELOPMENT mode');
} else {
  console.log('✅ Backend is in PRODUCTION mode');
}

if (!binanceKey) {
  console.log('⚠️  BINANCE_API_KEY not set - will use public API for prices');
  console.log('   (This is OK for price fetching, but trading will not work)');
} else {
  console.log('✅ BINANCE_API_KEY is configured');
}

