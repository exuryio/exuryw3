<script setup lang="ts">
const steps = [
  {
    title: "Solicita más información",
    text: "Envíanos tus datos y el nivel de interés estimado. Responderemos con información y el siguiente paso.",
  },
  {
    title: "Agenda una llamada",
    text: "Una conversación breve para resolver dudas y confirmar encaje. Sin presión comercial.",
  },
  {
    title: "Recibe documentación y próximos pasos",
    text: "Compartimos el marco de la operación y la documentación disponible para que puedas evaluar con calma.",
  },
] as const;
</script>

<template>
  <section class="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
    <div class="grid gap-8 sm:gap-10 lg:grid-cols-12 lg:items-start">
      <div class="lg:col-span-5">
        <h2 class="text-xl tracking-tight text-exury-offwhite sm:text-2xl lg:text-3xl">Cómo funciona</h2>
        <p class="mt-2 text-xs leading-relaxed text-exury-offwhite/65 sm:mt-3 sm:text-sm">
          Un proceso simple, pensado para que entiendas el contexto antes de tomar decisiones.
        </p>
      </div>

      <div class="lg:col-span-7">
        <ul class="space-y-3 list-none sm:space-y-4">
          <li
            v-for="(step, idx) in steps"
            :key="step.title"
            class="group rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 active:border-exury-green/35 active:bg-white/[0.05] active:scale-[0.96] active:shadow-[0_0_0_2px_rgba(0,187,114,0.25)] sm:rounded-2xl sm:p-5 hover:border-exury-green/25 hover:bg-white/[0.03] hover:shadow-[0_0_0_1px_rgba(0,187,114,0.12),0_4px_16px_rgba(0,187,114,0.06)] hover:-translate-y-0.5 motion-reduce:transition-none"
            :style="`animation-delay: ${idx * 0.15}s`"
          >
            <div class="flex items-start gap-3 sm:gap-4">
              <div
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-exury-green/10 ring-1 ring-exury-green/20 transition-all duration-300 sm:h-10 sm:w-10 sm:rounded-2xl group-active:bg-exury-green/25 group-active:ring-exury-green/40 group-active:scale-125 group-active:shadow-[0_0_0_6px_rgba(0,187,114,0.15)] group-hover:bg-exury-green/20 group-hover:ring-exury-green/35 group-hover:scale-110 group-hover:shadow-[0_0_0_4px_rgba(0,187,114,0.1)]"
                aria-hidden="true"
              >
                <span class="text-xs font-medium text-exury-green transition-transform duration-300 sm:text-sm group-active:scale-125 group-hover:scale-110">
                  {{ idx + 1 }}
                </span>
              </div>
              <div class="flex-1">
                <p class="text-xs font-medium text-exury-offwhite/90 transition-colors duration-300 sm:text-sm group-hover:text-exury-offwhite">
                  {{ step.title }}
                </p>
                <p class="mt-1.5 text-xs leading-relaxed text-exury-offwhite/65 transition-colors duration-300 sm:mt-2 sm:text-sm group-hover:text-exury-offwhite/75">
                  {{ step.text }}
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


