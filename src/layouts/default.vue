<template>
  <div class="main" :key="route.fullPath">
    <div id="mainContainer" class="rounded-circle" />
    <div class="list" :class="{ 'list--frame-visible': isMobile && !appStore.getSidebarCollapsed }">
        <!-- Sidebar siempre en body: en desktop queda por encima del header al hacer scroll (z 1300); en móvil con estilo in-frame -->
        <Teleport to="body">
          <div
            class="sidebar-zone"
            :class="{
              'sidebar-zone--in-frame': isMobile,
              'sidebar-zone--desktop': !isMobile,
              'sidebar-zone--open': !appStore.getSidebarCollapsed
            }"
            :style="{ '--sidebar-zone-width': sidebarWidthPx }"
          >
            <div id="sidebarWrapper" class="sidebar-in-flow" :style="{ width: sidebarWidthPx }">
              <SideBar />
            </div>
          </div>
        </Teleport>
        <!-- Placeholder en desktop para reservar el ancho del sidebar (el sidebar real está en body) -->
        <div v-if="!isMobile" class="sidebar-zone sidebar-zone-placeholder" :style="{ width: sidebarWidthPx }" aria-hidden="true" />
        <!-- Main content area -->
        <div class="scroll-container">
           <div
          class="listInner"
        >
          <div class="page-view flex fill-width">
            <transition name="scroll-x-transition" mode="out-in">
              <div>
                <!-- Teleport a body: los iconos (idioma/avatar) solo se ven correctamente fuera de .main; el hamburger sigue siendo clicable por margin-left del logo. -->
                <Teleport to="body">
                  <div
                    class="top-bar-wrapper"
                    :class="{ 'sidebar-open': !appStore.getSidebarCollapsed }"
                  >
                    <div class="top-bar-logo-wrap">
                      <img
                        id="logoExury"
                        alt="Exury"
                        src="/LogoExury1.png"
                        class="header-logo-in-topbar"
                      />
                    </div>
                    <div id="iconButtonParent" :class="{ 'iconButtonParent-no-search': !showFooter }">
                      <LanguageSelector />
                      <AvatarMenu />
                    </div>
                  </div>
                </Teleport>
                <router-view />
              </div>
            </transition>
          </div>
          <Footer v-if="showFooter" />
        </div>
        </div>
        <div id="whatsapp-wrapper">
          <a :href="whatsappLink" target="_blank" rel="noopener noreferrer"> <!-- Añadido para enlace de whatsapp -->
            <div id="stateLayer">
              <v-icon id="maskGroupIcon" icon="mdi-whatsapp" color="white"></v-icon>
            </div>
          </a>
        </div>
      </div>
    <div v-if="showFooter" class="footer-space"></div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

$header-bar-height: 64px;

.main {
  background-color: #141218;
  font-size: 16px;
  color: #c7d4cf;
  margin: 0 !important;
  padding: 5vh !important;
  min-height: 0;
  flex-direction: column;
  display: flex;
  
  @media (max-width: $screen-md) {
    padding: clamp(8px, 2vh, 16px) !important;
  }
  
  @media (max-width: $screen-xs) {
    padding: clamp(4px, 1vh, 8px) !important;
  }
}
#mainContainer {
  position: absolute;
  top: 10%;
  left: 28%;
  filter: blur(400px);
  background-color: #1f866c;
  width: 940px;
  height: 450px;
  transform: rotate(30deg);
  transform-origin: 0 0;
  mix-blend-mode: normal;
}
.list {
  position: relative;
  flex: 1;
  min-height: 0;
  backdrop-filter: blur(4px);
  border-radius: 16px;
  background-color: rgba(13, 21, 19, 0.5);
  border: 1px solid #2d4740;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;
  padding: 16px 16px 0 0;
  gap: 0;
  /* Sin z-index para que el sidebar (1300) compita con el header (1200) en .main y los iconos sigan visibles a la derecha */
  overflow-x: hidden;
  overflow-y: visible;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  
  @media (max-width: $screen-md) {
    padding: clamp(8px, 2vw, 12px) clamp(8px, 2vw, 12px) 0 clamp(8px, 2vw, 12px);
    gap: 0;
    /* Con el sidebar desplegado, reforzar línea de contorno del marco (derecha y abajo) */
    &.list--frame-visible {
      box-shadow: inset -1px 0 0 0 #2d4740, inset 0 -1px 0 0 #2d4740;
    }
  }
  
  @media (max-width: $screen-xs) {
    padding: clamp(4px, 1vw, 8px) clamp(4px, 1vw, 8px) 0 clamp(4px, 1vw, 8px);
    border-radius: 12px;
  }
  #whatsapp-wrapper {
    position: absolute;
    bottom: 40px;
    right: 16px;
    border-radius: 100px;
    background-color: #1cba75;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    z-index: 1;
    #stateLayer {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: 8px;
    }
  }
}
.footer-space {
  position: sticky;
  bottom: 0;
  background: transparent;
}
/* Sidebar llega hasta el top del viewport: sin padding en la zona, el drawer y su borde empiezan arriba */
.sidebar-zone {
  width: 216px;
  min-width: 216px;
  min-height: 0;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-top: calc(-5vh - 16px);
  height: calc(100% + 5vh + 16px);
  box-sizing: border-box;
}
/* Desktop: sidebar teleportado a body, fijo y por encima del header (z 1300); mismo marco que el header (borde, radius) */
@media (min-width: $screen-md) {
  .sidebar-zone.sidebar-zone--desktop {
    position: fixed;
    left: 5vh;
    top: 5vh;
    bottom: 5vh;
    width: var(--sidebar-zone-width, 216px);
    height: auto;
    margin-top: 0;
    z-index: 1300;
    min-width: 0;
    pointer-events: auto;
    border-radius: 16px 0 0 16px;
    overflow: hidden;
    box-sizing: border-box;
  }
  .sidebar-zone.sidebar-zone--desktop.sidebar-zone--open {
    border: 1px solid #2d4740;
  }
  /* Alinear hamburger y logo con la barra del header (misma altura 64px, misma línea horizontal) */
  .sidebar-zone.sidebar-zone--desktop #sidebarWrapper :deep(.v-navigation-drawer__content) {
    padding-top: 0;
  }
  .sidebar-zone.sidebar-zone--desktop #sidebarWrapper :deep(.btn-menu-wrapper) {
    min-height: $header-bar-height;
    display: flex;
    align-items: center;
  }
  .sidebar-zone-placeholder {
    flex-shrink: 0;
    min-width: 0;
    width: var(--sidebar-zone-width, 216px);
    min-height: 0;
    display: flex;
    flex-direction: column;
  }
}
#sidebarWrapper.sidebar-in-flow {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
#sidebarWrapper :deep(.v-navigation-drawer) {
  position: relative !important;
  height: 100%;
  min-height: 0;
}
#sidebarWrapper :deep(.sidebar) {
  height: 100%;
}
/* Padding en el contenido del drawer para que el menú no quede pegado al top; el borde del drawer sí llega al top */
#sidebarWrapper :deep(.v-navigation-drawer__content) {
  padding-top: calc(5vh + 16px);
  box-sizing: border-box;
}

@media (max-width: $screen-md) {
  .sidebar-zone {
    /* En móvil el sidebar es overlay: no ocupa espacio, el contenido usa todo el ancho */
    /* z-index > header (1200) para que el hamburger reciba el clic aunque el header cubra la zona */
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    width: var(--sidebar-zone-width, 90px);
    min-width: 0;
    z-index: 1300;
    margin-top: 0;
    pointer-events: auto;
  }
  /* Sidebar teleportado a body: alineado al frame (mismo inset y border-radius que el header) */
  .sidebar-zone.sidebar-zone--in-frame {
    top: clamp(8px, 2vh, 16px);
    left: clamp(8px, 2vh, 16px);
    bottom: clamp(8px, 2vh, 16px);
    margin-top: 0;
    height: auto;
    border-radius: 16px 0 0 16px;
    overflow: hidden;
    box-sizing: border-box;
  }
  /* Borde del marco solo cuando el sidebar está abierto (evita línea vertical cuando está colapsado) */
  .sidebar-zone.sidebar-zone--in-frame.sidebar-zone--open {
    border: 1px solid #2d4740;
  }
  .scroll-container {
    position: relative;
    z-index: 0;
  }
  #sidebarWrapper :deep(.v-navigation-drawer__content) {
    padding-top: calc(env(safe-area-inset-top, 0px) + 8px);
  }
}
@media (max-width: $screen-xs) {
  .sidebar-zone {
    margin-top: calc(-1 * (clamp(4px, 1vh, 8px) + clamp(4px, 1vw, 8px)));
    height: calc(100% + clamp(4px, 1vh, 8px) + clamp(4px, 1vw, 8px));
  }
  .sidebar-zone.sidebar-zone--in-frame {
    top: clamp(4px, 1vh, 8px);
    left: clamp(4px, 1vh, 8px);
    bottom: clamp(4px, 1vh, 8px);
    margin-top: 0;
    height: auto;
    border-radius: 12px 0 0 12px;
    overflow: hidden;
    box-sizing: border-box;
  }
  .sidebar-zone.sidebar-zone--in-frame.sidebar-zone--open {
    border: 1px solid #2d4740;
  }
  #sidebarWrapper :deep(.v-navigation-drawer__content) {
    padding-top: calc(env(safe-area-inset-top, 0px) + 8px);
  }
}

.scroll-container {
  flex: 1;
  min-width: 0;
  min-height: 0;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 5vh;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  
  @media (max-width: $screen-md) {
    padding-top: calc(72px + env(safe-area-inset-top, 0px));
  }
  
  @media (max-width: $screen-xs) {
    padding-top: calc(72px + env(safe-area-inset-top, 0px));
  }
}

/* Safari: overflow en listInner “recorta” el header fijo; visible evita iconos fantasmas */
.listInner {
  position: relative !important;
  width: 100% !important;
  max-width: 100% !important;
  height: 100% !important;
  z-index: 1 !important;
  overflow: visible !important;
  -webkit-transform: none !important;
  transform: none !important;
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
  pointer-events: auto !important;
  left: auto !important;
  .page-view {
    height: fit-content;
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
    box-sizing: border-box;
  }
}

#icon {
  width: 24px;
  position: relative;
  height: 24px;
}
#container {
  border-radius: 100px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.menu {
  width: 48px;
  height: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
/* Altura fija del header/topbar (64px desktop, 48px móvil) - variable definida arriba */
/* Header teleportado a body: alineado al frame de contenido (.main padding + borde redondo) */
.top-bar-wrapper {
  position: fixed;
  top: 5vh;
  left: 5vh;
  right: 5vh;
  width: auto;
  min-height: $header-bar-height;
  margin: 0;
  padding: 0 16px 0 0;
  z-index: 1200;
  box-sizing: border-box;
  background-color: transparent;
  transition: background-color 0.3s ease;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  flex-shrink: 0;
  overflow: visible;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  will-change: transform;
  border-radius: 16px 16px 0 0;
  border: 1px solid #2d4740;
  border-bottom: none;
  /* Dejar pasar clics al sidebar (hamburger); solo logo e iconos reciben clic */
  pointer-events: none;
  /* Logo: desktop lo sobrescribe a 60px; móvil usa su propio valor */
  .top-bar-logo-wrap {
    pointer-events: auto;
    margin-right: auto;
    margin-left: 72px;
    display: flex;
    align-items: center;
    padding-left: 0;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }
  /* Mismo tamaño que el logo del sidebar (SideBar.vue .sidebar-logo-img) en todas las resoluciones */
  .header-logo-in-topbar {
    height: 42px;
    min-height: 42px;
    max-height: 42px;
    width: auto;
    object-fit: contain;
    display: block;
    flex-shrink: 0;
    pointer-events: none;
  }
  #iconButtonParent {
    pointer-events: auto;
    position: relative;
    z-index: 10;
    right: 0;
    width: fit-content !important;
    width: -webkit-fit-content !important;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;
    gap: 16px;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    isolation: isolate;
  }
}
.top-bar-wrapper.scrolling {
  padding: 0 16px 0 0;
  background-color: #141218;
  backdrop-filter: blur(4px);
  -webkit-transform: translateY(0) translateZ(0);
  transform: translateY(0) translateZ(0);
  border-bottom: 1px solid #2d4740;
}
/* Desktop: logo en margin-left 66px; un poco más abajo */
@media (min-width: $screen-md) {
  .top-bar-wrapper .top-bar-logo-wrap {
    margin-left: 66px;
    padding-left: 0;
    padding-top: 6px;
  }
}
#maskGroupIcon {
  width: 24px;
  position: relative;
  height: 24px;
  object-fit: contain;
}
/* Ocultar logo del top bar cuando el sidebar está abierto (expandido) para no duplicar con el logo del sidebar */
.top-bar-wrapper.sidebar-open .top-bar-logo-wrap {
  visibility: hidden;
  pointer-events: none;
}
@media (max-width: $screen-md) {
  .top-bar-wrapper {
    height: calc(72px + env(safe-area-inset-top, 0px));
    min-height: calc(72px + env(safe-area-inset-top, 0px));
    max-height: calc(72px + env(safe-area-inset-top, 0px));
    padding: env(safe-area-inset-top, 0px) 20px 0 0;
    flex-shrink: 0;
    /* Alineado al frame de contenido (mismo padding que .main en md) */
    top: clamp(8px, 2vh, 16px) !important;
    left: clamp(8px, 2vh, 16px) !important;
    right: clamp(8px, 2vh, 16px) !important;
    width: auto !important;
    margin-top: 0 !important;
    border-radius: 16px 16px 0 0;
  }
  /* Logo más a la izquierda en móvil (34px desde el borde) */
  .top-bar-wrapper .top-bar-logo-wrap {
    margin-left: 34px;
    padding-left: 0;
    padding-top: 0;
    display: flex;
    align-items: center;
    align-self: center;
    transform: translateY(-4px);
  }
  .top-bar-wrapper .header-logo-in-topbar {
    display: block;
    height: 28px;
    min-height: 28px;
    max-height: 28px;
    width: auto;
    flex-shrink: 0;
    vertical-align: middle;
  }
  .top-bar-wrapper.scrolling {
    padding: env(safe-area-inset-top, 0px) 20px 0 0;
  }
  .top-bar-wrapper #iconButtonParent {
    gap: 10px;
    padding-right: 4px;
  }
  /* Safari: forzar GPU en iconos del header para que se pinten */
  .top-bar-wrapper #iconButtonParent :deep(.language-selector),
  .top-bar-wrapper #iconButtonParent :deep(.avatar-menu),
  .top-bar-wrapper #iconButtonParent :deep(.v-icon),
  .top-bar-wrapper #iconButtonParent :deep(img) {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-backface-visibility: visible;
    backface-visibility: visible;
  }
}
@media (max-width: $screen-xs) {
  .top-bar-wrapper {
    top: clamp(4px, 1vh, 8px) !important;
    left: clamp(4px, 1vh, 8px) !important;
    right: clamp(4px, 1vh, 8px) !important;
    border-radius: 12px 12px 0 0;
  }
  .top-bar-wrapper .top-bar-logo-wrap {
    margin-left: 34px;
    padding-left: 0;
  }
  .top-bar-wrapper .header-logo-in-topbar {
    height: 28px;
    min-height: 28px;
    max-height: 28px;
  }
}
@media (min-width: $screen-md) {
  .listInner::-webkit-scrollbar {
    width: 8px;
  }

  .listInner::-webkit-scrollbar-track {
    background-color: #1a1a1a;
    border-radius: 8px;
  }

  .listInner::-webkit-scrollbar-thumb {
    background-color: #b3b3b3;
    border-radius: 8px;
  }

  .listInner::-webkit-scrollbar-thumb:hover {
    background-color: #8c8c8c;
  }
}

@media (max-width: 640px) {
  .main {
    .list {
      .listInner {
        position: relative;
        left: 0;
        min-width: 0;
        max-width: 100%;
        width: 100%;
        box-sizing: border-box;
        
        .page-view {
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          padding: 0;
          
          > div {
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
          }
        }
        .top-bar-wrapper.scrolling {
          padding: 20px 16px 10px 0;
          background-color: #141218;
          backdrop-filter: blur(4px);
          transform: translateY(0);
        }
      }
    }
  }
}

@media (max-width: $screen-sm) {
  .main {
    padding: 16px !important;
    margin: 0;
    .list {
      display: flex;
      flex-direction: row;
      width: 100%;
      max-width: 100%;
      height: 100%;
      margin: 0;
      left: 0;
      top: 0;
      overflow-x: hidden;
      overflow-y: visible;
      padding: 4px 6px 0 6px;
      box-sizing: border-box;
      .listInner {
        position: relative;
        left: 0;
        min-width: 0;
        max-width: 100%;
        .top-bar-wrapper.scrolling {
          padding: 20px 16px 10px 0;
          background-color: #141218;
          backdrop-filter: blur(4px);
          transform: translateY(0);
        }
        .top-bar-wrapper {
          margin-top: 16px;
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-end;
          padding-right: 16px;
          transition: padding 0.3s ease;
        }
      }
    }
  }
}

@media (max-width: $screen-xs) {
  .main {
    padding: 16px !important;
    margin: 0;
    .list {
      display: flex;
      flex-direction: row;
      width: 100%;
      max-width: 100%;
      height: 100%;
      margin: 0;
      left: 0;
      top: 0;
      overflow-x: hidden;
      overflow-y: visible;
      padding: 4px 6px 0 6px;
      box-sizing: border-box;
      .listInner {
        position: relative;
        left: 0;
        min-width: 0;
        max-width: 100%;
        .top-bar-wrapper {
          margin-top: 16px;
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-end;
          padding-right: 16px;
        }
        .footer-wrapper{
          width: 100%;
          height: fit-content;
          padding: 0 16px;
          .footer-top {
            padding: 14px 16px;
            background: #e1ece7;
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            color: #323836;
            border-radius: 4px;
            margin-bottom: 50px;
            margin-top: 64px;
          }
          .footer-mid {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-bottom: 64px;
            gap: 48px;
            .btn-subscribe {
              width: 100%;
              padding: 24px 10px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .logo-footer {
              margin-bottom: 30px;
              width: 147px;
            }
            div:nth-child(1){
              width: 250px;
              p {
                margin-bottom: 5px;
              }
            }
            h2 {
              color: #E6E1E3;
              font-size: 18px;
              font-style: normal;
              font-weight: 700;
              line-height: 28px;
            }
            ul li {
              color: #E6E1E3;
              font-size: 16px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
              opacity: 0.65;
              list-style: none;
              margin-bottom: 16px;
            }
            .newsletter {
              margin-bottom: 25px;
            }
          }
          .footer-bottom {
            padding: 23px 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            gap: 48px;
            .social-icons > * {
              margin-right: 16px;
            }
          }
        }
      }
    }
  }
}
</style>

<script lang="ts" setup>
//
import AvatarMenu from "@/components/AvatarMenu.vue";
import LanguageSelector from "@/components/LanguageSelector.vue";
import Footer from "@/components/Footer.vue";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import { isFocusedRoute, isFocusedWhenLoggedInRoute } from "@/domain/constants/sidebar.constant";
import { useAppStore } from "@/infraestructure/stores/app";
import { useAuthStore } from "@/infraestructure/stores/auth";

const route = useRoute();
const appStore = useAppStore();
const authStore = useAuthStore();
const isProductMode = computed(
  () =>
    isFocusedRoute(route.path) ||
    (authStore.isLoggedIn && isFocusedWhenLoggedInRoute(route.path))
);
const showFooter = computed(() => !isProductMode.value);
const sidebarWidthPx = computed(() => (appStore.getSidebarCollapsed ? "90px" : "216px"));

const MOBILE_BREAKPOINT = 768;
const isMobile = ref(typeof window !== "undefined" && window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches);
let mobileQuery: MediaQueryList | null = null;

const whatsappNumber = '+34604117851';
const message = 'Hola quiero saber más detalles de vuestro servicio';
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

onMounted(() => {
  mobileQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
  isMobile.value = mobileQuery.matches;
  mobileQuery.addEventListener("change", onMobileChange);
});
onUnmounted(() => mobileQuery?.removeEventListener("change", onMobileChange));

function onMobileChange(e: MediaQueryListEvent) {
  isMobile.value = e.matches;
}

onMounted(() => {
  console.log("Default layout mounted");

  // Function to ensure listInner is visible
  const ensureListInnerVisible = () => {
    const listInnerElements = document.querySelectorAll(".listInner");
    console.log(`Found ${listInnerElements.length} listInner elements`);
    
    listInnerElements.forEach(el => {
      const htmlEl = el as HTMLElement;
      // Only restore if not inside empty-layout-app
      if (!htmlEl.closest('.empty-layout-app')) {
        // Force visibility with !important
        htmlEl.style.setProperty('display', 'block', 'important');
        htmlEl.style.setProperty('visibility', 'visible', 'important');
        htmlEl.style.setProperty('opacity', '1', 'important');
        htmlEl.style.setProperty('pointer-events', 'auto', 'important');
        htmlEl.style.setProperty('position', 'relative', 'important');
        htmlEl.style.setProperty('left', 'auto', 'important');
        htmlEl.style.setProperty('width', '100%', 'important');
        htmlEl.style.setProperty('height', '100%', 'important');
        htmlEl.style.setProperty('overflow', 'auto', 'important');
        htmlEl.style.setProperty('max-height', 'none', 'important');
        htmlEl.style.setProperty('padding', '', 'important');
        htmlEl.style.setProperty('margin', '', 'important');
        console.log('✅ Restored listInner visibility');
      }
    });
  };
  
  // Restore immediately and multiple times to catch any timing issues
  ensureListInnerVisible();
  setTimeout(ensureListInnerVisible, 10);
  setTimeout(ensureListInnerVisible, 50);
  setTimeout(ensureListInnerVisible, 100);
  setTimeout(ensureListInnerVisible, 200);
  setTimeout(ensureListInnerVisible, 300);
  setTimeout(ensureListInnerVisible, 500);
  setTimeout(ensureListInnerVisible, 1000);
  
  // Setup scroll listener
  setTimeout(() => {
    const listInnerElement = document.querySelector(".listInner");
    console.log('listInner element for scroll:', listInnerElement);
    if (listInnerElement) {
      listInnerElement.addEventListener("scroll", () => {
        const topBarWrapper = document.querySelector(".top-bar-wrapper");
        if (topBarWrapper) {
          if (listInnerElement.scrollTop > 10) {
            topBarWrapper.classList.add("scrolling");
          } else {
            topBarWrapper.classList.remove("scrolling");
          }
        }
      });
    }
  }, 500);
});
</script>
