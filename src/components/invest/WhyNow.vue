<script setup lang="ts">
const items = [
  {
    title: "MiCA 2026: pasaporte europeo para operar en la Unión Europea",
    detail:
      "Con la entrada en vigor de MiCA en 2026, Exury podrá operar y brindar servicios en la UE bajo un marco común. Es el tipo de estándar regulatorio en el que ya operan actores como Revolut, Binance, Coinbase y grandes instituciones financieras.",
  },
  {
    title: "Escala: de España a la Unión Europea",
    detail:
      "El hito MiCA abre un alcance potencial significativamente mayor: de un mercado de ~12 millones de personas en España a ~70 millones en la Unión Europea.",
  },
  {
    title: "Ventana temporal: posicionamiento antes del nuevo estándar",
    detail:
      "Entrar antes de la plena aplicación de MiCA permite participar en una fase temprana, con un proceso privado, cupo limitado y enfoque institucional.",
  },
] as const;
</script>

<template>
  <section class="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
    <div class="grid gap-8 sm:gap-10 lg:grid-cols-12 lg:items-start">
      <div class="lg:col-span-5">
        <h2 class="text-xl tracking-tight text-exury-offwhite sm:text-2xl lg:text-3xl">Por qué ahora</h2>
        <p class="mt-2 text-xs leading-relaxed text-exury-offwhite/65 sm:mt-3 sm:text-sm">
          Tres razones de contexto, con foco en claridad institucional (sin promesas).
        </p>
      </div>
      <div class="lg:col-span-7">
        <ul class="space-y-3 sm:space-y-4">
          <li
            v-for="(item, idx) in items"
            :key="item.title"
            class="group rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 active:border-exury-green/35 active:bg-white/[0.05] active:scale-[0.96] active:shadow-[0_0_0_2px_rgba(0,187,114,0.25)] sm:rounded-2xl sm:p-5 hover:border-exury-green/25 hover:bg-white/[0.03] hover:shadow-[0_0_0_1px_rgba(0,187,114,0.12),0_4px_16px_rgba(0,187,114,0.06)] hover:-translate-y-0.5 motion-reduce:transition-none"
            :style="`animation-delay: ${idx * 0.2}s`"
          >
            <div class="flex items-start gap-3">
              <span
                class="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-exury-green/15 ring-1 ring-exury-green/25 transition-all duration-300 group-hover:bg-exury-green/25 group-hover:ring-exury-green/40 group-hover:scale-110"
                aria-hidden="true"
              >
                <span class="h-2 w-2 rounded-full bg-exury-green transition-transform duration-300 group-hover:scale-125" />
              </span>
              <div class="flex-1">
                <p class="text-sm font-medium text-exury-offwhite/90 transition-colors duration-300 group-hover:text-exury-offwhite">
                  {{ item.title }}
                </p>
                <p class="mt-2 text-sm leading-relaxed text-exury-offwhite/65 transition-colors duration-300 group-hover:text-exury-offwhite/75">
                  {{ item.detail }}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="mt-12 border-t border-exury-green/10" />
  </section>
</template>


