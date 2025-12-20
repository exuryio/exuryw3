<script setup lang="ts">
import { useHead } from "@vueuse/head";
import InvestHero from "@/components/invest/InvestHero.vue";
import WhatIsExury from "@/components/invest/WhatIsExury.vue";
import RoundSummaryCards from "@/components/invest/RoundSummaryCards.vue";
import WhyNow from "@/components/invest/WhyNow.vue";
import CTAForm from "@/components/invest/CTAForm.vue";
import FAQAccordion from "@/components/invest/FAQAccordion.vue";
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

const ctaAnchorId = "cta-form";

function scrollToCta() {
  const el = document.getElementById(ctaAnchorId);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}
</script>

<template>
  <div
    class="relative h-screen w-full overflow-y-auto bg-black font-exury font-medium text-exury-offwhite"
  >
    <!-- Premium depth background -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0"
      style="
        background:
          radial-gradient(1000px circle at 20% 12%, rgba(0, 187, 114, 0.14), transparent 60%),
          radial-gradient(900px circle at 78% 25%, rgba(5, 70, 41, 0.28), transparent 58%),
          radial-gradient(800px circle at 50% 90%, rgba(2, 50, 28, 0.22), transparent 62%),
          linear-gradient(180deg, #000000 0%, #000000 70%, #000201 100%);
      "
    />

    <div class="relative">
      <InvestHero
        :title="title"
        subtitle="Acceso para inversores privados minoristas. Entrada temprana antes de la entrada en vigor de la ley europea Crypto MiCA."
        badge="Abierta hasta el 28 de febrero de 2026"
        :calendly-url="schedulingUrl"
        :on-primary-cta="scrollToCta"
        class="animate-fade-up"
      />

      <WhatIsExury />
      <RoundSummaryCards />
      <WhyNow />

      <div :id="ctaAnchorId">
        <CTAForm :calendly-url="schedulingUrl" />
      </div>

      <FAQAccordion />

      <footer class="mx-auto w-full max-w-6xl px-4 pb-24 pt-10 sm:px-6 sm:pb-10 lg:px-8">
        <div class="border-t border-exury-green/10 pt-6">
          <p class="text-sm text-exury-offwhite/60">Building Financial Services for Europe</p>
        </div>
      </footer>

      <StickyMobileCTA :on-primary-cta="scrollToCta" />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: empty
</route>


