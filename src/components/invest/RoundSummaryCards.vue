<script setup lang="ts">
const cards = [
  {
    label: "Tipo",
    value: "Equity (ampliación de capital + prima de emisión)",
  },
  {
    label: "Acceso",
    value: "Inversores privados minoristas",
  },
  {
    label: "Cupo",
    value: "Máximo 5 inversores o hasta completar la ronda",
  },
  {
    label: "Plazo",
    value: "Hasta el 28/02/2026",
  },
] as const;
</script>

<template>
  <section class="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
    <div class="flex items-end justify-between gap-6">
      <div>
        <h2 class="text-xl tracking-tight text-exury-offwhite sm:text-2xl lg:text-3xl">Resumen de la ronda</h2>
        <p class="mt-2 max-w-2xl text-xs leading-relaxed text-exury-offwhite/70 sm:mt-3 sm:text-sm lg:text-base">
          Lo esencial, en una vista rápida: estructura, acceso, cupo y plazo.
        </p>
      </div>
    </div>

    <div class="mt-6 grid gap-3 sm:mt-10 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="(card, idx) in cards"
        :key="card.label"
        class="group card-animate rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 active:border-exury-green/30 active:bg-white/[0.04] active:scale-[0.96] active:shadow-[0_0_0_2px_rgba(0,187,114,0.2)] sm:rounded-2xl sm:p-5 hover:border-exury-green/30 hover:bg-white/[0.04] hover:shadow-[0_0_0_1px_rgba(0,187,114,0.15),0_8px_24px_rgba(0,187,114,0.08)] hover:-translate-y-1 motion-reduce:transition-none"
        :style="`animation-delay: ${idx * 0.15}s`"
      >
        <div class="flex items-center gap-2">
          <span
            class="inline-block h-1.5 w-1.5 rounded-full bg-exury-green transition-all duration-300 group-active:scale-150 group-active:shadow-[0_0_8px_rgba(0,187,114,0.6)] group-hover:scale-125"
            aria-hidden="true"
          />
          <p class="text-xs tracking-wide text-exury-offwhite/60 transition-colors duration-300 group-hover:text-exury-offwhite/75">
            {{ card.label }}
          </p>
        </div>
        <p class="mt-2 text-xs leading-snug text-exury-offwhite/90 transition-colors duration-300 sm:mt-3 sm:text-sm group-hover:text-exury-offwhite">
          {{ card.value }}
        </p>
      </div>
    </div>

    <div class="mt-12 border-t border-exury-green/10" />
  </section>
</template>


