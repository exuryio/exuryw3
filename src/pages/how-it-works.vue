<template>
  <div class="how-it-works-shell relative w-full font-exury font-medium text-exury-offwhite">
    <!-- TECHNIQUE: Visual Hierarchy + 8pt Grid System -->
    <section class="how-it-works-section hero-animate mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col">
        <div class="max-w-3xl">
          <!-- TECHNIQUE: Visual Hierarchy - Título grande y bold -->
          <h1 class="text-2xl tracking-tight text-exury-offwhite sm:text-3xl lg:text-4xl">
            How it works?
          </h1>
          <!-- TECHNIQUE: Gestalt Continuity - Línea divisoria -->
          <div class="mt-4 h-px w-20 bg-exury-green/40 sm:mt-5" />
          <!-- TECHNIQUE: Scannable Content -->
          <p class="mt-6 text-sm leading-relaxed text-exury-offwhite/80 sm:text-base">
            ¡Intercambia tus criptoactivos con EXURY en solo 4 simples pasos! Sigue nuestra guía rápida y segura para completar tu transacción sin complicaciones.
          </p>
          <!-- TECHNIQUE: Affordances - Botón claro con hover effect -->
          <div class="mt-8">
            <router-link to="/home" custom v-slot="{ href, navigate }">
              <v-btn
                rounded
                variant="outlined"
                class="group border border-white/20 bg-white/[0.03] text-exury-green transition-all duration-300 hover:border-exury-green/40 hover:bg-exury-green/10 hover:shadow-[0_0_0_1px_rgba(0,187,114,0.2),0_4px_12px_rgba(0,187,114,0.1)] active:scale-95 text-capitalize"
                :href="href"
                @click="navigate"
              >
                Empezar
              </v-btn>
            </router-link>
          </div>
        </div>
        <!-- TECHNIQUE: White Space - Espaciado reducido para mostrar más información inmediatamente (8pt grid: 16px = 2 × 8px) -->
        <div class="w-full relative z-0 mt-4 sm:mt-6">
          <OnBoardingCardGroup />
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, nextTick } from "vue";
import OnBoardingCardGroup from "@/components/cards/OnBoardingCardGroup.vue";

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

    const sections = document.querySelectorAll(".how-it-works-section");
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
.how-it-works-shell {
  overflow: visible;
  height: auto;
  min-height: 100%;
  position: relative;
  z-index: 1;
}

.how-it-works-shell a {
  text-decoration: none;
}

.how-it-works-shell a:hover {
  text-decoration: none;
}

/* TECHNIQUE: Progressive Enhancement - Animaciones suaves */
.how-it-works-section {
  opacity: 0;
  transform: translateY(40px) scale(0.96);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--animation-delay, 0s);
  will-change: opacity, transform;
}

.how-it-works-section.animate-in-view {
  opacity: 1;
  transform: translateY(0) scale(1);
  will-change: auto;
}

/* Mobile-specific animations */
@media (max-width: 640px) {
  .how-it-works-section {
    transform: translateY(50px) scale(0.94);
    transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
      transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .how-it-works-section.animate-in-view {
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

/* TECHNIQUE: 8pt Grid System + Visual Hierarchy - Espaciado uniforme y profesional */
/* Spacing to avoid header overlap - consistent with company page (8pt grid: 64px, 72px, 80px) */
.how-it-works-section.hero-animate {
  padding-top: clamp(64px, 6vw, 80px);
  padding-bottom: clamp(40px, 5vw, 60px);
  margin-top: 0;
}

@media (max-width: 768px) {
  .how-it-works-section.hero-animate {
    padding-top: clamp(60px, 6vw, 72px);
    padding-bottom: clamp(32px, 4vw, 48px);
    margin-top: 0;
  }
}

@media (max-width: 380px) {
  .how-it-works-section.hero-animate {
    padding-top: clamp(56px, 5vw, 64px);
    padding-bottom: clamp(24px, 3vw, 40px);
    margin-top: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .how-it-works-section {
    opacity: 1;
    transform: none;
    transition: none;
  }
  
  .hero-animate {
    animation: none;
  }
}
</style>