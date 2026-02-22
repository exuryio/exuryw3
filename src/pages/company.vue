<script setup lang="ts">
import { useHead } from "@vueuse/head";
import { onMounted, nextTick, computed } from "vue";
import { useI18n } from "vue-i18n";
import CompanyHero from "@/components/company/CompanyHero.vue";
import CompanyAbout from "@/components/company/CompanyAbout.vue";
import CompanyStats from "@/components/company/CompanyStats.vue";
import CompanyFounders from "@/components/company/CompanyFounders.vue";
import CompanyTimeline from "@/components/company/CompanyTimeline.vue";
import CompanyValues from "@/components/company/CompanyValues.vue";
import CompanyCulture from "@/components/company/CompanyCulture.vue";
import CompanyRegulation from "@/components/company/CompanyRegulation.vue";
import CompanyCareers from "@/components/company/CompanyCareers.vue";
import CompanyCTA from "@/components/company/CompanyCTA.vue";

const { t } = useI18n();

const metaTitle = computed(() => t("company.metaTitle"));
const metaDescription = computed(() => t("company.metaDescription"));

useHead({
  title: metaTitle,
  meta: [
    { name: "description", content: metaDescription },
    { property: "og:title", content: metaTitle },
    { property: "og:description", content: metaDescription },
    { property: "og:type", content: "website" },
  ],
});

// Intersection Observer for scroll-triggered animations
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

    const sections = document.querySelectorAll(".company-section");
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

<template>
  <div class="company-shell relative w-full font-exury font-medium text-exury-offwhite">
    <!-- Subtle premium depth background -->
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

    <CompanyHero class="company-section hero-animate company-hero" />
    <CompanyAbout class="company-section" />
    <CompanyStats class="company-section" />
    <CompanyFounders class="company-section" />
    <CompanyTimeline class="company-section" />
    <CompanyValues class="company-section" />
    <CompanyCulture class="company-section" />
    <CompanyRegulation class="company-section" />
    <CompanyCareers class="company-section" />
    <CompanyCTA class="company-section" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>

<style scoped>
.company-shell {
  overflow: visible;
  height: auto;
  min-height: 100%;
}

.company-shell a {
  text-decoration: none;
}
.company-shell a:hover {
  text-decoration: none;
}

/* TECHNIQUE: Progressive Enhancement - Animaciones suaves para mejorar percepción de calidad */
/* Scroll-triggered animations */
.company-section {
  opacity: 0;
  transform: translateY(40px) scale(0.96);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--animation-delay, 0s);
  will-change: opacity, transform;
}

.company-section.animate-in-view {
  opacity: 1;
  transform: translateY(0) scale(1);
  will-change: auto;
}

/* Mobile-specific animations */
@media (max-width: 640px) {
  .company-section {
    transform: translateY(50px) scale(0.94);
    transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
      transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .company-section.animate-in-view {
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
  .company-hero {
    margin-top: clamp(60px, 8vw, 80px);
  }
}

@media (max-width: 380px) {
  .company-hero {
    margin-top: clamp(50px, 7vw, 70px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .company-section {
    opacity: 1;
    transform: none;
    transition: none;
  }
  
  .hero-animate {
    animation: none;
  }
}
</style>

