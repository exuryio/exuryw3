<template>
  <v-card class="price-simulator-inline">
    <v-card-text class="pa-4">
      <!-- Direction Toggle -->
      <div class="direction-toggle mb-3">
        <v-btn-toggle
          v-model="direction"
          mandatory
          density="compact"
          color="primary"
          class="direction-buttons"
        >
          <v-btn value="eur-to-crypto" size="small" class="direction-btn">
            Comprar
          </v-btn>
          <v-btn value="crypto-to-eur" size="small" class="direction-btn">
            Vender
          </v-btn>
        </v-btn-toggle>
      </div>

      <!-- EU FIAT Box -->
      <div class="currency-box mb-2" :class="{ 'output-box': direction === 'crypto-to-eur' }">
        <div class="currency-left">
          <div class="currency-icon eur-icon">
            <span class="currency-symbol">€</span>
          </div>
          <span class="currency-text">EU</span>
        </div>
        <div class="currency-right">
          <v-text-field
            v-if="direction === 'eur-to-crypto'"
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
          <span v-else class="crypto-amount">{{ estimatedEur }} EUR</span>
        </div>
      </div>

      <!-- Crypto Box -->
      <div class="currency-box mb-3" :class="{ 'output-box': direction === 'eur-to-crypto' }">
        <div class="currency-left">
          <div class="currency-icon crypto-icon">
            <span class="currency-symbol">{{ getAssetSymbol(selectedAsset) }}</span>
          </div>
          <span class="currency-text">{{ selectedAsset }}</span>
        </div>
        <div class="currency-right">
          <v-text-field
            v-if="direction === 'crypto-to-eur'"
            v-model.number="cryptoAmount"
            type="number"
            variant="plain"
            density="compact"
            hide-details
            class="amount-input"
            placeholder="0"
            @input="onAmountChange"
            @update:model-value="onAmountChange"
          />
          <span v-else class="crypto-amount">{{ estimatedCrypto }} {{ selectedAsset }}</span>
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
        <!-- Timer -->
        <div class="timer-row" :class="{ 'timer-warning': timeRemaining <= 10, 'timer-expiring': timeRemaining <= 5, 'timer-updating': isLoading }">
          <v-icon v-if="!isLoading" size="16" :color="timeRemaining <= 10 ? '#ff9800' : '#1cba75'">
            {{ timeRemaining <= 10 ? 'mdi-clock-alert' : 'mdi-clock-outline' }}
          </v-icon>
          <v-progress-circular v-else indeterminate size="16" color="#1cba75" width="2" />
          <span class="timer-label">
            {{ isLoading ? 'Actualizando tasa...' : 'La tasa se actualizará en:' }}
          </span>
          <span v-if="!isLoading" class="timer-value">{{ formatTime(timeRemaining) }}</span>
        </div>
        
        <div class="rate-row">
          <span class="rate-label">Estimated rate</span>
          <span class="rate-value">
            <span v-if="direction === 'eur-to-crypto'">
              1,00 EUR - {{ formatExchangeRate(quote.exchange_rate, quote.spread) }} {{ selectedAsset }}
            </span>
            <span v-else>
              1 {{ selectedAsset }} - {{ formatReverseRate(quote.reverse_rate || 0) }} EUR
            </span>
          </span>
        </div>
        <div class="rate-row">
          <span class="rate-label">Tarifa: {{ formatFee(quote.fee) }}%</span>
          <span class="rate-value">Estimated</span>
        </div>
        <div class="rate-row highlight-row">
          <span class="rate-label">
            <span v-if="direction === 'eur-to-crypto'">Estimated {{ selectedAsset }}</span>
            <span v-else>Estimated EUR</span>
          </span>
          <span class="rate-value highlight">
            <span v-if="direction === 'eur-to-crypto'">
              ≈ {{ formatCrypto(quote.crypto_amount) }} {{ selectedAsset }}
            </span>
            <span v-else>
              ≈ {{ formatEur(quote.eur_amount || 0) }} EUR
            </span>
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
      <div v-if="!quote && !isLoading && (direction === 'eur-to-crypto' ? eurAmount > 0 : cryptoAmount > 0)" class="default-quote">
        <div class="rate-info">
          <!-- Timer for fallback quote -->
          <div class="timer-row" :class="{ 'timer-warning': timeRemaining <= 10, 'timer-expiring': timeRemaining <= 5 }">
            <v-icon size="16" :color="timeRemaining <= 10 ? '#ff9800' : '#1cba75'">
              {{ timeRemaining <= 10 ? 'mdi-clock-alert' : 'mdi-clock-outline' }}
            </v-icon>
            <span class="timer-label">La tasa se actualizará en:</span>
            <span class="timer-value">{{ formatTime(timeRemaining) }}</span>
          </div>
          
          <div class="rate-row">
            <span class="rate-label">Estimated rate</span>
            <span class="rate-value">
              <span v-if="direction === 'eur-to-crypto'">
                1,00 EUR - {{ getEstimatedRate() }} {{ selectedAsset }}
              </span>
              <span v-else>
                1 {{ selectedAsset }} - {{ getEstimatedReverseRate() }} EUR
              </span>
            </span>
          </div>
          <div class="rate-row">
            <span class="rate-label">Tarifa: 0.5%</span>
            <span class="rate-value">Estimated</span>
          </div>
          <div class="rate-row highlight-row">
            <span class="rate-label">
              <span v-if="direction === 'eur-to-crypto'">Estimated {{ selectedAsset }}</span>
              <span v-else>Estimated EUR</span>
            </span>
            <span class="rate-value highlight">
              <span v-if="direction === 'eur-to-crypto'">
                ≈ {{ formatCrypto(parseFloat(estimatedCrypto)) }} {{ selectedAsset }}
              </span>
              <span v-else>
                ≈ {{ formatEur(parseFloat(estimatedEur)) }} EUR
              </span>
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
          :disabled="!isValid || isLoading"
          :loading="isLoading"
          @click="handleContinue"
          class="continue-btn"
        >
          {{ isLoading ? 'Procesando...' : 'Continuar' }}
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
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import apiService from '@/services/api';

const router = useRouter();

const direction = ref<'eur-to-crypto' | 'crypto-to-eur'>('eur-to-crypto');
const eurAmount = ref<number>(100);
const cryptoAmount = ref<number>(0);
const selectedAsset = ref<string>('USDC');
const selectedAssetIndex = ref<string>('USDC');
const availableAssets = ['USDC', 'BTC', 'ETH', 'BNB', 'SOL'];
const quote = ref<any>(null);
const isLoading = ref<boolean>(false);
const error = ref<string | null>(null);
const timeRemaining = ref<number>(0);
let quoteTimer: ReturnType<typeof setInterval> | null = null;

const estimatedCrypto = computed(() => {
  if (quote.value && direction.value === 'eur-to-crypto') {
    return formatCrypto(quote.value.crypto_amount);
  }
  // Fallback calculation if API is not available
  if (direction.value === 'eur-to-crypto' && eurAmount.value > 0) {
    // Approximate calculation: EUR amount * (1 - 0.5% fee) / estimated price
    const estimatedPrices: Record<string, number> = {
      USDC: 0.87, // Precio de mercado actual de USDC
      BTC: 45000,
      ETH: 2800,
      BNB: 350,
      SOL: 120,
    };
    const price = estimatedPrices[selectedAsset.value] || 1;
    const spreadAmount = (price * 1.5) / 100; // 1.5% spread
    const adjustedPrice = price + spreadAmount;
    const amountAfterFee = eurAmount.value * 0.995; // 0.5% fee
    return formatCrypto(amountAfterFee / adjustedPrice);
  }
  return '0.00';
});

const estimatedEur = computed(() => {
  if (quote.value && direction.value === 'crypto-to-eur') {
    return formatEur(quote.value.eur_amount || 0);
  }
  // Fallback calculation if API is not available
  if (direction.value === 'crypto-to-eur' && cryptoAmount.value > 0) {
    const estimatedPrices: Record<string, number> = {
      USDC: 0.87, // Precio de mercado actual de USDC
      BTC: 45000,
      ETH: 2800,
      BNB: 350,
      SOL: 120,
    };
    const price = estimatedPrices[selectedAsset.value] || 1;
    const SELL_SPREAD_PERCENTAGE = 2.0; // 2.0% spread when Exury buys crypto from user
    
    // Calculate total EUR value at market price
    const marketValue = cryptoAmount.value * price;
    
    // Apply -2.0% spread: user receives 98% of market value
    const eurAfterSpread = marketValue * (1 - SELL_SPREAD_PERCENTAGE / 100);
    
    // Calculate fee (0.5% of EUR after spread)
    const fee = eurAfterSpread * 0.005; // 0.5% fee
    return formatEur(eurAfterSpread - fee);
  }
  return '0.00';
});

const isValid = computed(() => {
  if (direction.value === 'eur-to-crypto') {
    return eurAmount.value > 0 && (quote.value !== null || eurAmount.value > 0);
  } else {
    return cryptoAmount.value > 0 && (quote.value !== null || cryptoAmount.value > 0);
  }
});

// Asset names removed - not used

const getAssetSymbol = (asset: string): string => {
  if (asset === 'USDC') return 'T';
  if (asset === 'BTC') return '₿';
  if (asset === 'ETH') return 'Ξ';
  return asset.charAt(0);
};

const fetchQuote = async () => {
  if (direction.value === 'eur-to-crypto') {
    if (!eurAmount.value || eurAmount.value <= 0) {
      quote.value = null;
      if (quoteTimer) {
        clearInterval(quoteTimer);
        quoteTimer = null;
      }
      timeRemaining.value = 0;
      return;
    }

    try {
      isLoading.value = true;
      error.value = null;
      
      // Force a new quote by adding a cache-busting parameter
      const cacheBuster = Date.now();
      const response = await apiService.getQuote('EUR', selectedAsset.value, eurAmount.value, cacheBuster) as {
        quote_id: string;
        crypto_amount: number;
        exchange_rate: number;
        ttl?: number;
        expires_at?: string;
        [key: string]: unknown;
      };
      
      console.log('New quote fetched:', {
        quote_id: response.quote_id,
        crypto_amount: response.crypto_amount,
        exchange_rate: response.exchange_rate,
        timestamp: new Date().toISOString()
      });
      
      // Force update by creating completely new object
      quote.value = null; // Clear first to trigger reactivity
      await new Promise(resolve => setTimeout(resolve, 10)); // Small delay to ensure reactivity
      quote.value = { 
        ...response,
        _timestamp: cacheBuster // Add timestamp to force update
      };
      error.value = null;
      
      // Initialize timer
      if (response.ttl) {
        timeRemaining.value = response.ttl;
      } else if (response.expires_at) {
        // Calculate remaining time from expires_at
        const expiresAt = new Date(response.expires_at);
        const now = new Date();
        const remaining = Math.max(0, Math.floor((expiresAt.getTime() - now.getTime()) / 1000));
        timeRemaining.value = remaining;
      } else {
        // Default to 30 seconds
        timeRemaining.value = 30;
      }
      
      // Restart countdown with new time
      startCountdown();
    } catch (err: any) {
      console.warn('Quote fetch failed, using fallback:', err);
      error.value = null;
      quote.value = null;
      // Initialize timer for fallback calculation
      timeRemaining.value = 30;
      startCountdown();
    } finally {
      isLoading.value = false;
    }
  } else {
    // Crypto to EUR - calculate on frontend for now
    if (!cryptoAmount.value || cryptoAmount.value <= 0) {
      quote.value = null;
      return;
    }

    try {
      isLoading.value = true;
      error.value = null;
      
      // Get price from Binance (we'll use EUR->Crypto quote to get the price)
      // Then calculate reverse
      const tempResponse = await apiService.getQuote('EUR', selectedAsset.value, 100);
      
      if (tempResponse) {
        // Extract crypto price from the quote
        // exchange_rate = 1 / adjustedPrice, so adjustedPrice = 1 / exchange_rate
        // adjustedPrice = cryptoPrice * (1 + spread/100)
        // So: cryptoPrice = adjustedPrice / (1 + spread/100) = (1/exchange_rate) / (1 + spread/100)
        const tempResponseTyped = tempResponse as {
          exchange_rate?: number;
          spread?: number;
          ttl?: number;
          [key: string]: unknown;
        };
        const adjustedPrice = 1 / (tempResponseTyped.exchange_rate || 1);
        const buySpreadPercent = tempResponseTyped.spread || 1.5;
        const cryptoPrice = adjustedPrice / (1 + buySpreadPercent / 100);
        
        // For selling: use SELL_SPREAD_PERCENTAGE (2.0% - when Exury buys from user)
        // Spread is -2.0% (user receives 2% less than market value)
        // Spread -2.0% applied correctly (user receives 98% of market value)
        const SELL_SPREAD_PERCENTAGE = 2.0; // 2.0% spread when Exury buys crypto from user
        
        // Calculate total EUR value at market price
        const marketValue = cryptoAmount.value * cryptoPrice;
        
        // Apply -2.0% spread: subtract 2% from market value
        // This means user receives 98% of market value
        const eurAfterSpread = marketValue * (1 - SELL_SPREAD_PERCENTAGE / 100);
        
        // Calculate fee (0.5% of EUR after spread)
        const feePercent = 0.5;
        const fee = (eurAfterSpread * feePercent) / 100;
        const eurAmount = eurAfterSpread - fee;
        
        // Calculate reverse rate (1 crypto = X EUR after fees)
        const reverseRate = eurAmount / cryptoAmount.value;
        
        // Force update by clearing first
        quote.value = null;
        await new Promise(resolve => setTimeout(resolve, 10));
        
        // Update quote (force new object to trigger reactivity)
        const cacheBuster = Date.now();
        quote.value = {
          ...(tempResponse as Record<string, unknown>),
          eur_amount: eurAmount,
          reverse_rate: reverseRate,
          crypto_amount: cryptoAmount.value,
          fee: fee,
          _timestamp: cacheBuster, // Force update
        };
        
        console.log('Sell quote updated:', {
          eur_amount: eurAmount,
          reverse_rate: reverseRate,
          timestamp: new Date().toISOString()
        });
        
        // Initialize timer for sell quote
        if (tempResponseTyped.ttl) {
          timeRemaining.value = tempResponseTyped.ttl;
        } else {
          timeRemaining.value = 30;
        }
        
        // Restart countdown
        startCountdown();
      }
      
      error.value = null;
    } catch (err: any) {
      console.warn('Quote fetch failed, using fallback:', err);
      error.value = null;
      quote.value = null;
      // Initialize timer for fallback calculation
      timeRemaining.value = 30;
      startCountdown();
    } finally {
      isLoading.value = false;
    }
  }
};

const startCountdown = () => {
  // Clear existing timer
  if (quoteTimer) {
    clearInterval(quoteTimer);
    quoteTimer = null;
  }
  
  // Don't start if timeRemaining is 0 or negative
  if (timeRemaining.value <= 0) {
    timeRemaining.value = 30; // Reset to default
  }
  
  quoteTimer = setInterval(() => {
    if (timeRemaining.value > 0) {
      timeRemaining.value--;
    } else {
      // Quote expired, clear timer first
      if (quoteTimer) {
        clearInterval(quoteTimer);
        quoteTimer = null;
      }
      
      // Auto-refresh quote when expired
      const shouldRefresh = (direction.value === 'eur-to-crypto' && eurAmount.value > 0) || 
                            (direction.value === 'crypto-to-eur' && cryptoAmount.value > 0);
      
      if (shouldRefresh) {
        console.log('Timer expired, fetching new quote...');
        // Reset timer immediately to show loading state
        timeRemaining.value = 30;
        // Force fetch new quote (bypass any debounce)
        if ((window as any).quoteTimeout) {
          clearTimeout((window as any).quoteTimeout);
        }
        // Fetch immediately without debounce
        fetchQuote();
      } else {
        quote.value = null;
        timeRemaining.value = 0;
      }
    }
  }, 1000);
};

const formatTime = (seconds: number): string => {
  if (seconds <= 0) return '0s';
  return `${seconds}s`;
};

const onAmountChange = () => {
  // Clear timer when amount changes
  if (quoteTimer) {
    clearInterval(quoteTimer);
    quoteTimer = null;
  }
  
  // Clear any existing timeout
  if ((window as any).quoteTimeout) {
    clearTimeout((window as any).quoteTimeout);
  }
  
  // Debounce quote fetching
  (window as any).quoteTimeout = setTimeout(() => {
    fetchQuote();
  }, 500);
};

const onAssetChange = (value: string) => {
  selectedAsset.value = value;
  selectedAssetIndex.value = value;
  
  // Clear timer when asset changes
  if (quoteTimer) {
    clearInterval(quoteTimer);
    quoteTimer = null;
  }
  
  if ((direction.value === 'eur-to-crypto' && eurAmount.value > 0) || 
      (direction.value === 'crypto-to-eur' && cryptoAmount.value > 0)) {
    fetchQuote();
  }
};

// Watch direction changes
watch(direction, (newDir) => {
  // Clear timer when direction changes
  if (quoteTimer) {
    clearInterval(quoteTimer);
    quoteTimer = null;
  }
  
  // Reset amounts when switching direction
  if (newDir === 'eur-to-crypto') {
    cryptoAmount.value = 0;
    if (eurAmount.value > 0) {
      fetchQuote();
    }
  } else {
    eurAmount.value = 0;
    if (cryptoAmount.value > 0) {
      fetchQuote();
    }
  }
});


const formatCrypto = (amount: number): string => {
  return amount.toFixed(6);
};

const formatExchangeRate = (exchangeRate: number, spread: number): string => {
  // exchange_rate from backend already includes the spread
  // Backend: exchange_rate = 1 / adjustedPrice where adjustedPrice = cryptoPrice + spreadAmount
  // So exchange_rate already has the spread applied - this is the actual rate the user pays
  // Format to show 6 decimal places (e.g., 0.000022 instead of 0.00002222)
  return exchangeRate.toFixed(6);
};

const formatFee = (fee: number): string => {
  // Convert fee amount to percentage
  if (direction.value === 'eur-to-crypto' && eurAmount.value > 0) {
    const feePercentage = (fee / eurAmount.value) * 100;
    return feePercentage.toFixed(1);
  } else if (direction.value === 'crypto-to-eur' && quote.value?.eur_amount && quote.value?.fee) {
    // For crypto to EUR, fee is calculated on EUR received
    // fee = eurBeforeFee * 0.5%, so feePercentage = (fee / eurBeforeFee) * 100
    // eurBeforeFee = eurAmount + fee
    const eurBeforeFee = quote.value.eur_amount + quote.value.fee;
    const feePercentage = (quote.value.fee / eurBeforeFee) * 100;
    return feePercentage.toFixed(1);
  }
  return '0.5';
};

const formatEur = (amount: number): string => {
  return amount.toFixed(2);
};

const formatReverseRate = (rate: number): string => {
  return rate.toFixed(2);
};

const getEstimatedRate = (): string => {
  const estimatedPrices: Record<string, number> = {
    USDC: 0.87, // Precio de mercado actual de USDC
    BTC: 45000,
    ETH: 2800,
    BNB: 350,
    SOL: 120,
  };
  const price = estimatedPrices[selectedAsset.value] || 1;
  const spreadAmount = (price * 1.5) / 100;
  const adjustedPrice = price + spreadAmount;
  return (1 / adjustedPrice).toFixed(6);
};

const getEstimatedReverseRate = (): string => {
  const estimatedPrices: Record<string, number> = {
    USDC: 0.87, // Precio de mercado actual de USDC
    BTC: 45000,
    ETH: 2800,
    BNB: 350,
    SOL: 120,
  };
  const price = estimatedPrices[selectedAsset.value] || 1;
  const SELL_SPREAD_PERCENTAGE = 2.0; // 2.0% spread when Exury buys crypto from user
  const spreadAmount = (price * SELL_SPREAD_PERCENTAGE) / 100;
  const afterFee = (price - spreadAmount) * 0.995; // 0.5% fee
  return afterFee.toFixed(2);
};

const handleContinue = async () => {
  if (!quote.value) {
    error.value = 'Por favor, espera a que se cargue la cotización';
    return;
  }

  try {
    isLoading.value = true;
    error.value = null;

    // Lock quote first
    await apiService.lockQuote(quote.value.quote_id);

    // Create order
    const response = await apiService.createOrder(quote.value.quote_id) as {
      order_id: string;
      [key: string]: unknown;
    };
    
    // Show success and redirect or show order details
    console.log('✅ Order created:', response);
    
    // If we're already on /exchange, show success message
    // Otherwise, redirect to /exchange with order info
    if (router.currentRoute.value.path === '/exchange') {
      // Emit event or use a store to show success message
      // For now, just show a success alert
      alert(`¡Orden creada exitosamente! ID: ${response.order_id}`);
      // Refresh quote to get a new one
      if (direction.value === 'eur-to-crypto' && eurAmount.value > 0) {
        await fetchQuote();
      }
    } else {
      router.push({
        path: '/exchange',
        query: {
          order_id: response.order_id,
          success: 'true',
        },
      });
    }
  } catch (err: any) {
    console.error('Error creating order:', err);
    error.value = err.message || 'Error al crear la orden. Por favor, intenta de nuevo.';
  } finally {
    isLoading.value = false;
  }
};

const connectWallet = () => {
  // TODO: Implement wallet connection
  console.log('Connect wallet');
};

// Fetch quote on mount
onMounted(() => {
  if (direction.value === 'eur-to-crypto' && eurAmount.value > 0) {
    fetchQuote();
  } else {
    // Initialize timer even if no quote yet
    timeRemaining.value = 30;
    startCountdown();
  }
});

// Cleanup timer on unmount
onUnmounted(() => {
  if (quoteTimer) {
    clearInterval(quoteTimer);
    quoteTimer = null;
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

.direction-toggle {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.direction-buttons {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 4px;
  
  :deep(.v-btn) {
    color: rgba(255, 255, 255, 0.7);
    background: transparent;
    text-transform: none;
    font-weight: 500;
    min-width: 100px;
    
    &.v-btn--active {
      background: #1cba75;
      color: white;
    }
  }
}

.output-box {
  opacity: 0.7;
  pointer-events: none;
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

.timer-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  margin-bottom: 12px;
  background: rgba(28, 186, 117, 0.2);
  border-radius: 8px;
  border: 1px solid rgba(28, 186, 117, 0.4);
  font-size: 13px;
  min-height: 40px;
  
  &.timer-warning {
    background: rgba(255, 152, 0, 0.2);
    border-color: rgba(255, 152, 0, 0.5);
    animation: pulse 1s ease-in-out infinite;
  }
  
  &.timer-expiring {
    background: rgba(255, 82, 82, 0.2);
    border-color: rgba(255, 82, 82, 0.5);
    animation: pulse 0.5s ease-in-out infinite;
  }
  
  &.timer-updating {
    background: rgba(28, 186, 117, 0.3);
    border-color: rgba(28, 186, 117, 0.6);
  }
}

.timer-label {
  color: rgba(255, 255, 255, 0.9);
  flex: 1;
  font-weight: 500;
}

.timer-value {
  color: white;
  font-weight: 700;
  font-size: 15px;
  min-width: 40px;
  text-align: right;
  font-family: 'Courier New', monospace;
  
  .timer-warning & {
    color: #ff9800;
  }
  
  .timer-expiring & {
    color: #ff5252;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
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

