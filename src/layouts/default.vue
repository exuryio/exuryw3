<template>
  <div class="main" :key="route.fullPath">
    <div id="mainContainer" class="rounded-circle" />
    <div class="list">
        <!-- Zona fija 216px: el área de contenido no cambia al colapsar el sidebar -->
        <div class="sidebar-zone">
          <div id="sidebarWrapper" class="sidebar-in-flow" :style="{ width: sidebarWidthPx }">
            <SideBar />
          </div>
        </div>
        <!-- Main content area -->
        <div class="scroll-container">
           <div
          class="listInner"
        >
          <div class="page-view flex fill-width">
            <transition name="scroll-x-transition" mode="out-in">
              <div>
                <div class="top-bar-wrapper">
                  <div id="iconButtonParent" :class="{ 'iconButtonParent-no-search': !showFooter }">
                    <LanguageSelector />
                    <AvatarMenu />
                  </div>
                </div>
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
        <!-- Logo fijo en el header: mismo tamaño siempre, no depende del estado del sidebar -->
        <img
          id="logoExury"
          alt="Exury"
          src="/LogoExury1.png"
          class="header-logo-fixed"
        />
      </div>
    <div v-if="showFooter" class="footer-space"></div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.main {
  background-color: #141218;
  font-size: 16px;
  color: #c7d4cf;
  margin: 0 !important;
  padding: 5vh !important;
  height: 100vh;
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
  z-index: 0;
  overflow-x: hidden;
  overflow-y: visible;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  
  @media (max-width: $screen-md) {
    padding: clamp(8px, 2vw, 12px) clamp(8px, 2vw, 12px) 0 clamp(8px, 2vw, 12px);
    gap: 0;
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
    margin-top: calc(-1 * (clamp(8px, 2vh, 16px) + clamp(8px, 2vw, 12px)));
    height: calc(100% + clamp(8px, 2vh, 16px) + clamp(8px, 2vw, 12px));
  }
  #sidebarWrapper :deep(.v-navigation-drawer__content) {
    padding-top: calc(clamp(8px, 2vh, 16px) + clamp(8px, 2vw, 12px));
  }
}
@media (max-width: $screen-xs) {
  .sidebar-zone {
    margin-top: calc(-1 * (clamp(4px, 1vh, 8px) + clamp(4px, 1vw, 8px)));
    height: calc(100% + clamp(4px, 1vh, 8px) + clamp(4px, 1vw, 8px));
  }
  #sidebarWrapper :deep(.v-navigation-drawer__content) {
    padding-top: calc(clamp(4px, 1vh, 8px) + clamp(4px, 1vw, 8px));
  }
}

.scroll-container {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 5vh;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  
  @media (max-width: $screen-md) {
    padding-top: clamp(8px, 2vh, 16px);
  }
  
  @media (max-width: $screen-xs) {
    padding-top: clamp(4px, 1vh, 8px);
  }
}

.listInner {
  position: relative !important;
  width: 100% !important;
  max-width: 100% !important;
  height: 100% !important;
  z-index: 1 !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
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
/* Altura fija del header (64px, alineada con el header del sidebar) */
$header-bar-height: 64px;
/* Logo más arriba en vertical */
$header-logo-top: calc(5vh + 16px - 8px);
$header-logo-left: calc(5vh + 16px + 44px); /* después del hamburger en el sidebar */

.top-bar-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  min-height: $header-bar-height;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 0 16px 0 0;
  z-index: 1000;
  transition: transform 0.5s ease, background-color 0.3s ease;
  #iconButtonParent {
    position: relative;
    right: 0;
    width: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;
    gap: 16px;
  }
}
.top-bar-wrapper.scrolling {
  padding: 0 16px 0 0;
  background-color: rgba(10, 17, 14, 0.86);
  backdrop-filter: blur(4px);
  transform: translateY(0);
}
/* Logo siempre fijo y del mismo tamaño en el header (no se encoje con el sidebar) */
.header-logo-fixed {
  position: fixed;
  top: $header-logo-top;
  left: $header-logo-left;
  transform: translateY(-50%);
  height: 34px;
  width: auto;
  object-fit: contain;
  z-index: 1001;
  pointer-events: none;
}
#maskGroupIcon {
  width: 24px;
  position: relative;
  height: 24px;
  object-fit: contain;
}
/* Mobile: header más compacto y logo dentro sin cortarse */
@media (max-width: $screen-md) {
  .top-bar-wrapper {
    min-height: 48px;
    padding: 0 12px 0 0;
  }
  .top-bar-wrapper.scrolling {
    padding: 0 12px 0 0;
  }
  .top-bar-wrapper #iconButtonParent {
    gap: 10px;
  }
  .header-logo-fixed {
    top: calc(clamp(8px, 2vh, 16px) + 16px - 4px);
    left: calc(clamp(8px, 2vh, 16px) + 44px);
    height: 22px;
    max-width: min(100px, calc(100vw - 44px - 160px));
    object-fit: contain;
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
        left: -220px;
        min-width: calc(100% - 16px);
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
          background-color: rgba(10, 17, 14, 0.86);
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
      display: block;
      width: 100%;
      max-width: 100%;
      height: 100%;
      margin: 0;
      left: 16px;
      top: 16px;
      overflow-x: hidden;
      overflow-y: hidden;
      padding: 0;
      box-sizing: border-box;
      .listInner {
        position: relative;
        left: 0;
        min-width: 100%;
        .top-bar-wrapper.scrolling {
          padding: 20px 16px 10px 0;
          background-color: rgba(10, 17, 14, 0.86);
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
      display: block;
      width: 100%;
      max-width: 100%;
      height: 100%;
      margin: 0;
      left: 16px;
      top: 16px;
      overflow-x: hidden;
      overflow-y: hidden;
      padding: 0;
      box-sizing: border-box;
      .listInner {
        position: relative;
        left: 0;
        min-width: 100%;
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
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { isFocusedRoute } from "@/domain/constants/sidebar.constant";
import { useAppStore } from "@/infraestructure/stores/app";

const route = useRoute();
const appStore = useAppStore();
const showFooter = computed(() => !isFocusedRoute(route.path));
const sidebarWidthPx = computed(() => (appStore.getSidebarCollapsed ? "90px" : "216px"));

const whatsappNumber = '+34604117851';
const message = 'Hola quiero saber más detalles de vuestro servicio';
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

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
