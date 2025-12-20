<script setup lang="ts">
import Company3DIcon from "./Company3DIcon.vue";

const pillars = [
  {
    title: "Libertad con propósito",
    description:
      "Trabajamos desde donde queramos porque confiamos en la autonomía de quienes buscan la excelencia.",
    icon: "mdi-lock-open-variant",
    icon3d: "lock" as const,
  },
  {
    title: "Excelencia como estándar",
    description:
      "Resultados excepcionales y crecimiento continuo. Cada logro es un paso hacia un estándar más alto.",
    icon: "mdi-trophy",
    icon3d: "star" as const,
  },
  {
    title: "Sabiduría consciente",
    description:
      "Actuamos con plena conciencia del impacto de nuestras decisiones. Transparencia e integridad en cada acción.",
    icon: "mdi-lightbulb-on",
    icon3d: "lightbulb" as const,
  },
  {
    title: "Liderazgo desde el poder",
    description:
      "Buscamos líderes que contribuyan al crecimiento de Exury desde su propia autoridad y conocimiento.",
    icon: "mdi-lightning-bolt",
    icon3d: "lightning" as const,
  },
] as const;
</script>

<template>
  <section class="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
    <div class="grid gap-10 lg:grid-cols-12 lg:items-start">
      <div class="lg:col-span-5">
        <h2 class="text-2xl tracking-tight text-exury-offwhite sm:text-3xl lg:text-4xl">Nuestra cultura</h2>
        <div class="mt-4 h-px w-20 bg-exury-green/40 sm:mt-5" />
        <p class="mt-6 text-sm leading-relaxed text-exury-offwhite/80 sm:text-base">
          Un equipo unido por una visión: construir el futuro de las finanzas desde la sabiduría y el liderazgo consciente.
        </p>
        
        <div class="mt-6 rounded-xl border border-exury-green/25 bg-exury-green/12 p-4 sm:rounded-2xl sm:p-5">
          <p class="text-xs font-semibold text-exury-offwhite/70 uppercase tracking-wide sm:text-sm">Modalidad</p>
          <p class="mt-1 text-base font-bold text-exury-offwhite sm:text-lg">
            Full Remote
          </p>
          <p class="mt-2 text-xs leading-relaxed text-exury-offwhite/80 sm:text-sm">
            Trabaja desde donde quieras. Valoramos la autonomía y confiamos en tu disciplina.
          </p>
        </div>
      </div>

      <div class="lg:col-span-7">
        <div class="grid gap-4 sm:grid-cols-2">
          <div
            v-for="(pillar, idx) in pillars"
            :key="pillar.title"
            class="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.02] to-white/[0.01] p-5 transition-all duration-300 sm:rounded-3xl sm:p-6 hover:border-exury-green/30 hover:bg-gradient-to-br hover:from-exury-green/10 hover:to-exury-greenDeep/10 hover:shadow-[0_0_0_1px_rgba(0,187,114,0.2),0_12px_32px_rgba(0,187,114,0.12)] hover:-translate-y-1 active:scale-[0.98] motion-reduce:transition-none"
            :style="`animation-delay: ${idx * 0.1}s`"
          >
            <!-- Gradient overlay -->
            <div
              aria-hidden="true"
              class="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-30"
              style="background: radial-gradient(circle, rgba(0,187,114,0.4), transparent 70%)"
            />

            <div class="relative z-10">
              <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-exury-green/20 text-exury-green transition-all duration-300 group-hover:scale-110 group-hover:bg-exury-green/30 sm:h-14 sm:w-14 sm:rounded-2xl overflow-hidden">
                <Company3DIcon :type="pillar.icon3d" :size="56" />
              </div>
              <h3 class="text-base font-semibold text-exury-offwhite transition-colors duration-300 sm:text-lg group-hover:text-exury-green">
                {{ pillar.title }}
              </h3>
              <p class="mt-2 text-xs leading-relaxed text-exury-offwhite/75 transition-colors duration-300 sm:text-sm group-hover:text-exury-offwhite/85">
                {{ pillar.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-12 border-t border-exury-green/10 sm:mt-16" />
  </section>
</template>

