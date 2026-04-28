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
        <p class="order-subtitle">Sigue los pasos para recibir EUR en tu cuenta bancaria</p>

        <!-- Progress stepper: 1 Cuenta bancaria → 2 Depósito (envío de crypto) → 3 Estado -->
        <nav class="progress-stepper" aria-label="Progreso">
          <div class="stepper-item" :class="{ done: bankSaved, current: !bankSaved }">
            <span class="stepper-num">1</span>
            <span class="stepper-label">Cuenta bancaria</span>
          </div>
          <div class="stepper-line" :class="{ done: bankSaved }" />
          <div class="stepper-item" :class="{ done: declarationDone, current: bankSaved && !declarationDone }">
            <span class="stepper-num">2</span>
            <span class="stepper-label">Depósito {{ assetSymbol }}</span>
          </div>
          <div class="stepper-line" :class="{ done: declarationDone }" />
          <div class="stepper-item" :class="{ current: declarationDone }">
            <span class="stepper-num">3</span>
            <span class="stepper-label">Estado</span>
          </div>
        </nav>

        <!-- Step 1: Bank account (form or saved state) -->
        <section class="order-section bank-section" :class="{ completed: bankSaved }">
          <h2 class="section-title">
            <span class="step-badge" :class="{ done: bankSaved }">
              <v-icon v-if="bankSaved" size="18" color="white">mdi-check</v-icon>
              <span v-else>1</span>
            </span>
            Cuenta bancaria
          </h2>
          <p class="section-desc">Indica el IBAN, titular y banco donde quieres recibir tus EUR.</p>

          <!-- Saved bank: show confirmation + option to change -->
          <div v-if="bankSaved" class="bank-saved">
            <div class="bank-saved-grid">
              <div class="bank-saved-row">
                <span class="bank-saved-label">IBAN</span>
                <span class="bank-saved-value bank-saved-mono">{{ formattedIban }}</span>
              </div>
              <div class="bank-saved-row">
                <span class="bank-saved-label">Titular</span>
                <span class="bank-saved-value">{{ savedBankHolderName }}</span>
              </div>
              <div class="bank-saved-row">
                <span class="bank-saved-label">Banco</span>
                <span class="bank-saved-value">{{ savedBankName }}</span>
              </div>
            </div>
            <div class="bank-saved-actions">
              <v-icon color="#1cba75" size="20">mdi-check-circle</v-icon>
              <span class="bank-saved-ok">Datos guardados</span>
              <v-btn variant="text" size="small" color="primary" @click="clearBankSaved">
                Cambiar
              </v-btn>
            </div>
          </div>

          <!-- Bank form -->
          <template v-else>
            <div v-if="savedBankAccounts.length" class="saved-accounts-hint">
              <v-icon size="18" color="primary">mdi-bank-check</v-icon>
              <span>
                Tienes {{ savedBankAccounts.length }}
                {{ savedBankAccounts.length === 1 ? 'cuenta guardada' : 'cuentas guardadas' }}.
                Vuelve a escribir el IBAN para confirmar la que quieras usar.
              </span>
            </div>
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
              <v-btn
                color="primary"
                size="large"
                :disabled="!canSaveBank"
                :loading="savingBank"
                class="save-bank-btn"
                @click="saveBank"
              >
                Verificar y guardar cuenta
              </v-btn>
            </div>
            <p class="bank-hint">Verificamos formato del IBAN antes de guardar. Tus datos quedan asociados a esta orden.</p>
          </template>
        </section>

        <!-- Step 2: Crypto deposit instructions -->
        <section class="order-section">
          <h2 class="section-title">
            <span class="step-badge" :class="{ done: declarationDone }">2</span>
            Instrucciones de depósito {{ assetSymbol }}
          </h2>
          <p class="section-desc">Envía exactamente el monto indicado desde una wallet de tu propiedad.</p>

          <div class="sell-cards">
            <div class="sell-card">
              <span class="sell-card-label">Monto a enviar</span>
              <strong class="sell-card-value">{{ cryptoAmount }} {{ assetSymbol }}</strong>
            </div>

            <div class="sell-card">
              <span class="sell-card-label">Red de depósito</span>
              <v-chip-group v-if="hasDepositWallets" v-model="selectedNetwork" mandatory class="network-group">
                <v-chip
                  v-for="net in availableNetworks"
                  :key="net.value"
                  :value="net.value"
                  class="network-chip"
                  variant="outlined"
                >
                  {{ net.label }}
                </v-chip>
              </v-chip-group>
              <v-alert v-else type="warning" density="compact" variant="tonal" class="mt-2">
                No se pudieron cargar las direcciones de depósito. Recarga la
                página en unos segundos o contacta a soporte.
              </v-alert>
            </div>

            <div v-if="hasDepositWallets" class="sell-card">
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
              label="Wallet desde donde enviarás los fondos"
              placeholder="Tu dirección de origen"
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

          <!-- CTA final: dispara el payout SEPA una vez el usuario ha enviado
               los fondos. Se habilita sólo cuando banco + declaración están OK. -->
          <div class="confirm-sale-box">
            <div class="confirm-sale-copy">
              <strong>¿Ya enviaste tus {{ assetSymbol }}?</strong>
              <p>
                Tras verificar tu depósito en la wallet de Exury iniciaremos la
                transferencia SEPA a tu IBAN. Este paso es definitivo.
              </p>
            </div>
            <v-btn
              color="primary"
              size="large"
              :disabled="!canConfirmSale"
              :loading="confirmingSale"
              class="confirm-sale-btn"
              @click="confirmSale"
            >
              <template v-if="saleConfirmed">
                <v-icon start size="18">mdi-check-circle</v-icon>
                Venta confirmada
              </template>
              <template v-else>
                He enviado los fondos
              </template>
            </v-btn>
          </div>
        </section>

        <!-- Step 3: Status timeline -->
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
          <span class="order-amount">{{ cryptoAmount }} {{ assetSymbol }} → {{ fiatAmount }} EUR</span>
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

// --- Bank form state ---
const bankIban = ref('');
const bankHolderName = ref('');
const bankName = ref('');
const savedBankHolderName = ref('');
const savedBankName = ref('');
const bankSaved = ref(false);
const savingBank = ref(false);
const ibanError = ref('');

// --- Origin wallet ---
const sourceWallet = ref('');
const walletOwnershipConfirmed = ref(false);
const sourceWalletError = ref('');

// --- Network selection ---
const selectedNetwork = ref<string>('');

const snackbar = ref({ show: false, text: '', color: 'primary' });

// --- Wallets de Exury por activo y red ---
// Las direcciones ya NO viven en el código del frontend. Fuentes soportadas
// (por orden de prioridad):
//   1. GET /v1/deposit-wallets  → backend lee EXURY_DEPOSIT_WALLETS_JSON.
//   2. VITE_EXURY_DEPOSIT_WALLETS_JSON (opcional, para dev local sin backend).
// Si ninguna devuelve datos, la sección de "Red de depósito" muestra un aviso
// y el botón de confirmación queda bloqueado hasta que haya direcciones.
type NetworkOption = { value: string; label: string; address: string };

const parseEnvWallets = (): Record<string, NetworkOption[]> => {
  const raw = import.meta.env.VITE_EXURY_DEPOSIT_WALLETS_JSON as string | undefined;
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
};
const depositWallets = ref<Record<string, NetworkOption[]>>(parseEnvWallets());

const assetSymbol = computed(() => {
  const a = String(order.value?.asset || 'USDC').toUpperCase();
  return depositWallets.value[a] ? a : 'USDC';
});

const availableNetworks = computed<NetworkOption[]>(() => {
  return depositWallets.value[assetSymbol.value] || depositWallets.value.USDC || [];
});

// --- Bank accounts guardadas (persistidas en backend) ---
type SavedBankAccount = { id: string; bank_name: string | null; created_at: string };
const savedBankAccounts = ref<SavedBankAccount[]>([]);

const exuryWalletAddress = computed(() => {
  const list = availableNetworks.value;
  const match = list.find((n) => n.value === selectedNetwork.value);
  return match?.address || list[0]?.address || '—';
});

// --- IBAN helpers ---
const normalizeIban = (value: string) => value.replace(/\s+/g, '').toUpperCase();

const formattedIban = computed(() => {
  const n = normalizeIban(bankIban.value);
  return n.replace(/(.{4})/g, '$1 ').trim();
});

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

// --- Bank save flow ---
const canSaveBank = computed(() => {
  const ibanOk = !!normalizeIban(bankIban.value) && /^[A-Z]{2}\d{13,32}$/.test(normalizeIban(bankIban.value));
  return ibanOk && !!bankHolderName.value.trim() && !!bankName.value.trim();
});

const declarationDone = computed(() => {
  return bankSaved.value && !!sourceWallet.value.trim() && !sourceWalletError.value && walletOwnershipConfirmed.value;
});

// Click del botón "Verificar y guardar cuenta".
// Flujo: valida IBAN → POST /users/me/bank-accounts (backend calcula SHA256 y
// upsertea por user_id+iban_hash) → refresca la lista de cuentas guardadas.
// Si el backend falla o no hay sesión, no bloqueamos la venta: guardamos los datos
// sólo en el estado local de la página y avisamos con un snackbar tipo warning,
// para que el usuario pueda continuar con esta orden aunque sea "anónima en DB".
const saveBank = async () => {
  validateIban();
  if (!canSaveBank.value || ibanError.value) return;
  savingBank.value = true;
  const normalized = normalizeIban(bankIban.value);
  try {
    // Backend sólo conoce hash(iban) + bank_name; el holder_name vive en la UI.
    await apiService.saveBankAccount(normalized, bankName.value.trim());
    savedBankHolderName.value = bankHolderName.value.trim();
    savedBankName.value = bankName.value.trim();
    bankSaved.value = true;
    showSnackbar('Cuenta bancaria verificada y guardada', 'success');
    // Rehidratamos para reflejar el +1 en "cuentas guardadas" si el user vuelve a vender.
    await loadSavedBankAccounts();
  } catch (err: any) {
    // Fallback local: mantenemos la experiencia del usuario aunque el backend caiga.
    // El IBAN igualmente viajará en el request del payout, así que la venta puede
    // completarse; simplemente no queda huella "verificada" en bank_accounts.
    savedBankHolderName.value = bankHolderName.value.trim();
    savedBankName.value = bankName.value.trim();
    bankSaved.value = true;
    const msg = err?.status === 401
      ? 'Sesión requerida para guardar en tu cuenta; los datos valen sólo para esta orden.'
      : 'No se pudo guardar en el servidor; los datos valen sólo para esta orden.';
    showSnackbar(msg, 'warning');
  } finally {
    savingBank.value = false;
  }
};

// Trae las cuentas del usuario para mostrar el hint "Tienes N cuentas guardadas".
// Silencia errores (401 en visitante, backend caído): la página sigue funcional
// con el formulario "en blanco" como si no tuviera cuentas previas.
const loadSavedBankAccounts = async () => {
  try {
    const res = await apiService.getBankAccounts();
    savedBankAccounts.value = res?.accounts || [];
  } catch {
    savedBankAccounts.value = [];
  }
};

// Hidrata las wallets de Exury desde el backend (que las lee de EXURY_DEPOSIT_WALLETS_JSON).
// Si el backend no responde, mantenemos lo que venga de VITE_EXURY_DEPOSIT_WALLETS_JSON
// (puede ser vacío). La UI gestiona el caso "sin direcciones" con un aviso visible.
const loadDepositWallets = async () => {
  try {
    const res = await apiService.getDepositWallets();
    if (res?.wallets && Object.keys(res.wallets).length > 0) {
      depositWallets.value = res.wallets;
    }
  } catch {
    // Silencioso: la UI detectará que depositWallets está vacío y mostrará el aviso.
  }
};

// Flag para el template: si no tenemos direcciones de ningún origen, avisamos
// y bloqueamos la confirmación de venta (no queremos que el usuario envíe a "nada").
const hasDepositWallets = computed(() => availableNetworks.value.length > 0);

const clearBankSaved = () => {
  bankSaved.value = false;
  savedBankHolderName.value = '';
  savedBankName.value = '';
  ibanError.value = '';
};

// --- Confirmar venta y disparar payout SEPA ---
// Se llama cuando el usuario pulsa "He enviado los fondos" tras completar
// banco + declaración de origen. Llama a POST /orders/:id/sell/payout que en
// el backend:
//   1) Registra/confirma la cuenta bancaria (hash) del usuario.
//   2) Persiste orders.iban si no estaba guardado.
//   3) Ejecuta la venta en Binance y abre la retirada SEPA vía PayDo.
// En dev (NODE_ENV=development) tanto Binance como PayDo están mockeados, así
// que la respuesta es inmediata y la orden pasa a status 'processing' → la
// timeline avanza sola porque statusStep es computed sobre order.status.
const confirmingSale = ref(false);
const saleConfirmed = ref(false);
const canConfirmSale = computed(
  () =>
    declarationDone.value &&
    !confirmingSale.value &&
    !saleConfirmed.value &&
    hasDepositWallets.value
);

const confirmSale = async () => {
  if (!canConfirmSale.value) return;
  if (isTempOrder.value) {
    // Sin orden real en backend no podemos disparar payout; avisamos y salimos.
    showSnackbar('La orden aún no se confirmó con el backend. Reintenta la conexión.', 'warning');
    return;
  }
  confirmingSale.value = true;
  try {
    await apiService.initiateSellPayout(orderId.value, normalizeIban(bankIban.value));
    saleConfirmed.value = true;
    showSnackbar('Venta confirmada. Procesando retirada SEPA…', 'success');
    // Refrescamos la orden para que el tracker avance a "Verificación/Fondos en camino".
    await fetchOrder();
  } catch (err: any) {
    const msg = err?.status === 401
      ? 'Sesión requerida para confirmar la venta.'
      : err?.response?.error || 'No se pudo iniciar la retirada. Vuelve a intentarlo en unos segundos.';
    showSnackbar(msg, 'warning');
  } finally {
    confirmingSale.value = false;
  }
};

// --- Display amounts ---
const cryptoAmount = computed(() => {
  const rawAmount = order.value?.amount_crypto ?? order.value?.crypto_amount ?? 0;
  return String(rawAmount);
});
const fiatAmount = computed(() => {
  const value = Number(order.value?.amount_eur ?? order.value?.fiat_amount ?? 0);
  return new Intl.NumberFormat('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
});

// --- Status timeline ---
const statusStep = computed(() => {
  const s = String(order.value?.status ?? order.value?.payment_status ?? 'pending').toLowerCase();
  if (s === 'completed' || s === 'funds_in_account' || s === 'delivered') return 4;
  if (s === 'funds_in_transit' || s === 'sent' || s === 'processing' || s === 'payment_pending') return 3;
  if (s === 'received' || s === 'verifying' || s === 'confirmed') return 2;
  return 1;
});

const statusSteps = [
  { step: 1, title: 'Envío de fondos', desc: 'Esperando tu depósito en la wallet de Exury.' },
  { step: 2, title: 'Verificación', desc: 'Verificamos red, origen de fondos y titularidad de wallet.' },
  { step: 3, title: 'Fondos en camino', desc: 'Transferencia EUR iniciada a tu cuenta bancaria.' },
  { step: 4, title: 'Fondos en cuenta', desc: 'Pago acreditado correctamente en tu cuenta bancaria.' },
];

// --- Persistencia local de la orden de venta ---
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
      bankSaved?: boolean;
      sourceWallet?: string;
      walletOwnershipConfirmed?: boolean;
      selectedNetwork?: string;
    };
    bankIban.value = saved.bankIban ?? '';
    bankHolderName.value = saved.bankHolderName ?? '';
    bankName.value = saved.bankName ?? '';
    bankSaved.value = !!saved.bankSaved;
    if (bankSaved.value) {
      savedBankHolderName.value = bankHolderName.value.trim();
      savedBankName.value = bankName.value.trim();
    }
    sourceWallet.value = saved.sourceWallet ?? '';
    walletOwnershipConfirmed.value = saved.walletOwnershipConfirmed ?? false;
    if (saved.selectedNetwork) selectedNetwork.value = saved.selectedNetwork;
  } catch {
    /* ignore corrupted local state */
  }
};

watch([bankIban, bankHolderName, bankName, bankSaved, sourceWallet, walletOwnershipConfirmed, selectedNetwork], () => {
  if (typeof window === 'undefined' || !orderId.value) return;
  const storageKey = `exury_sell_order_data_${orderId.value}`;
  localStorage.setItem(storageKey, JSON.stringify({
    bankIban: bankIban.value,
    bankHolderName: bankHolderName.value,
    bankName: bankName.value,
    bankSaved: bankSaved.value,
    sourceWallet: sourceWallet.value,
    walletOwnershipConfirmed: walletOwnershipConfirmed.value,
    selectedNetwork: selectedNetwork.value,
  }));
}, { deep: true });

// Si cambia el activo, asegurar que la red seleccionada exista para él
watch(assetSymbol, () => {
  const list = availableNetworks.value;
  if (!list.find((n) => n.value === selectedNetwork.value)) {
    selectedNetwork.value = list[0]?.value || '';
  }
}, { immediate: true });

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
    const data = await apiService.getOrder(orderId.value, 'sell');
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
    const response = await apiService.createOrder(quoteId, 'sell') as { order_id?: string; orderId?: string; id?: string };
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

const showSnackbar = (text: string, color: 'success' | 'primary' | 'warning' = 'primary') => {
  snackbar.value = { show: true, text, color };
};

const copyWallet = async () => {
  try {
    await navigator.clipboard.writeText(exuryWalletAddress.value);
    showSnackbar('Wallet copiada al portapapeles', 'success');
  } catch {
    showSnackbar('No se pudo copiar la wallet', 'primary');
  }
};

const statusSectionRef = ref<HTMLElement | null>(null);

// Montaje de la página de venta. Orden intencional:
//  1. fetchOrder(): necesitamos la orden primero para decidir asset/monto/estado.
//  2. loadSellOrderData(): restaura campos que el usuario haya llenado antes y recargado.
//  3. loadDepositWallets / loadSavedBankAccounts: en paralelo (no await) porque son
//     "nice to have"; la página ya es usable sin ellos gracias al fallback local.
//  4. Sólo si estamos en una orden temporal (fallback tras fallo del backend al crear),
//     programamos un reintento pasados 2s para intentar recuperar la orden real.
onMounted(async () => {
  await fetchOrder();
  loadSellOrderData();
  loadDepositWallets();
  loadSavedBankAccounts();
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

/* Stepper */
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

/* Sections */
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
.step-badge.done { background: #1cba75; }

/* Bank form / saved card */
.form-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
.save-bank-btn { text-transform: none; font-weight: 600; }
.saved-accounts-hint {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 12px 0;
  padding: 8px 12px;
  border-radius: 8px;
  background: rgba(27, 143, 255, 0.08);
  border: 1px solid rgba(27, 143, 255, 0.2);
  font-size: 13px;
  color: rgba(255, 255, 255, 0.85);
}
.bank-hint {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin: 12px 0 0 0;
}

.bank-saved { margin-top: 8px; }

.bank-saved-grid {
  padding: 16px;
  background: rgba(28, 202, 117, 0.08);
  border: 1px solid rgba(28, 202, 117, 0.25);
  border-radius: 12px;
  margin-bottom: 12px;
}
.bank-saved-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 8px 0;
}
.bank-saved-row:not(:last-child) {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.bank-saved-label {
  flex: 0 0 120px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.bank-saved-value {
  flex: 1;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.95);
  word-break: break-all;
}
.bank-saved-mono {
  font-family: ui-monospace, monospace;
}
.bank-saved-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}
.bank-saved-ok {
  flex: 1;
  font-size: 13px;
  color: #1cba75;
}

/* Sell deposit cards */
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
.network-group { gap: 8px; flex-wrap: wrap; }
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
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.origin-title { margin: 0 0 4px 0; font-size: 15px; color: #fff; }

.confirm-sale-box {
  margin-top: 16px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid rgba(27, 143, 255, 0.25);
  background: rgba(27, 143, 255, 0.06);
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.confirm-sale-copy strong { display: block; color: #fff; font-size: 15px; }
.confirm-sale-copy p { margin: 4px 0 0 0; color: rgba(255, 255, 255, 0.7); font-size: 13px; line-height: 1.5; }
.confirm-sale-btn { align-self: flex-start; text-transform: none; font-weight: 600; }

/* Status timeline */
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
