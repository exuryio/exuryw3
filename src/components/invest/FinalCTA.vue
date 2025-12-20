<script setup lang="ts">
type Props = {
  calendlyUrl: string;
  onPrimaryCta: () => void;
};

defineProps<Props>();
</script>

<template>
  <section class="mx-auto w-full max-w-6xl px-4 pb-20 pt-2 sm:px-6 sm:pb-16 lg:px-8">
    <div class="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur-xl sm:rounded-3xl sm:p-8 lg:p-10">
      <div
        aria-hidden="true"
        class="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full blur"
        style="background: radial-gradient(circle, rgba(0,187,114,0.18), transparent 60%)"
      />
      <div
        aria-hidden="true"
        class="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full blur"
        style="background: radial-gradient(circle, rgba(5,70,41,0.28), transparent 60%)"
      />

      <div class="grid gap-6 sm:gap-8 lg:grid-cols-12 lg:items-center">
        <div class="lg:col-span-7">
          <h2 class="text-xl tracking-tight text-exury-offwhite sm:text-2xl lg:text-3xl">
            ¿Quieres recibir la información completa?
          </h2>
          <p class="mt-3 text-xs leading-relaxed text-exury-offwhite/70 sm:mt-4 sm:text-sm lg:text-base">
            Si encajas como inversor privado minorista, te compartimos el contexto, la estructura de la operación y los siguientes
            pasos disponibles. Sin presión comercial.
          </p>
          <p class="mt-4 text-xs leading-relaxed text-exury-offwhite/55">
            Esta comunicación es informativa y no constituye una oferta pública.
          </p>
        </div>

        <div class="lg:col-span-5">
          <div class="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <button
              type="button"
              class="inline-flex w-full items-center justify-center rounded-xl bg-exury-green px-5 py-3 text-sm font-medium text-black shadow-exury-glow transition-all duration-200 active:scale-95 active:brightness-95 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-exury-green focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-reduce:transition-none"
              @click="onPrimaryCta"
            >
              Solicita más información
            </button>

            <a
              :href="calendlyUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex w-full items-center justify-center rounded-xl border border-white/12 bg-white/[0.02] px-5 py-3 text-sm font-medium text-exury-offwhite no-underline transition-all duration-200 active:scale-95 active:border-white/18 active:bg-white/[0.05] hover:border-white/18 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-exury-green focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-reduce:transition-none"
            >
              Agenda una llamada
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


