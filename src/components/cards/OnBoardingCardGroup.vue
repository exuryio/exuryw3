<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import OnBoardingCard from "@/components/cards/OnBoardingCard.vue";

const currentFrame = ref(0);
const isInsideCardGroup = ref(false);
const cardWrapper = ref<HTMLElement | null>(null);
const scrollPosition = ref(0);

const frames = ref([
  {
    title: "Header",
    description:
      "Lorem ipsum dolor sit amet consectetur. Non tellus consectetur auctor risus orci ut mollis. Tincidunt dictum ut aliquet lacus id vitae. Rutrum sit sed pretium quam condimentum elit a. Et id eleifend faucibus et mi ut amet massa vitae. Ultricies rhoncus habitasse erat vel id sapien.",
    image: "/image5.png",
  },
  {
    title: "Header 2",
    description:
      "Lorem ipsum dolor sit amet consectetur. Non tellus consectetur auctor risus orci ut mollis. Tincidunt dictum ut aliquet lacus id vitae. Rutrum sit sed pretium quam condimentum elit a. Et id eleifend faucibus et mi ut amet massa vitae. Ultricies rhoncus habitasse erat vel id sapien.",
    image: "/image5.png",
  },
  {
    title: "Header 3",
    description:
      "Lorem ipsum dolor sit amet consectetur. Non tellus consectetur auctor risus orci ut mollis. Tincidunt dictum ut aliquet lacus id vitae. Rutrum sit sed pretium quam condimentum elit a. Et id eleifend faucibus et mi ut amet massa vitae. Ultricies rhoncus habitasse erat vel id sapien.",
    image: "/image5.png",
  },
  {
    title: "Header 3",
    description:
      "Lorem ipsum dolor sit amet consectetur. Non tellus consectetur auctor risus orci ut mollis. Tincidunt dictum ut aliquet lacus id vitae. Rutrum sit sed pretium quam condimentum elit a. Et id eleifend faucibus et mi ut amet massa vitae. Ultricies rhoncus habitasse erat vel id sapien.",
    image: "/image5.png",
  },
]);

const setFrame = (index: number) => {
  currentFrame.value = index;
};

const nextFrame = () => {
  scrollToRight();
  // if (currentFrame.value >= 1) {
  //   scrollToRight();
  // }
  currentFrame.value = (currentFrame.value + 1) % frames.value.length;
};

const prevFrame = () => {
  if (
    currentFrame.value <= frames.value.length - 1 &&
    currentFrame.value >= 1
  ) {
    scrollToLeft();
  }
  currentFrame.value =
    (currentFrame.value - 1 + frames.value.length) % frames.value.length;
};

const scrollToRight = () => {
  const container = document.querySelector(".cards-transition-group");
  const card = document.querySelector(".card-selected") as HTMLElement;
  if (container && card) {
    container.scrollBy({ left: (card.offsetWidth - 46), behavior: "smooth" });
  }
};

const scrollToLeft = () => {
  const container = document.querySelector(".cards-transition-group");
  const card = document.querySelector(".card-selected") as HTMLElement;
  if (container && card) {
    container.scrollBy({ left: -card.offsetWidth + 46, behavior: "smooth" });
  }
};

const mouseEnterCardGroup = () => {
  isInsideCardGroup.value = true;
};

const mouseLeaveCardGroup = () => {
  isInsideCardGroup.value = false;
};

onMounted(() => {
  if (window.innerWidth < 500) {
    cardWrapper.value = document.querySelector(".cards-transition-group");
    if (cardWrapper.value) {
      cardWrapper.value.addEventListener("scroll", handleScroll);
    }
  }
});

const handleScroll = () => {
  if (cardWrapper.value) {
    scrollPosition.value = cardWrapper.value.scrollLeft;
  }
};

watch(scrollPosition, () => {
  if (window.innerWidth < 600) {
    checkCurrentFrame(scrollPosition.value);
  }
});

const checkCurrentFrame = (value: number) => {
  if (value <= 180) {
    currentFrame.value = 0;
  }
  if (value >= 180 && value <= 420) {
    currentFrame.value = 1;
  }
  if (value >= 420 && value <= 650) {
    currentFrame.value = 2;
  }
  if (value >= 650) {
    currentFrame.value = 3;
  }
};
</script>

<template>
  <div
    class="cards-wrapper"
    @mouseenter="mouseEnterCardGroup"
    @mouseleave="mouseLeaveCardGroup"
  >
    <transition-group
      name="slide-fade"
      tag="div"
      class="cards-transition-group"
    >
      <OnBoardingCard
        v-for="(frame, index) in frames"
        :key="index"
        :frame="frame"
        :isSelected="index === currentFrame"
        :index="index"
        @select="setFrame"
      />
    </transition-group>
    <div class="dotParent">
      <div
        v-for="(_, index) in frames"
        :key="index"
        :class="index === currentFrame ? 'dotActive' : 'dotInactive'"
        @click="setFrame(index)"
      >
        <div class="dotItem" />
      </div>
    </div>
    <div class="card-left-navigation-wrapper" v-if="isInsideCardGroup">
      <v-btn icon="mdi-chevron-left" @click="prevFrame" v-if="currentFrame > 0">
      </v-btn>
    </div>
    <div class="card-right-navigation-wrapper" v-if="isInsideCardGroup">
      <v-btn
        icon="mdi-chevron-right"
        @click="nextFrame"
        v-if="currentFrame < frames.length - 1"
      >
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.cards-wrapper {
  margin-top: 15px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 10px;
  font-size: 25.03px;
  color: #1cba75;
  height: fit-content;
  max-height: fit-content;
  width: 100%;
  max-width: 100%;
  .cards-transition-group::-webkit-scrollbar {
    display: none;
  }
  .cards-transition-group {
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: flex-start;
    gap: 8px;
    padding: 20px 30px 20px 0;
    height: fit-content;
    width: 100%;
    max-width: 100%;
    overflow: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .card-left-navigation-wrapper {
    position: absolute;
    top: calc(40% - 20px);
    left: 10px;
  }
  .card-right-navigation-wrapper {
    position: absolute;
    top: calc(40% - 20px);
    right: 10px;
  }
}
.dotActive {
  width: 24px;
  position: relative;
  border-radius: 33px;
  height: 8px;
  overflow: hidden;
  flex-shrink: 0;
  background-color: #1cba75;
  cursor: pointer;
}
.dotInactive {
  width: 8px;
  position: relative;
  border-radius: 33px;
  height: 8px;
  overflow: hidden;
  flex-shrink: 0;
  background-color: #ededed;
  cursor: pointer;
}
.dotItem {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  left: 0;
}
.dotParent {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-bottom: 6px;
  gap: 4px;
  z-index: 100;
}
@media (max-width: $screen-md) {
  .cards-wrapper {
    min-height: 520px;
    max-height: 520px;
    margin-top: 0;
    overflow-y: hidden;
    .cards-transition-group {
      overflow-y: hidden;
      min-height: 500px;
      max-height: 500px;
    }
    .card-left-navigation-wrapper {
      display: none;
    }
    .card-right-navigation-wrapper {
      display: none;
    }
  }
}

@media (max-width: $screen-sm) {
  .cards-wrapper {
    margin-top: -20px;
    .cards-transition-group {
      margin-top: 24px;
      padding: 20px 20px 0 20px;
    }
  }
  .dotParent {
    position: absolute;
    top: 0;
    justify-content: end;
    padding: 0 16px 0 0;
  }
}
</style>
