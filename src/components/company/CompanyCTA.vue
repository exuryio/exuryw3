<script setup lang="ts">
import { useRouter } from "vue-router";
import { useI18n } from 'vue-i18n';

const router = useRouter();
const { t } = useI18n();

function goToHome() {
  router.push("/home");
}
</script>

<template>
  <section class="mx-auto w-full max-w-7xl px-4 pb-10 pt-2 sm:px-6 sm:pb-14 lg:px-8 lg:pb-16 lg:pt-2">
    <div class="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black/50 via-exury-greenDeep/20 to-black/50 p-8 backdrop-blur-xl sm:rounded-3xl sm:p-12 lg:p-16">
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

      <div class="relative z-10">
        <div class="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div class="lg:col-span-7">
            <h2 class="text-2xl tracking-tight text-exury-offwhite sm:text-3xl lg:text-4xl">
              {{ t('company.cta.title') }}
            </h2>
            <p class="mt-4 text-base leading-relaxed text-exury-offwhite/85 sm:mt-6 sm:text-lg">
              {{ t('company.cta.intro') }}
            </p>
            <div class="mt-6 flex flex-wrap gap-4">
              <div class="flex items-center gap-2">
                <span class="h-2 w-2 rounded-full bg-exury-green" aria-hidden="true" />
                <p class="text-sm text-exury-offwhite/75">{{ t('company.cta.bulletRegulated') }}</p>
              </div>
              <div class="flex items-center gap-2">
                <span class="h-2 w-2 rounded-full bg-exury-green" aria-hidden="true" />
                <p class="text-sm text-exury-offwhite/75">{{ t('company.cta.bulletCustody') }}</p>
              </div>
              <div class="flex items-center gap-2">
                <span class="h-2 w-2 rounded-full bg-exury-green" aria-hidden="true" />
                <p class="text-sm text-exury-offwhite/75">{{ t('company.cta.bulletTransactions') }}</p>
              </div>
            </div>
          </div>

          <div class="lg:col-span-5">
            <div class="flex flex-col gap-4 sm:flex-row lg:flex-col">
              <button
                type="button"
                class="inline-flex w-full items-center justify-center rounded-xl bg-exury-green px-6 py-4 text-sm font-semibold text-black shadow-exury-glow transition-all duration-200 active:scale-95 active:brightness-95 hover:brightness-110 hover:scale-105 hover:shadow-[0_0_0_1px_rgba(0,187,114,0.3),0_16px_48px_rgba(0,187,114,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-exury-green focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-reduce:transition-none"
                @click="goToHome"
              >
                {{ t('company.cta.startNow') }}
                <span aria-hidden="true" class="ml-2">→</span>
              </button>

              <router-link
                to="/inversores"
                class="inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] px-6 py-4 text-sm font-semibold text-exury-offwhite no-underline transition-all duration-200 active:scale-95 hover:border-white/20 hover:bg-white/[0.05] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-exury-green focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-reduce:transition-none"
              >
                {{ t('company.cta.forInvestors') }}
              </router-link>

              <router-link
                to="/contact"
                class="inline-flex w-full items-center justify-center rounded-xl border border-white/12 bg-white/[0.02] px-6 py-4 text-sm font-medium text-exury-offwhite/90 no-underline transition-all duration-200 active:scale-95 hover:border-white/18 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-exury-green focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-reduce:transition-none"
              >
                {{ t('company.cta.contactUs') }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

