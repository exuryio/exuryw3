<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import OnBoardingCard from "@/components/cards/OnBoardingCard.vue";

const initialTouchPosition = ref(0);
const finalTouchPosition = ref(0);
const isScrolling = ref(false);
const currentFrame = ref(0);
const isInsideCardGroup = ref(false);
const cardWrapper = ref<HTMLElement | null>(null);
const isMobile = ref(false);

const frames = ref([
  {
    title: "1. Protege Tu Cuenta: Regístrate y Verifícate",
    description: "Regístrate en 5 minutos y completa tu verificación KYC.",
    image: "assets/how-it-works/Howitworksecury_white-01.svg",
  },
  {
    title: "2. Negocia en Persona: \n" +
      "Define tu operación",
    description: "Tras verificarte, serás dirigido a nuestro WhatsApp corporativo para definir los detalles de tu operación.",
    image: "assets/how-it-works/Howitworksecury_white-02.svg",
  },
  {
    title: "3. Envía con Confianza: \nTransferencia Segura de Fondos",
    description: "Transfiere tus fondos sin preocupaciones. Ya sea en criptomonedas o euros, el proceso es seguro y rápido.",
    image: "assets/how-it-works/Howitworksecury_white-03.svg",
  },
  {
    title: "4. Recibe con Tranquilidad: \n" +
      "Confirmación y Envío Final",
    description: "Indica tu wallet para cripto o cuenta bancaria para euros. EXURY finalizara tu transacción de forma rápida y sencilla.",
    image: "assets/how-it-works/Howitworksecury_white-04.svg",
  },
]);

const setFrame = (index: number) => {
  currentFrame.value = index;
  //^_arrangeStack();
};


const nextFrame = () => {
  if (currentFrame.value < frames.value.length - 1) {
    currentFrame.value++;
    scrollToFrame(currentFrame.value, "right");
  }
};

const prevFrame = () => {
  console.log("prevFrame");
  if (currentFrame.value > 0) {
    currentFrame.value--;
    scrollToFrame(currentFrame.value, "left");
  }
};

const scrollToFrame = (index: number, side: "left" | "right") => {
  const container = cardWrapper.value;
  const card = container?.children[index] as HTMLElement;
  if (container && card) {
    const scrollPosition = card.offsetLeft - (side === "right" ? 30 : 5);
    container.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  }
};

const handleTouchStart = (event: TouchEvent) => {
  if (event.touches.length === 1) {
    isScrolling.value = true;
    initialTouchPosition.value = event.touches[0].clientX;
  }
};

const handleTouchMove = (event: TouchEvent) => {
  if (isScrolling.value && event.touches.length === 1) {
    finalTouchPosition.value = event.touches[0].clientX;
    console.log("moving");
  }
};

const handleTouchEnd = () => {
  isScrolling.value = false;
  const difference = finalTouchPosition.value - initialTouchPosition.value;
  console.log(difference);

  if (difference < 0) {
    nextFrame();
  } else if (difference > 0) {
    prevFrame();
  }
};

const mouseEnterCardGroup = () => {
  isInsideCardGroup.value = true;
};

const mouseLeaveCardGroup = () => {
  isInsideCardGroup.value = false;
};

onMounted(() => {
  // if (window.innerWidth < 500) {
  //
  // }
  isMobile.value = true;
  if (isMobile.value) {
    cardWrapper.value = document.querySelector(".cards-transition-group");
    if (cardWrapper.value) {
      cardWrapper.value.addEventListener("touchstart", handleTouchStart);
      cardWrapper.value.addEventListener("touchmove", handleTouchMove);
      cardWrapper.value.addEventListener("touchend", handleTouchEnd);
    }
  }
});

onUnmounted(() => {
  if (cardWrapper.value) {
    cardWrapper.value.removeEventListener("touchstart", handleTouchStart);
    cardWrapper.value.removeEventListener("touchmove", handleTouchMove);
    cardWrapper.value.removeEventListener("touchend", handleTouchEnd);
  }
});
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
        :currentFrame="currentFrame"
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
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    padding: 20px 30px 20px 0;
    height: fit-content;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
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
    top: 0;
    margin-top: -20px;
    max-height: fit-content;
    overflow: hidden;
    .cards-transition-group {
      min-height: 550px;
      max-height: 550px;
      margin-top: 38px;
      padding: 20px 20px 0 10px;
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
