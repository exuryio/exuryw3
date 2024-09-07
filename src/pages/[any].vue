<script lang="ts" setup>
import { watch, ref, onMounted } from "vue";
import { SIDEBAR_LINKS } from "@/domain/constants/sidebar.constant";
import { useAppStore } from "@/infraestructure/stores/app";
import router from "@/infraestructure/router";
const route = useRoute();
const currentPageIcon: any = ref("");
const appStore = useAppStore();
watch(route, (newRoute) => {
  currentPageIcon.value = SIDEBAR_LINKS.find(
    (link) => link.route === newRoute.path,
  )?.icon;
});
onMounted(() => {
  currentPageIcon.value = SIDEBAR_LINKS.find(
    (link) => link.route === route.path,
  )?.icon;
});

const goHome = () => {
  appStore.setActivePage("Home");
  router.push("/");
};
</script>
<template>
  <div class="d-flex justify-center w-100" style="margin-top: 136px;">
    <div class="d-flex align-center flex-column">
      <img src="/image5.png"  alt="Coming Soon" height="197" width="192"/>
      <h3 class="text-center text-primary mt-4">Proximamente!</h3>
      <p class="text-center w-75">{{appStore.getActivePage}} -  The page you are looking for might it's been developing.</p>
      <div class="buttons-group ga-4 d-flex flex-column mt-8">
        <v-btn color="primary"  rounded @click="goHome()">Volver al home</v-btn>
        <v-btn color="primary" variant="text">Saber más</v-btn>
      </div>
    </div>
  </div>
</template>
<route lang="yaml">
meta:
  layouts: default
</route>

