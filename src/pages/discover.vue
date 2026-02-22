<template>
  <div class="discover-shell relative w-full font-exury font-medium text-exury-offwhite">
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
    <section class="discover-section hero-animate mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8 lg:pt-16">
      <div class="mb-10 lg:mb-14">
        <h2 class="text-2xl tracking-tight text-exury-offwhite sm:text-3xl lg:text-4xl">Discover us</h2>
        <!-- TECHNIQUE: Gestalt Continuity - Línea divisoria -->
        <div class="mt-4 h-px w-20 bg-exury-green/40 sm:mt-5" />
        <!-- TECHNIQUE: Scannable Content -->
        <p class="mt-6 text-sm leading-relaxed text-exury-offwhite/80 sm:text-base">
          Explora cómo EXURY transforma el intercambio de criptomonedas con seguridad respaldada por el Banco de España y un toque humano inigualable. Únete a la 1ra plataforma SIN CUSTODIA del mercado.
        </p>
      </div>
    </section>

    <!-- TECHNIQUE: Chunking + Card-based Design -->
    <section 
      v-for="(content, index) in contents" 
      :key="index" 
      class="discover-section mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16"
    >
      <div 
        :class="[
          'group rounded-2xl border border-white/10 bg-gradient-to-br from-black/50 via-black/40 to-exury-greenDeep/30 p-6 backdrop-blur-xl transition-all duration-300 sm:rounded-3xl sm:p-12 lg:p-16',
          'hover:border-exury-green/25 hover:bg-gradient-to-br hover:from-black/60 hover:via-black/50 hover:to-exury-greenDeep/40 hover:shadow-[0_0_0_1px_rgba(0,187,114,0.15),0_8px_24px_rgba(0,187,114,0.08)]',
          index % 2 === 0 ? 'flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12' : 'flex flex-col lg:flex-row-reverse lg:items-center gap-8 lg:gap-12'
        ]"
      >
        <!-- TECHNIQUE: Visual Support - Imagen -->
        <div class="flex-shrink-0 lg:w-1/2">
          <div class="relative h-64 w-full overflow-hidden rounded-xl sm:h-80 lg:h-96">
            <img 
              :src="content.image" 
              :alt="content.title"
              class="h-full w-full object-contain"
              loading="lazy"
            />
          </div>
        </div>

        <!-- TECHNIQUE: Scannable Content -->
        <div class="flex-1 lg:w-1/2">
          <h3 class="text-xl font-bold text-exury-green transition-colors duration-300 sm:text-2xl lg:text-3xl group-hover:text-exury-green/90 mb-4">
            {{ content.title }}
          </h3>
          <p 
            class="text-sm leading-relaxed text-exury-offwhite/80 transition-colors duration-300 sm:text-base group-hover:text-exury-offwhite/90 mb-6"
            v-html="formatText(content.description)"
          ></p>
          
          <!-- TECHNIQUE: Chunking - Lista con iconos -->
          <ul v-if="content.listDescription.length" class="space-y-3 mb-6">
            <li 
              v-for="(item, itemIndex) in content.listDescription" 
              :key="itemIndex"
              class="flex items-start gap-3"
            >
              <v-icon class="text-exury-green flex-shrink-0 mt-0.5" size="20">mdi-check-circle-outline</v-icon>
              <p class="text-sm leading-relaxed text-exury-offwhite/75 sm:text-base">{{ item }}</p>
            </li>
          </ul>

          <!-- TECHNIQUE: Affordances - Botones con hover effects -->
          <template v-if="content.button === 'How it works'">
            <router-link to="/how-it-works" custom v-slot="{ href, navigate }">
              <v-btn 
                rounded 
                variant="outlined" 
                class="group/btn border border-white/20 bg-white/[0.03] text-exury-green transition-all duration-300 hover:border-exury-green/40 hover:bg-exury-green/10 hover:shadow-[0_0_0_1px_rgba(0,187,114,0.2),0_4px_12px_rgba(0,187,114,0.1)] active:scale-95 text-capitalize" 
                :href="href" 
                @click="navigate"
              >
                {{ content.button }}
              </v-btn>
            </router-link>
          </template>
          <template v-else-if="content.button === 'Buy Crypto'">
            <router-link to="/home" custom v-slot="{ href, navigate }">
              <v-btn 
                rounded 
                variant="outlined" 
                class="group/btn border border-white/20 bg-white/[0.03] text-exury-green transition-all duration-300 hover:border-exury-green/40 hover:bg-exury-green/10 hover:shadow-[0_0_0_1px_rgba(0,187,114,0.2),0_4px_12px_rgba(0,187,114,0.1)] active:scale-95 text-capitalize" 
                :href="href" 
                @click="navigate"
              >
                {{ content.button }}
              </v-btn>
            </router-link>
          </template>
          <template v-else-if="content.button === 'Register now'">
            <router-link to="/home" custom v-slot="{ href, navigate }">
              <v-btn 
                rounded 
                variant="outlined" 
                class="group/btn border border-white/20 bg-white/[0.03] text-exury-green transition-all duration-300 hover:border-exury-green/40 hover:bg-exury-green/10 hover:shadow-[0_0_0_1px_rgba(0,187,114,0.2),0_4px_12px_rgba(0,187,114,0.1)] active:scale-95 text-capitalize" 
                :href="href" 
                @click="navigate"
              >
                {{ content.button }}
              </v-btn>
            </router-link>
          </template>
          <template v-else>
            <v-btn 
              rounded 
              variant="outlined" 
              class="group/btn border border-white/20 bg-white/[0.03] text-exury-green transition-all duration-300 hover:border-exury-green/40 hover:bg-exury-green/10 hover:shadow-[0_0_0_1px_rgba(0,187,114,0.2),0_4px_12px_rgba(0,187,114,0.1)] active:scale-95 text-capitalize"
            >
              {{ content.button }}
            </v-btn>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { onMounted, nextTick } from "vue";

const contents = [
  {
    title: '¡Libertad Financiera Total!',
    description: '¿Cansado de plataformas que te quitan el control de tus activos?\n' +
      '\n' +
      'Con EXURY, tu decides dónde recibir tus criptomonedas, respaldado por la seguridad de un socio humano, no un algoritmo.',
    listDescription: [],
    button: 'How it works',
    image: '/assets/discover-us/DiscoverUs_exury-01.svg'},
  {
    title: 'Seguridad Total y Sin Custodia',
    description: 'Al no custodiar tus fondos, eliminamos el riesgo de pérdida o robo. Disfruta de transacciones seguras y protegidas con encriptacion.',
    listDescription: [],
    button: 'How it works',
    image: '/assets/discover-us/DiscoverUs_exury-02.svg'},
  {
    title: 'Optimiza Tu Cartera con Consultoría Premium',
    description: 'Mas que una plataforma de intercambio, accede y recibe:',
    listDescription: ['Una consultoria gratuita y personalizada con nuestros expertos en criptomonedas.', 'Un analisis detallado de tu cartera.', 'Estrategias efectivas para potenciar tus inversiones', 'Este bono de alto costo en el mercado, esta incluido sin cargo adicional, para impulsar tus resultados financieros'],
    button: 'Buy Crypto',
    image: 'assets/discover-us/DiscoverUs_exury-03.svg'},
  {
    title: 'Satisfación Asegurada',
    description: 'Si no estás completamente satisfecho con tu intercambio, te ofrecemos un descuento asegurado en tu próxima transacción.',
    listDescription: [],
    button: 'Buy Crypto',
    image: 'assets/discover-us/DiscoverUs_exury-04.svg'},
  {
    title: '¡Sé de los Primeros 100, Maximiza tus Beneficios!',
    description: 'Esta oferta exclusiva es para los primeros 100 usuarios que realicen un intercambio en nuestra plataforma. ¡Aprovecha antes de que termine!',
    listDescription: [],
    button: 'Buy Crypto',
    image: 'assets/discover-us/DiscoverUs_exury-05.svg'},
  {
    title: 'Intercambia con la Tranquilidad y Protección que\n' +
      'Solo un Proveedor Regulado Puede Ofrecer',
    description: 'En EXURY estamos regulados por el Banco de España, asegurando la protección en cada transacción.',
    listDescription: ['Respaldo Oficial: Cumplimos con las estrictas normativas de seguridad del Banco de España y la Union Europea.', "Seguridad Garantizada: Cada transaccion esta protegida bajo normas AML/FT 'Anti Money Laundering & Financial Terrorism'"],
    button: 'Buy Crypto',
    image: 'assets/discover-us/DiscoverUs_exury-06.svg'},
  {
    title: 'Únete a la Revolución Financiera con EXURY',
    description: 'Imagina un mundo donde tus inversiones están protegidas y tienes libertad de escoger donde recibir tus criptomonedas.\n\n' +
      'Te invitamos a ser parte de algo más grande que un simple intercambio de criptomonedas; te invitamos a formar parte de una revolución en la forma en que manejas tu dinero.',
    listDescription: [],
    button: 'Register now',
    image: 'assets/discover-us/DiscoverUs_exury-07.svg'}
];

const formatText = (text: string) => {
  return text.replace(/\n/g, '<br />');
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

    const sections = document.querySelectorAll(".discover-section");
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
.discover-shell {
  overflow: visible;
  height: auto;
  min-height: 100%;
}

.discover-shell a {
  text-decoration: none;
}

.discover-shell a:hover {
  text-decoration: none;
}

/* TECHNIQUE: Progressive Enhancement - Animaciones suaves */
.discover-section {
  opacity: 0;
  transform: translateY(40px) scale(0.96);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--animation-delay, 0s);
  will-change: opacity, transform;
}

.discover-section.animate-in-view {
  opacity: 1;
  transform: translateY(0) scale(1);
  will-change: auto;
}

/* Mobile-specific animations */
@media (max-width: 640px) {
  .discover-section {
    transform: translateY(50px) scale(0.94);
    transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
      transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .discover-section.animate-in-view {
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
  .discover-section.hero-animate {
    margin-top: clamp(60px, 8vw, 80px);
  }
}

@media (max-width: 380px) {
  .discover-section.hero-animate {
    margin-top: clamp(50px, 7vw, 70px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .discover-section {
    opacity: 1;
    transform: none;
    transition: none;
  }
  
  .hero-animate {
    animation: none;
  }
}
</style>