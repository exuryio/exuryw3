<script setup lang="ts">
const items = [
  {
    title: "Resumen ejecutivo",
    desc: "Un documento breve para entender la oportunidad y el marco general.",
  },
  {
    title: "Estructura en alto nivel",
    desc: 'Explicación clara de "ampliación de capital + prima de emisión".',
  },
  {
    title: "Una llamada de contexto",
    desc: "Para resolver dudas y alinear expectativas sobre el proceso.",
  },
  {
    title: "Próximos pasos",
    desc: "Qué opciones existen para avanzar, sujeto a cupo y disponibilidad.",
  },
] as const;
</script>

<template>
  <section class="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
    <div class="grid gap-8 sm:gap-10 lg:grid-cols-12 lg:items-start">
      <div class="lg:col-span-5">
        <h2 class="text-xl tracking-tight text-exury-offwhite sm:text-2xl lg:text-3xl">Qué recibes al solicitar información</h2>
        <p class="mt-2 text-xs leading-relaxed text-exury-offwhite/65 sm:mt-3 sm:text-sm">
          Información clara y contexto completo para evaluar la oportunidad con tranquilidad.
        </p>
      </div>

      <div class="lg:col-span-7">
        <div class="grid gap-3 sm:gap-4 sm:grid-cols-2">
          <div
            v-for="(item, idx) in items"
            :key="item.title"
            class="group rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 active:border-exury-green/35 active:bg-white/[0.06] active:scale-[0.95] active:shadow-[0_0_0_2px_rgba(0,187,114,0.3)] sm:rounded-2xl sm:p-5 hover:border-exury-green/25 hover:bg-white/[0.04] hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(0,187,114,0.15),0_8px_24px_rgba(0,187,114,0.08)]"
            :style="`animation-delay: ${idx * 0.15}s; animation-fill-mode: both;`"
          >
            <p class="text-xs font-medium text-exury-offwhite/90 transition-colors duration-300 sm:text-sm group-hover:text-exury-offwhite">
              {{ item.title }}
            </p>
            <p class="mt-1.5 text-xs leading-relaxed text-exury-offwhite/65 transition-colors duration-300 sm:mt-2 sm:text-sm group-hover:text-exury-offwhite/75">
              {{ item.desc }}
            </p>
          </div>
        </div>

        <p class="mt-6 text-xs leading-relaxed text-exury-offwhite/55">
          Esta comunicación es informativa y no constituye una oferta pública.
        </p>
      </div>
    </div>

    <div class="mt-12 border-t border-exury-green/10" />
  </section>
</template>


