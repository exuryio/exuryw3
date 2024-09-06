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
              <div id="menu">
                <div id="container">
                  <div id="stateLayer">
                    <v-icon icon="mdi-bell-outline"></v-icon>
                  </div>
                </div>
              </div>
              <AvatarMenu />
            </div>
          </div>
          <div class="page-view flex fill-width">
            <transition name="scroll-x-transition" mode="out-in">
              <router-view />
            </transition>
          </div>
          <div class="footer-wrapper">
            <hr />
            <p class="footer-top">La inversión en criptoactivos no está regulada, puede no ser adecuada para inversores minoristas y perderse la totalidad del importe invertido Es importante leer y comprender los riesgos de esta inversión que se explican detalladamente en esta ubicación.</p>
            <div class="footer-mid">
              <div>
                <img
                  class="logo-footer"
                  alt=""
                  src="/LogoExury1.png"
                />
                <p>Calle Hermosilla 48, 1. dcha.
                  Madrid, Spain</p>
                <p>contact@exury.io</p>
              </div>
              <div>
                <h2>Seguridad & Legal</h2>
                <ul>
                  <li>Politica de Privacidad</li>
                  <li>Terminos y Condiciones</li>
                  <li>Cookies</li>
                  <li>Licencias</li>
                </ul>
              </div><div>
                <h2>Tendencias</h2>
                <ul>
                  <li>Tendencia 1</li>
                  <li>Tendencia 2</li>
                  <li>Tendencia 3</li>
                  <li>Tendencia 4</li>
                </ul>
              </div>
              <div>
                <h2 class="newsletter">Newsletter</h2>
                <v-text-field
                  append-inner-icon="mdi-email-outline"
                  label="Email"
                  variant="outlined"
                ></v-text-field>
                <v-btn rounded color="primary" class="btn-subscribe text-capitalize">Suscribirse</v-btn>
              </div>
            </div>
            <hr />
            <div class="footer-bottom">
              <div class="social-icons">
                <v-icon icon="mdi-whatsapp"></v-icon>
                <v-icon icon="mdi-instagram"></v-icon>
                <v-icon icon="mdi-twitter"></v-icon>
              </div>
              <div>
                <p>A product of </p>
              </div>
              <div>
                <p>© 2024 Exury. All rights reserved</p>
              </div>
            </div>
          </div>
        </div>
        <img
          id="logoExury"
          alt=""
          src="/LogoExury1.png"
        />
        <div id="whatsapp-wrapper">
          <div id="stateLayer">
            <v-icon id="maskGroupIcon" icon="mdi-whatsapp"></v-icon>
          </div>
        </div>
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
  padding: 0 !important;
  height: 100vh;
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
  padding: 16px 0 16px 16px;
  gap: 60px;
  z-index: 0;
  overflow: hidden;
  position: absolute;
  top: 80px;
  left: 80px;
  width: calc(100% - 160px);
  height:calc(100% - 160px);
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
  .footer-wrapper{
    width: 100%;
    height: fit-content;
    padding: 0 16px 0 0;
    margin-top: 60px;
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
      justify-content: space-between;
      margin-bottom: 64px;

      .btn-subscribe {
        width: 250px;
      }
      .logo-footer {
        margin-bottom: 30px;
        width: 147px;
      }
      input {
        background: red;
        width: 200px;
        height: 40px;
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
        margin-bottom: 24px;
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
    }
    .footer-bottom {
      padding: 23px 0 0 0;
      display: flex;
      justify-content: space-between;
      .social-icons > * {
        margin-right: 16px;
      }
    }
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
#menu {
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
  height: 56px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  min-width: 360px;
  max-width: 720px;
}
.searchBarWrapper {
  border: none;
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.btn-search {
  display: none;
}
#iconButtonParent {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 16px;
}
.top-bar-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-right: 16px;
}
#logoExury {
  width: 103px;
  position: absolute;
  margin: 0 !important;
  top: 28px;
  left: 98px;
  height: 35.2px;
  object-fit: cover;
  z-index: 1000;
}
#maskGroupIcon {
  width: 24px;
  position: relative;
  height: 24px;
  object-fit: contain;
}

@media (max-width: $screen-md) {
  .main {
    .list {
      .listInner {
        position: relative;
        left: -220px;
        min-width: calc(100% - 16px);
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
        .footer-wrapper{
          width: 100%;
          height: fit-content;
          padding: 0 16px;
          margin-top: 64px;
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

@media (max-width: $screen-sm) {
  .main {
    padding: 0;
    margin: 0;
    .list {
      position: absolute;
      display: block;
      width: calc(100% - 32px);
      height: calc(100% - 32px);
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
        .footer-wrapper{
          width: 100%;
          height: fit-content;
          padding: 0 16px;
          margin-top: 50px;
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

@media (max-width: $screen-xs) {
  .main {
    padding: 0;
    margin: 0;
    .list {
      position: absolute;
      display: block;
      width: calc(100% - 32px);
      height: calc(100% - 32px);
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
</style>

<script lang="ts" setup>
//
import AvatarMenu from "@/components/AvatarMenu.vue";
import { ref } from "vue";
const searchQuery = ref("");
const onSearch = (value: string) => {
  console.log(value);
};
</script>
