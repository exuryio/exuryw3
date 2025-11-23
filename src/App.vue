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
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
  margin: 0;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.main {
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}
.v-navigation-drawer__content::-webkit-scrollbar {
  display: none;
}

.v-navigation-drawer__content {
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-y: auto;
}

/* Estilos globales para router-link en el footer */
.footer-wrapper .legal-section ul li router-link,
.footer-wrapper .legal-section ul li a,
.footer-wrapper ul li router-link,
.footer-wrapper ul li a {
  color: #E6E1E3 !important;
  text-decoration: none !important;
  border-bottom: none !important;
}

.footer-wrapper .legal-section ul li router-link:hover,
.footer-wrapper .legal-section ul li a:hover,
.footer-wrapper ul li router-link:hover,
.footer-wrapper ul li a:hover {
  color: #1cba75 !important;
  text-decoration: none !important;
  border-bottom: none !important;
}

</style>
