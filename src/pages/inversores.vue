<script setup lang="ts">
import { useHead } from "@vueuse/head";
import { onMounted, nextTick } from "vue";
import InvestHero from "@/components/invest/InvestHero.vue";
import TrustStrip from "@/components/invest/TrustStrip.vue";
import InvestorProfile from "@/components/invest/InvestorProfile.vue";
import WhatIsExury from "@/components/invest/WhatIsExury.vue";
import RoundSummaryCards from "@/components/invest/RoundSummaryCards.vue";
import StructureExplainer from "@/components/invest/StructureExplainer.vue";
import WhyNow from "@/components/invest/WhyNow.vue";
import HowItWorksSteps from "@/components/invest/HowItWorksSteps.vue";
import WhatYouReceive from "@/components/invest/WhatYouReceive.vue";
import CTAForm from "@/components/invest/CTAForm.vue";
import FAQAccordion from "@/components/invest/FAQAccordion.vue";
import FinalCTA from "@/components/invest/FinalCTA.vue";
import StickyMobileCTA from "@/components/invest/StickyMobileCTA.vue";

// Use free scheduling service from env, or fallback to mailto: (always free)
const schedulingUrl =
  import.meta.env.VITE_SCHEDULING_URL ||
  `mailto:direccion@exury.io?subject=Solicitud%20de%20informaci%C3%B3n%20-%20Ronda%20de%20Inversi%C3%B3n%20Privada&body=Hola%2C%0A%0AMe%20interesa%20conocer%20m%C3%A1s%20informaci%C3%B3n%20sobre%20la%202%C2%AA%20Ronda%20de%20Inversi%C3%B3n%20Privada.%0A%0A%C2%BFPodr%C3%ADamos%20agendar%20una%20llamada%3F%0A%0AGracias.`;

const title = "2ª Ronda de Inversión Privada";
const description =
  "Acceso para inversores privados minoristas. Ronda privada abierta hasta el 28 de febrero de 2026.";

useHead({
  title: "2ª Ronda de Inversión Privada | Exury",
  meta: [
    { name: "description", content: description },
    { property: "og:title", content: "2ª Ronda de Inversión Privada | Exury" },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
  ],
});

const ctaAnchorId = "invest-cta-form";
function scrollToCta() {
  const el = document.getElementById(ctaAnchorId);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Intersection Observer for scroll-triggered animations - enhanced for mobile visibility
onMounted(() => {
  nextTick(() => {
    const observerOptions = {
      threshold: 0.05,
      rootMargin: "0px 0px -30px 0px", // Trigger earlier on mobile
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add animation class immediately
            entry.target.classList.add("animate-in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      observerOptions
    );

    // Observe all sections
    const sections = document.querySelectorAll(".invest-section");
    sections.forEach((section, index) => {
      // Add staggered delay for visual effect
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

<template>
  <div class="invest-shell relative w-full font-exury font-medium text-exury-offwhite" style="overflow: visible; height: auto;">
    <!-- Subtle premium depth inside the default layout container -->
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

    <InvestHero
      :title="title"
      subtitle="Acceso para inversores privados minoristas. Entrada temprana antes de la entrada en vigor de la ley europea Crypto MiCA."
      badge="Abierta hasta el 28 de febrero de 2026"
      :calendly-url="schedulingUrl"
      :on-primary-cta="scrollToCta"
      :show-top-bar="false"
      class="hero-animate"
    />

    <TrustStrip class="invest-section" />
    <InvestorProfile class="invest-section" />
    <WhatIsExury class="invest-section" />
    <RoundSummaryCards class="invest-section" />
    <StructureExplainer class="invest-section" />
    <WhyNow class="invest-section" />
    <HowItWorksSteps class="invest-section" />
    <WhatYouReceive class="invest-section" />

    <div :id="ctaAnchorId" class="invest-section">
      <CTAForm :calendly-url="schedulingUrl" />
    </div>

    <FAQAccordion class="invest-section" />

    <FinalCTA :calendly-url="schedulingUrl" :on-primary-cta="scrollToCta" class="invest-section" />

    <StickyMobileCTA :on-primary-cta="scrollToCta" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>

<style scoped>
.invest-shell {
  /* Ensure no nested scroll containers */
  overflow: visible;
  height: auto;
  min-height: 100%;
}

.invest-shell a {
  text-decoration: none;
}
.invest-shell a:hover {
  text-decoration: none;
}

/* Scroll-triggered animations - enhanced for mobile visibility */
.invest-section {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--animation-delay, 0s);
  will-change: opacity, transform;
}

.invest-section.animate-in-view {
  opacity: 1;
  transform: translateY(0) scale(1);
  will-change: auto;
}

/* Mobile-specific - more visible animations */
@media (max-width: 640px) {
  .invest-section {
    transform: translateY(50px) scale(0.94);
    transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
      transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .invest-section.animate-in-view {
    transform: translateY(0) scale(1);
    animation: slideUpMobile 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
}

@keyframes slideUpMobile {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.94);
  }
  to {
    opacity: 1;
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


@media (prefers-reduced-motion: reduce) {
  .invest-section {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>


