<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <div class="coin-group">
      <div v-for="(coin, index) in coins" :key="index" class="coin-wrapper">
        <CoinModel :imgSrc="coin.imgSrc" />
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import CoinModel from "./CoinModel.vue";
const coins = [
  { imgSrc: "coinsfrontview_bitcoin.png" },
  { imgSrc: "coinsfrontview_BNB.png" },
  { imgSrc: "coinsfrontview_ETH.png" },
  { imgSrc: "coinsfrontview_euro.png" },
  { imgSrc: "coinsfrontview_solaris.png" },
  { imgSrc: "coinsfrontview_USDT.png" }
];
</script>

<style lang="scss" scoped>
@import "./coin.scss";
.coin-group {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 500px;
  animation: group-spin $animation-group-duration linear infinite;
  perspective: 1000px;
}

.coin-wrapper {
  position: absolute;
  width: $coin-width;
  height: $coin-height;
  transform-style: preserve-3d;
  //box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  //animation: coin-spin 4s linear infinite;
}

.coin-wrapper:nth-child(1) {
  transform: rotate(0deg) translateX(230px);
}
.coin-wrapper:nth-child(2) {
  transform: rotate(45deg) translateX(100px);
}
.coin-wrapper:nth-child(3) {
  transform: rotate(90deg) translateX(230px);
}
.coin-wrapper:nth-child(4) {
  transform: rotate(135deg) translateX(50px);
}
.coin-wrapper:nth-child(5) {
  transform: rotate(180deg) translateX(230px);
}
.coin-wrapper:nth-child(6) {
  transform: rotate(225deg) translateX(150px);
}
// .coin-wrapper:nth-child(1) { transform: rotate(0deg) translateX(230px); }
//.coin-wrapper:nth-child(2) { transform: rotate(45deg) translateX(230px); }
//.coin-wrapper:nth-child(3) { transform: rotate(90deg) translateX(230px); }
//.coin-wrapper:nth-child(4) { transform: rotate(135deg) translateX(230px); }
//.coin-wrapper:nth-child(5) { transform: rotate(180deg) translateX(230px); }
//.coin-wrapper:nth-child(6) { transform: rotate(225deg) translateX(230px); }
//.coin-wrapper:nth-child(7) { transform: rotate(270deg) translateX(230px); }
//.coin-wrapper:nth-child(8) { transform: rotate(315deg) translateX(230px); }

@keyframes group-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes coin-spin {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}
</style>
