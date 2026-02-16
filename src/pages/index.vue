<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useHead } from "@vueuse/head";

const router = useRouter();
onMounted(() => {
  useHead({ title: "Home" });
  // Redirigir siempre a la home real para no mostrar esta página placeholder
  router.replace('/home');
});
</script>
<template>
  <div class="index-redirect">
    <v-progress-circular indeterminate color="#1cba75" size="32" />
    <p>Cargando...</p>
  </div>
</template>
<style scoped>
.index-redirect {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 120px;
  color: rgba(255, 255, 255, 0.8);
}
.index-redirect p { margin: 0; font-size: 14px; }
</style>

<route lang="yaml">
meta:
  layout: default
</route>
