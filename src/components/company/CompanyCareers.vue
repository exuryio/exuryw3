<script setup lang="ts">
import { useRouter } from "vue-router";
import { useI18n } from 'vue-i18n';

const router = useRouter();
const { t } = useI18n();

function goToContact() {
  router.push("/contact");
}
</script>

<template>
  <section class="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
    <div class="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black/50 via-exury-greenDeep/20 to-black/50 p-8 backdrop-blur-xl sm:rounded-3xl sm:p-12 lg:p-16">
      <div
        aria-hidden="true"
        class="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full blur-3xl opacity-30"
        style="background: radial-gradient(circle, rgba(0,187,114,0.25), transparent 70%)"
      />
      <div
        aria-hidden="true"
        class="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full blur-3xl opacity-20"
        style="background: radial-gradient(circle, rgba(5,70,41,0.3), transparent 70%)"
      />

      <div class="relative z-10">
        <div class="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div class="lg:col-span-7">
            <h2 class="text-2xl tracking-tight text-exury-offwhite sm:text-3xl lg:text-4xl">
              {{ t('company.careers.title') }}
            </h2>
            <div class="mt-4 h-px w-20 bg-exury-green/40" />
            <p class="mt-6 text-base leading-relaxed text-exury-offwhite/85 sm:text-lg">
              {{ t('company.careers.intro') }}
            </p>
            <div class="mt-6 space-y-2.5">
              <div class="flex items-start gap-3">
                <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-exury-green" aria-hidden="true" />
                <p class="text-sm leading-relaxed text-exury-offwhite/80">{{ t('company.careers.bullet1') }}</p>
              </div>
              <div class="flex items-start gap-3">
                <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-exury-green" aria-hidden="true" />
                <p class="text-sm leading-relaxed text-exury-offwhite/80">{{ t('company.careers.bullet2') }}</p>
              </div>
              <div class="flex items-start gap-3">
                <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-exury-green" aria-hidden="true" />
                <p class="text-sm leading-relaxed text-exury-offwhite/80">{{ t('company.careers.bullet3') }}</p>
              </div>
            </div>
          </div>

          <div class="lg:col-span-5">
            <div class="rounded-xl border border-exury-green/30 bg-exury-green/10 p-6 backdrop-blur-sm sm:rounded-2xl sm:p-8">
              <p class="text-sm font-semibold text-exury-offwhite/70 uppercase tracking-wide sm:text-base">{{ t('company.careers.interested') }}</p>
              <p class="mt-2 text-sm leading-relaxed text-exury-offwhite/85 sm:text-base">
                {{ t('company.careers.interestedDesc') }}
              </p>
              <button
                type="button"
                class="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-exury-green px-5 py-3 text-sm font-medium text-black shadow-exury-glow transition-all duration-200 active:scale-95 active:brightness-95 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-exury-green focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-reduce:transition-none"
                @click="goToContact"
              >
                {{ t('company.careers.contactUs') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

