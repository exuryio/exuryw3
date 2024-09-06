<script lang="ts" setup>
import { useHead } from "@vueuse/head";
onMounted(() => {
  useHead({ title: "Home" });
});
</script>
<template>
  <h1>Default</h1>
</template>
<route lang="yaml">
meta:
  layout: default
</route>
