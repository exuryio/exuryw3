<script lang="ts" setup>
// import CoinModel from "@/components/coin/CoinModel.vue";
import CoinGroupModel from "@/components/coin/CoinGroupModel.vue";
// import CoinScene from "@/components/coin/CoinScene.vue";
//const appStore = useAppStore();
import { googleTokenLogin } from "vue3-google-login"
const login = () => {
  googleTokenLogin().then((response) => {
    console.log("Handle the response", response)
  })
}

</script>
<template>
  <div class="home-wrapper">

    <div class="main-content">
<!--      <img-->
<!--        class="image-coins"-->
<!--        alt=""-->
<!--        src="/Homeimagecoinscircle-exury.png"-->
<!--      />-->
      <div class="coins-wrapper">
<!--        <CoinModel></CoinModel>-->
        <CoinGroupModel></CoinGroupModel>
<!--        <CoinScene />-->
      </div>
      <div class="content-wrapper">
        <div class="title-wrapper">
          <p class="title-top">
            Gana más, arriesga menos.
          </p>
          <span class="title-accent">¡Descubre el 1<sup>er</sup>
            exchange sin custodia!</span>
        </div>
        <div class="paragraph-wrapper">
          <p>
            Cambia hoy euros por stablecoins y siente la libertad de tener el control sobre dónde almacenarlos.
          </p>
        </div>
        <div class="buttons-wrapper">
          <v-btn rounded variant="outlined" class="btn-how-it-works text-capitalize">How it works</v-btn>
          <v-btn rounded color="primary" class="btn-buy-crypto text-capitalize" @click="login">Buy Crypto</v-btn>
        </div>
      </div>
      <div class="sponsorship-wrapper">
        <img
          class="sponsor-left"
          alt=""
          src="/EN_Funded_by_European_Union_vert_RGB_NEG.png"
        />
        <img class="sponsor-right" alt="" src="/banco-de-espana-white.png" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.home-wrapper {
  margin: 0 !important;
  height: fit-content;
  box-sizing: border-box;
  gap: 32px;
  z-index: 1;
  font-size: 64px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: start;
  .main-content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: fit-content;
    .content-wrapper {
      width: 100%;
      max-height: fit-content;
      display: flex;
      flex-direction: column;
      align-items: start;
      .title-wrapper {
        margin-top: 108px;
        position: relative;
        letter-spacing: 0.5px;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: start;
        font-weight: normal;
        width: 65%;
        .title-top {
          display: flex;
          flex-direction: column;
          margin: 0;
          line-height: 1.2em;
          font-size: 64px;
          width: 90%;
        }
        .title-accent {
          font-weight: 800;
          color: #f2f2f2;
          line-height: 1.2em;
        }
      }
      .paragraph-wrapper {
        width: 70%;
        position: relative;
        font-size: 24px;
        line-height: 1.2em;
        letter-spacing: 0.5px;
        z-index: 2;
      }
      .buttons-wrapper {
        margin-top: 32px;
        width: 255px;
        height: fit-content;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 16px;
        text-align: center;
        font-size: 14px;
        color: #1cba75;
      }
    }
    .sponsorship-wrapper {
      margin-top: 95px;
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 32px;
      z-index: 2;
      text-align: center;
      color: #fff;
      .sponsor-left {
        width: 124px;
        position: relative;
        height: 104px;
        object-fit: cover;
        filter: brightness(1000%);
      }
      .sponsor-right {
        width: 220px;
        position: relative;
        height: 48.6px;
        object-fit: cover;
      }
    }
  }

}

.image-coins {
  width: 622.1px;
  position: absolute;
  margin: 0 !important;
  top: -50px;
  right: 90px;
  height: 623px;
  object-fit: cover;
  z-index: 0;
}

.frameParent {
  align-self: stretch;
  width: 1025px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  position: relative;
  gap: 32px;
  z-index: 1;
  background: green;
}
.stateLayer13 {
  align-self: stretch;
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px 24px;
}
.labelText {
  position: relative;
  letter-spacing: 0.1px;
  line-height: 20px;
  font-weight: 500;
}
.coins-wrapper {
  position: absolute;
  top: -80px;
  right: 50px;
  width: fit-content;
  height: 100%;
  display: flex;
  align-items: center;
}
@media (max-width: $screen-md) {
  .home-wrapper {
    .content-wrapper {
      margin-top: -100px;
    }
    .coins-wrapper {
      position: absolute;
      top: -200px;
      right: 0;
    }
  }
}
@media (max-width: $screen-sm) {
  .home-wrapper {
    min-height: 100%;
    height: fit-content;
    max-height: fit-content;
    width: 100%;
    justify-content: start;
    .main-content {
      align-items: start;
      justify-content: start;
      .coins-wrapper {
        position: relative;
        top: -100px;
        right: 50px;
        width: fit-content;
        height: fit-content;
      }
      .content-wrapper {
        position: relative;
        top: -40%;
        margin-top: 150px;
        .title-wrapper {
          padding: 0 16px;
          width: 100%;
          margin-top: -390px;
          .title-top {
            width: 75%;
            font-size: 32px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
          }
          .title-accent {
            font-size: 32px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
          }
        }
        .paragraph-wrapper {
          margin-top: 10px;
          width: 100%;
          padding: 0 16px;
          p {
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
          }
        }
        .buttons-wrapper{
          width: 100%;
          display: flex;
          flex-direction: column-reverse;
          padding: 0 16px;
          margin-bottom: 63px;
          .btn-how-it-works, .btn-buy-crypto{
            width: 100%;
            padding: 10px 24px;
          }
        }
      }
      .sponsorship-wrapper {
        margin-top: 0;
        position: relative;
        top: calc(-40% + 50px);
        display: flex;
        justify-content: start;
        padding: 0 0 0 28px;
        .sponsor-left{
          width: 80px;
        }
        .sponsor-right {
          width: 150px;
        }
      }
    }
  }
}

@media (max-width: $screen-xs) {
  .home-wrapper {
    .main-content {
      .coins-wrapper {
        top: -120px;
      }
      .content-wrapper {
        top: -150px;
      }
      .sponsorship-wrapper{
        margin-top: -200px;
      }
    }
  }
}
</style>
