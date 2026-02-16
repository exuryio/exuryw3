<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<template>
  <section class="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
    <div class="grid gap-10 lg:grid-cols-12 lg:items-start">
      <div class="lg:col-span-5">
        <h2 class="text-2xl tracking-tight text-exury-offwhite sm:text-3xl lg:text-4xl">{{ t('company.about.title') }}</h2>
        <div class="mt-4 h-px w-20 bg-exury-green/40 sm:mt-5" />
        <p class="mt-6 text-sm leading-relaxed text-exury-offwhite/80 sm:text-base">
          {{ t('company.about.intro') }}
        </p>
      </div>

      <div class="lg:col-span-7">
        <div class="space-y-6">
          <div class="group relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 sm:rounded-3xl sm:p-7 hover:border-exury-green/25 hover:bg-white/[0.05] hover:shadow-[0_0_0_1px_rgba(0,187,114,0.15),0_8px_24px_rgba(0,187,114,0.08)] hover:-translate-y-1 active:scale-[0.99]">
            <div class="relative flex items-start gap-5">
              <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-exury-green/25 text-sm font-bold text-exury-offwhite transition-all duration-300 group-hover:scale-110 group-hover:bg-exury-green/35 sm:h-14 sm:w-14 sm:rounded-3xl sm:text-base">2019</div>
              <div class="flex-1">
                <h3 class="mb-2 text-base font-semibold text-exury-offwhite sm:text-lg">{{ t('company.about.visionTitle') }}</h3>
                <p class="text-sm leading-relaxed text-exury-offwhite/85 sm:text-base">{{ t('company.about.visionText') }}</p>
              </div>
            </div>
          </div>

          <div class="group relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 sm:rounded-3xl sm:p-7 hover:border-exury-green/25 hover:bg-white/[0.05] hover:shadow-[0_0_0_1px_rgba(0,187,114,0.15),0_8px_24px_rgba(0,187,114,0.08)] hover:-translate-y-1 active:scale-[0.99]">
            <div class="relative flex items-start gap-5">
              <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-exury-green/25 text-sm font-bold text-exury-offwhite transition-all duration-300 group-hover:scale-110 group-hover:bg-exury-green/35 sm:h-14 sm:w-14 sm:rounded-3xl sm:text-base">2019-21</div>
              <div class="flex-1">
                <h3 class="mb-2 text-base font-semibold text-exury-offwhite sm:text-lg">{{ t('company.about.masteryTitle') }}</h3>
                <p class="text-sm leading-relaxed text-exury-offwhite/85 sm:text-base">{{ t('company.about.masteryText') }}</p>
              </div>
            </div>
          </div>

          <div class="group relative overflow-hidden rounded-2xl border border-exury-green/30 bg-gradient-to-br from-exury-green/15 to-exury-greenDeep/20 p-6 backdrop-blur-sm transition-all duration-300 sm:rounded-3xl sm:p-7 hover:border-exury-green/40 hover:bg-gradient-to-br hover:from-exury-green/20 hover:to-exury-greenDeep/25 hover:shadow-[0_0_0_2px_rgba(0,187,114,0.25),0_12px_32px_rgba(0,187,114,0.15)] hover:-translate-y-1 active:scale-[0.99]">
            <div class="relative flex items-start gap-5">
              <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-exury-green/40 text-sm font-bold text-exury-offwhite transition-all duration-300 group-hover:scale-110 group-hover:bg-exury-green/50 sm:h-14 sm:w-14 sm:rounded-3xl sm:text-base">2021</div>
              <div class="flex-1">
                <h3 class="mb-2 text-base font-semibold text-exury-offwhite sm:text-lg">{{ t('company.about.innovationTitle') }}</h3>
                <p class="text-sm leading-relaxed text-exury-offwhite/85 sm:text-base">{{ t('company.about.innovationText') }}</p>
              </div>
            </div>
          </div>

          <div class="group relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 sm:rounded-3xl sm:p-7 hover:border-exury-green/25 hover:bg-white/[0.05] hover:shadow-[0_0_0_1px_rgba(0,187,114,0.15),0_8px_24px_rgba(0,187,114,0.08)] hover:-translate-y-1 active:scale-[0.99]">
            <div class="relative flex items-start gap-5">
              <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-exury-green/25 text-sm font-bold text-exury-offwhite transition-all duration-300 group-hover:scale-110 group-hover:bg-exury-green/35 sm:h-14 sm:w-14 sm:rounded-3xl sm:text-base">2021-23</div>
              <div class="flex-1">
                <h3 class="mb-2 text-base font-semibold text-exury-offwhite sm:text-lg">{{ t('company.about.transformationTitle') }}</h3>
                <p class="text-sm leading-relaxed text-exury-offwhite/85 sm:text-base">{{ t('company.about.transformationText') }}</p>
              </div>
            </div>
          </div>

          <div class="group relative overflow-hidden rounded-2xl border border-exury-green/40 bg-gradient-to-br from-exury-green/20 to-exury-greenDeep/25 p-6 backdrop-blur-sm transition-all duration-300 sm:rounded-3xl sm:p-7 hover:border-exury-green/50 hover:bg-gradient-to-br hover:from-exury-green/25 hover:to-exury-greenDeep/30 hover:shadow-[0_0_0_2px_rgba(0,187,114,0.3),0_16px_40px_rgba(0,187,114,0.2)] hover:-translate-y-1 active:scale-[0.99]">
            <div class="relative flex items-start gap-5">
              <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-exury-green/50 text-sm font-bold text-exury-offwhite shadow-[0_0_0_2px_rgba(0,187,114,0.3)] transition-all duration-300 group-hover:scale-110 group-hover:bg-exury-green/60 group-hover:shadow-[0_0_0_4px_rgba(0,187,114,0.4)] sm:h-14 sm:w-14 sm:rounded-3xl sm:text-base">2023</div>
              <div class="flex-1">
                <h3 class="mb-2 text-base font-semibold text-exury-offwhite sm:text-lg">{{ t('company.about.foundationTitle') }}</h3>
                <p class="text-sm leading-relaxed text-exury-offwhite/85 sm:text-base">{{ t('company.about.foundationText') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-12 border-t border-exury-green/10 sm:mt-16" />
  </section>
</template>

