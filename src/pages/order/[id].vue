<route lang="yaml">
meta:
  layout: default
</route>

<template>
  <div class="order-page">
    <div class="order-container">
      <!-- Back link -->
      <router-link to="/exchange" class="back-link">
        <v-icon size="20">mdi-arrow-left</v-icon>
        <span>Volver al intercambio</span>
      </router-link>

      <!-- Loading -->
      <div v-if="loading" class="order-loading">
        <v-progress-circular indeterminate color="#1cba75" size="48" />
        <p class="mt-3">Cargando orden...</p>
      </div>

      <!-- Error -->
      <v-alert v-else-if="error" type="error" class="order-alert" dismissible @click:close="error = null">
        {{ error }}
      </v-alert>

      <!-- Order content -->
      <template v-else-if="order">
        <v-alert v-if="isDemo" type="info" density="compact" class="demo-alert mb-4">
          Vista de ejemplo. En producción verás los datos reales de tu orden tras hacer clic en Continuar.
        </v-alert>
        <v-alert v-else-if="isTempOrder" type="warning" density="compact" class="demo-alert mb-4">
          El backend no respondió al crear la orden. Estás viendo los siguientes pasos con los datos del simulador. IBAN y referencia reales aparecerán cuando el backend esté conectado.
        </v-alert>

        <h1 class="order-title">Tu orden</h1>
        <p class="order-subtitle">Sigue los pasos para completar tu depósito</p>

        <!-- Progress stepper: 1 Wallet → 2 Pago (tu transferencia) → 3 Estado (lo actualiza el sistema) -->
        <nav class="progress-stepper" aria-label="Progreso">
          <div class="stepper-item" :class="{ done: walletAddress, current: !walletAddress }">
            <span class="stepper-num">1</span>
            <span class="stepper-label">Wallet</span>
          </div>
          <div class="stepper-line" :class="{ done: walletAddress }" />
          <div class="stepper-item" :class="{ done: step2Done, current: walletAddress && !step2Done }">
            <span class="stepper-num">2</span>
            <span class="stepper-label">Pago</span>
          </div>
          <div class="stepper-line" :class="{ done: step2Done }" />
          <div class="stepper-item" :class="{ current: step2Done }">
            <span class="stepper-num">3</span>
            <span class="stepper-label">Estado</span>
          </div>
        </nav>

        <!-- Step 1: Wallet (form or saved state) -->
        <section class="order-section wallet-section" :class="{ completed: walletAddress }">
          <h2 class="section-title">
            <span class="step-badge" :class="{ done: walletAddress }">
              <v-icon v-if="walletAddress" size="18" color="white">mdi-check</v-icon>
              <span v-else>1</span>
            </span>
            Conectar wallet
          </h2>
          <p class="section-desc">Indica la red, el nombre de la wallet o exchange y la dirección donde quieres recibir tu {{ order.asset || 'USDC' }}.</p>

          <!-- Saved wallet: show confirmation + option to change -->
          <div v-if="walletAddress" class="wallet-saved">
            <div class="wallet-saved-grid">
              <div class="wallet-saved-row">
                <span class="wallet-saved-label">Red</span>
                <span class="wallet-saved-value">{{ savedWalletNetwork }}</span>
              </div>
              <div class="wallet-saved-row">
                <span class="wallet-saved-label">Wallet / Exchange</span>
                <span class="wallet-saved-value">{{ savedWalletName }}</span>
              </div>
              <div class="wallet-saved-row">
                <span class="wallet-saved-label">Dirección</span>
                <span class="wallet-truncated">{{ truncateAddress(walletAddress) }}</span>
              </div>
            </div>
            <div class="wallet-saved-actions">
              <v-icon color="#1cba75" size="20">mdi-check-circle</v-icon>
              <span class="wallet-saved-ok">Datos guardados</span>
              <v-btn variant="text" size="small" color="primary" @click="clearWalletSaved">
                Cambiar
              </v-btn>
            </div>
          </div>

          <!-- Wallet form -->
          <template v-else>
            <div class="wallet-actions">
              <v-select
                v-model="walletNetwork"
                :items="networkOptions"
                label="Red"
                placeholder="Selecciona la red"
                variant="outlined"
                density="comfortable"
                hide-details="auto"
                class="wallet-field"
                item-title="label"
                item-value="value"
                clearable
              />
              <v-text-field
                v-if="walletNetwork === 'other'"
                v-model="walletNetworkOther"
                label="Especifica la red"
                placeholder="Ej. Solana, Tron..."
                variant="outlined"
                density="comfortable"
                hide-details="auto"
                class="wallet-field"
              />
              <v-select
                v-model="walletName"
                :items="walletNameOptions"
                label="Nombre de la wallet o exchange"
                placeholder="Ej. MetaMask, Binance..."
                variant="outlined"
                density="comfortable"
                hide-details="auto"
                class="wallet-field"
                item-title="label"
                item-value="value"
                clearable
              />
              <v-text-field
                v-if="walletName === 'other'"
                v-model="walletNameOther"
                label="Especifica el nombre"
                placeholder="Ej. Mi exchange..."
                variant="outlined"
                density="comfortable"
                hide-details="auto"
                class="wallet-field"
              />
              <v-text-field
                v-model="walletInput"
                label="Dirección de wallet"
                placeholder="0x... o tu dirección"
                variant="outlined"
                density="comfortable"
                hide-details="auto"
                class="wallet-input"
                :error-messages="walletError"
                @keyup.enter="saveWallet"
                @blur="validateWalletInput"
              />
              <v-btn
                color="primary"
                size="large"
                :disabled="!canSaveWallet"
                :loading="savingWallet"
                @click="saveWallet"
                class="save-wallet-btn"
              >
                Guardar dirección
              </v-btn>
            </div>
            <p class="wallet-hint">También podrás conectar con WalletConnect próximamente.</p>
          </template>
        </section>

        <!-- Step 2: Payment instructions (UX: 1 Importe → 2 IBAN → 3 Referencia) -->
        <section class="order-section payment-section">
          <h2 class="section-title">
            <span class="step-badge">2</span>
            Instrucciones de pago
          </h2>
          <p class="section-desc">Realiza una transferencia SEPA en este orden: importe exacto, al IBAN indicado, con la referencia en el concepto.</p>

          <div class="payment-cards">
            <!-- 1. Importe (máxima prioridad visual) -->
            <div class="payment-card payment-card-amount">
              <span class="payment-card-step" aria-hidden="true">1</span>
              <div class="payment-card-body">
                <span class="payment-card-label">Importe a transferir</span>
                <div class="payment-card-value-row">
                  <span class="payment-card-value payment-card-amount-value">{{ formatEur(Number(order.amount_eur ?? order.fiat_amount ?? 0)) }} EUR</span>
                  <v-btn
                    class="copy-card-btn"
                    color="primary"
                    variant="flat"
                    size="small"
                    @click="onCopy(formatEur(Number(order.amount_eur ?? order.fiat_amount ?? 0)) + ' EUR')"
                  >
                    <v-icon start size="18">mdi-content-copy</v-icon>
                    Copiar importe
                  </v-btn>
                </div>
                <p class="payment-card-hint">Transfiere exactamente esta cantidad.</p>
              </div>
            </div>

            <!-- 2. IBAN (datos bancarios ocultos hasta que el usuario haga clic; datos desde env, no en repo) -->
            <div class="payment-card payment-card-iban">
              <span class="payment-card-step" aria-hidden="true">2</span>
              <div class="payment-card-body">
                <span class="payment-card-label">Datos bancarios de destino</span>
                <template v-if="!bankDetailsRevealed">
                  <p class="payment-card-pending">Los datos bancarios están ocultos por seguridad.</p>
                  <v-btn
                    class="reveal-bank-btn"
                    color="primary"
                    variant="flat"
                    size="small"
                    @click="bankDetailsRevealed = true"
                  >
                    <v-icon start size="18">mdi-eye</v-icon>
                    Ver datos bancarios
                  </v-btn>
                </template>
                <template v-else>
                  <div v-if="bankBeneficiary || bankIban || bankName" class="bank-details-revealed">
                    <div v-if="bankBeneficiary" class="bank-detail-row">
                      <span class="bank-detail-label">Beneficiario</span>
                      <div class="payment-card-value-row">
                        <span class="payment-card-value">{{ bankBeneficiary }}</span>
                        <v-btn class="copy-card-btn" variant="tonal" size="small" @click="onCopy(bankBeneficiary)">
                          <v-icon start size="18">mdi-content-copy</v-icon>
                          Copiar
                        </v-btn>
                      </div>
                    </div>
                    <div v-if="bankIban" class="bank-detail-row">
                      <span class="bank-detail-label">IBAN</span>
                      <div class="payment-card-value-row">
                        <span class="payment-card-value payment-card-value-mono">{{ bankIban }}</span>
                        <v-btn class="copy-card-btn" variant="tonal" size="small" @click="onCopy(bankIban)">
                          <v-icon start size="18">mdi-content-copy</v-icon>
                          Copiar IBAN
                        </v-btn>
                      </div>
                    </div>
                    <div v-if="bankName" class="bank-detail-row">
                      <span class="bank-detail-label">Banco</span>
                      <div class="payment-card-value-row">
                        <span class="payment-card-value">{{ bankName }}</span>
                        <v-btn class="copy-card-btn" variant="tonal" size="small" @click="onCopy(bankName)">
                          <v-icon start size="18">mdi-content-copy</v-icon>
                          Copiar
                        </v-btn>
                      </div>
                    </div>
                  </div>
                  <p v-else class="payment-card-pending">
                    <template v-if="isDev">
                      Añade en la raíz del proyecto un archivo <strong>.env</strong> con:<br>
                      <code class="env-hint">VITE_BANK_BENEFICIARY=...</code>,<br>
                      <code class="env-hint">VITE_BANK_IBAN=...</code>,<br>
                      <code class="env-hint">VITE_BANK_NAME=...</code><br>
                      Luego reinicia el servidor (<code>npm run dev</code>).
                    </template>
                    <template v-else>Los datos bancarios no están configurados. Contacta con soporte.</template>
                  </p>
                </template>
              </div>
            </div>

            <!-- 3. Referencia (concepto de la transferencia) -->
            <div class="payment-card payment-card-reference">
              <span class="payment-card-step" aria-hidden="true">3</span>
              <div class="payment-card-body">
                <span class="payment-card-label">Referencia (obligatoria)</span>
                <p class="payment-card-desc">Cópiala e inclúyela exactamente en el concepto de la transferencia.</p>
                <div class="payment-card-value-row">
                  <span class="payment-card-value payment-card-value-mono payment-card-reference-value">{{ order.reference || order.payment_reference || orderId }}</span>
                  <v-btn
                    class="copy-card-btn"
                    color="primary"
                    variant="flat"
                    size="small"
                    @click="onCopy(String(order.reference || order.payment_reference || orderId))"
                  >
                    <v-icon start size="18">mdi-content-copy</v-icon>
                    Copiar referencia
                  </v-btn>
                </div>
              </div>
            </div>
          </div>

          <p class="payment-note">Realiza la transferencia desde una cuenta a tu nombre para agilizar la verificación.</p>
          <p class="payment-step-complete">
            Cuando hayas realizado la transferencia, el <strong>Estado del depósito</strong> (abajo) se actualizará solo al recibir tu pago. No hace falta pulsar ningún botón; pasas al paso 3 cuando el sistema confirme la recepción.
          </p>
        </section>

        <!-- Step 3: Status timeline (visibilidad del estado del sistema + jerarquía clara) -->
        <section ref="statusSectionRef" class="order-section status-section">
          <div class="status-section-header">
            <div>
              <h2 class="section-title">Estado del depósito</h2>
              <p class="section-desc">Así seguimos tu transferencia hasta que recibas tu {{ order.asset || 'USDC' }}.</p>
            </div>
            <v-btn
              variant="tonal"
              size="small"
              color="primary"
              class="scroll-to-current-btn"
              @click="scrollToCurrentStep"
            >
              <v-icon start size="18">mdi-target</v-icon>
              Ver paso actual
            </v-btn>
          </div>
          <div class="status-timeline">
            <div
              v-for="(step, index) in statusSteps"
              :key="index"
              :data-step="step.step"
              class="status-step"
              :class="{
                active: statusStep === step.step,
                done: statusStep > step.step,
                pending: statusStep < step.step,
              }"
            >
              <div class="status-left">
                <div class="status-dot">
                  <v-icon v-if="statusStep > step.step" size="20" color="white">mdi-check</v-icon>
                  <span v-else>{{ step.step }}</span>
                </div>
                <div class="status-connector" v-if="index < statusSteps.length - 1" />
              </div>
              <div class="status-content">
                <div class="status-content-header">
                  <strong>{{ step.title }}</strong>
                  <span v-if="statusStep === step.step" class="status-badge-current">Actual</span>
                  <span v-else-if="statusStep > step.step" class="status-badge-done">Completado</span>
                </div>
                <p>{{ step.desc }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Order summary footer -->
        <div class="order-summary">
          <span class="order-id">Orden {{ orderId }}</span>
          <span class="order-amount">{{ formatEur(Number(order.amount_eur ?? order.fiat_amount ?? 0)) }} EUR → {{ order.amount_crypto ?? order.crypto_amount ?? '—' }} {{ order.asset || 'USDC' }}</span>
        </div>
      </template>
    </div>

    <!-- Snackbar: copy / save feedback -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="2500"
      location="bottom"
      rounded="pill"
    >
      <span class="snackbar-text">{{ snackbar.text }}</span>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import apiService from '@/services/api';

const route = useRoute();
const orderId = computed(() => route.params.id as string);

const loading = ref(true);
const error = ref<string | null>(null);
const order = ref<Record<string, unknown> | null>(null);
const walletInput = ref('');
const walletNetwork = ref<string>('');
const walletNetworkOther = ref('');
const walletName = ref<string>('');
const walletNameOther = ref('');

const WALLET_STORAGE_KEY = 'exury_deposit_wallet_address';
const WALLET_INFO_STORAGE_KEY = 'exury_deposit_wallet_info';

interface WalletInfo {
  address: string;
  network: string;
  walletOrExchangeName: string;
}

const networkOptions = [
  { label: 'Ethereum', value: 'ethereum' },
  { label: 'Polygon', value: 'polygon' },
  { label: 'Arbitrum', value: 'arbitrum' },
  { label: 'Base', value: 'base' },
  { label: 'Optimism', value: 'optimism' },
  { label: 'Avalanche', value: 'avalanche' },
  { label: 'BNB Smart Chain', value: 'bnb' },
  { label: 'Otra', value: 'other' },
];

const walletNameOptions = [
  { label: 'MetaMask', value: 'metamask' },
  { label: 'Trust Wallet', value: 'trust' },
  { label: 'Binance', value: 'binance' },
  { label: 'Coinbase', value: 'coinbase' },
  { label: 'Kraken', value: 'kraken' },
  { label: 'Ledger', value: 'ledger' },
  { label: 'Otra', value: 'other' },
];

const walletAddress = ref('');
const savedWalletNetwork = ref('');
const savedWalletName = ref('');
const savingWallet = ref(false);
const walletError = ref('');

const WALLET_MIN_LENGTH = 26;

const getNetworkLabel = (value: string) => networkOptions.find(n => n.value === value)?.label || value || '—';
const getWalletNameLabel = (value: string) => walletNameOptions.find(w => w.value === value)?.label || value || '—';

const loadWallet = () => {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(WALLET_INFO_STORAGE_KEY);
    if (raw) {
      const info = JSON.parse(raw) as WalletInfo & { networkLabel?: string; walletNameLabel?: string };
      walletAddress.value = info.address || '';
      walletInput.value = info.address || '';
      savedWalletNetwork.value = info.networkLabel || (info.network ? getNetworkLabel(info.network) : '') || '—';
      savedWalletName.value = info.walletNameLabel || (info.walletOrExchangeName ? getWalletNameLabel(info.walletOrExchangeName) : '') || '—';
      return;
    }
  } catch {
    /* fallback to legacy */
  }
  const legacy = localStorage.getItem(WALLET_STORAGE_KEY) || '';
  walletAddress.value = legacy;
  walletInput.value = legacy;
  if (legacy) {
    savedWalletNetwork.value = '—';
    savedWalletName.value = '—';
  }
};

const clearWalletSaved = () => {
  walletAddress.value = '';
  walletInput.value = '';
  savedWalletNetwork.value = '';
  savedWalletName.value = '';
  walletNetwork.value = '';
  walletName.value = '';
  walletNetworkOther.value = '';
  walletNameOther.value = '';
  walletError.value = '';
};

const validateWalletInput = () => {
  const v = walletInput.value?.trim() || '';
  if (!v) {
    walletError.value = '';
    return;
  }
  if (v.length < WALLET_MIN_LENGTH) {
    walletError.value = `La dirección debe tener al menos ${WALLET_MIN_LENGTH} caracteres.`;
    return;
  }
  walletError.value = '';
};

const truncateAddress = (addr: string) => {
  if (!addr || addr.length <= 20) return addr;
  return `${addr.slice(0, 10)}...${addr.slice(-8)}`;
};

const displayNetwork = () => {
  if (walletNetwork.value === 'other') return walletNetworkOther.value?.trim() || 'Otra';
  return getNetworkLabel(walletNetwork.value);
};

const displayWalletName = () => {
  if (walletName.value === 'other') return walletNameOther.value?.trim() || 'Otra';
  return getWalletNameLabel(walletName.value);
};

const canSaveWallet = computed(() => {
  const addr = walletInput.value?.trim();
  if (!addr || addr.length < WALLET_MIN_LENGTH) return false;
  const hasNetwork = walletNetwork.value === 'other' ? !!walletNetworkOther.value?.trim() : !!walletNetwork.value;
  const hasName = walletName.value === 'other' ? !!walletNameOther.value?.trim() : !!walletName.value;
  return hasNetwork && hasName;
});

const saveWallet = () => {
  const addr = walletInput.value?.trim();
  if (!addr) return;
  validateWalletInput();
  if (walletError.value) return;
  savingWallet.value = true;
  walletError.value = '';
  const network = walletNetwork.value === 'other' ? (walletNetworkOther.value?.trim() || 'other') : walletNetwork.value;
  const walletOrExchangeName = walletName.value === 'other' ? (walletNameOther.value?.trim() || 'other') : walletName.value;
  const info: WalletInfo & { networkLabel?: string; walletNameLabel?: string } = {
    address: addr,
    network: network || '',
    walletOrExchangeName: walletOrExchangeName || '',
    networkLabel: displayNetwork(),
    walletNameLabel: displayWalletName(),
  };
  setTimeout(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(WALLET_INFO_STORAGE_KEY, JSON.stringify(info));
      localStorage.setItem(WALLET_STORAGE_KEY, addr);
    }
    walletAddress.value = addr;
    savedWalletNetwork.value = info.networkLabel || '—';
    savedWalletName.value = info.walletNameLabel || '—';
    savingWallet.value = false;
    showSnackbar('Datos de wallet guardados correctamente', 'success');
  }, 300);
};

// Map backend status to step 1-4 (timeline: Envío fondos → Verificación → USDC enviados → Fondos en wallet)
const statusStep = computed(() => {
  const o = order.value;
  if (!o) return 1;
  const s = (o.status ?? o.payment_status ?? 'pending') as string;
  const statusLower = s.toLowerCase();
  if (statusLower === 'completed' || statusLower === 'delivered' || statusLower === 'funds_in_wallet') return 4;
  if (statusLower === 'usdc_sent' || statusLower === 'sent' || statusLower === 'processing') return 3;
  if (statusLower === 'received' || statusLower === 'verifying' || statusLower === 'confirmed') return 2;
  return 1; // pending, waiting_funds, etc.
});

// Paso 2 (Pago) se considera completado cuando el backend indica que recibió la transferencia (estado ≥ Verificación)
const step2Done = computed(() => statusStep.value >= 2);

const formatEur = (n: number) => {
  return new Intl.NumberFormat('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(n));
};

const snackbar = ref({ show: false, text: '', color: 'success' });

// Datos bancarios desde variables de entorno (nunca en el código para no exponer en el repo)
const env = import.meta.env as Record<string, string | undefined>;
const bankBeneficiary = (env?.VITE_BANK_BENEFICIARY ?? '').trim();
const bankIban = (env?.VITE_BANK_IBAN ?? '').trim();
const bankName = (env?.VITE_BANK_NAME ?? '').trim();
const bankDetailsRevealed = ref(false);
const isDev = import.meta.env.DEV === true;

const showSnackbar = (text: string, color: 'success' | 'primary' = 'success') => {
  snackbar.value = { show: true, text, color };
};

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

const onCopy = async (text: string) => {
  const ok = await copyToClipboard(text);
  showSnackbar(ok ? 'Copiado al portapapeles' : 'No se pudo copiar', ok ? 'primary' : 'success');
};

const statusSteps = [
  { step: 1, title: 'Envío de fondos', desc: 'Esperando euros. Realiza la transferencia con el IBAN y la referencia indicados.' },
  { step: 2, title: 'Verificación', desc: 'Recibido y procesando. Estamos verificando tu transferencia.' },
  { step: 3, title: 'Fondos en camino', desc: 'USDC enviados a tu wallet.' },
  { step: 4, title: 'Fondos en wallet', desc: 'Listo. Ya puedes usar tu crypto.' },
];

const PENDING_ORDER_KEY = 'exury_pending_order';
const isDemo = computed(() => orderId.value === 'demo');
const isTempOrder = computed(() => orderId.value?.startsWith('temp-'));

const fetchOrder = async () => {
  if (!orderId.value) return;
  if (isDemo.value) {
    loading.value = true;
    error.value = null;
    await new Promise(r => setTimeout(r, 400));
    order.value = {
      amount_eur: 100,
      amount_crypto: 106.55,
      asset: 'USDC',
      iban: 'ES12 3456 7890 1234 5678 9012',
      reference: 'EXY-DEMO-123456',
      status: 'pending',
    };
    loading.value = false;
    return;
  }
  if (isTempOrder.value && typeof window !== 'undefined') {
    loading.value = true;
    error.value = null;
    try {
      const raw = sessionStorage.getItem(PENDING_ORDER_KEY);
      const stored = raw ? JSON.parse(raw) : null;
      if (stored && stored.order_id === orderId.value) {
        order.value = {
          ...stored,
          iban: stored.iban || '—',
          reference: stored.reference || orderId.value,
        };
      } else {
        order.value = {
          amount_eur: stored?.amount_eur ?? 0,
          amount_crypto: stored?.amount_crypto ?? 0,
          asset: stored?.asset ?? 'USDC',
          iban: '—',
          reference: orderId.value,
          status: 'pending',
        };
      }
    } catch {
      order.value = {
        amount_eur: 0,
        amount_crypto: 0,
        asset: 'USDC',
        iban: '—',
        reference: orderId.value,
        status: 'pending',
      };
    }
    loading.value = false;
    return;
  }
  loading.value = true;
  error.value = null;
  try {
    const data = await apiService.getOrder(orderId.value);
    order.value = data as Record<string, unknown>;
  } catch (e: any) {
    error.value = e?.message || 'No se pudo cargar la orden.';
    order.value = null;
  } finally {
    loading.value = false;
  }
};

const statusSectionRef = ref<HTMLElement | null>(null);

const scrollToCurrentStep = () => {
  const section = statusSectionRef.value;
  if (!section) return;
  const el = section.querySelector(`[data-step="${statusStep.value}"]`);
  if (el) {
    (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

onMounted(() => {
  loadWallet();
  fetchOrder();
  nextTick(() => {
    setTimeout(scrollToCurrentStep, 400);
  });
});

watch(orderId, () => {
  if (orderId.value) fetchOrder();
});

watch(statusStep, () => {
  nextTick(scrollToCurrentStep);
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

.order-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 8px;
  &:hover { color: #1cba75; }
}

.order-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 0;
  color: rgba(255, 255, 255, 0.8);
}

.order-alert { max-width: 100%; }

.order-title {
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 600;
  color: #fff;
  margin: 0 0 4px 0;
}

.order-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 20px 0;
}

/* Progress stepper */
.progress-stepper {
  display: flex;
  align-items: center;
  gap: 0;
  margin-bottom: 28px;
  padding: 12px 0;
}

.stepper-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stepper-num {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stepper-item.current .stepper-num {
  background: #1cba75;
  color: #fff;
}

.stepper-item.done .stepper-num {
  background: #1cba75;
  color: #fff;
}

.stepper-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.stepper-line {
  width: 24px;
  height: 2px;
  background: rgba(255, 255, 255, 0.15);
  flex-shrink: 0;
}

.stepper-line.done {
  background: #1cba75;
}

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
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin: 0 0 8px 0;
}

.step-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #1cba75;
  color: #fff;
  font-size: 14px;
}

.step-badge.done {
  background: #1cba75;
}

.section-desc {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.75);
  margin: 0 0 16px 0;
  line-height: 1.45;
}

.wallet-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.wallet-input { max-width: 100%; }

.save-wallet-btn {
  text-transform: none;
  font-weight: 600;
}

.wallet-saved {
  margin-top: 8px;
}

.wallet-saved-grid {
  padding: 16px;
  background: rgba(28, 202, 117, 0.08);
  border: 1px solid rgba(28, 202, 117, 0.25);
  border-radius: 12px;
  margin-bottom: 12px;
}

.wallet-saved-grid .wallet-saved-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 8px 0;
  border: none;
  background: transparent;
}

.wallet-saved-grid .wallet-saved-row:not(:last-child) {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.wallet-saved-label {
  flex: 0 0 120px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.wallet-saved-value {
  flex: 1;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.95);
  word-break: break-all;
}

.wallet-saved-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.wallet-saved-ok {
  flex: 1;
  font-size: 13px;
  color: #1cba75;
}

.wallet-truncated {
  flex: 1;
  font-family: ui-monospace, monospace;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  word-break: break-all;
}

.wallet-field {
  max-width: 100%;
}

.wallet-hint {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin: 12px 0 0 0;
}

/* Paso 2: cards en orden 1 Importe → 2 IBAN → 3 Referencia */
.payment-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 8px;
}

.payment-card {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 18px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: border-color 0.2s, background 0.2s;
}

.payment-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.12);
}

.payment-card-step {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 13px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  background: rgba(255, 255, 255, 0.12);
}

.payment-card-amount .payment-card-step { background: rgba(28, 202, 117, 0.25); color: #1cba75; }
.payment-card-iban .payment-card-step { background: rgba(255, 255, 255, 0.12); }
.payment-card-reference .payment-card-step { background: rgba(28, 202, 117, 0.15); color: #9ee6c3; }

.payment-card-body {
  flex: 1;
  min-width: 0;
}

.payment-card-label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 8px;
}

.payment-card-value-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 6px;
}

.payment-card-value {
  flex: 1;
  min-width: 0;
  word-break: break-all;
  font-size: 15px;
  color: #fff;
}

.payment-card-value-mono {
  font-family: ui-monospace, monospace;
  font-size: 14px;
}

.payment-card-amount-value {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #fff;
  white-space: nowrap;
  word-break: keep-all;
  flex-shrink: 0;
}

.payment-card-reference-value {
  font-weight: 600;
  color: #1cba75;
  font-size: 15px;
}

.payment-card-amount {
  border-color: rgba(28, 202, 117, 0.2);
  background: rgba(28, 202, 117, 0.06);
}

.payment-card-amount:hover {
  border-color: rgba(28, 202, 117, 0.35);
  background: rgba(28, 202, 117, 0.08);
}

/* Móvil: importe arriba y botón abajo para evitar que se monten */
@media (max-width: 600px) {
  .payment-card-amount .payment-card-value-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  .payment-card-amount-value {
    font-size: 20px;
    line-height: 1.2;
  }
  .payment-card-amount .copy-card-btn {
    align-self: flex-start;
  }
  /* Datos bancarios: filas uniformes, IBAN en una línea con scroll */
  .bank-details-revealed .payment-card-value-row {
    align-items: flex-start;
  }
  .bank-details-revealed .copy-card-btn {
    flex-shrink: 0;
  }
}

.payment-card-desc {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 10px 0;
  line-height: 1.4;
}

.payment-card-hint {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  line-height: 1.35;
}

.payment-card-pending {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
  margin: 4px 0 0 0;
}

.reveal-bank-btn {
  text-transform: none;
  font-weight: 600;
  margin-top: 8px;
}

.payment-card-pending code.env-hint {
  font-size: 12px;
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
}

.bank-details-revealed {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.bank-detail-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.bank-details-revealed .payment-card-value-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.bank-details-revealed .payment-card-value {
  word-break: normal;
  min-width: 0;
  flex: 1 1 auto;
}

/* IBAN: una sola línea en móvil, scroll horizontal si no cabe */
.bank-details-revealed .payment-card-value-mono {
  white-space: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  word-break: keep-all;
  padding-right: 4px;
}

.bank-detail-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.5);
}

.copy-card-btn {
  text-transform: none;
  flex-shrink: 0;
  font-weight: 600;
}

.payment-note {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  margin: 16px 0 0 0;
  line-height: 1.4;
}

.payment-step-complete {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.65);
  margin: 16px 0 0 0;
  padding: 12px 14px;
  background: rgba(28, 202, 117, 0.08);
  border-radius: 10px;
  border-left: 3px solid #1cba75;
  line-height: 1.45;
}

.payment-step-complete strong {
  color: rgba(255, 255, 255, 0.9);
}

.status-section-header {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.status-section-header .section-title { margin-bottom: 4px; }
.status-section-header .section-desc { margin-bottom: 0; }

.scroll-to-current-btn { text-transform: none; flex-shrink: 0; }

.status-timeline { display: flex; flex-direction: column; gap: 0; }

.status-step {
  display: flex;
  gap: 0;
  padding: 12px 14px;
  margin: 0 -14px;
  border-radius: 12px;
  transition: background 0.2s, opacity 0.2s;
  &.pending { opacity: 0.45; }
  &.done { opacity: 0.85; .status-dot { background: #1cba75; } }
  &.active {
    opacity: 1;
    background: rgba(28, 202, 117, 0.1);
    border: 1px solid rgba(28, 202, 117, 0.25);
    box-shadow: 0 0 0 1px rgba(28, 202, 117, 0.08);
  }
}

.status-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.status-dot {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  flex-shrink: 0;
  transition: background 0.2s, box-shadow 0.2s;
}

.status-step.active .status-dot {
  background: #1cba75;
  box-shadow: 0 0 0 4px rgba(28, 202, 117, 0.22);
}

.status-step.done .status-dot { background: #1cba75; }

.status-connector {
  width: 2px;
  min-height: 20px;
  background: rgba(255, 255, 255, 0.12);
  margin: 4px 0;
}

.status-step.done .status-connector { background: rgba(28, 202, 117, 0.5); }

.status-content {
  flex: 1;
  padding: 4px 0 16px 16px;
  min-width: 0;
}

.status-content-header {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 4px;
}

.status-content strong { color: #fff; font-size: 15px; }
.status-step.pending .status-content strong { color: rgba(255, 255, 255, 0.7); }
.status-content p { margin: 0; font-size: 13px; color: rgba(255, 255, 255, 0.75); line-height: 1.5; }

.status-badge-current {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #1cba75;
  background: rgba(28, 202, 117, 0.2);
  padding: 2px 8px;
  border-radius: 6px;
}

.status-badge-done { font-size: 11px; color: rgba(255, 255, 255, 0.5); }

.order-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  flex-wrap: wrap;
  gap: 8px;
}

.order-id { font-weight: 500; color: rgba(255, 255, 255, 0.7); }
.order-amount { color: rgba(255, 255, 255, 0.8); }

.snackbar-text { font-size: 14px; }

/* Responsive: aprovechar ancho en pantallas grandes, compactar en móvil */
@media (min-width: 1200px) {
  .order-page {
    max-width: 960px;
  }
}

@media (max-width: 768px) {
  .order-page {
    max-width: 100%;
    padding: clamp(16px, 4vw, 24px);
  }
}

@media (max-width: 600px) {
  .progress-stepper .stepper-label { display: none; }
  .reference-value-row { flex-direction: column; align-items: stretch; }
  .copy-reference-btn { width: 100%; }
  .status-section-header {
    flex-direction: column;
    align-items: stretch;
  }
  .scroll-to-current-btn { align-self: flex-start; }
}
</style>
