<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<template>
  <section class="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
    <div class="grid gap-10 lg:grid-cols-12 lg:items-start">
      <div class="lg:col-span-5">
        <h2 class="text-2xl tracking-tight text-exury-offwhite sm:text-3xl lg:text-4xl">{{ t('company.regulation.title') }}</h2>
        <div class="mt-4 h-px w-20 bg-exury-green/40 sm:mt-5" />
        <p class="mt-6 text-sm leading-relaxed text-exury-offwhite/80 sm:text-base">
          {{ t('company.regulation.intro') }}
        </p>
      </div>

      <div class="lg:col-span-7">
        <div class="space-y-6">
          <div class="group relative overflow-hidden rounded-2xl border border-exury-green/30 bg-gradient-to-br from-exury-green/15 to-exury-greenDeep/20 p-6 backdrop-blur-sm transition-all duration-300 sm:rounded-3xl sm:p-8 hover:border-exury-green/40 hover:shadow-[0_0_0_1px_rgba(0,187,114,0.3),0_16px_48px_rgba(0,187,114,0.15)] hover:-translate-y-1 active:scale-[0.98]">
            <div
              aria-hidden="true"
              class="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full opacity-30 blur-3xl transition-opacity duration-300 group-hover:opacity-40"
              style="background: radial-gradient(circle, rgba(0,187,114,0.5), transparent 70%)"
            />

            <div class="relative z-10">
              <div class="flex items-center gap-4">
                <img
                  src="/banco-de-espana-white.png"
                  :alt="t('company.regulation.regulatedByBank')"
                  class="h-10 w-auto opacity-95 transition-transform duration-300 group-hover:scale-110 sm:h-12"
                  loading="lazy"
                />
                <div class="flex-1">
                  <p class="text-xs font-medium text-exury-offwhite/70 sm:text-sm">{{ t('company.regulation.currentLabel') }}</p>
                  <p class="mt-1 text-base font-semibold text-exury-offwhite sm:text-lg">
                    {{ t('company.regulation.regulatedByBank') }}
                  </p>
                </div>
              </div>
              <p class="mt-4 text-sm leading-relaxed text-exury-offwhite/90 sm:text-base">
                {{ t('company.regulation.cardText') }}
              </p>
            </div>
          </div>

          <div class="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.02] to-white/[0.01] p-6 backdrop-blur-sm transition-all duration-300 sm:rounded-3xl sm:p-8 hover:border-exury-green/30 hover:bg-gradient-to-br hover:from-exury-green/10 hover:to-exury-greenDeep/10 hover:shadow-[0_0_0_1px_rgba(0,187,114,0.2),0_12px_32px_rgba(0,187,114,0.12)] hover:-translate-y-1 active:scale-[0.98]">
            <div
              aria-hidden="true"
              class="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-20"
              style="background: radial-gradient(circle, rgba(0,187,114,0.4), transparent 70%)"
            />

            <div class="relative z-10">
              <div class="mb-4 flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-exury-green/20 text-exury-green transition-all duration-300 group-hover:scale-110 group-hover:bg-exury-green/30 sm:h-12 sm:w-12 sm:rounded-2xl">
                  <v-icon icon="mdi-shield-star" size="24" />
                </div>
                <p class="text-sm font-semibold text-exury-offwhite transition-colors duration-300 sm:text-base group-hover:text-exury-green">
                  {{ t('company.regulation.micaTitle') }}
                </p>
              </div>
              <p class="text-sm leading-relaxed text-exury-offwhite/85 transition-colors duration-300 sm:text-base group-hover:text-exury-offwhite/95">
                {{ t('company.regulation.micaText') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-12 border-t border-exury-green/10 sm:mt-16" />
  </section>
</template>

