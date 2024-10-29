<script lang="ts" setup>

const props = defineProps<{
  frame: {
    title: string;
    description: string;
    image: string;
  };
  isSelected: boolean;
  index: number;
  currentFrame: number;
}>();
const emit = defineEmits(["select"]);

const isThisNextCard = computed(() => {
  return props.index === props.currentFrame + 1;
});

const selectFrame = () => {
  return;
  // emit("select", props.index);
};
</script>

<template>
  <div @click="selectFrame" :class="[isSelected ? 'card-selected' : isThisNextCard ? 'card-next' : 'card' ]">
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
.card, .card-next{
  border-radius: 28px;
  background-color: #0d1513;
  border: 1px solid #2d4740;
  box-sizing: border-box;
  height: 537px;
  width: 414px;
  min-width: 414px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 36px;
  opacity: 0.7;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
.card-selected {
  border-radius: 28px;
  background-color: #0d1513;
  border: 1px solid #2d4740;
  box-sizing: border-box;
  height: 587px;
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
    opacity 0.3s ease;
}
.card-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 10px;
  .card-image {
    width: 500px;
    margin-left: -20px;
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
      text-align: center;
    }
    .description-selected {
      align-self: stretch;
      position: relative;
      font-size: 0.55em;
      line-height: 1.1em;
      letter-spacing: 0.45px;
      color: #c7d4cf;
      text-align: center;
    }
    .description {
      align-self: stretch;
      position: relative;
      font-size: 0.55em;
      line-height: 1.1em;
      letter-spacing: 0.45px;
      color: #c7d4cf;
      text-align: center;
    }
  }
}

@media (max-width: $screen-lg) {
  .card-next {
    height: 460px;
    width: 270px;
    min-width: 270px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 32px;
    opacity: 0.7;
    border-radius: 28px;
    background-color: #0d1513;
    border: 1px solid #2d4740;
    box-sizing: border-box;
    z-index: 1;
  }
  .card {
    position: relative;
    height: 460px;
    width: 270px;
    min-width: 270px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 32px;
    opacity: 0.7;
    z-index: 5;
    transition: transform 0.3s ease, z-index 0.3s ease;
  }

  .card-selected {
    margin: 0 10px;
    height: 460px;
    width: 270px;
    min-width: 270px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 32px;
    opacity: 1;
    transform: scale(1.05);
    transition: transform 0.3s ease, z-index 0.3s ease;
  }
  .card-content {
    padding: 0;
    width: 100%;
    .card-image {
      width: 300px;
      margin-left: -10px;
      margin-bottom: -30px;
      position: relative;
      object-fit: cover;
    }
    .card-title {
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.4px;
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
