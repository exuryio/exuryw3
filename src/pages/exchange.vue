<template>
  <div class="exchange-wrapper">
    <div class="exchange-container">
      <h1 class="exchange-title">Buy Crypto</h1>
      <p class="exchange-subtitle">Exchange EUR for cryptocurrency instantly</p>

      <v-card class="exchange-card" elevation="2">
        <v-card-text>
          <div class="form-section">
            <v-text-field
              v-model.number="eurAmount"
              label="Amount (EUR)"
              type="number"
              min="0"
              step="0.01"
              variant="outlined"
              @input="onAmountChange"
            />

            <v-select
              v-model="selectedAsset"
              :items="cryptoAssets"
              label="Select Cryptocurrency"
              variant="outlined"
              @update:model-value="onAssetChange"
            />

            <div v-if="quote" class="quote-section">
              <v-divider class="my-4" />
              <div class="quote-details">
                <div class="quote-row">
                  <span>You will receive:</span>
                  <span class="quote-value">{{ formatCrypto(quote.crypto_amount) }} {{ quote.asset }}</span>
                </div>
                <div class="quote-row">
                  <span>Exchange rate:</span>
                  <span class="quote-value">1 EUR = {{ formatNumber(quote.exchange_rate) }} {{ quote.asset }}</span>
                </div>
                <div class="quote-row">
                  <span>Fee:</span>
                  <span class="quote-value">{{ formatNumber(quote.fee) }} EUR</span>
                </div>
                <div class="quote-row">
                  <span>Expires in:</span>
                  <span class="quote-value">{{ timeRemaining }}s</span>
                </div>
              </div>
            </div>

            <v-btn
              color="primary"
              size="large"
              block
              :disabled="!quote || isProcessing"
              :loading="isProcessing"
              @click="createOrder"
              class="mt-4"
            >
              {{ isProcessing ? 'Processing...' : 'Buy Crypto' }}
            </v-btn>

            <v-alert
              v-if="error"
              type="error"
              class="mt-4"
              dismissible
              @click:close="error = null"
            >
              {{ error }}
            </v-alert>

            <v-alert
              v-if="success"
              type="success"
              class="mt-4"
            >
              Order created successfully! Order ID: {{ orderId }}
            </v-alert>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { apiService } from '@/services/api';

const eurAmount = ref<number>(100);
const selectedAsset = ref<string>('BTC');
const quote = ref<any>(null);
const isProcessing = ref<boolean>(false);
const error = ref<string | null>(null);
const success = ref<boolean>(false);
const orderId = ref<string | null>(null);
const timeRemaining = ref<number>(0);
let quoteTimer: number | null = null;

const cryptoAssets = [
  { title: 'Bitcoin', value: 'BTC' },
  { title: 'Ethereum', value: 'ETH' },
  { title: 'BNB', value: 'BNB' },
  { title: 'Tether', value: 'USDT' },
  { title: 'Solana', value: 'SOL' },
];

const fetchQuote = async () => {
  if (!eurAmount.value || eurAmount.value <= 0) {
    quote.value = null;
    return;
  }

  try {
    error.value = null;
    const response = await apiService.getQuote('EUR', selectedAsset.value, eurAmount.value);
    quote.value = response;
    timeRemaining.value = response.ttl || 30;
    
    // Start countdown
    startCountdown();
  } catch (err: any) {
    error.value = err.message || 'Failed to fetch quote';
    quote.value = null;
  }
};

const startCountdown = () => {
  if (quoteTimer) {
    clearInterval(quoteTimer);
  }
  
  quoteTimer = setInterval(() => {
    if (timeRemaining.value > 0) {
      timeRemaining.value--;
    } else {
      if (quoteTimer) {
        clearInterval(quoteTimer);
      }
      quote.value = null;
    }
  }, 1000);
};

const onAmountChange = () => {
  if (quoteTimer) {
    clearInterval(quoteTimer);
  }
  fetchQuote();
};

const onAssetChange = () => {
  if (quoteTimer) {
    clearInterval(quoteTimer);
  }
  fetchQuote();
};

const createOrder = async () => {
  if (!quote.value) {
    return;
  }

  try {
    isProcessing.value = true;
    error.value = null;
    success.value = false;

    // Lock quote first
    await apiService.lockQuote(quote.value.quote_id);

    // Create order
    const response = await apiService.createOrder(quote.value.quote_id);
    orderId.value = response.order_id;
    success.value = true;
    quote.value = null;
  } catch (err: any) {
    error.value = err.message || 'Failed to create order';
  } finally {
    isProcessing.value = false;
  }
};

const formatCrypto = (amount: number): string => {
  return amount.toFixed(8);
};

const formatNumber = (amount: number): string => {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  });
};

onMounted(() => {
  fetchQuote();
});

onUnmounted(() => {
  if (quoteTimer) {
    clearInterval(quoteTimer);
  }
});
</script>

<style lang="scss" scoped>
.exchange-wrapper {
  padding: 32px;
  max-width: 600px;
  margin: 0 auto;
}

.exchange-title {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 8px;
}

.exchange-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 32px;
}

.exchange-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.quote-section {
  margin-top: 16px;
}

.quote-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.quote-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.quote-value {
  font-weight: 600;
  color: #1cba75;
}
</style>

