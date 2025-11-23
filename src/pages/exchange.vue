<template>
  <div class="exchange-wrapper">
    <div class="exchange-container">
      <div class="exchange-header">
        <h1 class="exchange-title">Cambia euros por cripto</h1>
        <p class="exchange-subtitle">Intercambia al instante con las mejores tasas</p>
      </div>

      <!-- Price Simulator - Same as home page -->
      <div class="simulator-container">
        <PriceSimulatorInline />
      </div>

      <!-- Success/Error Messages -->
      <v-alert
        v-if="error"
        type="error"
        class="mt-4 alert-message"
        dismissible
        @click:close="error = null"
      >
        {{ error }}
      </v-alert>

      <v-alert
        v-if="success"
        type="success"
        class="mt-4 alert-message"
      >
        ¡Orden creada exitosamente! ID de orden: {{ orderId }}
      </v-alert>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PriceSimulatorInline from '@/components/PriceSimulatorInline.vue';
import { useAuthStore } from '@/infraestructure/stores/auth';

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
  padding: clamp(24px, 4vw, 48px);
  max-width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.exchange-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.exchange-header {
  text-align: center;
  width: 100%;
  max-width: 600px;
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
  max-width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.alert-message {
  max-width: 500px;
  width: 100%;
}

// Responsive adjustments
@media (max-width: 768px) {
  .exchange-wrapper {
    padding: clamp(16px, 3vw, 32px);
  }
  
  .simulator-container {
    max-width: 100%;
  }
}
</style>

