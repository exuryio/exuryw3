<template>
    <div class="faq-wrapper">
        <div class="title-wrapper">
          <h2 class="title">Preguntas Frecuentes (FAQ)</h2>
          <p class="paragraph">Encuentra respuestas rápidas a las preguntas más comunes y descubre cómo empezar con EXURY. ¡Todo lo que necesitas saber para intercambiar criptomonedas de forma segura está aquí!</p>
        </div>
      <ul class="questions-wrapper">
        <li class="question" v-for="(item, index) in items" :key="index">
          <div class="question-title">{{ item.title }} <v-icon @click="onDropDownQuestion(index)" class="icon" :id="`icon_plus_${index}`">mdi-plus</v-icon><v-icon @click="onDropDownQuestion(index)" style="display: none" class="icon" :id="`icon-minus_${index}`">mdi-minus</v-icon></div>
          <div class="question-content" :id="`question_${index}`">
            <p>{{ item.answer }}</p>
          </div>
          <hr v-if="index !== items.length - 1" class="divider" />
        </li>
      </ul>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const items = ref([
  {title: "1.1. ¿Cómo me registro en EXURY?", answer: "Lorem ipsum dolor sit amet consectetur. Non tellus consectetur auctor risus orci ut mollis. Tincidunt dictum ut aliquet lacus id vitae. Rutrum sit sed pretium quam condimentum elit a. Et id eleifend faucibus et mi ut amet massa vitae. Ultricies rhoncus habitasse erat vel id sapien."},
  {title: "1.2. ¿Qué es el proceso KYC?", answer: "Lorem ipsum dolor sit amet consectetur. Non tellus consectetur auctor risus orci ut mollis. Tincidunt dictum ut aliquet lacus id vitae. Rutrum sit sed pretium quam condimentum elit a. Et id eleifend faucibus et mi ut amet massa vitae. Ultricies rhoncus habitasse erat vel id sapien."},
  {title: "1.3. ¿Cuánto tiempo tarda la verificación?", answer: "Lorem ipsum dolor sit amet consectetur. Non tellus consectetur auctor risus orci ut mollis. Tincidunt dictum ut aliquet lacus id vitae. Rutrum sit sed pretium quam condimentum elit a. Et id eleifend faucibus et mi ut amet massa vitae. Ultricies rhoncus habitasse erat vel id sapien."},
  {title: "2.1. ¿Cómo realizo un intercambio de criptomonedas a euros o viceversa?", answer: "Lorem ipsum dolor sit amet consectetur. Non tellus consectetur auctor risus orci ut mollis. Tincidunt dictum ut aliquet lacus id vitae. Rutrum sit sed pretium quam condimentum elit a. Et id eleifend faucibus et mi ut amet massa vitae. Ultricies rhoncus habitasse erat vel id sapien."},
])

const onDropDownQuestion = (index: number) => {
  const questionContent = document.getElementById(`question_${index}`);
  const iconPlus = document.getElementById(`icon_plus_${index}`);
  const iconMinus = document.getElementById(`icon-minus_${index}`);
  if (questionContent && iconPlus && iconMinus) {
    if (questionContent.style.display === "block") {
      questionContent.style.display = "none";
      iconPlus.style.display = "block";
      iconMinus.style.display = "none";
    } else {
      questionContent.style.display = "block";
      iconPlus.style.display = "none";
      iconMinus.style.display = "block";
    }
  }
}
</script>
<style lang="scss">
@import "@/styles/variables.scss";
.faq-wrapper {
  .questions-wrapper {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 32px;
    padding-right: 16px;
    .question {
      .question-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        color: $primary-color;
        margin-bottom: 20px;
        .icon {
          font-size: 24px;
          cursor: pointer;
          color: white;
        }
      }
      .question-content {
        display: none;
      }
      .divider {
        margin-top: 24px;
      }
    }
  }
}
@media (max-width: $screen-sm) {
  .faq-wrapper {
    padding: 0 16px;
  }
  ul li {
    list-style: none;
  }
}
</style>
