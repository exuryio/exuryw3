<template>
  <div class="circle-container">
    <div class="fill-width fill-height">
      <Coin
        :models="[
          { initialRotationX: 2, initialRotationY: 1.5 },
          { initialRotationX: 5, initialRotationY: 3 },
          { initialRotationX: 1, initialRotationY: 2 },
          { initialRotationX: 5, initialRotationY: 3 },
          { initialRotationX: 1, initialRotationY: 2 },
          { initialRotationX: 2, initialRotationY: 1.5 },
        ]"
      ></Coin>
    </div>
  </div>
</template>

<script setup lang="ts">
import Coin from "./Coin.vue";
</script>

<style lang="scss" scoped>
@import "./coin.scss";
@import "@/styles/variables.scss";
.circle-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: $coin-scene-width;
  height: $coin-scene-height;
  animation: rotate $animation-group-duration linear infinite;
}

@keyframes rotate {
  0% {
    //transform: rotate(0deg);
    transform: translateY(0);
  }
  50% {
    //transform: rotate(360deg);
    transform: translateY(-100px);
  }
  100% {
    transform: translateY(-1px);
  }
}
</style>
