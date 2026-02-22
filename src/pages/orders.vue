<template>
  <div class="orders-page">
    <div class="orders-container">
      <router-link to="/dashboard" class="back-link">
        <v-icon size="20">mdi-arrow-left</v-icon>
        <span>{{ t('orders.backToStart') }}</span>
      </router-link>
      <h1 class="orders-title">{{ t('orders.title') }}</h1>
      <p class="orders-subtitle">{{ t('orders.subtitle') }}</p>

      <div v-if="loading" class="orders-loading">
        <v-progress-circular indeterminate color="#1cba75" size="40" />
        <p>{{ t('orders.loadingOrders') }}</p>
      </div>

      <div v-else-if="error" class="orders-error">
        <v-icon size="40" color="rgba(255,255,255,0.4)">mdi-alert-outline</v-icon>
        <p>{{ error }}</p>
      </div>

      <div v-else-if="!orders.length" class="orders-empty">
        <v-icon size="48" color="rgba(255,255,255,0.3)">mdi-clipboard-text-outline</v-icon>
        <p>{{ t('orders.noOrders') }}</p>
        <router-link to="/exchange" class="empty-cta">{{ t('orders.swapCryptoCta') }}</router-link>
      </div>

      <div v-else class="orders-list">
        <router-link
          v-for="ord in orders"
          :key="String(ord.id ?? ord.order_id ?? '')"
          :to="`/order/${ord.order_id || ord.id}`"
          class="order-item"
        >
          <span class="order-date">{{ formatDate(ord) }}</span>
          <span class="order-id">{{ ord.order_id || ord.id }}</span>
          <span class="order-amount">{{ formatEur(Number(ord.amount_eur ?? ord.fiat_amount ?? 0)) }} EUR → {{ ord.asset || 'USDC' }}</span>
          <span class="order-status" :class="statusClass(ord)">{{ statusLabel(ord) }}</span>
          <v-icon size="20">mdi-chevron-right</v-icon>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import apiService from '@/services/api';
import { useAuthStore } from '@/infraestructure/stores/auth';

const { t } = useI18n();
const router = useRouter();
const authStore = useAuthStore();
const loading = ref(true);
const error = ref<string | null>(null);
const orders = ref<Record<string, unknown>[]>([]);

const formatEur = (n: number) =>
  new Intl.NumberFormat('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(n));

/** Mismo mapeo que en la página de detalle de orden: backend status → paso 1-4 */
function getStatusStep(o: Record<string, unknown>): number {
  const s = ((o.status ?? o.payment_status) as string) || '';
  const lower = s.toLowerCase();
  if (lower === 'completed' || lower === 'delivered' || lower === 'funds_in_wallet') return 4;
  if (lower === 'usdc_sent' || lower === 'sent' || lower === 'processing') return 3;
  if (lower === 'received' || lower === 'verifying' || lower === 'confirmed') return 2;
  return 1;
}

const statusLabel = (o: Record<string, unknown>) => {
  const step = getStatusStep(o);
  if (step === 4) return t('orders.statusCompleted');
  return t(`orders.statusStep${step}`);
};

const statusClass = (o: Record<string, unknown>) => {
  const step = getStatusStep(o);
  if (step === 4) return 'done';
  if (step >= 2) return 'progress';
  return 'pending';
};

function formatDate(o: Record<string, unknown>): string {
  const raw = o.created_at ?? o.updated_at ?? o.createdAt ?? o.updatedAt;
  if (raw == null) return '—';
  const date = new Date(raw as string | number);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

const PENDING_ORDER_KEY = 'exury_pending_order';

/** Órdenes en proceso o completadas (pasos 1-4) con importe > 0; ordenadas por fecha descendente */
function normalizeOrders(raw: unknown): Record<string, unknown>[] {
  const list = Array.isArray(raw) ? raw : (raw as Record<string, unknown>)?.orders ?? [];
  const arr = (list as Record<string, unknown>[]).filter((o) => {
    const step = getStatusStep(o);
    const amount = Number(o.amount_eur ?? o.fiat_amount ?? 0);
    return step >= 1 && step <= 4 && amount > 0;
  });
  const byDate = (a: Record<string, unknown>, b: Record<string, unknown>) => {
    const ta = new Date((a.created_at ?? a.updated_at ?? 0) as string | number).getTime();
    const tb = new Date((b.created_at ?? b.updated_at ?? 0) as string | number).getTime();
    return tb - ta;
  };
  let result = [...arr].sort(byDate);

  // Incluir orden pendiente del simulador (sessionStorage) si el backend no la devolvió
  if (typeof window !== 'undefined') {
    try {
      const rawStored = sessionStorage.getItem(PENDING_ORDER_KEY);
      const stored = rawStored ? (JSON.parse(rawStored) as Record<string, unknown>) : null;
      if (stored?.order_id && Number(stored.amount_eur ?? 0) > 0) {
        const id = String(stored.order_id);
        const alreadyInList = result.some((o) => (o.order_id ?? o.id) === id);
        if (!alreadyInList) {
          const pendingOrder: Record<string, unknown> = {
            ...stored,
            id: stored.order_id,
            order_id: stored.order_id,
            amount_eur: stored.amount_eur,
            fiat_amount: stored.amount_eur,
            amount_crypto: stored.amount_crypto,
            asset: stored.asset ?? 'USDC',
            status: stored.status ?? 'pending',
            payment_status: stored.payment_status ?? stored.status ?? 'pending',
            created_at: stored.created_at ?? new Date().toISOString(),
          };
          result = [pendingOrder, ...result].sort(byDate);
        }
      }
    } catch {
      /* ignore */
    }
  }
  return result;
}

onMounted(async () => {
  if (typeof window !== 'undefined') authStore.loadFromStorage();
  if (!authStore.isLoggedIn) {
    router.replace('/login');
    return;
  }
  loading.value = true;
  error.value = null;
  try {
    const data = await apiService.getOrders();
    orders.value = normalizeOrders(data);
  } catch (e: any) {
    error.value = e?.message || t('orders.errorLoading');
    // Aunque falle la API (ej. localhost vs backend en preview), mostrar orden pendiente de sessionStorage
    orders.value = normalizeOrders([]);
  } finally {
    loading.value = false;
  }
});
</script>

<style lang="scss" scoped>
.orders-page {
  width: 100%;
  max-width: min(720px, 92vw);
  margin: 0 auto;
  padding: clamp(24px, 4vw, 48px);
  min-height: calc(100vh - 200px);
  box-sizing: border-box;
}

.orders-container { display: flex; flex-direction: column; gap: 20px; }

.back-link {
  display: inline-flex; align-items: center; gap: 8px;
  color: rgba(255,255,255,0.8); text-decoration: none; font-size: 14px;
  &:hover { color: #1cba75; }
}

.orders-title { font-size: clamp(24px, 4vw, 30px); font-weight: 600; color: #fff; margin: 0 0 4px 0; }
.orders-subtitle { font-size: 15px; color: rgba(255,255,255,0.7); margin: 0 0 16px 0; }

.orders-loading, .orders-error, .orders-empty {
  display: flex; flex-direction: column; align-items: center; gap: 12px;
  padding: 40px 20px; color: rgba(255,255,255,0.7);
}

.orders-empty .empty-cta {
  margin-top: 8px;
  color: #1cba75; font-weight: 600; text-decoration: none;
  &:hover { text-decoration: underline; }
}

.orders-list { display: flex; flex-direction: column; gap: 12px; }

.order-item {
  display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
  padding: 16px 20px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px; text-decoration: none; color: inherit; transition: background 0.2s, border-color 0.2s;
  &:hover { background: rgba(255,255,255,0.08); border-color: rgba(28,202,117,0.25); }
}

.order-date { font-size: 12px; color: rgba(255,255,255,0.5); flex: 0 0 100px; }
.order-id { font-size: 13px; color: rgba(255,255,255,0.6); flex: 0 0 140px; min-width: 0; overflow: hidden; text-overflow: ellipsis; }
.order-amount { flex: 1; font-weight: 500; color: #fff; min-width: 0; }
.order-status {
  font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 8px;
  &.pending { background: rgba(255,193,7,0.2); color: #ffc107; }
  &.progress { background: rgba(28,202,117,0.2); color: #1cba75; }
  &.done { background: rgba(28,202,117,0.25); color: #1cba75; }
}
</style>
