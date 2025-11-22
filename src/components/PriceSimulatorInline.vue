<template>
  <v-card class="price-simulator-inline">
    <v-card-text class="pa-4">
      <!-- EU FIAT Box -->
      <div class="currency-box mb-2">
        <div class="currency-left">
          <div class="currency-icon eur-icon">
            <span class="currency-symbol">€</span>
          </div>
          <span class="currency-text">EU</span>
        </div>
        <div class="currency-right">
          <v-text-field
            v-model.number="eurAmount"
            type="number"
            variant="plain"
            density="compact"
            hide-details
            class="amount-input"
            placeholder="0"
            @input="onAmountChange"
            @update:model-value="onAmountChange"
          />
        </div>
      </div>

      <!-- Crypto Box -->
      <div class="currency-box mb-3">
        <div class="currency-left">
          <div class="currency-icon crypto-icon">
            <span class="currency-symbol">{{ getAssetSymbol(selectedAsset) }}</span>
          </div>
          <span class="currency-text">{{ selectedAsset }}</span>
        </div>
        <div class="currency-right">
          <span class="crypto-amount">{{ estimatedCrypto }} {{ selectedAsset }}</span>
        </div>
      </div>

      <!-- Asset Selector -->
      <div class="asset-selector mb-3">
        <v-chip-group
          v-model="selectedAssetIndex"
          mandatory
          selected-class="selected-asset"
        >
          <v-chip
            v-for="asset in availableAssets"
            :key="asset"
            :value="asset"
            size="small"
            class="asset-chip"
            @click="onAssetChange(asset)"
          >
            {{ asset }}
          </v-chip>
        </v-chip-group>
      </div>

      <!-- Rate Information -->
      <div v-if="quote" class="rate-info">
        <div class="rate-row">
          <span class="rate-label">Estimated rate</span>
          <span class="rate-value">
            1,00 EUR - {{ formatNumber(quote.exchange_rate) }} {{ selectedAsset }}
          </span>
        </div>
        <div class="rate-row">
          <span class="rate-label">Tarifa: {{ quote.spread }}%</span>
          <span class="rate-value">Estimated</span>
        </div>
        <div class="rate-row highlight-row">
          <span class="rate-label">Estimated {{ selectedAsset }}</span>
          <span class="rate-value highlight">
            ≈ {{ formatCrypto(quote.crypto_amount) }} {{ selectedAsset }}
          </span>
        </div>
      </div>

      <div v-else-if="isLoading" class="loading-state">
        <v-progress-circular indeterminate color="#1cba75" size="24" />
        <span class="ml-2">Calculating...</span>
      </div>

      <div v-else-if="error" class="error-state">
        <div class="error-message">
          <v-icon color="#ff5252" size="20">mdi-alert-circle</v-icon>
          <span>Conectando con el servidor...</span>
        </div>
        <p class="error-hint">Los precios se actualizarán automáticamente</p>
      </div>
      
      <!-- Show default quote even if API fails -->
      <div v-if="!quote && !isLoading && eurAmount > 0" class="default-quote">
        <div class="rate-info">
          <div class="rate-row">
            <span class="rate-label">Estimated rate</span>
            <span class="rate-value">
              1,00 EUR - {{ getEstimatedRate() }} {{ selectedAsset }}
            </span>
          </div>
          <div class="rate-row">
            <span class="rate-label">Tarifa: 0.5%</span>
            <span class="rate-value">Estimated</span>
          </div>
          <div class="rate-row highlight-row">
            <span class="rate-label">Estimated {{ selectedAsset }}</span>
            <span class="rate-value highlight">
              ≈ {{ estimatedCrypto }} {{ selectedAsset }}
            </span>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons mt-4">
        <v-btn
          color="primary"
          block
          size="large"
          :disabled="!isValid"
          @click="handleContinue"
          class="continue-btn"
        >
          Continuar
        </v-btn>
        <v-btn
          variant="outlined"
          block
          size="large"
          class="connect-wallet-btn mt-2"
          @click="connectWallet"
        >
          Conectar Wallet
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { apiService } from '@/services/api';

const router = useRouter();

const eurAmount = ref<number>(100);
const selectedAsset = ref<string>('USDC');
const selectedAssetIndex = ref<string>('USDC');
const availableAssets = ['USDC', 'BTC', 'ETH', 'BNB', 'SOL'];
const quote = ref<any>(null);
const isLoading = ref<boolean>(false);
const error = ref<string | null>(null);

const estimatedCrypto = computed(() => {
  if (quote.value) {
    return formatCrypto(quote.value.crypto_amount);
  }
  // Fallback calculation if API is not available
  if (eurAmount.value > 0) {
    // Approximate calculation: EUR amount * (1 - 0.5% fee) / estimated price
    const estimatedPrices: Record<string, number> = {
      USDC: 0.92,
      BTC: 45000,
      ETH: 2800,
      BNB: 350,
      SOL: 120,
    };
    const price = estimatedPrices[selectedAsset.value] || 1;
    const amountAfterFee = eurAmount.value * 0.995; // 0.5% fee
    return formatCrypto(amountAfterFee / price);
  }
  return '0.00';
});

const isValid = computed(() => {
  return eurAmount.value > 0 && (quote.value !== null || eurAmount.value > 0);
});

const assets = {
  BTC: 'Bitcoin',
  ETH: 'Ethereum',
  BNB: 'BNB',
  USDC: 'USD Coin',
  SOL: 'Solana',
};

const getAssetName = (asset: string): string => {
  return assets[asset as keyof typeof assets] || asset;
};

const getAssetSymbol = (asset: string): string => {
  if (asset === 'USDC') return 'T';
  if (asset === 'BTC') return '₿';
  if (asset === 'ETH') return 'Ξ';
  return asset.charAt(0);
};

const fetchQuote = async () => {
  if (!eurAmount.value || eurAmount.value <= 0) {
    quote.value = null;
    return;
  }

  try {
    isLoading.value = true;
    error.value = null;
    const response = await apiService.getQuote('EUR', selectedAsset.value, eurAmount.value);
    quote.value = response;
    error.value = null; // Clear any previous errors
  } catch (err: any) {
    // Don't show error immediately, use fallback calculation
    console.warn('Quote fetch failed, using fallback:', err);
    error.value = null; // Hide error, show fallback instead
    quote.value = null;
  } finally {
    isLoading.value = false;
  }
};

const onAmountChange = () => {
  // Debounce quote fetching
  clearTimeout((window as any).quoteTimeout);
  (window as any).quoteTimeout = setTimeout(() => {
    fetchQuote();
  }, 500);
};

const onAssetChange = (value: string) => {
  selectedAsset.value = value;
  selectedAssetIndex.value = value;
  if (eurAmount.value > 0) {
    fetchQuote();
  }
};

const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  });
};

const formatCrypto = (amount: number): string => {
  return amount.toFixed(6);
};

const getEstimatedRate = (): string => {
  const estimatedPrices: Record<string, number> = {
    USDC: 0.92,
    BTC: 45000,
    ETH: 2800,
    BNB: 350,
    SOL: 120,
  };
  const price = estimatedPrices[selectedAsset.value] || 1;
  return (1 / price).toFixed(6);
};

const handleContinue = () => {
  if (quote.value) {
    router.push({
      path: '/exchange',
      query: {
        quote_id: quote.value.quote_id,
        amount: eurAmount.value,
        asset: selectedAsset.value,
      },
    });
  }
};

const connectWallet = () => {
  // TODO: Implement wallet connection
  console.log('Connect wallet');
};

// Fetch quote on mount
onMounted(() => {
  if (eurAmount.value > 0) {
    fetchQuote();
  }
});
</script>

<style lang="scss" scoped>
.price-simulator-inline {
  background: rgba(20, 18, 24, 0.95) !important;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  width: 100%;
  max-width: 420px;
  min-width: 320px;
}

.currency-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  min-height: 56px;
}

.currency-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.currency-right {
  display: flex;
  align-items: center;
  min-width: 100px;
  justify-content: flex-end;
}

.currency-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.eur-icon {
  background: #4a90e2;
  color: white;
}

.crypto-icon {
  background: #1cba75;
  color: white;
}

.currency-symbol {
  font-size: 18px;
  font-weight: 600;
}

.currency-text {
  font-size: 16px;
  font-weight: 500;
  color: white;
}

.crypto-amount {
  font-size: 16px;
  font-weight: 500;
  color: white;
  text-align: right;
}

.amount-input {
  width: 100%;
  max-width: 120px;
  
  :deep(.v-field) {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
  }
  
  :deep(.v-field__input) {
    padding: 0 !important;
    min-height: auto !important;
  }
  
  :deep(input) {
    color: white !important;
    text-align: right;
    font-size: 16px;
    font-weight: 500;
    padding: 0 !important;
  }
}

.asset-selector {
  display: flex;
  justify-content: center;
  padding: 8px 0;
}

.asset-chip {
  background: rgba(255, 255, 255, 0.1) !important;
  color: rgba(255, 255, 255, 0.7) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  
  &.selected-asset {
    background: #1cba75 !important;
    color: white !important;
    border-color: #1cba75 !important;
  }
}

.exchange-arrow {
  display: flex;
  justify-content: center;
  align-items: center;
}

.rate-info {
  margin-top: 12px;
  padding: 12px 16px;
  background: rgba(28, 186, 117, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(28, 186, 117, 0.2);
}

.rate-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 13px;
  color: white;

  &:last-child {
    margin-bottom: 0;
  }

  &.highlight-row {
    margin-top: 6px;
    padding-top: 8px;
    border-top: 1px solid rgba(28, 186, 117, 0.3);
  }
}

.rate-label {
  color: rgba(255, 255, 255, 0.7);
}

.rate-value {
  color: white;
  font-weight: 500;

  &.highlight {
    color: #1cba75;
    font-weight: 600;
    font-size: 16px;
  }
}

.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  color: rgba(255, 255, 255, 0.7);
}

.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(255, 82, 82, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(255, 82, 82, 0.2);
  margin-bottom: 16px;
  
  .error-message {
    display: flex;
    align-items: center;
    gap: 8px;
    color: rgba(255, 255, 255, 0.9);
    font-size: 14px;
    margin-bottom: 8px;
  }
  
  .error-hint {
    margin: 0;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
    text-align: center;
  }
}

.default-quote {
  margin-top: 12px;
}

.action-buttons {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.continue-btn {
  background: #1cba75 !important;
  color: white !important;
  font-weight: 600;
  height: 48px;
  text-transform: none;
}

.connect-wallet-btn {
  border-color: rgba(255, 255, 255, 0.3) !important;
  color: white !important;
  height: 48px;
  text-transform: none;
  background: transparent !important;
}

:deep(.v-card-text) {
  color: white;
}
</style>

