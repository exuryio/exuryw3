<template>
  <v-app>
    <v-main class="main fill-width overflow-hidden position-relative text-left d-flex justify-center align-center">
      <div id="mainContainer" class="rounded-circle" />
      <div class="list">
        <!-- Sidebar with padding -->
        <div id="sidebarWrapper">
          <SideBar />
        </div>
        <!-- Main content area -->
        <div class="listInner">
          <div class="page-view flex fill-width">
            <transition name="scroll-x-transition" mode="out-in">
              <div>
                <div class="top-bar-wrapper">
                  <div class="searchBarWrapper">
                    <div class="searchBar">
                      <v-text-field
                        v-model="searchQuery"
                        label="Buscar"
                        single-line
                        hide-details
                        @input="onSearch"
                        class="custom-search-bar"
                      >
                        <template v-slot:prepend-inner>
                          <v-icon color="white">mdi-magnify</v-icon>
                        </template>
                      </v-text-field>
                    </div>
                    <v-btn
                      class="btn-search"
                    >
                      <v-icon style="font-size: 28px; opacity: 0.8" color="white">mdi-magnify</v-icon>
                    </v-btn>
                  </div>
                  <div id="iconButtonParent">
                    <div  id="search-small">
                      <div id="container">
                        <div id="stateLayer">
                          <v-icon icon="mdi-magnify"></v-icon>
                        </div>
                      </div>
                    </div>
                    <div class="menu">
                      <div id="container">
                        <div id="stateLayer">
                          <v-icon icon="mdi-web"></v-icon>
                        </div>
                      </div>
                    </div>
                    <AvatarMenu />
                  </div>
                </div>
                <router-view />
              </div>
            </transition>
          </div>
          <Footer />
        </div>
        <div id="whatsapp-wrapper">
          <a :href="whatsappLink" target="_blank" rel="noopener noreferrer"> <!-- Añadido para enlace de whatsapp -->
            <div id="stateLayer">
              <v-icon id="maskGroupIcon" icon="mdi-whatsapp" color="white"></v-icon>
            </div>
          </a>
        </div>
        <img
          id="logoExury"
          alt=""
          src="/LogoExury1.png"
        />
      </div>
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.main {
  background-color: #141218;
  font-size: 16px;
  color: #c7d4cf;
  margin: 0 !important;
  padding: 80px !important;
  height: 1px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
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
  backdrop-filter: blur(4px);
  border-radius: 16px;
  background-color: rgba(13, 21, 19, 0.5);
  border: 1px solid #2d4740;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 16px 16px 0 0;
  gap: 92px;
  z-index: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  #whatsapp-wrapper {
    position: absolute;
    bottom: 40px;
    right: 40px;
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
#sidebarWrapper {
  flex-shrink: 0;
  width: 160px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-right: 44px;
}
.listInner {
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 100%;
  z-index: 1;
  overflow-y: auto;
  overflow-x: hidden;
  .page-view {
    height: fit-content;
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
.searchBar {
  width: 360px;
  border-radius: 28px;
  border: none;
  background-color: #2d3531;
  height: 48px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  min-width: 360px;
}
#search-small {
  display: none;
}
.searchBarWrapper {
  position: relative;
  margin-top: 10px;
  left: 247px;
  border: none;
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  width: fit-content;
}
.btn-search {
  display: none;
}

.top-bar-wrapper {
  position: fixed;
  top: -17px;
  right: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 20px 16px 10px 0;
  z-index: 1000;
  transition: transform 0.5s ease;
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
  padding: 20px 16px 10px 0;
  background-color: rgba(10, 17, 14, 0.86);
  backdrop-filter: blur(4px);
  transform: translateY(0);
}
#logoExury.scrolling {
  top: 26px;
  z-index: 1000;
}
#logoExury {
  width: 103px;
  position: absolute;
  margin: 0 !important;
  top: 26px;
  left: 98px;
  height: 35.2px;
  object-fit: cover;
  z-index: 1000;
  transition: top 0.3s ease;
}
#maskGroupIcon {
  width: 24px;
  position: relative;
  height: 24px;
  object-fit: contain;
}

@media (max-width: $screen-md) {
  #logoExury {
    left: 74px;
  }
  .main {
    .list {
      .listInner {
        position: relative;
        left: -220px;
        min-width: calc(100% - 16px);
        .top-bar-wrapper.scrolling {
          padding: 20px 16px 10px 0;
          background-color: rgba(10, 17, 14, 0.86);
          backdrop-filter: blur(4px);
          transform: translateY(0);
        }
        .top-bar-wrapper {
          .searchBarWrapper {
            width: 56px;
            max-width: 56px;
            .searchBar{
              display: none;
            }
            .btn-search {
              display: block;
              background: transparent;
              box-shadow: none;
            }
          }
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
      height: 100%;
      margin: 0;
      left: 16px;
      top: 16px;
      overflow: hidden;
      padding: 0;
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
          .searchBarWrapper {
            width: 56px;
            max-width: 56px;
            .searchBar{
              display: none;
            }
            .btn-search {
              display: block;
              background: transparent;
              box-shadow: none;
            }
          }
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
      height: 100%;
      margin: 0;
      left: 16px;
      top: 16px;
      overflow: hidden;
      padding: 0;
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
          .searchBarWrapper {
            display: none;
            .searchBar{
              display: none;
            }
            .btn-search {
              display: block;
              background: transparent;
              box-shadow: none;
            }
          }
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

@media (max-width: 879px) {
  #search-small {
    display: block;
  }
  .searchBarWrapper {
    display: none;

    .searchBar {
      display: none;
    }
  }
}
</style>

<script lang="ts" setup>
//
import AvatarMenu from "@/components/AvatarMenu.vue";
import Footer from "@/components/Footer.vue";
import { ref, onMounted } from "vue";
const searchQuery = ref("");
const whatsappNumber = '+34604117851';
const message = 'Hola quiero saber más detalles de vuestro servicio';
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
const onSearch = (value: string) => {
  console.log(value);
};
onMounted(() => {
  console.log("mounted");
  setTimeout(() => {
    const listInnerElement = document.querySelector(".listInner");
    console.log(listInnerElement);
    if (listInnerElement) {
      listInnerElement.addEventListener("scroll", () => {
        const topBarWrapper = document.querySelector(".top-bar-wrapper");
        const logoExury = document.querySelector("#logoExury");
        if (topBarWrapper && logoExury) {
          if (listInnerElement.scrollTop > 10) {
            topBarWrapper.classList.add("scrolling");
            logoExury.classList.add("scrolling");
          } else {
            topBarWrapper.classList.remove("scrolling");
            logoExury.classList.remove("scrolling");
          }
        }
      });
    }
  }, 1000);

});
</script>
