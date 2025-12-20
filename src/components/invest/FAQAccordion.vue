<script setup lang="ts">
type FaqItem = {
  q: string;
  a: string;
};

const items: FaqItem[] = [
  {
    q: "¿Qué significa inversión privada?",
    a: "Una inversión acordada de forma directa con un número limitado de inversores, fuera de un proceso de oferta pública. El acceso y los siguientes pasos se coordinan de manera individual.",
  },
  {
    q: "¿Quién puede participar?",
    a: "Inversores privados minoristas interesados en conocer la oportunidad y sus condiciones, sujeto a disponibilidad de cupo. No es necesario ser experto en cripto para entender el marco general.",
  },
  {
    q: "¿Cuál es el plazo?",
    a: "La ronda está abierta hasta el 28 de febrero de 2026, o hasta completar el cupo.",
  },
  {
    q: "¿Cómo se estructura la inversión?",
    a: "Como equity mediante una ampliación de capital, con prima de emisión. En simple: se emiten nuevas participaciones/acciones y se fija una prima asociada a la operación, todo dentro de un proceso privado.",
  },
  {
    q: "¿Es una oferta pública?",
    a: "No. Esta comunicación es informativa y no constituye una oferta pública.",
  },
  {
    q: "¿Cómo solicito más información?",
    a: "Completa el formulario de esta página o agenda una llamada. Te contactaremos con contexto, el marco de la operación y los siguientes pasos disponibles.",
  },
];

const openIndex = ref<number | null>(0);

function toggle(i: number) {
  openIndex.value = openIndex.value === i ? null : i;
}
</script>

<template>
  <section class="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
    <div class="grid gap-8 sm:gap-10 lg:grid-cols-12 lg:items-start">
      <div class="lg:col-span-5">
        <h2 class="text-xl tracking-tight text-exury-offwhite sm:text-2xl lg:text-3xl">FAQs</h2>
        <p class="mt-2 text-xs leading-relaxed text-exury-offwhite/65 sm:mt-3 sm:text-sm">
          Respuestas breves para aclarar dudas típicas antes de solicitar información.
        </p>
      </div>

      <div class="lg:col-span-7">
        <div class="space-y-2 sm:space-y-3">
          <div
            v-for="(item, i) in items"
            :key="item.q"
            class="rounded-xl border border-white/10 bg-white/[0.02] sm:rounded-2xl"
          >
            <h3>
              <button
                type="button"
                class="flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-xs font-medium text-exury-offwhite/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-exury-green focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:gap-6 sm:px-5 sm:py-4 sm:text-sm"
                :aria-expanded="openIndex === i"
                :aria-controls="`faq-panel-${i}`"
                @click="toggle(i)"
              >
                <span class="text-pretty">{{ item.q }}</span>
                <span
                  aria-hidden="true"
                  class="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] transition-transform motion-reduce:transition-none sm:h-8 sm:w-8"
                  :class="openIndex === i ? 'rotate-180' : 'rotate-0'"
                >
                  <span class="text-exury-green text-sm sm:text-base">⌄</span>
                </span>
              </button>
            </h3>

            <div
              class="grid overflow-hidden px-4 pb-0 transition-[grid-template-rows,opacity] duration-300 motion-reduce:transition-none sm:px-5"
              :class="openIndex === i ? 'grid-rows-[1fr] pb-3 opacity-100 sm:pb-4' : 'grid-rows-[0fr] pb-0 opacity-0'"
              :id="`faq-panel-${i}`"
              role="region"
              :aria-label="item.q"
            >
              <div class="overflow-hidden">
                <p class="pt-0 text-xs leading-relaxed text-exury-offwhite/70 sm:text-sm">
                  {{ item.a }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


