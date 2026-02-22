<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const stats = computed(() => [
  { label: t('company.stats.users'), value: t('company.stats.usersValue'), description: t('company.stats.usersDesc'), icon: 'mdi-account-group' },
  { label: t('company.stats.transactions'), value: t('company.stats.transactionsValue'), description: t('company.stats.transactionsDesc'), icon: 'mdi-swap-horizontal' },
  { label: t('company.stats.countries'), value: t('company.stats.countriesValue'), description: t('company.stats.countriesDesc'), icon: 'mdi-earth' },
  { label: t('company.stats.regulation'), value: t('company.stats.regulationValue'), description: t('company.stats.regulationDesc'), icon: 'mdi-shield-check' },
]);
</script>

<template>
  <section class="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
    <div class="grid gap-10 lg:grid-cols-12 lg:items-start">
      <div class="lg:col-span-5">
        <h2 class="text-2xl tracking-tight text-exury-offwhite sm:text-3xl lg:text-4xl">{{ t('company.stats.title') }}</h2>
        <div class="mt-4 h-0.5 w-24 bg-exury-green/40 sm:mt-5" />
        <p class="mt-6 text-sm leading-relaxed text-exury-offwhite/70 sm:text-base">
          {{ t('company.stats.intro') }}
        </p>
      </div>

      <!-- TECHNIQUE: Chunking + Card-based Design - Grid 2x2 para chunking óptimo (máximo 4 items visibles) -->
      <div class="lg:col-span-7 relative">
        <!-- TECHNIQUE: Visual Support - Imagen decorativa de fondo sutil -->
        <div
          class="pointer-events-none absolute right-0 top-0 h-64 w-64 opacity-5 -z-10"
          aria-hidden="true"
        >
          <img
            src="/assets/company/stats-pattern.svg"
            alt=""
            class="h-full w-full object-contain"
            loading="lazy"
          />
        </div>
        <div class="grid gap-6 sm:grid-cols-2 sm:gap-6">
          <div
            v-for="(stat, idx) in stats"
            :key="stat.label"
            class="group relative overflow-hidden rounded-2xl border border-white/12 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-6 transition-all duration-300 sm:rounded-3xl sm:p-7 hover:border-exury-green/40 hover:bg-gradient-to-br hover:from-exury-green/12 hover:to-exury-greenDeep/15 hover:shadow-[0_0_0_2px_rgba(0,187,114,0.25),0_16px_40px_rgba(0,187,114,0.15)] hover:-translate-y-2 active:scale-[0.97] motion-reduce:transition-none"
            :style="`animation-delay: ${idx * 0.1}s`"
            role="article"
            :aria-label="`${stat.label}: ${stat.value}`"
          >
            <!-- TECHNIQUE: Depth & Layering - Gradiente sutil en hover para profundidad -->
            <div
              aria-hidden="true"
              class="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-35"
              style="background: radial-gradient(circle, rgba(0,187,114,0.5), transparent 70%)"
            />
            
            <div class="relative z-10">
              <!-- TECHNIQUE: Affordances - Icono visible que sugiere categoría -->
              <div class="flex items-center gap-4 mb-5">
                <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-exury-green/25 text-exury-green transition-all duration-300 group-hover:scale-110 group-hover:bg-exury-green/35 group-hover:shadow-[0_0_0_4px_rgba(0,187,114,0.15)] sm:h-14 sm:w-14 sm:rounded-3xl">
                  <v-icon :icon="stat.icon" size="24" />
                </div>
                <p class="text-xs font-semibold tracking-wide text-exury-offwhite/70 uppercase transition-colors duration-300 group-hover:text-exury-offwhite/90 sm:text-sm">
                  {{ stat.label }}
                </p>
              </div>
              <!-- TECHNIQUE: Scannable Content - Número grande y bold para escaneo rápido -->
              <p class="text-3xl font-bold text-exury-offwhite transition-colors duration-300 sm:text-4xl lg:text-5xl group-hover:text-exury-green mb-2">
                {{ stat.value }}
              </p>
              <!-- TECHNIQUE: Progressive Disclosure - Descripción más pequeña, información secundaria -->
              <p class="text-sm leading-relaxed text-exury-offwhite/75 transition-colors duration-300 sm:text-base group-hover:text-exury-offwhite/85">
                {{ stat.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-10 border-t border-exury-green/10 sm:mt-12" />
  </section>
</template>

