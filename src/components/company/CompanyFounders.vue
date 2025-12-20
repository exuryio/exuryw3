<script setup lang="ts">
const founders = [
  {
    name: "Rafael Tuta",
    role: "Co-Founder & CEO",
    linkedin: "https://www.linkedin.com/in/senior-product-manager-owner-rafael-tuta/",
  },
  {
    name: "Yisell Puentes",
    role: "Co-Founder & CTO",
    linkedin: "https://www.linkedin.com/in/yizpuentesc/",
  },
] as const;

function openLinkedIn(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}
</script>

<template>
  <section class="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
    <div class="grid gap-10 lg:grid-cols-12 lg:items-start">
      <div class="lg:col-span-5">
        <h2 class="text-2xl tracking-tight text-exury-offwhite sm:text-3xl lg:text-4xl">Los fundadores</h2>
        <div class="mt-4 h-px w-20 bg-exury-green/40 sm:mt-5" />
        <p class="mt-6 text-sm leading-relaxed text-exury-offwhite/80 sm:text-base">
          Dos líderes que combinaron visión estratégica, conocimiento técnico y disciplina operativa para construir una institución financiera regulada.
        </p>
      </div>

      <div class="lg:col-span-7">
        <div class="grid gap-6 sm:grid-cols-2">
          <div
            v-for="(founder, idx) in founders"
            :key="founder.name"
            class="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.02] to-white/[0.01] p-6 transition-all duration-300 sm:rounded-3xl sm:p-8 hover:border-exury-green/30 hover:bg-gradient-to-br hover:from-exury-green/10 hover:to-exury-greenDeep/10 hover:shadow-[0_0_0_1px_rgba(0,187,114,0.2),0_12px_32px_rgba(0,187,114,0.12)] hover:-translate-y-1 active:scale-[0.98] motion-reduce:transition-none"
            :style="`animation-delay: ${idx * 0.15}s`"
          >
            <!-- Gradient overlay -->
            <div
              aria-hidden="true"
              class="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-20"
              style="background: radial-gradient(circle, rgba(0,187,114,0.5), transparent 70%)"
            />

            <div class="relative z-10 flex flex-col items-center text-center">
              <!-- TECHNIQUE: Visual Hierarchy + Affordances - Avatar grande y centrado para identificación rápida -->
              <div class="relative mb-6 flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-exury-green/30 to-exury-green/20 text-4xl font-bold text-exury-offwhite shadow-[0_0_0_2px_rgba(0,187,114,0.2),0_8px_24px_rgba(0,187,114,0.15)] transition-all duration-300 group-hover:scale-110 group-hover:from-exury-green/40 group-hover:to-exury-green/30 group-hover:shadow-[0_0_0_4px_rgba(0,187,114,0.3),0_12px_32px_rgba(0,187,114,0.2)] sm:h-28 sm:w-28 sm:text-5xl">
                <!-- 
                  Para agregar fotos de perfil, descomenta el siguiente bloque y coloca las imágenes en:
                  /public/assets/company/founder-rafael-tuta.jpg
                  /public/assets/company/founder-yisell-puentes.jpg
                -->
                <!--
                <img
                  :src="`/assets/company/founder-${founder.name.toLowerCase().replace(' ', '-')}.jpg`"
                  :alt="`Foto de ${founder.name}`"
                  class="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                -->
                <span class="flex items-center justify-center">
                  {{ founder.name.charAt(0) }}
                </span>
              </div>

              <!-- TECHNIQUE: F-Pattern + Visual Hierarchy - Nombre destacado arriba para escaneo rápido -->
              <h3 class="mb-2 text-xl font-bold text-exury-offwhite transition-colors duration-300 sm:text-2xl group-hover:text-exury-green">
                {{ founder.name }}
              </h3>

              <!-- TECHNIQUE: Scannable Content - Cargo destacado -->
              <p class="mb-6 text-sm font-semibold text-exury-green/90 uppercase tracking-wide transition-colors duration-300 sm:text-base group-hover:text-exury-green">
                {{ founder.role }}
              </p>

              <!-- TECHNIQUE: Affordances + Microinteractions - Botón LinkedIn claro y visible -->
              <button
                type="button"
                @click="openLinkedIn(founder.linkedin)"
                class="inline-flex items-center gap-2 rounded-xl border border-exury-green/40 bg-exury-green/20 px-5 py-2.5 text-sm font-medium text-exury-offwhite transition-all duration-200 hover:border-exury-green/60 hover:bg-exury-green/30 hover:scale-105 hover:shadow-[0_0_0_1px_rgba(0,187,114,0.3),0_8px_16px_rgba(0,187,114,0.15)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-exury-green focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-reduce:transition-none"
                :aria-label="`Ver perfil de ${founder.name} en LinkedIn`"
              >
                <v-icon icon="mdi-linkedin" size="20" />
                <span>LinkedIn</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-12 border-t border-exury-green/10 sm:mt-16" />
  </section>
</template>

