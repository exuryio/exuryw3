<script setup lang="ts">
</script>

<template>
  <section class="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
    <div class="grid gap-10 lg:grid-cols-12 lg:items-start">
      <div class="lg:col-span-5">
        <h2 class="text-2xl tracking-tight text-exury-offwhite sm:text-3xl lg:text-4xl">Nuestra historia</h2>
        <div class="mt-4 h-px w-20 bg-exury-green/40 sm:mt-5" />
        <p class="mt-6 text-sm leading-relaxed text-exury-offwhite/80 sm:text-base">
          De la visión de dos traders a una institución financiera regulada. Una transformación que demuestra cómo el conocimiento, la disciplina y la visión a largo plazo construyen el futuro de las finanzas en Europa.
        </p>
      </div>

      <!-- TECHNIQUE: Visual Storytelling + Gestalt Proximity - Timeline con espaciado consistente (8pt grid: space-y-6 = 24px) -->
      <div class="lg:col-span-7">
        <div class="space-y-6">
          <!-- STORYTELLING: El momento de la visión - Tono aspirational, arquetipo Sabio (Yisell ve el futuro) -->
          <!-- 2019 - La visión -->
          <div class="group relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 sm:rounded-3xl sm:p-7 hover:border-exury-green/25 hover:bg-white/[0.05] hover:shadow-[0_0_0_1px_rgba(0,187,114,0.15),0_8px_24px_rgba(0,187,114,0.08)] hover:-translate-y-1 active:scale-[0.99]">
            <div class="relative flex items-start gap-5">
              <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-exury-green/25 text-sm font-bold text-exury-offwhite transition-all duration-300 group-hover:scale-110 group-hover:bg-exury-green/35 sm:h-14 sm:w-14 sm:rounded-3xl sm:text-base">
                2019
              </div>
              <div class="flex-1">
                <!-- TECHNIQUE: Scannable Content + Chunking + Storytelling - Texto dividido en frases cortas con narrativa fluida -->
                <h3 class="mb-2 text-base font-semibold text-exury-offwhite sm:text-lg">La visión</h3>
                <p class="text-sm leading-relaxed text-exury-offwhite/85 sm:text-base">
                  Ethereum cotizaba a 170€ cuando <strong class="text-exury-green font-semibold">Yisell Puentes</strong> reconoció lo que otros no veían. Le compartió su visión a <strong class="text-exury-green font-semibold">Rafael Tuta</strong>, quien decidió probar con 70€. En semanas, ese capital creció <strong class="text-exury-offwhite font-semibold">+120%</strong>. Ese momento cambió todo: no era suerte, era el resultado de entender ciclos, tecnología y momento histórico.
                </p>
              </div>
            </div>
          </div>

          <!-- STORYTELLING: La disciplina del aprendizaje - Arquetipo Sabio (estudio, conocimiento) -->
          <!-- 2019-2021 - La maestría -->
          <div class="group relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 sm:rounded-3xl sm:p-7 hover:border-exury-green/25 hover:bg-white/[0.05] hover:shadow-[0_0_0_1px_rgba(0,187,114,0.15),0_8px_24px_rgba(0,187,114,0.08)] hover:-translate-y-1 active:scale-[0.99]">
            <div class="relative flex items-start gap-5">
              <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-exury-green/25 text-sm font-bold text-exury-offwhite transition-all duration-300 group-hover:scale-110 group-hover:bg-exury-green/35 sm:h-14 sm:w-14 sm:rounded-3xl sm:text-base">
                2019-21
              </div>
              <div class="flex-1">
                <h3 class="mb-2 text-base font-semibold text-exury-offwhite sm:text-lg">La maestría</h3>
                <p class="text-sm leading-relaxed text-exury-offwhite/85 sm:text-base">
                  Después de retirar su capital, Rafael comprendió algo fundamental: <strong class="text-exury-offwhite font-semibold">la volatilidad no es enemiga cuando se entiende</strong>. Esa revelación marcó el inicio de un período de estudio profundo. <strong class="text-exury-green font-semibold">Juntos</strong>, Yisell y Rafael se sumergieron en análisis de mercados, blockchain y patrones de trading. No buscaban atajos: buscaban dominio. Y lo encontraron.
                </p>
              </div>
            </div>
          </div>

          <!-- STORYTELLING: La innovación - Arquetipo Gobernante (control, excelencia) + Sabio (sabiduría técnica) -->
          <!-- 2021 - La innovación -->
          <div class="group relative overflow-hidden rounded-2xl border border-exury-green/30 bg-gradient-to-br from-exury-green/15 to-exury-greenDeep/20 p-6 backdrop-blur-sm transition-all duration-300 sm:rounded-3xl sm:p-7 hover:border-exury-green/40 hover:bg-gradient-to-br hover:from-exury-green/20 hover:to-exury-greenDeep/25 hover:shadow-[0_0_0_2px_rgba(0,187,114,0.25),0_12px_32px_rgba(0,187,114,0.15)] hover:-translate-y-1 active:scale-[0.99]">
            <div class="relative flex items-start gap-5">
              <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-exury-green/40 text-sm font-bold text-exury-offwhite transition-all duration-300 group-hover:scale-110 group-hover:bg-exury-green/50 sm:h-14 sm:w-14 sm:rounded-3xl sm:text-base">
                2021
              </div>
              <div class="flex-1">
                <h3 class="mb-2 text-base font-semibold text-exury-offwhite sm:text-lg">La innovación</h3>
                <p class="text-sm leading-relaxed text-exury-offwhite/85 sm:text-base">
                  Tras la pandemia, cuando el mundo buscaba nuevas formas de operar, <strong class="text-exury-green font-semibold">Rafael</strong> desarrolló su primer macro para automatizar operaciones. Entonces <strong class="text-exury-green font-semibold">Yisell</strong> vio el potencial: "Esa macro puede convertirse en código". Combinando la experiencia práctica de Rafael con la visión técnica de Yisell, dieron vida a <strong class="text-exury-green font-semibold">THE MACHINE</strong>: un sistema que no solo ejecuta, sino que <em class="text-exury-offwhite/90">entiende</em> cuándo actuar. La primera versión de lo que hoy es Exury.
                </p>
              </div>
            </div>
          </div>

          <!-- STORYTELLING: La transformación - Arquetipo Gobernante (liderazgo, visión estratégica) -->
          <!-- 2021-2023 - La transformación -->
          <div class="group relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 sm:rounded-3xl sm:p-7 hover:border-exury-green/25 hover:bg-white/[0.05] hover:shadow-[0_0_0_1px_rgba(0,187,114,0.15),0_8px_24px_rgba(0,187,114,0.08)] hover:-translate-y-1 active:scale-[0.99]">
            <div class="relative flex items-start gap-5">
              <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-exury-green/25 text-sm font-bold text-exury-offwhite transition-all duration-300 group-hover:scale-110 group-hover:bg-exury-green/35 sm:h-14 sm:w-14 sm:rounded-3xl sm:text-base">
                2021-23
              </div>
              <div class="flex-1">
                <h3 class="mb-2 text-base font-semibold text-exury-offwhite sm:text-lg">La transformación</h3>
                <p class="text-sm leading-relaxed text-exury-offwhite/85 sm:text-base">
                  Comprendieron que para construir algo que perdure, necesitaban perspectiva global. <strong class="text-exury-green font-semibold">Viajaron por el mundo</strong>, observando cómo diferentes mercados operaban, cómo las regulaciones evolucionaban y cómo los traders buscaban soluciones. Cada ciudad, cada conversación, cada observación refinó su visión. No solo perfeccionaban un algoritmo: estaban construyendo los cimientos de una institución financiera. Fue en ese proceso de aprendizaje continuo que nació <strong class="text-exury-green font-semibold">EXURY</strong>: no como una idea, sino como una convicción de que el futuro de las finanzas requiere excelencia, regulación y un enfoque humano.
                </p>
              </div>
            </div>
          </div>

          <!-- STORYTELLING: La fundación - Arquetipo Gobernante (autoridad, orden, estándares) + Sabio (sabiduría aplicada) -->
          <!-- 2023 - La fundación -->
          <div class="group relative overflow-hidden rounded-2xl border border-exury-green/40 bg-gradient-to-br from-exury-green/20 to-exury-greenDeep/25 p-6 backdrop-blur-sm transition-all duration-300 sm:rounded-3xl sm:p-7 hover:border-exury-green/50 hover:bg-gradient-to-br hover:from-exury-green/25 hover:to-exury-greenDeep/30 hover:shadow-[0_0_0_2px_rgba(0,187,114,0.3),0_16px_40px_rgba(0,187,114,0.2)] hover:-translate-y-1 active:scale-[0.99]">
            <div class="relative flex items-start gap-5">
              <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-exury-green/50 text-sm font-bold text-exury-offwhite shadow-[0_0_0_2px_rgba(0,187,114,0.3)] transition-all duration-300 group-hover:scale-110 group-hover:bg-exury-green/60 group-hover:shadow-[0_0_0_4px_rgba(0,187,114,0.4)] sm:h-14 sm:w-14 sm:rounded-3xl sm:text-base">
                2023
              </div>
              <div class="flex-1">
                <h3 class="mb-2 text-base font-semibold text-exury-offwhite sm:text-lg">La fundación</h3>
                <p class="text-sm leading-relaxed text-exury-offwhite/85 sm:text-base">
                  En <strong class="text-exury-green font-semibold">Madrid, España</strong>, Exury se establece como institución financiera regulada por el Banco de España. No fue un paso casual: fue la culminación de años de preparación, estudio y visión. <strong class="text-exury-green font-semibold">Rafael y Yisell</strong> habían aprendido que la excelencia requiere estándares, que la innovación necesita orden, y que el futuro de las finanzas digitales se construye con autoridad y conocimiento. Hoy, Exury opera para traders que, como ellos, buscan realizar intercambios de manera <strong class="text-exury-green font-semibold">segura, rápida y con un toque humano</strong>. Porque creemos que la tecnología financiera debe servir a las personas, no reemplazarlas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-12 border-t border-exury-green/10 sm:mt-16" />
  </section>
</template>

