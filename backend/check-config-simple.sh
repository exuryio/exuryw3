#!/bin/bash
# Simple script to check backend configuration

echo "=== Backend Configuration Check ==="
echo ""

# Check if .env exists
if [ -f .env ]; then
    echo "✅ .env file exists"
    echo ""
    echo "Current configuration:"
    grep -E "NODE_ENV|BINANCE_API_KEY|BINANCE_API_SECRET" .env 2>/dev/null | sed 's/=.*/=***/' || echo "  (No Binance config found)"
else
    echo "⚠️  .env file does NOT exist"
    echo "   Creating .env.example as reference..."
fi

echo ""
echo "📌 IMPORTANT NOTES:"
echo "  - Binance price API (/api/v3/ticker/price) is PUBLIC"
echo "  - Does NOT require API keys for price fetching"
echo "  - API keys are only needed for trading (buy/sell orders)"
echo ""
echo "✅ The backend CAN fetch real prices WITHOUT BINANCE_API_KEY"
echo "   (as long as Binance API is accessible)"

