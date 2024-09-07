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
  {title: "1.1. ¿Cómo me registro en EXURY?", answer: "Regístrate en EXURY visitando nuestra web, completando el formulario y verificando tu cuenta a través del correo de confirmación."},
  {title: "1.2. ¿De que se trata el proceso de KYC?", answer: "KYC es un proceso de verificación de identidad que garantiza la seguridad de los usuarios, cumpliendo con normativas internacionales."},
  {title: "1.3. ¿Cuanto dura el proceso de verificación?", answer: "El proceso de verificación suele completarse en menos de 24 horas, dependiendo de la documentación"},
  {title: "2.1. ¿Cómo realizo un intercambio de criptomonedas a euros o viceversa?", answer: "Recibiras un mensaje con la cantidad que solicites intercambiar, junto a una oferta personalizada por parte de nuestros agentes, una vez confirmada la transacción, tus fondos estarán disponibles en minutos en la wallet que nos indiques"},
  {title: "2.2. ¿Cuáles son las tarifas de intercambio en EXURY?", answer:"Ofrecemos tarifas bajas y transparentes, que pueden variar según la criptomoneda y el volumen, al registrate nuestra asistencia personalizada te brindará todos los detalles"},
  {title: "2.3. ¿Cómo puedo asegurar la seguridad de mis criptomonedas en EXURY?", answer: "EXURY protege tus fondos con tecnología avanzada y al ser sin custodia, tú mantienes el control total de tus claves privadas."},
  {title: "3.1. ¿Cómo funciona el soporte al cliente en EXURY?", answer: "Nuestro soporte al cliente está disponible 24/7 a través de chat, correo electrónico y teléfono para asistencia personalizada."},
  {title: "3.3. ¿Hay límites de intercambio en la plataforma?", answer: "Los límites dependen de la criptomoneda y tu nivel de verificación; aumenta tu verificación para ampliar tus límites de intercambio."},
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
