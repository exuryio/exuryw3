<template>
  <v-menu location="start" :close-on-content-click="false" >
    <template v-slot:activator="{ props }">
      <img
        v-bind="props"
        :class="$style.genericAvatarIcon"
        alt="User Avatar"
        src="/avatar.svg"
      />
    </template>
    <v-list dense class="mt-12 p-3" style="width: 200px; right: -40px">
      <v-list-item title="Settings" class="py-2 px-3">
        <template v-slot:prepend>
          <v-icon color="white" class="mr-3">mdi-cog</v-icon>
        </template>
      </v-list-item>
      <v-divider :class="$style.divider" />
      <v-list-item title="Log out">
        <template v-slot:prepend>
          <v-icon color="white" class="mr-3">mdi-logout</v-icon>
        </template>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style scoped module>
.genericAvatarIcon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
}

.menuCard {
  background-color: #1c1c1c;
  color: #c7d4cf;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
}

.divider {
  background-color: #49454f;
  height: 1px;
  margin: 4px 0;
}
</style>
<script setup lang="ts"></script>
