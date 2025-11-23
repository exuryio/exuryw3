<template>
  <v-dialog
    v-model="isOpen"
    max-width="500"
    persistent
    class="price-simulator-dialog"
    :scrim="false"
    location="end"
  >
    <v-card class="price-simulator-card">
      <v-card-title class="d-flex justify-space-between align-center pa-4">
        <span class="text-h6">Exchange</span>
        <v-btn icon variant="text" size="small" @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="pa-4">
        <!-- From Currency -->
        <div class="currency-row mb-3">
          <div class="currency-info">
            <div class="currency-icon eur-icon">
              <span class="currency-symbol">€</span>
            </div>
            <div class="currency-details">
              <div class="currency-code">EUR</div>
              <div class="currency-label">Euro</div>
            </div>
          </div>
          <div class="amount-section">
            <v-text-field
              v-model.number="eurAmount"
              type="number"
              variant="solo"
              density="compact"
              hide-details
              class="amount-input"
              placeholder="0"
              @input="onAmountChange"
              @update:model-value="onAmountChange"
            />
          </div>
        </div>

        <!-- Exchange Arrow -->
        <div class="exchange-arrow mb-3">
          <v-icon color="#1cba75" size="24">mdi-swap-vertical</v-icon>
        </div>

        <!-- To Currency -->
        <div class="currency-row mb-4">
          <div class="currency-info">
            <div class="currency-icon crypto-icon">
              <span class="currency-symbol">{{ getAssetSymbol(selectedAsset) }}</span>
            </div>
            <div class="currency-details">
              <div class="currency-code">{{ selectedAsset }}</div>
              <div class="currency-label">{{ getAssetName(selectedAsset) }}</div>
            </div>
          </div>
          <div class="amount-section">
            <v-text-field
              :model-value="estimatedCrypto"
              readonly
              variant="solo"
              density="compact"
              hide-details
              class="amount-input"
            />
          </div>
        </div>

        <!-- Asset Selector -->
        <div class="asset-selector mb-4">
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
              {{ formatCrypto(quote.crypto_amount) }} {{ selectedAsset }}
            </span>
          </div>
        </div>

        <div v-else-if="isLoading" class="loading-state">
          <v-progress-circular indeterminate color="#1cba75" size="24" />
          <span class="ml-2">Calculating...</span>
        </div>

        <div v-else-if="error" class="error-state">
          <v-alert type="error" density="compact" variant="text">
            {{ error }}
          </v-alert>
        </div>
      </v-card-text>

      <v-card-actions class="pa-4 pt-0">
        <v-btn
          color="primary"
          block
          size="large"
          :disabled="!quote || !isValid"
          @click="continueToExchange"
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
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import apiService from '@/services/api';

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const router = useRouter();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

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
  return '0.00';
});

const isValid = computed(() => {
  return eurAmount.value > 0 && quote.value !== null;
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

const onAssetChange = (value: string) => {
  selectedAsset.value = value;
  selectedAssetIndex.value = value;
  if (eurAmount.value > 0) {
    fetchQuote();
  }
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
  } catch (err: any) {
    error.value = err.message || 'Failed to fetch quote';
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

// Watch for initial mount to fetch quote
watch([eurAmount, selectedAsset], () => {
  if (eurAmount.value > 0) {
    fetchQuote();
  }
}, { immediate: false });

const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  });
};

const formatCrypto = (amount: number): string => {
  return amount.toFixed(6);
};

const continueToExchange = () => {
  if (quote.value) {
    router.push({
      path: '/exchange',
      query: {
        quote_id: quote.value.quote_id,
        amount: eurAmount.value,
        asset: selectedAsset.value,
      },
    });
    close();
  }
};

const connectWallet = () => {
  // TODO: Implement wallet connection
  console.log('Connect wallet');
};

const close = () => {
  isOpen.value = false;
  // Reset when closed
  eurAmount.value = 100;
  selectedAsset.value = 'USDC';
  selectedAssetIndex.value = 'USDC';
  quote.value = null;
  error.value = null;
};

// Fetch quote when dialog opens
watch(isOpen, (newValue) => {
  if (newValue) {
    // Small delay to ensure dialog is rendered
    setTimeout(() => {
      if (eurAmount.value > 0) {
        fetchQuote();
      }
    }, 100);
  }
});
</script>

<style lang="scss" scoped>
.price-simulator-card {
  background: rgba(20, 18, 24, 0.95) !important;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
}

.currency-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.currency-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.currency-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 18px;
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
  font-size: 20px;
}

.currency-details {
  display: flex;
  flex-direction: column;
}

.currency-code {
  font-size: 16px;
  font-weight: 600;
  color: white;
}

.currency-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.amount-section {
  min-width: 120px;
  display: flex;
  align-items: center;
}

.amount-input {
  max-width: 150px;
  
  :deep(.v-field) {
    background: rgba(255, 255, 255, 0.1) !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
  }
  
  :deep(input) {
    color: white !important;
    text-align: right;
    font-size: 16px;
    font-weight: 500;
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
  margin-top: 16px;
  padding: 16px;
  background: rgba(28, 186, 117, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(28, 186, 117, 0.2);
}

.rate-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 13px;

  &:last-child {
    margin-bottom: 0;
  }

  &.highlight-row {
    margin-top: 8px;
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

.loading-state,
.error-state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  color: rgba(255, 255, 255, 0.7);
}

.continue-btn {
  background: #1cba75 !important;
  color: white !important;
  font-weight: 600;
}

.connect-wallet-btn {
  border-color: rgba(255, 255, 255, 0.3) !important;
  color: white !important;
}

:deep(.v-card-title) {
  color: white;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

:deep(.v-card-text) {
  color: white;
}

:deep(.v-dialog) {
  margin: 0;
  align-self: flex-end;
  margin-right: 16px;
  margin-top: 80px;
}

:deep(.v-overlay__scrim) {
  background: transparent;
}
</style>

