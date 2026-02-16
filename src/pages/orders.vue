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
          :key="ord.id || ord.order_id"
          :to="`/order/${ord.order_id || ord.id}`"
          class="order-item"
        >
          <span class="order-id">{{ ord.order_id || ord.id }}</span>
          <span class="order-amount">{{ formatEur(ord.amount_eur ?? ord.fiat_amount ?? 0) }} EUR → {{ ord.asset || 'USDC' }}</span>
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

const statusLabel = (o: Record<string, unknown>) => {
  const s = ((o.status ?? o.payment_status) as string) || '';
  const lower = s.toLowerCase();
  if (lower === 'completed' || lower === 'delivered') return t('orders.statusCompleted');
  if (lower === 'usdc_sent' || lower === 'sent') return t('orders.statusInTransit');
  if (lower === 'received' || lower === 'verifying') return t('orders.statusVerifying');
  return t('orders.statusPending');
};

const statusClass = (o: Record<string, unknown>) => {
  const s = ((o.status ?? o.payment_status) as string) || '';
  const lower = s.toLowerCase();
  if (lower === 'completed' || lower === 'delivered') return 'done';
  if (lower === 'usdc_sent' || lower === 'sent' || lower === 'received' || lower === 'verifying') return 'progress';
  return 'pending';
};

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
    orders.value = Array.isArray(data) ? data : (data as any)?.orders ?? [];
  } catch (e: any) {
    error.value = e?.message || t('orders.errorLoading');
    orders.value = [];
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

.order-id { font-size: 13px; color: rgba(255,255,255,0.6); flex: 0 0 140px; }
.order-amount { flex: 1; font-weight: 500; color: #fff; }
.order-status {
  font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 8px;
  &.pending { background: rgba(255,193,7,0.2); color: #ffc107; }
  &.progress { background: rgba(28,202,117,0.2); color: #1cba75; }
  &.done { background: rgba(28,202,117,0.25); color: #1cba75; }
}
</style>
