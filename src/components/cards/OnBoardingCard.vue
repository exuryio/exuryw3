<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
  frame: {
    title: string;
    description: string;
    image: string;
  };
  isSelected: boolean;
  index: number;
}>();
const emit = defineEmits(["select"]);

const selectFrame = () => {
  emit("select", props.index);
};
</script>

<template>
  <div @click="selectFrame" :class="[isSelected ? 'card-selected' : 'card']">
    <div class="card-content">
      <img class="card-image" :src="frame.image" alt="card image" />
      <div class="card-text-wrapper">
        <b class="card-title">{{ frame.title }}</b>
        <div :class="[isSelected ? 'description-selected' : 'description']">
          {{ frame.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.card {
  border-radius: 28px;
  background-color: #0d1513;
  border: 1px solid #2d4740;
  box-sizing: border-box;
  height: 574.9px;
  width: 405px;
  min-width: 405px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 36px;
  opacity: 0.7;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease,
    width 0.3s ease,
    height 0.3s ease,
    margin-top 0.3s ease;
}
.card-selected {
  border-radius: 28px;
  background-color: #0d1513;
  border: 1px solid #2d4740;
  box-sizing: border-box;
  height: 609px;
  width: 453px;
  min-width: 453px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 36px;
  margin-top: 0;
  opacity: 1;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease,
    width 0.3s ease,
    height 0.3s ease,
    margin-top 0.3s ease;
}
.card-content {
  align-self: stretch;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  .card-image {
    width: 237px;
    position: relative;
    object-fit: cover;
  }
  .card-text-wrapper {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    .card-title {
      position: relative;
      letter-spacing: -0.02em;
      line-height: 1.1em;
      margin-top: 20px;
    }
    .description-selected {
      align-self: stretch;
      position: relative;
      font-size: 0.55em;
      line-height: 1.1em;
      letter-spacing: 0.45px;
      color: #c7d4cf;
    }
    .description {
      align-self: stretch;
      position: relative;
      font-size: 0.55em;
      line-height: 1.1em;
      letter-spacing: 0.45px;
      color: #c7d4cf;
    }
  }
}
@media (max-width: $screen-md) {
  .card {
    margin-top: 20px;
    height: 411.7px;
    width: 245px;
    min-width: 245px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 36px;
    opacity: 0.7;
    transition:
      margin 1s,
      width 0.5s,
      height 0.5s,
      opacity 1s;
  }
  .card-selected {
    height: fit-content;
    width: 270px;
    min-width: 270px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 36px;
    opacity: 1;
    transition:
      margin 1s,
      width 0.5s,
      height 0.5s,
      opacity 1s;
  }
  .card-content {
    .card-image {
      width: 142px;
      position: relative;
      object-fit: cover;
    }
    .description-selected {
      font-size: 16px;
    }
    .description {
      font-size: 16px;
    }
  }
}
</style>
