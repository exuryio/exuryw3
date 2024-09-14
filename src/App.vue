<template>
  <v-app class="fill-width" style="height: fit-content">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style lang="scss">
.v-list-item__prepend {
  display: block !important;
}
@media (min-width: 768px) {
  .v-navigation-drawer--active:not(.v-navigation-drawer--rail) {
    background-color: #0d151378 !important;
  }
}
</style>
