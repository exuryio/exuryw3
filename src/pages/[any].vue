<script lang="ts" setup>
import { watch, ref, onMounted } from "vue";
import { SIDEBAR_LINKS } from "@/domain/constants/sidebar.constant";
import { useAppStore } from "@/infraestructure/stores/app";
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
</script>
<template>
  <h1>
    <v-icon>{{ currentPageIcon || appStore.getPageIcon }}</v-icon>
    {{ appStore.getActivePage }} page
  </h1>
</template>
<route lang="yaml">
meta:
  layouts: default
</route>
