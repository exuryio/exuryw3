<template>
  <div class="dashboard-page md3">
    <div class="dashboard-surface">
      <div class="dashboard-container">
      <header class="dashboard-hero">
        <p class="dashboard-greeting">{{ greeting }}</p>
        <h1 class="dashboard-title">{{ t('dashboard.title') }}</h1>
        <p class="dashboard-subtitle">{{ t('dashboard.subtitle') }}</p>
      </header>

      <div class="dashboard-actions">
        <router-link
          to="/exchange"
          class="action-card action-card-primary"
          :aria-label="t('dashboard.ariaExchange')"
        >
          <span class="md3-state-layer" aria-hidden="true"></span>
          <span class="action-card-icon">
            <v-icon size="28">mdi-swap-horizontal</v-icon>
          </span>
          <h2 class="action-card-title">{{ t('dashboard.actionExchange') }}</h2>
          <p class="action-card-desc">{{ t('dashboard.actionExchangeDesc') }}</p>
          <span class="action-card-cta">{{ t('dashboard.actionExchangeCta') }} <v-icon size="18">mdi-arrow-right</v-icon></span>
        </router-link>

        <router-link
          to="/orders"
          class="action-card action-card-secondary"
          :aria-label="t('dashboard.ariaOrders')"
        >
          <span class="md3-state-layer" aria-hidden="true"></span>
          <span class="action-card-icon secondary">
            <v-icon size="24">mdi-clipboard-list-outline</v-icon>
          </span>
          <h2 class="action-card-title">{{ t('dashboard.actionOrders') }}</h2>
          <p class="action-card-desc">{{ t('dashboard.actionOrdersDesc') }}</p>
          <span class="action-card-cta">{{ t('dashboard.actionOrdersCta') }} <v-icon size="18">mdi-arrow-right</v-icon></span>
        </router-link>
      </div>

      <section class="next-step-inline" aria-labelledby="next-step-heading">
        <span id="next-step-heading" class="next-step-badge">{{ t('dashboard.nextStep') }}</span>
        <p class="next-step-text">{{ t('dashboard.nextStepText') }}</p>
      </section>

      <div class="dashboard-trust" role="group" aria-label="Garantías del servicio">
        <span class="trust-chip"><v-icon size="14">mdi-shield-check</v-icon> {{ t('dashboard.trustRegulated') }}</span>
        <span class="trust-chip"><v-icon size="14">mdi-clock-outline</v-icon> {{ t('dashboard.trustSepa') }}</span>
        <span class="trust-chip"><v-icon size="14">mdi-account-eye</v-icon> {{ t('dashboard.trustControl') }}</span>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/infraestructure/stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const { t } = useI18n();

const greeting = computed(() => {
  const user = authStore.currentUser;
  const prefix = user?.email?.split('@')[0];
  const name = prefix?.includes('.') ? prefix.split('.')[0] : prefix;
  const friendly = name ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() : '';
  return friendly ? t('dashboard.greeting', { name: friendly }) : t('dashboard.greetingFallback');
});

onMounted(() => {
  if (typeof window !== 'undefined') {
    authStore.loadFromStorage();
  }
  if (!authStore.isLoggedIn) {
    router.replace('/login');
  }
});
</script>

<style lang="scss" scoped>
/* --- Sistema de espaciado 8px (8pt grid) --- */
$space-6: 6px;
$space-8: 8px;
$space-10: 10px;
$space-12: 12px;
$space-14: 14px;
$space-16: 16px;
$space-20: 20px;
$space-24: 24px;
$space-28: 28px;
$space-32: 32px;
$space-40: 40px;
$space-48: 48px;
$space-56: 56px;

/* MD3: paleta tonal (confianza + agilidad) */
$md3-primary: #1cba75;
$md3-primary-container: rgba(28, 202, 117, 0.14);
$md3-on-primary: #fff;
$md3-surface: #1a1f1d;
$md3-surface-container: #222a27;
$md3-surface-container-high: #2a332f;
$md3-outline: rgba(255, 255, 255, 0.08);
$md3-outline-variant: rgba(255, 255, 255, 0.05);

.dashboard-page {
  width: 100%;
  max-width: min(1100px, 96vw);
  margin: 0 auto;
  padding: $space-24 clamp($space-16, 4vw, $space-48);
  min-height: calc(100vh - 200px);
  box-sizing: border-box;
}

.dashboard-page.md3 {
  --md3-primary: #{$md3-primary};
  --md3-primary-container: #{$md3-primary-container};
}

/* MD3: Surface container = sensación de "hoja" contenida y segura */
.dashboard-surface {
  width: 100%;
  background: $md3-surface-container;
  border-radius: 28px;
  padding: clamp($space-24, 4vw, $space-40) clamp($space-20, 4vw, $space-32);
  border: 1px solid $md3-outline;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
}

.dashboard-container {
  display: flex;
  flex-direction: column;
  gap: $space-40;
}

/* --- Hero: escala tipográfica (ratio ~1.25) y jerarquía visual --- */
.dashboard-hero {
  text-align: center;
  padding: $space-24 0 $space-8;
}

.dashboard-greeting {
  font-size: 15px;
  color: var(--md3-primary, #1cba75);
  font-weight: 500;
  margin: 0 0 $space-12 0;
  letter-spacing: 0.01em;
}

.dashboard-title {
  font-size: clamp(26px, 4.5vw, 36px);
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
  margin: 0 0 $space-16 0;
  letter-spacing: -0.02em;
}

.dashboard-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.75);
  margin: 0;
  line-height: 1.5;
  max-width: 32ch;
  margin-left: auto;
  margin-right: auto;
}

/* Dos opciones: Cambiar euros + Ver órdenes (MD3 cards) + entrada suave */
.dashboard-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $space-20;
}

@media (max-width: 640px) {
  .dashboard-actions {
    grid-template-columns: 1fr;
  }
}

.action-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: $space-24;
  border-radius: 20px;
  text-decoration: none;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  border: 1px solid $md3-outline;
  animation: cardEnter 0.4s ease backwards;
}

.action-card:nth-child(1) { animation-delay: 0.05s; }
.action-card:nth-child(2) { animation-delay: 0.12s; }

@keyframes cardEnter {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.action-card .md3-state-layer {
  position: absolute;
  inset: 0;
  background: currentColor;
  opacity: 0;
  transition: opacity 0.2s;
}

.action-card:hover .md3-state-layer {
  opacity: 0.06;
}

.action-card:active .md3-state-layer {
  opacity: 0.1;
}

.action-card:hover {
  transform: translateY(-3px);
}

.action-card:focus-visible {
  outline: 2px solid $md3-primary;
  outline-offset: 2px;
}

.action-card-primary {
  background: $md3-primary;
  color: $md3-on-primary;
  border-color: transparent;
  box-shadow: 0 4px 16px rgba(28, 202, 117, 0.3);
}

.action-card-primary:hover {
  box-shadow: 0 8px 24px rgba(28, 202, 117, 0.4);
}

.action-card-primary .action-card-icon { color: $md3-on-primary; }
.action-card-primary .action-card-title { color: $md3-on-primary; }
.action-card-primary .action-card-desc { color: rgba(255, 255, 255, 0.9); }
.action-card-primary .action-card-cta {
  color: $md3-on-primary;
  text-underline-offset: 3px;
}

.action-card-primary .action-card-cta:hover {
  text-decoration: underline;
}

.action-card-secondary {
  background: $md3-surface-container-high;
  color: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.action-card-secondary:hover {
  border-color: rgba(28, 202, 117, 0.35);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.action-card-secondary .action-card-icon.secondary {
  background: $md3-primary-container;
  color: $md3-primary;
}

.action-card-secondary .action-card-cta {
  color: $md3-primary;
  text-underline-offset: 3px;
  transition: color 0.2s, text-decoration 0.2s;
}

.action-card-secondary .action-card-cta:hover {
  color: #22d680;
  text-decoration: underline;
}

.action-card-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  margin-bottom: $space-16;
}

.action-card-icon.secondary {
  background: transparent;
}

.action-card-title {
  position: relative;
  z-index: 1;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 $space-8 0;
  line-height: 1.25;
}

.action-card-desc {
  position: relative;
  z-index: 1;
  font-size: 14px;
  line-height: 1.45;
  margin: 0 0 $space-16 0;
  flex: 1;
  opacity: 0.9;
}

.action-card-cta {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: $space-6;
  font-size: 14px;
  font-weight: 600;
}

.action-card-cta :deep(.v-icon) {
  color: inherit;
}

/* Siguiente paso: peso visual bajo para no competir con las cards */
.next-step-inline {
  display: flex;
  flex-direction: column;
  gap: $space-8;
  padding: $space-16 $space-20;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid $md3-outline-variant;
}

.next-step-badge {
  font-size: 11px;
  font-weight: 600;
  color: rgba(28, 202, 117, 0.9);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.next-step-text {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  margin: 0;
}

/* MD3: Chips de confianza (primary container = transmite seguridad) */
.dashboard-trust {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: $space-12;
  padding-top: $space-28;
  margin-top: $space-8;
  border-top: 1px solid $md3-outline;
}

.trust-chip {
  display: inline-flex;
  align-items: center;
  gap: $space-6;
  padding: $space-8 $space-14;
  border-radius: 20px;
  background: $md3-primary-container;
  font-size: 12px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

.trust-chip .v-icon {
  color: $md3-primary;
  opacity: 0.95;
}

/* --- Versión móvil: tacto, espacio y safe area --- */
@media (max-width: 640px) {
  .dashboard-page {
    padding: $space-16;
    padding-left: max($space-16, env(safe-area-inset-left));
    padding-right: max($space-16, env(safe-area-inset-right));
    min-height: auto;
    padding-bottom: max($space-24, env(safe-area-inset-bottom));
  }

  .dashboard-surface {
    border-radius: 20px;
    padding: $space-20 $space-16;
  }

  .dashboard-container {
    gap: $space-28;
  }

  .dashboard-hero {
    padding: $space-16 0 $space-8;
  }

  .dashboard-title {
    font-size: clamp(22px, 6vw, 28px);
    margin-bottom: $space-12;
  }

  .dashboard-subtitle {
    font-size: 15px;
    max-width: none;
  }

  .dashboard-actions {
    gap: $space-16;
  }

  .action-card {
    padding: $space-20;
    border-radius: 16px;
    min-height: 44px;
  }

  .action-card-title {
    font-size: 17px;
  }

  .action-card-desc {
    font-size: 13px;
    margin-bottom: $space-12;
  }

  .action-card-cta {
    font-size: 15px;
    padding: $space-8 0;
    align-items: center;
  }

  .next-step-inline {
    padding: $space-14 $space-16;
    border-radius: 14px;
  }

  .next-step-text {
    font-size: 13px;
  }

  .dashboard-trust {
    padding-top: $space-24;
    gap: $space-10;
  }

  .trust-chip {
    padding: $space-6 $space-12;
    font-size: 11px;
  }
}
</style>
