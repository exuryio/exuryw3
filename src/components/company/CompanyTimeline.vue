<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const milestones = computed(() => [
  { year: '2023', quarter: 'Q1', title: t('company.timeline.m1Title'), description: t('company.timeline.m1Desc'), type: 'operation' as const },
  { year: '2023', quarter: 'Q2', title: t('company.timeline.m2Title'), description: t('company.timeline.m2Desc'), type: 'operation' as const },
  { year: '2024', quarter: 'Q1', title: t('company.timeline.m3Title'), description: t('company.timeline.m3Desc'), type: 'regulation' as const },
  { year: '2025', quarter: 'Q1', title: t('company.timeline.m4Title'), description: t('company.timeline.m4Desc'), type: 'partnership' as const },
  { year: '2025', quarter: 'Q1', title: t('company.timeline.m5Title'), description: t('company.timeline.m5Desc'), type: 'partnership' as const },
]);
</script>

<template>
  <section class="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
    <div class="grid gap-10 lg:grid-cols-12 lg:items-start">
      <div class="lg:col-span-5">
        <h2 class="text-2xl tracking-tight text-exury-offwhite sm:text-3xl lg:text-4xl">{{ t('company.timeline.title') }}</h2>
        <div class="mt-4 h-px w-20 bg-exury-green/40 sm:mt-5" />
        <p class="mt-6 text-sm leading-relaxed text-exury-offwhite/70 sm:text-base">
          {{ t('company.timeline.intro') }}
        </p>
      </div>

      <div class="lg:col-span-7">
        <div class="relative">
          <!-- TECHNIQUE: Visual Support - Imagen decorativa de fondo -->
          <div
            class="pointer-events-none absolute right-0 top-1/2 h-48 w-48 -translate-y-1/2 opacity-5 -z-10"
            aria-hidden="true"
          >
            <img
              src="/assets/company/timeline-pattern.svg"
              alt=""
              class="h-full w-full object-contain"
              loading="lazy"
            />
          </div>
          <!-- TECHNIQUE: Gestalt Continuity - Línea vertical conecta elementos visualmente -->
          <div
            class="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-exury-green/50 via-exury-green/35 to-exury-green/20 sm:left-10"
            aria-hidden="true"
          />

          <!-- TECHNIQUE: Gestalt Proximity - Espaciado consistente (8pt grid: space-y-6 = 24px) -->
          <div class="space-y-6">
            <div
              v-for="(milestone, idx) in milestones"
              :key="`${milestone.year}-${milestone.quarter}-${idx}`"
              class="group relative flex gap-6 transition-all duration-300 hover:-translate-x-2 sm:gap-8"
              :style="`animation-delay: ${idx * 0.1}s`"
              role="article"
              :aria-label="`${milestone.year} ${milestone.quarter}: ${milestone.title}`"
            >
              <!-- TECHNIQUE: Affordances + Visual Hierarchy - Dot destacado con ring para regulación (trust signal) -->
              <div
                class="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-exury-green/50 bg-black/70 backdrop-blur-sm shadow-[0_0_0_2px_rgba(0,187,114,0.1)] transition-all duration-300 group-hover:scale-125 group-hover:border-exury-green group-hover:bg-exury-green/25 group-hover:shadow-[0_0_0_6px_rgba(0,187,114,0.2)] sm:h-16 sm:w-16"
                :class="{
                  'ring-4 ring-exury-green/30 shadow-[0_0_0_4px_rgba(0,187,114,0.2)]': milestone.type === 'regulation',
                }"
              >
                <div
                  class="h-3 w-3 rounded-full transition-all duration-300 group-hover:scale-150"
                  :class="{
                    'bg-exury-green': milestone.type === 'regulation',
                    'bg-exury-green/80': milestone.type === 'operation',
                    'bg-exury-green/60': milestone.type === 'partnership',
                  }"
                />
              </div>

              <!-- TECHNIQUE: Card-based Design + Microinteractions - Card con hover mejorado -->
              <div
                class="flex-1 rounded-2xl border border-white/12 bg-white/[0.03] p-6 transition-all duration-300 sm:rounded-3xl sm:p-7 hover:border-exury-green/35 hover:bg-white/[0.06] hover:shadow-[0_0_0_2px_rgba(0,187,114,0.2),0_12px_32px_rgba(0,187,114,0.12)] hover:-translate-y-1 active:scale-[0.99]"
              >
                <!-- TECHNIQUE: Scannable Content - Badges para categorización rápida -->
                <div class="flex flex-wrap items-center gap-3 mb-4">
                  <span
                    class="rounded-full border border-exury-green/40 bg-exury-green/15 px-4 py-1.5 text-xs font-bold text-exury-green shadow-[0_0_0_1px_rgba(0,187,114,0.2)]"
                  >
                    {{ milestone.year }} {{ milestone.quarter }}
                  </span>
                  <span
                    v-if="milestone.type === 'regulation'"
                    class="rounded-full border-2 border-exury-green/50 bg-exury-green/25 px-4 py-1.5 text-xs font-semibold text-exury-offwhite shadow-[0_0_0_2px_rgba(0,187,114,0.15)]"
                  >
                    {{ t('company.timeline.regulation') }}
                  </span>
                  <span
                    v-else-if="milestone.type === 'partnership'"
                    class="rounded-full border border-white/25 bg-white/8 px-4 py-1.5 text-xs font-semibold text-exury-offwhite/90"
                  >
                    {{ t('company.timeline.partnership') }}
                  </span>
                </div>
                <!-- TECHNIQUE: Visual Hierarchy - Título destacado para escaneo -->
                <h3 class="text-lg font-bold text-exury-offwhite transition-colors duration-300 sm:text-xl lg:text-2xl group-hover:text-exury-green mb-2">
                  {{ milestone.title }}
                </h3>
                <p class="text-sm leading-relaxed text-exury-offwhite/80 transition-colors duration-300 sm:text-base group-hover:text-exury-offwhite/90">
                  {{ milestone.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-12 border-t border-exury-green/10 sm:mt-16" />
  </section>
</template>

