<template>
  <v-app class="fill-width" style="height: fit-content">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style>
.v-list-item__prepend {
  display: block !important;
}
.footer-home {
  position: absolute !important;
  top: calc(100vh - 192px) !important;
}
@media (max-width: 1280px) {
  .footer-home {
    position: relative !important;
    top: 0 !important;
  }
}
</style>
