<template>
  <div class="contact-shell relative w-full font-exury font-medium text-exury-offwhite">
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
    <section class="contact-section hero-animate mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8 lg:pt-16">
      <div class="mb-10 lg:mb-14">
        <h1 class="text-2xl tracking-tight text-exury-offwhite sm:text-3xl lg:text-4xl">Contact</h1>
        <!-- TECHNIQUE: Gestalt Continuity - Línea divisoria -->
        <div class="mt-4 h-px w-20 bg-exury-green/40 sm:mt-5" />
        <!-- TECHNIQUE: Scannable Content -->
        <p class="mt-6 text-sm leading-relaxed text-exury-offwhite/80 sm:text-base">
          Contacta con nuestro equipo para recibir asistencia inmediata con tus operaciones o para cualquier consulta.
        </p>
      </div>

      <!-- TECHNIQUE: Chunking + Card-based Design -->
      <div class="grid gap-6 sm:grid-cols-2 sm:gap-6">
        <div
          v-for="(card, index) in contents"
          :key="index"
          class="group rounded-2xl border border-white/10 bg-gradient-to-br from-black/50 via-black/40 to-exury-greenDeep/30 p-6 backdrop-blur-xl transition-all duration-300 sm:rounded-3xl sm:p-8 hover:border-exury-green/25 hover:bg-gradient-to-br hover:from-black/60 hover:via-black/50 hover:to-exury-greenDeep/40 hover:shadow-[0_0_0_1px_rgba(0,187,114,0.15),0_8px_24px_rgba(0,187,114,0.08)] hover:-translate-y-1"
        >
          <!-- TECHNIQUE: Visual Support - Imagen -->
          <div class="mb-6 flex justify-center">
            <div class="relative h-32 w-32 overflow-hidden rounded-xl sm:h-40 sm:w-40">
              <img
                :src="card.image"
                :alt="card.title"
                class="h-full w-full object-contain"
                loading="lazy"
              />
            </div>
          </div>

          <!-- TECHNIQUE: Scannable Content -->
          <div class="text-center">
            <h2 class="mb-4 text-xl font-bold text-exury-green transition-colors duration-300 sm:text-2xl group-hover:text-exury-green/90">
              {{ card.title }}
            </h2>
            <p class="mb-6 text-sm leading-relaxed text-exury-offwhite/75 transition-colors duration-300 sm:text-base group-hover:text-exury-offwhite/90">
              {{ card.description }}
            </p>

            <!-- TECHNIQUE: Affordances - Botones con hover effects -->
            <template v-if="card.title === 'Whatsapp'">
              <a :href="card.link" target="_blank" class="contact-button">
                <v-btn
                  rounded
                  variant="outlined"
                  class="w-full border border-white/20 bg-white/[0.03] text-exury-green transition-all duration-300 hover:border-exury-green/40 hover:bg-exury-green/10 hover:shadow-[0_0_0_1px_rgba(0,187,114,0.2),0_4px_12px_rgba(0,187,114,0.1)] active:scale-95 text-capitalize"
                >
                  {{ card.button }}
                </v-btn>
              </a>
            </template>
            <template v-else-if="card.title === 'Email'">
              <a :href="`mailto:direccion@exury.io?subject=Consulta%20desde%20la%20web&body=Hola,%20tengo%20una%20consulta`" class="contact-button">
                <v-btn
                  rounded
                  variant="outlined"
                  class="w-full border border-white/20 bg-white/[0.03] text-exury-green transition-all duration-300 hover:border-exury-green/40 hover:bg-exury-green/10 hover:shadow-[0_0_0_1px_rgba(0,187,114,0.2),0_4px_12px_rgba(0,187,114,0.1)] active:scale-95 text-capitalize"
                >
                  {{ card.button }}
                </v-btn>
              </a>
            </template>
            <template v-else>
              <v-btn
                rounded
                variant="outlined"
                class="w-full border border-white/20 bg-white/[0.03] text-exury-green transition-all duration-300 hover:border-exury-green/40 hover:bg-exury-green/10 hover:shadow-[0_0_0_1px_rgba(0,187,114,0.2),0_4px_12px_rgba(0,187,114,0.1)] active:scale-95 text-capitalize"
              >
                {{ card.button }}
              </v-btn>
            </template>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from "vue";

const whatsappNumber = '+34604117851';
const message = 'Hola estoy interesadx en saber más';
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

const contents = [
  {
    title: 'Whatsapp',
    description: '¿Necesitas ayuda o quieres hacer una operación? Escríbenos y te asistiremos al instante.',
    button: '¡Chatea con Nosotros!',
    link: whatsappLink,
    image: '/assets/contact/Contactusexury-01.svg'
  },
  {
    title: 'Email',
    description: 'Para consultas escríbenos al email direccion@exury.io responderemos rápido con la información solicitada.',
    button: '¡Escríbenos ahora!',
    link: '', // No es necesario un enlace aquí, se usará mailto
    image: '/assets/contact/Contactusexury-02.svg'
  }
];

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

    const sections = document.querySelectorAll(".contact-section");
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
.contact-shell {
  overflow: visible;
  height: auto;
  min-height: 100%;
}

.contact-shell a {
  text-decoration: none;
}

.contact-shell a:hover {
  text-decoration: none;
}

/* TECHNIQUE: Progressive Enhancement - Animaciones suaves */
.contact-section {
  opacity: 0;
  transform: translateY(40px) scale(0.96);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--animation-delay, 0s);
  will-change: opacity, transform;
}

.contact-section.animate-in-view {
  opacity: 1;
  transform: translateY(0) scale(1);
  will-change: auto;
}

/* Mobile-specific animations */
@media (max-width: 640px) {
  .contact-section {
    transform: translateY(50px) scale(0.94);
    transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
      transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .contact-section.animate-in-view {
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
  .contact-section.hero-animate {
    margin-top: clamp(60px, 8vw, 80px);
  }
}

@media (max-width: 380px) {
  .contact-section.hero-animate {
    margin-top: clamp(50px, 7vw, 70px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .contact-section {
    opacity: 1;
    transform: none;
    transition: none;
  }
  
  .hero-animate {
    animation: none;
  }
}
</style>