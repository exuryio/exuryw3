<template>
  <div class="faq-shell relative w-full font-exury font-medium text-exury-offwhite">
    <!-- TECHNIQUE: Depth & Layering - Gradientes sutiles para profundidad premium -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 -z-10"
      style="
        background:
          radial-gradient(800px circle at 20% 8%, rgba(0, 187, 114, 0.12), transparent 60%),
          radial-gradient(700px circle at 80% 20%, rgba(5, 70, 41, 0.22), transparent 58%),
          radial-gradient(700px circle at 50% 90%, rgba(2, 50, 28, 0.18), transparent 62%);
      "
    />

    <!-- TECHNIQUE: Visual Hierarchy + 8pt Grid System -->
    <section class="faq-section hero-animate mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8 lg:pt-16">
      <div class="mb-10 lg:mb-14">
        <h2 class="text-2xl tracking-tight text-exury-offwhite sm:text-3xl lg:text-4xl">Preguntas Frecuentes (FAQ)</h2>
        <!-- TECHNIQUE: Gestalt Continuity - Línea divisoria -->
        <div class="mt-4 h-px w-20 bg-exury-green/40 sm:mt-5" />
        <!-- TECHNIQUE: Scannable Content -->
        <p class="mt-6 text-sm leading-relaxed text-exury-offwhite/80 sm:text-base">
          Encuentra respuestas rápidas a las preguntas más comunes y descubre cómo empezar con EXURY. ¡Todo lo que necesitas saber para intercambiar criptomonedas de forma segura está aquí!
        </p>
      </div>

      <!-- TECHNIQUE: Progressive Disclosure - Accordion para chunking -->
      <div class="space-y-6">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="group rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 sm:rounded-2xl sm:p-6 hover:border-exury-green/25 hover:bg-white/[0.04] hover:shadow-[0_0_0_1px_rgba(0,187,114,0.15),0_4px_16px_rgba(0,187,114,0.06)]"
        >
          <button
            @click="onDropDownQuestion(index)"
            class="flex w-full items-center justify-between gap-4 text-left"
            :aria-expanded="isOpen(index)"
            :aria-controls="`question_${index}`"
          >
            <h3 class="text-base font-semibold text-exury-offwhite transition-colors duration-300 sm:text-lg group-hover:text-exury-green">
              {{ item.title }}
            </h3>
            <v-icon
              :id="`icon_plus_${index}`"
              class="flex-shrink-0 text-exury-green transition-transform duration-300"
              :class="{ 'rotate-45': isOpen(index) }"
            >
              mdi-plus
            </v-icon>
          </button>
          <div
            :id="`question_${index}`"
            class="question-content mt-4 overflow-hidden transition-all duration-300"
            :class="{ 'max-h-0 opacity-0': !isOpen(index), 'max-h-[500px] opacity-100': isOpen(index) }"
          >
            <p class="text-sm leading-relaxed text-exury-offwhite/75 sm:text-base">
              {{ item.answer }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';

const items = ref([
  {title: "1.1. ¿Cómo me registro en EXURY?", answer: "Regístrate en EXURY visitando nuestra web, completando el formulario y verificando tu cuenta a través del correo de confirmación."},
  {title: "1.2. ¿De que se trata el proceso de KYC?", answer: "KYC es un proceso de verificación de identidad que garantiza la seguridad de los usuarios, cumpliendo con normativas internacionales."},
  {title: "1.3. ¿Cuanto dura el proceso de verificación?", answer: "El proceso de verificación suele completarse en menos de 24 horas, dependiendo de la documentación"},
  {title: "2.1. ¿Cómo realizo un intercambio de criptomonedas a euros o viceversa?", answer: "Recibiras un mensaje con la cantidad que solicites intercambiar, junto a una oferta personalizada por parte de nuestros agentes, una vez confirmada la transacción, tus fondos estarán disponibles en minutos en la wallet que nos indiques"},
  {title: "2.2. ¿Cuáles son las tarifas de intercambio en EXURY?", answer:"Ofrecemos tarifas bajas y transparentes, que pueden variar según la criptomoneda y el volumen, al registrate nuestra asistencia personalizada te brindará todos los detalles"},
  {title: "2.3. ¿Cómo puedo asegurar la seguridad de mis criptomonedas en EXURY?", answer: "EXURY protege tus fondos con tecnología avanzada y al ser sin custodia, tú mantienes el control total de tus claves privadas."},
  {title: "3.1. ¿Cómo funciona el soporte al cliente en EXURY?", answer: "Nuestro soporte al cliente está disponible 24/7 a través de chat, correo electrónico y teléfono para asistencia personalizada."},
  {title: "3.3. ¿Hay límites de intercambio en la plataforma?", answer: "Los límites dependen de la criptomoneda y tu nivel de verificación; aumenta tu verificación para ampliar tus límites de intercambio."},
])

const openQuestions = ref<Set<number>>(new Set());

const isOpen = (index: number) => {
  return openQuestions.value.has(index);
}

const onDropDownQuestion = (index: number) => {
  if (openQuestions.value.has(index)) {
    openQuestions.value.delete(index);
  } else {
    openQuestions.value.add(index);
  }
}

// TECHNIQUE: Progressive Enhancement - Animaciones scroll-triggered
onMounted(() => {
  nextTick(() => {
    const observerOptions = {
      threshold: 0.05,
      rootMargin: "0px 0px -30px 0px",
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      observerOptions
    );

    const sections = document.querySelectorAll(".faq-section");
    sections.forEach((section, index) => {
      if (section instanceof HTMLElement) {
        section.style.setProperty("--animation-delay", `${index * 0.1}s`);
      }
      observer.observe(section);
    });

    // Show first section immediately if already visible
    if (sections.length > 0 && sections[0] instanceof HTMLElement) {
      const firstSection = sections[0];
      const rect = firstSection.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        firstSection.classList.add("animate-in-view");
      }
    }
  });
});
</script>
<style scoped>
.faq-shell {
  overflow: visible;
  height: auto;
  min-height: 100%;
}

.faq-shell a {
  text-decoration: none;
}

.faq-shell a:hover {
  text-decoration: none;
}

/* TECHNIQUE: Progressive Enhancement - Animaciones suaves */
.faq-section {
  opacity: 0;
  transform: translateY(40px) scale(0.96);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--animation-delay, 0s);
  will-change: opacity, transform;
}

.faq-section.animate-in-view {
  opacity: 1;
  transform: translateY(0) scale(1);
  will-change: auto;
}

/* Mobile-specific animations */
@media (max-width: 640px) {
  .faq-section {
    transform: translateY(50px) scale(0.94);
    transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
      transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .faq-section.animate-in-view {
    transform: translateY(0) scale(1);
  }
}

/* Hero animation - always visible */
.hero-animate {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Mobile spacing to avoid header overlap */
@media (max-width: 768px) {
  .faq-section.hero-animate {
    margin-top: clamp(60px, 8vw, 80px);
  }
}

@media (max-width: 380px) {
  .faq-section.hero-animate {
    margin-top: clamp(50px, 7vw, 70px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .faq-section {
    opacity: 1;
    transform: none;
    transition: none;
  }
  
  .hero-animate {
    animation: none;
  }
}
</style>
