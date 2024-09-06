<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <div class="coin">
      <div class="face front" :style="`background-image: url('/src/assets/coins/${imgSrc}')`"></div>
      <div class="face back" :style="`background-image: url('/src/assets/coins/${imgSrc}')`"></div>
      <div class="edge"></div>
      <div class="edge"></div>
      <div class="edge"></div>
      <div class="edge"></div>
      <div class="edge"></div>
      <div class="edge"></div>
      <div class="edge"></div>
      <div class="edge"></div>
      <div class="edge"></div>
      <div class="mask"></div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
defineProps({
  imgSrc: String,
});
</script>

<style lang="scss" scoped>
@import "./coin.scss";
.coin {
  position: relative;
  width: $coin-width;
  height: $coin-height;
  transform-style: preserve-3d;
  animation: spin $animation-single-duration linear infinite;
  //transform: rotateZ(45deg);
  //box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  perspective: 1000px;
}

.face {
  position: absolute;
  width: $coin-width;
  height: $coin-height;
  background-color: $coin-base-color;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.front {
  //background-image: url("/assets/coin_front_face.png");
  background-size: 250px;
  background-position: center;
  //background-color: #3dff9b;
  //background-blend-mode: multiply;
  transform: translateZ(-2px);
}

.back {
  position: absolute;
  top: -1px;
  left: -1px;
  //background-image: url("/assets/coin_front_face.png");
  background-size: 230px;
  background-position: center;
  //background-color: #3dff9b;
  //background-blend-mode: multiply;
  transform: rotateY(180deg) translateZ(10px);
}

.edge:nth-child(1) {
  position: absolute;
  top: $edge-top;
  left: $edge-left;
  width: $edge-width;
  height: $edge-height;
  background-color: $edge-background-color;
  border-radius: 50%;
  transform: translateZ(-1px);
}
.edge:nth-child(2) {
  position: absolute;
  top: $edge-top;
  left: $edge-left;
  width: $edge-width;
  height: $edge-height;
  background-color: $edge-background-color;
  border-radius: 50%;
  transform: translateZ(-2px);
}
.edge:nth-child(3) {
  position: absolute;
  top: $edge-top;
  left: $edge-left;
  width: $edge-width;
  height: $edge-height;
  background-color: $edge-background-color;
  border-radius: 50%;
  transform: translateZ(-3px);
}
.edge:nth-child(4) {
  position: absolute;
  top: $edge-top;
  left: $edge-left;
  width: $edge-width;
  height: $edge-height;
  background-color: $edge-background-color;
  border-radius: 50%;
  transform: translateZ(-4px);
}
.edge:nth-child(5) {
  position: absolute;
  top: $edge-top;
  left: $edge-left;
  width: $edge-width;
  height: $edge-height;
  background-color: $edge-background-color;
  border-radius: 50%;
  transform: translateZ(-5px);
}
.edge:nth-child(6) {
  position: absolute;
  top: $edge-top;
  left: $edge-left;
  width: $edge-width;
  height: $edge-height;
  background-color: $edge-background-color;
  border-radius: 50%;
  transform: translateZ(-6px);
}
.edge:nth-child(7) {
  position: absolute;
  top: $edge-top;
  left: $edge-left;
  width: $edge-width;
  height: $edge-height;
  background-color: $edge-background-color;
  border-radius: 50%;
  transform: translateZ(-7px);
}
.edge:nth-child(8) {
  position: absolute;
  top: $edge-top;
  left: $edge-left;
  width: $edge-width;
  height: $edge-height;
  background-color: $edge-background-color;
  border-radius: 50%;
  transform: translateZ(-8px);
}
.edge:nth-child(9) {
  position: absolute;
  top: $edge-top;
  left: $edge-left;
  width: $edge-width;
  height: $edge-height;
  background-color: $edge-background-color;
  border-radius: 50%;
  transform: translateZ(-9px);
}

//.mask {
//  position: absolute;
//  width: $coin-width;
//  height: $coin-height;
//  border-radius: 50%;
//  background-image: radial-gradient(
//    circle,
//    transparent 70%,
//    rgba(3, 61, 31, 0.67) 60%
//  );
//  border: 1px solid rgba(70, 201, 133, 0.43);
//  top: 0;
//  left: 0;
//  pointer-events: none;
//}
@keyframes spin {
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(80deg);
  }
  100% {
    transform: rotateY(0deg);
  }
}
</style>
