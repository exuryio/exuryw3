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
body, html {
  overflow: hidden; /* Esto elimina el scrollbar externo */
  height: 100%;
  margin: 0;
}

.main {
  overflow: hidden; /* Asegura que el contenedor principal no tenga scroll */
}
.v-navigation-drawer__content::-webkit-scrollbar {
  display: none;
}

.v-navigation-drawer__content {
  -ms-overflow-style: none; /* Para Internet Explorer y Edge */
  scrollbar-width: none; /* Para Firefox */
  overflow-y: auto; /* Asegura que no haya scrollbar visible */
}

</style>
