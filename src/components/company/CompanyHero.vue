<template>
  <section class="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8 lg:pt-16">
    <div class="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black/50 via-black/40 to-exury-greenDeep/30 p-6 backdrop-blur-xl sm:rounded-3xl sm:p-12 lg:p-16">
      <!-- Enhanced gradient overlays -->
      <div
        aria-hidden="true"
        class="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full blur-3xl opacity-40"
        style="background: radial-gradient(circle, rgba(0,187,114,0.25), transparent 70%)"
      />
      <div
        aria-hidden="true"
        class="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full blur-3xl opacity-30"
        style="background: radial-gradient(circle, rgba(5,70,41,0.35), transparent 70%)"
      />
      <div
        aria-hidden="true"
        class="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl opacity-20"
        style="background: radial-gradient(circle, rgba(0,187,114,0.3), transparent 60%)"
      />

      <!-- TECHNIQUE: Visual Support - Imagen de fondo sutil para profundidad visual -->
      <div
        class="pointer-events-none absolute inset-0 opacity-5"
        aria-hidden="true"
      >
        <img
          src="/assets/company/hero-pattern.svg"
          alt=""
          class="h-full w-full object-cover"
          loading="eager"
        />
      </div>

      <div class="relative z-10">
        <!-- TECHNIQUE: Trust Signals Placement + F-Pattern - Badges arriba para captar atención inmediata -->
        <div class="flex flex-wrap items-center gap-3 mb-8">
          <div
            class="inline-flex items-center rounded-full border-2 border-exury-green/40 bg-exury-green/20 px-5 py-2.5 text-xs font-semibold tracking-wide text-exury-offwhite shadow-[0_0_0_2px_rgba(0,187,114,0.15),0_4px_12px_rgba(0,187,114,0.2)] sm:px-6 sm:py-3 sm:text-sm"
            role="status"
            :aria-label="t('company.hero.regulatedBadge')"
          >
            <span class="mr-2.5 inline-block h-2 w-2 rounded-full bg-exury-green animate-pulse shadow-[0_0_8px_rgba(0,187,114,0.6)]" aria-hidden="true" />
            {{ t('company.hero.regulatedBadge') }}
          </div>
          <div
            class="inline-flex items-center rounded-full border border-white/20 bg-white/8 px-5 py-2.5 text-xs font-medium tracking-wide text-exury-offwhite/90 sm:px-6 sm:py-3 sm:text-sm"
          >
            {{ t('company.hero.foundedBadge') }}
          </div>
        </div>

        <!-- TECHNIQUE: Visual Hierarchy - Título más grande y bold para jerarquía clara -->
        <h1 class="max-w-5xl text-4xl font-bold leading-[1.1] tracking-tight text-exury-offwhite sm:text-5xl sm:leading-[1.1] lg:text-7xl lg:leading-[1.05] mb-6">
          {{ t('company.hero.title') }}
        </h1>

        <!-- TONO ASPIRACIONAL + ARQUETIPO SABIO/GOBERNANTE - Visión elevada, autoridad, sabiduría -->
        <p class="max-w-3xl text-base leading-relaxed text-exury-offwhite/90 sm:text-lg sm:leading-relaxed lg:text-xl lg:leading-relaxed mb-10">
          {{ t('company.hero.introBefore') }}<strong class="text-exury-green font-semibold">{{ t('company.hero.introHighlight') }}</strong>{{ t('company.hero.introAfter') }}
        </p>

        <!-- TECHNIQUE: Chunking + Card-based Design - Stats en cards escaneables (8pt grid: gap-6 = 24px) -->
        <div class="grid gap-6 sm:grid-cols-3 sm:gap-6">
          <div class="group rounded-2xl border border-white/12 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:border-exury-green/30 hover:bg-white/[0.06] hover:shadow-[0_0_0_1px_rgba(0,187,114,0.2),0_8px_24px_rgba(0,187,114,0.1)] hover:-translate-y-1 active:scale-[0.98] sm:p-7">
            <p class="text-xs font-medium tracking-wide text-exury-offwhite/60 uppercase mb-2 sm:text-sm">{{ t('company.hero.foundedLabel') }}</p>
            <p class="text-2xl font-bold text-exury-offwhite transition-colors duration-300 group-hover:text-exury-green sm:text-3xl">2023</p>
          </div>
          <div class="group rounded-2xl border border-white/12 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:border-exury-green/30 hover:bg-white/[0.06] hover:shadow-[0_0_0_1px_rgba(0,187,114,0.2),0_8px_24px_rgba(0,187,114,0.1)] hover:-translate-y-1 active:scale-[0.98] sm:p-7">
            <p class="text-xs font-medium tracking-wide text-exury-offwhite/60 uppercase mb-2 sm:text-sm">{{ t('company.hero.locationLabel') }}</p>
            <p class="text-2xl font-bold text-exury-offwhite transition-colors duration-300 group-hover:text-exury-green sm:text-3xl">{{ t('company.hero.locationValue') }}</p>
          </div>
          <div class="group rounded-2xl border border-white/12 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:border-exury-green/30 hover:bg-white/[0.06] hover:shadow-[0_0_0_1px_rgba(0,187,114,0.2),0_8px_24px_rgba(0,187,114,0.1)] hover:-translate-y-1 active:scale-[0.98] sm:p-7">
            <p class="text-xs font-medium tracking-wide text-exury-offwhite/60 uppercase mb-2 sm:text-sm">{{ t('company.hero.coverageLabel') }}</p>
            <p class="text-2xl font-bold text-exury-offwhite transition-colors duration-300 group-hover:text-exury-green sm:text-3xl">{{ t('company.hero.coverageValue') }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

