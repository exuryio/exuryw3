<template>
  <v-dialog
    v-model="isOpen"
    max-width="780"
    persistent
    scrollable
    :scrim="true"
    @update:model-value="onDialogUpdate"
  >
    <v-card class="kyc-modal" rounded="lg">
      <!-- Header -->
      <v-card-title class="kyc-modal-header">
        <div class="kyc-modal-title-row">
          <div class="kyc-modal-title-text">
            <v-icon size="22" color="#1cba75" class="mr-2">mdi-shield-account</v-icon>
            Verificación de identidad
          </div>
          <v-btn
            icon
            variant="text"
            size="small"
            class="kyc-close-btn"
            @click="requestClose"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-card-title>

      <v-divider />

      <!-- Body -->
      <v-card-text class="kyc-modal-body">
        <!-- Loading state -->
        <div v-if="state === 'loading'" class="kyc-state-loading">
          <v-progress-circular indeterminate color="#1cba75" size="48" />
          <p class="kyc-state-label">Iniciando verificación...</p>
        </div>

        <!-- Error state -->
        <div v-else-if="state === 'error'" class="kyc-state-error">
          <v-icon size="48" color="error">mdi-alert-circle-outline</v-icon>
          <p class="kyc-state-label kyc-state-label--error">{{ errorMessage }}</p>
          <v-btn color="primary" variant="flat" :loading="retrying" @click="retryInit">
            Reintentar
          </v-btn>
        </div>

        <!-- SumSub SDK container -->
        <div v-show="state === 'ready'" id="sumsub-websdk-container" class="kyc-sdk-container" />
      </v-card-text>
    </v-card>
  </v-dialog>

  <!-- Close confirmation dialog -->
  <v-dialog v-model="showCloseWarning" max-width="420" :scrim="true">
    <v-card rounded="lg" class="kyc-warning-card">
      <v-card-title class="kyc-warning-title">
        <v-icon color="warning" class="mr-2">mdi-pause-circle-outline</v-icon>
        ¿Pausar la verificación?
      </v-card-title>
      <v-card-text class="kyc-warning-body">
        Si cierras esta ventana, tu proceso de verificación quedará pausado. Podrás reanudarlo cuando quieras, pero hasta entonces no podrás desbloquear los datos de pago.
      </v-card-text>
      <v-card-actions class="justify-end pa-4">
        <v-btn variant="text" @click="showCloseWarning = false">Continuar</v-btn>
        <v-btn color="error" variant="tonal" @click="confirmClose">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import apiService from '@/services/api';

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'complete'): void;
  (e: 'step-completed', payload: unknown): void;
}>();

type ModalState = 'loading' | 'ready' | 'error';

const isOpen = ref(props.modelValue);
const state = ref<ModalState>('loading');
const errorMessage = ref('Error al inicializar el servicio de identidad. Por favor, reintenta.');
const showCloseWarning = ref(false);
const retrying = ref(false);

let sdkInstance: { destroy?: () => void; launch?: (selector: string) => void } | null = null;

watch(() => props.modelValue, (val) => {
  isOpen.value = val;
  if (val) {
    nextTick(initSdk);
  } else {
    destroySdk();
  }
});

watch(isOpen, (val) => {
  if (!val) emit('update:modelValue', false);
});

async function initSdk() {
  state.value = 'loading';
  destroySdk();

  let token: string;
  let userId: string;

  try {
    const resp = await apiService.getSumsubAccessToken();
    token = resp.token;
    userId = resp.userId;
  } catch {
    // Single retry before showing error
    try {
      const resp = await apiService.getSumsubAccessToken();
      token = resp.token;
      userId = resp.userId;
    } catch {
      state.value = 'error';
      return;
    }
  }

  try {
    await loadSumsubScript();
    state.value = 'ready';
    await nextTick();
    launchSdk(token, userId);
  } catch {
    state.value = 'error';
  }
}

function loadSumsubScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById('sumsub-websdk-script')) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.id = 'sumsub-websdk-script';
    script.src = 'https://static.sumsub.com/idensic/static/sns-websdk-builder.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load SumSub SDK script'));
    document.head.appendChild(script);
  });
}

function launchSdk(token: string, userId: string) {
  const w = window as any;
  if (!w.snsWebSdk) {
    state.value = 'error';
    return;
  }

  sdkInstance = w.snsWebSdk
    .init(token, () => getNewToken())
    .withConf({ lang: 'es', email: '' })
    .withOptions({ addViewportTag: false, adaptIframeHeight: true })
    .on('idCheck.onStepCompleted', (payload: unknown) => {
      emit('step-completed', payload);
    })
    .on('idCheck.onError', (error: unknown) => {
      console.error('[KYC] SDK error', error);
    })
    .on('idCheck.onMessage', (type: string, payload: unknown) => {
      console.log('[KYC] message', type, payload);
    })
    .on('idCheck.onApplicantStatusChanged', (payload: any) => {
      if (payload?.reviewResult?.reviewAnswer === 'GREEN') {
        emit('complete');
        isOpen.value = false;
        emit('update:modelValue', false);
      }
    })
    .build();

  if (sdkInstance) {
    sdkInstance.launch?.('#sumsub-websdk-container');
  }
}

async function getNewToken(): Promise<string> {
  try {
    const resp = await apiService.getSumsubAccessToken();
    return resp.token;
  } catch {
    throw new Error('Could not refresh SumSub token');
  }
}

function destroySdk() {
  if (sdkInstance?.destroy) {
    try { sdkInstance.destroy(); } catch { /* ignore */ }
  }
  sdkInstance = null;

  // Clear the container
  const container = document.getElementById('sumsub-websdk-container');
  if (container) container.innerHTML = '';
}

function requestClose() {
  showCloseWarning.value = true;
}

function confirmClose() {
  showCloseWarning.value = false;
  isOpen.value = false;
  emit('update:modelValue', false);
  destroySdk();
}

function onDialogUpdate(val: boolean) {
  if (!val) requestClose();
}

async function retryInit() {
  retrying.value = true;
  await initSdk();
  retrying.value = false;
}
</script>

<style lang="scss" scoped>
.kyc-modal {
  background: #1a1f2e;
  color: #fff;
  min-height: 520px;
}

.kyc-modal-header {
  padding: 16px 20px 12px;
}

.kyc-modal-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.kyc-modal-title-text {
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
}

.kyc-close-btn {
  color: rgba(255, 255, 255, 0.6);
  &:hover { color: #fff; }
}

.kyc-modal-body {
  padding: 0 !important;
  min-height: 460px;
  display: flex;
  flex-direction: column;
}

.kyc-state-loading,
.kyc-state-error {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 48px 24px;
  min-height: 400px;
}

.kyc-state-label {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.75);
  text-align: center;
  max-width: 380px;

  &--error {
    color: rgba(255, 100, 100, 0.9);
  }
}

.kyc-sdk-container {
  width: 100%;
  min-height: 460px;
  border-radius: 0 0 8px 8px;
  overflow: hidden;

  :deep(iframe) {
    width: 100% !important;
    min-height: 460px !important;
    border: none !important;
  }
}

.kyc-warning-card {
  background: #1a1f2e;
  color: #fff;
}

.kyc-warning-title {
  font-size: 16px;
  font-weight: 600;
  padding: 20px 20px 8px;
  display: flex;
  align-items: center;
  white-space: normal;
  line-height: 1.4;
}

.kyc-warning-body {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.75);
  padding: 0 20px 12px;
  line-height: 1.5;
}
</style>
