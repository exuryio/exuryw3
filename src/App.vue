<template>
  <v-app class="fill-width app-root">
    <v-main class="app-main">
      <router-view :key="locale" />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
</script>

<style>
.v-list-item__prepend {
  display: block !important;
}
html {
  height: 100%;
  margin: 0;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
body {
  height: 100%;
  margin: 0;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}

/* Frame fijo: app ocupa todo el viewport y no hace scroll */
.app-root {
  height: 100%;
  min-height: 100dvh;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.app-main {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
/* Evitar que v-main cambie de tamaño al desplegar el sidebar (Vuetify inyecta --v-layout-left) */
.v-main {
  --v-layout-left: 0 !important;
  flex: 1 1 auto;
  min-height: 0;
}
.main {
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  height: 100%;
  min-height: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
.v-navigation-drawer__content::-webkit-scrollbar {
  display: none;
}

.v-navigation-drawer__content {
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-y: auto;
}

/* Estilos globales para router-link en el footer */
.footer-wrapper .legal-section ul li router-link,
.footer-wrapper .legal-section ul li a,
.footer-wrapper ul li router-link,
.footer-wrapper ul li a {
  color: #E6E1E3 !important;
  text-decoration: none !important;
  border-bottom: none !important;
}

.footer-wrapper .legal-section ul li router-link:hover,
.footer-wrapper .legal-section ul li a:hover,
.footer-wrapper ul li router-link:hover,
.footer-wrapper ul li a:hover {
  color: #1cba75 !important;
  text-decoration: none !important;
  border-bottom: none !important;
}

/* Safari: 3 pasos quirúrgicos para forzar iconos y logo */

/* Z-index y capas: forzar GPU para que Safari dibuje elementos dentro de overflow */
#iconButtonParent,
.top-bar-wrapper .top-bar-logo-wrap,
.language-selector,
.avatar-menu {
  -webkit-transform: translateZ(0) !important;
  transform: translateZ(0) !important;
  will-change: transform;
  isolation: isolate;
}

/* 1. Forzar pintado (GPU hack) y tamaño mínimo */
.language-selector,
.avatar-menu,
#logoExury {
  -webkit-transform: translateZ(0) !important;
  transform: translateZ(0) !important;
  display: block !important;
  min-width: 24px !important;
  min-height: 24px !important;
}
.language-selector,
.avatar-menu {
  position: relative !important;
  z-index: 10 !important;
  isolation: isolate;
  min-width: 44px !important;
  min-height: 44px !important;
  background-size: 24px 24px !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
  image-rendering: -webkit-optimize-contrast !important;
  opacity: 1 !important;
  visibility: visible !important;
}
/* 2. Iconos vía <img> (sin mask): Safari pinta imágenes en body sin recorte */
.top-bar-wrapper .language-selector .v-btn,
.top-bar-wrapper .avatar-menu .v-btn {
  min-width: 44px !important;
  min-height: 44px !important;
  opacity: 1 !important;
  visibility: visible !important;
  overflow: visible !important;
}
.top-bar-wrapper .avatar-menu .v-avatar {
  opacity: 1 !important;
  visibility: visible !important;
}
/* Imágenes de iconos: forzar que Safari las dibuje (header ya está en body) */
.top-bar-wrapper .language-selector .lang-icon-img,
.top-bar-wrapper .avatar-menu .avatar-icon-img {
  display: block !important;
  width: 24px !important;
  height: 24px !important;
  min-width: 24px !important;
  min-height: 24px !important;
  max-width: 24px !important;
  max-height: 24px !important;
  object-fit: contain;
  -webkit-transform: translateZ(0) !important;
  transform: translateZ(0) !important;
  opacity: 1 !important;
  visibility: visible !important;
  position: relative !important;
  z-index: 1 !important;
}

/* 3. Logo: contexto de apilamiento y forzar recurso en Safari */
#logoExury {
  content: url("/LogoExury1.png") !important;
  width: 150px !important;
  height: auto !important;
  display: block !important;
  z-index: 100 !important;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}

/* 4. Liberar contenedor padre (evitar que Safari corte fixed/relative) */
.listInner {
  overflow: visible !important;
  -webkit-transform: none !important;
  transform: none !important;
}

/* Header teleportado a body: asegurar que se pinte por encima (Safari) */
body > .top-bar-wrapper {
  -webkit-transform: translateZ(0) !important;
  transform: translateZ(0) !important;
  z-index: 1200 !important;
}

</style>
