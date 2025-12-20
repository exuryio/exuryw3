<script setup lang="ts">
type Props = {
  title: string;
  subtitle: string;
  badge: string;
  calendlyUrl: string;
  onPrimaryCta: () => void;
  showTopBar?: boolean;
};

withDefaults(defineProps<Props>(), {
  showTopBar: true,
});
</script>

<template>
  <header class="relative">
    <div
      class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
      :class="showTopBar ? 'pt-8 sm:pt-10' : 'pt-16 sm:pt-20'"
    >
      <div v-if="showTopBar" class="flex items-center justify-between">
        <a
          href="/home"
          class="inline-flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-exury-green focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          aria-label="Ir a Exury"
        >
          <img src="/LogoExury1.png" alt="Exury" class="h-7 w-auto opacity-95" />
        </a>

        <a
          :href="calendlyUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-exury-offwhite/90 no-underline transition hover:border-white/15 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-exury-green focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-reduce:transition-none sm:inline-flex"
        >
          Agenda una llamada
          <span aria-hidden="true" class="text-exury-green/90">→</span>
        </a>
      </div>

      <div class="relative mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur-xl sm:mt-12 sm:rounded-3xl sm:p-10">
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
        <div
          class="inline-flex items-center rounded-full border border-exury-green/20 bg-exury-green/10 px-4 py-2 text-xs tracking-wide text-exury-offwhite/90 transition-all duration-300 active:scale-95 active:border-exury-green/30 active:bg-exury-green/15 hover:border-exury-green/30 hover:bg-exury-green/15 hover:shadow-[0_0_0_4px_rgba(0,187,114,0.1)]"
          role="status"
        >
          <span class="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-exury-green animate-pulse" aria-hidden="true" />
          {{ badge }}
        </div>

        <div class="mt-6 grid gap-8 sm:gap-10 lg:grid-cols-12 lg:items-start">
          <div class="lg:col-span-7">
            <h1
              class="max-w-3xl text-balance text-3xl leading-tight tracking-tight text-exury-offwhite sm:text-4xl lg:text-5xl sm:leading-tight"
            >
              {{ title }}
            </h1>

            <p class="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-exury-offwhite/75 sm:text-base lg:text-lg">
              {{ subtitle }}
            </p>

            <p class="mt-4 max-w-2xl text-xs leading-relaxed text-exury-offwhite/60 sm:text-sm">
              Si eres inversor privado minorista y quieres entender la oportunidad con claridad (sin tecnicismos), aquí tienes el
              contexto y un canal directo para solicitar información.
            </p>

            <div class="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
              <button
                type="button"
                class="group inline-flex w-full items-center justify-center rounded-xl bg-exury-green px-5 py-3 text-sm font-medium text-black shadow-exury-glow transition-all duration-300 active:scale-95 active:brightness-95 hover:brightness-110 hover:scale-105 hover:shadow-[0_0_0_1px_rgba(0,187,114,0.3),0_16px_48px_rgba(0,187,114,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-exury-green focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-reduce:transition-none sm:w-auto"
                @click="onPrimaryCta"
              >
                Solicita más información
                <span
                  aria-hidden="true"
                  class="ml-2 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                  >→</span
                >
              </button>

              <a
                :href="calendlyUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="group-secondary inline-flex w-full items-center justify-center rounded-xl border border-white/12 bg-white/[0.02] px-5 py-3 text-sm font-medium text-exury-offwhite no-underline transition-all duration-300 active:scale-95 active:border-white/18 active:bg-white/[0.05] hover:border-white/18 hover:bg-white/[0.05] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-exury-green focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-reduce:transition-none sm:w-auto"
              >
                Agenda una llamada
              </a>
            </div>

            <div class="mt-8 border-t border-exury-green/10 pt-4 sm:mt-10 sm:pt-6">
              <p class="max-w-3xl text-xs leading-relaxed text-exury-offwhite/60 sm:text-sm">
                Esta página es informativa. No constituye una oferta pública ni una recomendación de inversión.
              </p>
            </div>
          </div>

          <aside class="mt-8 lg:col-span-5 lg:mt-0">
            <div
              class="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 active:scale-[0.98] active:border-exury-green/25 active:bg-white/[0.03] sm:rounded-2xl sm:p-6 hover:border-exury-green/20 hover:bg-white/[0.03] hover:shadow-[0_0_0_1px_rgba(0,187,114,0.15),0_8px_24px_rgba(0,187,114,0.08)]"
              aria-label="Resumen visual"
            >
              <div
                aria-hidden="true"
                class="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full"
                style="background: radial-gradient(circle, rgba(0,187,114,0.22), transparent 60%); animation: pulse-glow 3s ease-in-out infinite;"
              />
              <p class="text-xs tracking-wide text-exury-offwhite/60">Resumen en 30 segundos</p>
              <h2 class="mt-2 text-base tracking-tight text-exury-offwhite/90 sm:text-lg">Una ronda privada, con cupo limitado</h2>

              <dl class="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
                <div class="flex items-start justify-between gap-4">
                  <dt class="text-sm text-exury-offwhite/60">Estructura</dt>
                  <dd class="text-right text-sm text-exury-offwhite/85">
                    Equity<br /><span class="text-xs text-exury-offwhite/55">ampliación de capital + prima de emisión</span>
                  </dd>
                </div>
                <div class="h-px w-full bg-exury-green/10" aria-hidden="true" />
                <div class="flex items-start justify-between gap-4">
                  <dt class="text-sm text-exury-offwhite/60">Cupo</dt>
                  <dd class="text-right text-sm text-exury-offwhite/85">Máximo 5 inversores</dd>
                </div>
                <div class="h-px w-full bg-exury-green/10" aria-hidden="true" />
                <div class="flex items-start justify-between gap-4">
                  <dt class="text-sm text-exury-offwhite/60">Plazo</dt>
                  <dd class="text-right text-sm text-exury-offwhite/85">Hasta el 28/02/2026</dd>
                </div>
              </dl>

              <div class="mt-4 rounded-xl border border-white/10 bg-black/30 p-3 sm:mt-6 sm:p-4">
                <p class="text-xs text-exury-offwhite/60">Cómo avanzar</p>
                <ol class="mt-2 space-y-1.5 text-xs text-exury-offwhite/80 sm:space-y-2 sm:text-sm">
                  <li class="flex gap-2 transition-all duration-300 hover:translate-x-1">
                    <span class="text-exury-green transition-transform duration-300 hover:scale-125">1</span>
                    <span>Solicita información</span>
                  </li>
                  <li class="flex gap-2 transition-all duration-300 hover:translate-x-1" style="transition-delay: 0.05s;">
                    <span class="text-exury-green transition-transform duration-300 hover:scale-125">2</span>
                    <span>Agenda una llamada</span>
                  </li>
                  <li class="flex gap-2 transition-all duration-300 hover:translate-x-1" style="transition-delay: 0.1s;">
                    <span class="text-exury-green transition-transform duration-300 hover:scale-125">3</span>
                    <span>Recibe detalles y próximos pasos</span>
                  </li>
                </ol>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </header>
</template>


