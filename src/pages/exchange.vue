<template>
  <div class="exchange-wrapper">
    <div class="exchange-container">
      <!-- Desktop: two columns; mobile: stacked -->
      <div class="exchange-header">
        <h1 class="exchange-title">{{ t('exchange.title') }}</h1>
        <p class="exchange-subtitle">{{ t('exchange.subtitle') }}</p>
      </div>

      <div class="simulator-container">
        <PriceSimulatorInline />
      </div>

      <!-- Success/Error Messages (full width below content) -->
      <div class="alerts-container">
        <v-alert
          v-if="error"
          type="error"
          class="alert-message"
          dismissible
          @click:close="error = null"
        >
          {{ error }}
        </v-alert>

        <v-alert
          v-if="success"
          type="success"
          class="alert-message"
        >
          {{ t('exchange.orderSuccess', { id: orderId }) }}
        </v-alert>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import PriceSimulatorInline from '@/components/PriceSimulatorInline.vue';
import { useAuthStore } from '@/infraestructure/stores/auth';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const error = ref<string | null>(null);
const success = ref<boolean>(false);
const orderId = ref<string | null>(null);

// Check query params for success/error messages
onMounted(() => {
  console.log('Exchange page mounted');
  
  // Check if user is authenticated
  if (typeof window !== 'undefined') {
    authStore.loadFromStorage();
  }
  
  // Check if we have success message from order creation
  const orderIdParam = route.query.order_id as string;
  const successParam = route.query.success as string;
  
  if (orderIdParam && successParam === 'true') {
    orderId.value = orderIdParam;
    success.value = true;
    // Clean URL
    router.replace({ path: '/exchange', query: {} });
  }
});

// Watch for route changes to show success messages
watch(() => route.query, (newQuery) => {
  if (newQuery.order_id && newQuery.success === 'true') {
    orderId.value = newQuery.order_id as string;
    success.value = true;
    // Clean URL after showing message
    setTimeout(() => {
      router.replace({ path: '/exchange', query: {} });
    }, 3000);
  }
});
</script>

<style lang="scss" scoped>
.exchange-wrapper {
  padding: clamp(16px, 3vw, 32px) clamp(24px, 4vw, 48px);
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  box-sizing: border-box;
}

.exchange-container {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px 48px;
  align-items: start;
  justify-items: center;
}

.exchange-header {
  text-align: center;
  width: 100%;
  max-width: 500px;
}

.exchange-title {
  font-size: clamp(28px, 5vw, 42px);
  font-weight: 600;
  margin-bottom: 12px;
  color: #ffffff !important;
  line-height: 1.2;
}

.exchange-subtitle {
  font-size: clamp(16px, 2.5vw, 20px);
  color: rgba(255, 255, 255, 0.7) !important;
  margin-bottom: 0;
}

.simulator-container {
  width: 100%;
  max-width: 480px;
  display: flex;
  justify-content: center;
  align-items: stretch;
}

.alerts-container {
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-self: center;
}

.alert-message {
  width: 100%;
}

/* Desktop: two columns – title left, simulator right, better use of space */
@media (min-width: 900px) {
  .exchange-container {
    grid-template-columns: 1fr 1fr;
    gap: 32px 56px;
    align-items: start;
    justify-items: stretch;
  }

  .exchange-header {
    text-align: left;
    max-width: none;
    padding-top: 0.5rem;
  }

  .simulator-container {
    max-width: none;
    min-width: 0;
    justify-content: flex-end;
  }

  .alerts-container {
    grid-column: 1 / -1;
    max-width: 560px;
    justify-self: center;
  }
}

/* Large desktop: cap simulator width so card doesn't get too wide */
@media (min-width: 1100px) {
  .simulator-container {
    max-width: 520px;
    justify-content: flex-start;
  }
}

@media (max-width: 768px) {
  .exchange-wrapper {
    padding: clamp(16px, 3vw, 24px);
  }

  .simulator-container {
    max-width: 100%;
  }

  .alerts-container {
    max-width: 100%;
  }
}
</style>

