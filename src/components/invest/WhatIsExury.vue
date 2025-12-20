<template>
  <section class="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
    <div class="grid gap-8 sm:gap-10 lg:grid-cols-12 lg:items-start">
      <div class="lg:col-span-5">
        <h2 class="text-xl tracking-tight text-exury-offwhite sm:text-2xl lg:text-3xl">Qué es Exury</h2>
        <div class="mt-3 h-px w-12 bg-exury-green/30 sm:mt-4 sm:w-16" />
      </div>
      <div class="lg:col-span-7">
        <p class="text-pretty text-sm leading-relaxed text-exury-offwhite/75 sm:text-base lg:text-lg">
          Exury es una institución financiera regulada por el Banco de España que presta servicios de intercambio entre criptomonedas y euros
          para millones de personas en Europa.
        </p>
        <p class="mt-4 text-xs leading-relaxed text-exury-offwhite/60 sm:mt-5 sm:text-sm">
          Nuestro enfoque es institucional y orientado a cumplimiento: claridad operativa, controles y una experiencia cuidada.
          Para inversores no especializados, esto se traduce en una narrativa simple y un proceso ordenado.
        </p>
        
        <!-- Regulatory Badge -->
        <div class="group mt-6 flex items-center gap-3 rounded-xl border border-exury-green/20 bg-exury-green/10 px-4 py-3 transition-all duration-300 sm:mt-8 sm:gap-4 sm:px-5 sm:py-4 hover:border-exury-green/30 hover:bg-exury-green/15 hover:shadow-[0_0_0_1px_rgba(0,187,114,0.2),0_8px_24px_rgba(0,187,114,0.12)] hover:-translate-y-0.5">
          <img
            src="/banco-de-espana-white.png"
            alt="Banco de España"
            class="h-6 w-auto opacity-90 transition-transform duration-300 sm:h-8 group-hover:scale-110"
            loading="lazy"
          />
          <div>
            <p class="text-xs font-medium text-exury-offwhite/60 transition-colors duration-300 group-hover:text-exury-offwhite/75">Regulación</p>
            <p class="mt-0.5 text-xs font-medium text-exury-offwhite/90 transition-colors duration-300 sm:text-sm group-hover:text-exury-offwhite">Regulada por el Banco de España</p>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-12 border-t border-exury-green/10" />
  </section>
</template>


