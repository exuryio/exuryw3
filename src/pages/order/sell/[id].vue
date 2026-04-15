<route lang="yaml">
meta:
  layout: default
</route>

<template>
  <div class="order-page">
    <div class="order-container">
      <router-link to="/exchange" class="back-link">
        <v-icon size="20">mdi-arrow-left</v-icon>
        <span>Volver al intercambio</span>
      </router-link>

      <div v-if="loading" class="order-loading">
        <v-progress-circular indeterminate color="#1cba75" size="48" />
        <p class="mt-3">Cargando orden de venta...</p>
      </div>

      <v-alert v-else-if="error" type="error" class="order-alert" dismissible @click:close="error = null">
        {{ error }}
      </v-alert>

      <template v-else-if="order">
        <v-alert v-if="isFallbackOrder" type="warning" density="compact" class="demo-alert mb-4">
          El backend no respondió al crear la orden. Estás en modo temporal con datos del simulador.
          <v-btn
            size="small"
            variant="text"
            color="warning"
            class="ml-2"
            :loading="recoveringOrder"
            @click="tryRecoverOrder"
          >
            Reintentar conexión
          </v-btn>
        </v-alert>
        <h1 class="order-title">Tu orden de venta</h1>
        <p class="order-subtitle">Completa los pasos para recibir EUR en tu cuenta bancaria</p>

        <nav class="progress-stepper" aria-label="Progreso">
          <div class="stepper-item" :class="{ done: bankFormDone, current: !bankFormDone }">
            <span class="stepper-num">1</span>
            <span class="stepper-label">Cuenta bancaria</span>
          </div>
          <div class="stepper-line" :class="{ done: bankFormDone }" />
          <div class="stepper-item" :class="{ done: declarationDone, current: bankFormDone && !declarationDone }">
            <span class="stepper-num">2</span>
            <span class="stepper-label">Depósito USDC</span>
          </div>
          <div class="stepper-line" :class="{ done: declarationDone }" />
          <div class="stepper-item" :class="{ current: declarationDone }">
            <span class="stepper-num">3</span>
            <span class="stepper-label">Estado</span>
          </div>
        </nav>

        <section class="order-section">
          <h2 class="section-title">
            <span class="step-badge" :class="{ done: bankFormDone }">1</span>
            Datos bancarios
          </h2>
          <p class="section-desc">Usaremos estos datos para enviarte los EUR tras confirmar tu depósito USDC.</p>

          <div class="form-grid">
            <v-text-field
              v-model="bankIban"
              label="IBAN"
              placeholder="ES00 0000 0000 0000 0000 0000"
              variant="outlined"
              density="comfortable"
              hide-details="auto"
              :error-messages="ibanError"
              @blur="validateIban"
            />
            <v-text-field
              v-model="bankHolderName"
              label="Nombre del titular"
              placeholder="Nombre y apellidos"
              variant="outlined"
              density="comfortable"
              hide-details="auto"
            />
            <v-text-field
              v-model="bankName"
              label="Nombre del banco"
              placeholder="Ej. Banco Santander"
              variant="outlined"
              density="comfortable"
              hide-details="auto"
            />
          </div>
        </section>

        <section class="order-section">
          <h2 class="section-title">
            <span class="step-badge" :class="{ done: declarationDone }">2</span>
            Instrucciones de depósito USDC
          </h2>
          <p class="section-desc">Envía exactamente el monto indicado desde una wallet de tu propiedad.</p>

          <div class="sell-cards">
            <div class="sell-card">
              <span class="sell-card-label">Monto a enviar</span>
              <strong class="sell-card-value">{{ cryptoAmount }} {{ order.asset || 'USDC' }}</strong>
            </div>

            <div class="sell-card">
              <span class="sell-card-label">Red de depósito</span>
              <v-chip-group v-model="selectedNetwork" mandatory class="network-group">
                <v-chip value="polygon" class="network-chip" variant="outlined">Polygon</v-chip>
                <v-chip value="base" class="network-chip" variant="outlined">Base</v-chip>
              </v-chip-group>
            </div>

            <div class="sell-card">
              <span class="sell-card-label">Wallet de Exury (destino)</span>
              <div class="wallet-row">
                <span class="wallet-address">{{ exuryWalletAddress }}</span>
                <v-btn variant="tonal" size="small" color="primary" @click="copyWallet">
                  <v-icon start size="18">mdi-content-copy</v-icon>
                  Copiar
                </v-btn>
              </div>
            </div>
          </div>

          <div class="origin-box">
            <h3 class="origin-title">Declaración de origen</h3>
            <v-text-field
              v-model="sourceWallet"
              label="Wallet desde donde enviarás USDC"
              placeholder="0x..."
              variant="outlined"
              density="comfortable"
              hide-details="auto"
              :error-messages="sourceWalletError"
              @blur="validateSourceWallet"
            />
            <v-checkbox
              v-model="walletOwnershipConfirmed"
              color="primary"
              hide-details
              label="Garantizo que la wallet es de mi propiedad"
            />
          </div>
        </section>

        <section ref="statusSectionRef" class="order-section status-section">
          <h2 class="section-title">Estado de la orden</h2>
          <p class="section-desc">Seguimiento de tu orden de venta, desde el envío hasta la acreditación en cuenta.</p>
          <div class="status-timeline">
            <div
              v-for="(step, index) in statusSteps"
              :key="step.step"
              class="status-step"
              :class="{ active: statusStep === step.step, done: statusStep > step.step, pending: statusStep < step.step }"
            >
              <div class="status-left">
                <div class="status-dot">
                  <v-icon v-if="statusStep > step.step" size="20" color="white">mdi-check</v-icon>
                  <span v-else>{{ step.step }}</span>
                </div>
                <div v-if="index < statusSteps.length - 1" class="status-connector" />
              </div>
              <div class="status-content">
                <strong>{{ step.title }}</strong>
                <p>{{ step.desc }}</p>
              </div>
            </div>
          </div>
        </section>

        <div class="order-summary">
          <span class="order-id">Orden {{ orderId }}</span>
          <span class="order-amount">{{ cryptoAmount }} {{ order.asset || 'USDC' }} → {{ fiatAmount }} EUR</span>
        </div>
      </template>
    </div>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="2500" location="bottom" rounded="pill">
      {{ snackbar.text }}
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import apiService from '@/services/api';

const route = useRoute();
const router = useRouter();
const orderId = computed(() => route.params.id as string);
const PENDING_ORDER_KEY = 'exury_pending_order';
const isTempOrder = computed(() => orderId.value.startsWith('temp-'));
const isFallbackOrder = ref(false);
const recoveringOrder = ref(false);
let recoveryTimer: ReturnType<typeof setTimeout> | null = null;

const loading = ref(true);
const error = ref<string | null>(null);
const order = ref<Record<string, unknown> | null>(null);

const bankIban = ref('');
const bankHolderName = ref('');
const bankName = ref('');
const sourceWallet = ref('');
const walletOwnershipConfirmed = ref(false);
const selectedNetwork = ref<'polygon' | 'base'>('polygon');

const snackbar = ref({ show: false, text: '', color: 'success' });

const env = import.meta.env as Record<string, string | undefined>;
const polygonWallet = (env.VITE_EXURY_USDC_WALLET_POLYGON ?? '').trim();
const baseWallet = (env.VITE_EXURY_USDC_WALLET_BASE ?? '').trim();

const exuryWalletAddress = computed(() => {
  if (selectedNetwork.value === 'polygon') {
    return polygonWallet || '0xA5f3b9C2D14E6f7A88A0cD12B44Ef58A9152C7D1';
  }
  return baseWallet || '0x6D4c0A1eF53d7B2A49E1D1a3A653fC0b3d90Ce72';
});

const ibanError = ref('');
const sourceWalletError = ref('');

const normalizeIban = (value: string) => value.replace(/\s+/g, '').toUpperCase();

const validateIban = () => {
  const normalized = normalizeIban(bankIban.value);
  if (!normalized) {
    ibanError.value = '';
    return;
  }
  ibanError.value = /^[A-Z]{2}\d{13,32}$/.test(normalized) ? '' : 'IBAN no válido';
};

const validateSourceWallet = () => {
  const value = sourceWallet.value.trim();
  if (!value) {
    sourceWalletError.value = '';
    return;
  }
  sourceWalletError.value = value.length >= 26 ? '' : 'La wallet debe tener al menos 26 caracteres';
};

const bankFormDone = computed(() => {
  return !!normalizeIban(bankIban.value) && !!bankHolderName.value.trim() && !!bankName.value.trim() && !ibanError.value;
});

const declarationDone = computed(() => {
  return bankFormDone.value && !!sourceWallet.value.trim() && !sourceWalletError.value && walletOwnershipConfirmed.value;
});

const cryptoAmount = computed(() => String(order.value?.amount_crypto ?? '0'));
const fiatAmount = computed(() => {
  const value = Number(order.value?.amount_eur ?? order.value?.fiat_amount ?? 0);
  return new Intl.NumberFormat('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
});

const statusStep = computed(() => {
  const s = String(order.value?.status ?? order.value?.payment_status ?? 'pending').toLowerCase();
  if (s === 'completed' || s === 'funds_in_account' || s === 'delivered') return 4;
  if (s === 'funds_in_transit' || s === 'sent' || s === 'processing') return 3;
  if (s === 'received' || s === 'verifying' || s === 'confirmed') return 2;
  return 1;
});

const statusSteps = [
  { step: 1, title: 'Envío de fondos', desc: 'Esperando tu depósito USDC en la wallet de Exury.' },
  { step: 2, title: 'Verificación', desc: 'Verificamos red, origen de fondos y titularidad de wallet.' },
  { step: 3, title: 'Fondos en camino', desc: 'Transferencia EUR iniciada a tu cuenta bancaria.' },
  { step: 4, title: 'Fondos en cuenta', desc: 'Pago acreditado correctamente en tu cuenta bancaria.' },
];

const loadSellOrderData = () => {
  if (typeof window === 'undefined') return;
  const storageKey = `exury_sell_order_data_${orderId.value}`;
  const raw = localStorage.getItem(storageKey);
  if (!raw) return;
  try {
    const saved = JSON.parse(raw) as {
      bankIban?: string;
      bankHolderName?: string;
      bankName?: string;
      sourceWallet?: string;
      walletOwnershipConfirmed?: boolean;
      selectedNetwork?: 'polygon' | 'base';
    };
    bankIban.value = saved.bankIban ?? '';
    bankHolderName.value = saved.bankHolderName ?? '';
    bankName.value = saved.bankName ?? '';
    sourceWallet.value = saved.sourceWallet ?? '';
    walletOwnershipConfirmed.value = saved.walletOwnershipConfirmed ?? false;
    selectedNetwork.value = saved.selectedNetwork ?? 'polygon';
  } catch {
    /* ignore corrupted local state */
  }
};

watch([bankIban, bankHolderName, bankName, sourceWallet, walletOwnershipConfirmed, selectedNetwork], () => {
  if (typeof window === 'undefined' || !orderId.value) return;
  const storageKey = `exury_sell_order_data_${orderId.value}`;
  localStorage.setItem(storageKey, JSON.stringify({
    bankIban: bankIban.value,
    bankHolderName: bankHolderName.value,
    bankName: bankName.value,
    sourceWallet: sourceWallet.value,
    walletOwnershipConfirmed: walletOwnershipConfirmed.value,
    selectedNetwork: selectedNetwork.value,
  }));
}, { deep: true });

const fetchOrder = async () => {
  if (!orderId.value) return;
  loading.value = true;
  error.value = null;
  try {
    if (orderId.value.startsWith('temp-') && typeof window !== 'undefined') {
      const raw = sessionStorage.getItem(PENDING_ORDER_KEY);
      const stored = raw ? JSON.parse(raw) : null;
      if (stored?.order_id === orderId.value && stored?.order_side === 'sell') {
        isFallbackOrder.value = Boolean(stored.is_fallback);
        order.value = {
          ...stored,
          asset: stored.asset ?? 'USDC',
          status: stored.status ?? 'pending',
        };
      } else {
        isFallbackOrder.value = false;
        order.value = {
          order_id: orderId.value,
          amount_eur: 0,
          amount_crypto: 0,
          asset: 'USDC',
          status: 'pending',
        };
      }
      return;
    }
    const data = await apiService.getOrder(orderId.value);
    isFallbackOrder.value = false;
    order.value = data as Record<string, unknown>;
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'No se pudo cargar la orden de venta.';
    error.value = message;
    order.value = null;
  } finally {
    loading.value = false;
  }
};

const tryRecoverOrder = async () => {
  if (!isTempOrder.value || typeof window === 'undefined') return;
  recoveringOrder.value = true;
  try {
    const raw = sessionStorage.getItem(PENDING_ORDER_KEY);
    const stored = raw ? JSON.parse(raw) : null;
    const quoteId = stored?.quote_id as string | undefined;
    if (!quoteId) return;
    try {
      await apiService.lockQuote(quoteId);
    } catch {
      /* ignore lock failures */
    }
    const response = await apiService.createOrder(quoteId) as { order_id?: string; orderId?: string; id?: string };
    const realOrderId = response?.order_id ?? response?.orderId ?? response?.id;
    if (realOrderId) {
      sessionStorage.removeItem(PENDING_ORDER_KEY);
      router.replace(`/order/sell/${realOrderId}`);
    }
  } catch {
    /* keep fallback mode until backend recovers */
  } finally {
    recoveringOrder.value = false;
  }
};

const showSnackbar = (text: string, color: 'success' | 'primary' = 'primary') => {
  snackbar.value = { show: true, text, color };
};

const copyWallet = async () => {
  try {
    await navigator.clipboard.writeText(exuryWalletAddress.value);
    showSnackbar('Wallet copiada al portapapeles');
  } catch {
    showSnackbar('No se pudo copiar la wallet', 'success');
  }
};

const statusSectionRef = ref<HTMLElement | null>(null);

onMounted(async () => {
  await fetchOrder();
  loadSellOrderData();
  if (isTempOrder.value) {
    recoveryTimer = setTimeout(() => {
      tryRecoverOrder();
    }, 2000);
  }
});

watch(orderId, fetchOrder);

watch(isFallbackOrder, (value) => {
  if (!value || !isTempOrder.value) return;
  if (recoveryTimer) clearTimeout(recoveryTimer);
  recoveryTimer = setTimeout(() => {
    tryRecoverOrder();
  }, 8000);
});

onBeforeUnmount(() => {
  if (recoveryTimer) clearTimeout(recoveryTimer);
});
</script>

<style lang="scss" scoped>
.order-page {
  width: 100%;
  max-width: min(960px, 92vw);
  margin: 0 auto;
  padding: clamp(24px, 4vw, 48px);
  min-height: calc(100vh - 200px);
  box-sizing: border-box;
}

.order-container { display: flex; flex-direction: column; gap: 24px; }

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 14px;
}

.order-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 0;
  color: rgba(255, 255, 255, 0.8);
}

.order-title { font-size: clamp(24px, 4vw, 32px); color: #fff; margin: 0; }
.order-subtitle { font-size: 16px; color: rgba(255, 255, 255, 0.72); margin: 0; }

.progress-stepper {
  display: flex;
  align-items: center;
  padding: 10px 0;
}

.stepper-item { display: flex; flex-direction: column; align-items: center; gap: 4px; }

.stepper-num {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.6);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
}

.stepper-item.current .stepper-num,
.stepper-item.done .stepper-num { background: #1cba75; color: #fff; }

.stepper-label {
  font-size: 11px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.03em;
}

.stepper-line {
  width: 24px;
  height: 2px;
  background: rgba(255, 255, 255, 0.2);
}

.stepper-line.done { background: #1cba75; }

.order-section {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #fff;
  font-size: 18px;
  margin: 0 0 8px 0;
}

.section-desc { color: rgba(255, 255, 255, 0.72); margin: 0 0 16px 0; font-size: 14px; }

.step-badge {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #1cba75;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.form-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }

.sell-cards { display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px; }

.sell-card {
  padding: 14px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.sell-card-label {
  display: block;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 8px;
}

.sell-card-value { color: #fff; font-size: 18px; }
.network-group { gap: 8px; }
.network-chip { text-transform: none; font-weight: 600; }

.wallet-row {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.wallet-address {
  font-family: ui-monospace, monospace;
  color: #fff;
  font-size: 14px;
  word-break: break-all;
  flex: 1;
}

.origin-box {
  padding: 14px;
  border-radius: 12px;
  border: 1px solid rgba(28, 202, 117, 0.25);
  background: rgba(28, 202, 117, 0.06);
}

.origin-title { margin: 0 0 10px 0; font-size: 15px; color: #fff; }

.status-timeline { display: flex; flex-direction: column; }

.status-step {
  display: flex;
  gap: 0;
  padding: 12px 0;
  opacity: 0.55;
}

.status-step.active { opacity: 1; }
.status-step.done { opacity: 0.85; }

.status-left { display: flex; flex-direction: column; align-items: center; flex-shrink: 0; }

.status-dot {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.status-step.active .status-dot,
.status-step.done .status-dot { background: #1cba75; }

.status-connector {
  width: 2px;
  min-height: 18px;
  background: rgba(255, 255, 255, 0.15);
  margin: 4px 0;
}

.status-content {
  padding-left: 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.status-content strong { color: #fff; font-size: 15px; }
.status-content p { margin: 0; color: rgba(255, 255, 255, 0.72); font-size: 13px; }

.order-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 16px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 13px;
}

@media (max-width: 600px) {
  .progress-stepper .stepper-label { display: none; }
}
</style>
