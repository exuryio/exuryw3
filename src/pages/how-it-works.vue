<template>
  <div class="how-it-works-wrapper">
    <div class="title-wrapper">
      <div class="title">
        <b class="card-title">How it works?</b>
        <div class="subtitle-wrapper">
          <div class="subtitle">
            ¡Intercambia tus criptoactivos con EXURY en solo 4 simples pasos! Sigue nuestra guía rápida y segura para completar tu transacción sin complicaciones.
          </div>
          <div class="button-wrapper">
            <router-link to="/home" custom v-slot="{ href, navigate }">
              <v-btn
                rounded
                variant="outlined"
                class="btn-label text-capitalize"
                :href="href"
                @click="navigate"
              >
                Empezar
              </v-btn>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <OnBoardingCardGroup />
  </div>
</template>

<script lang="ts" setup>
import OnBoardingCardGroup from "@/components/cards/OnBoardingCardGroup.vue";

</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.how-it-works-wrapper {
  position: relative;
  height: fit-content;
  width: 100%;
  max-width: 100%;
  gap: 10px;
  z-index: 1;
  font-size: 2.5em;
  margin-top: 32px;
  .title-wrapper {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: end;
    height: fit-content;
    overflow-y: hidden;
    min-height: fit-content;
    width: 100%;
    .title {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 8px;
      width: 100%;
      min-height: fit-content;
      .card-title{
        height: fit-content;
      }
    }
    .subtitle-wrapper {
      margin-bottom: 0;
      width: 100%;
      position: relative;
      display: flex;
      align-items: start;
      justify-content: space-between;
      .subtitle {

        font-size: 0.45em;
        letter-spacing: 0.5px;

      }
      .button-wrapper {
        z-index: 1000;
        display: flex;
        align-items: end;
        justify-content: end;
        margin-right: 16px;
        .btn-label {
          border: 0.1px solid white;
          color: #1cba75;
        }
      }
    }
  }
}
@media (max-width: $screen-lg) {
  .how-it-works-wrapper {
    height: fit-content;
    .title-wrapper {
      padding: 0 0 0 16px;
      margin-top: 24px;
      .title {
        font-size: 24px;
      }
      .subtitle-wrapper {
        display: flex;
        flex-direction: column;
        .subtitle {
          font-size: 16px;
        }
        .button-wrapper {
          margin-top: 24px;
        }
      }
    }
  }
}
</style>