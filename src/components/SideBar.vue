<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useHead } from "@vueuse/head";
import { SIDEBAR_LINKS } from "@/domain/constants/sidebar.constant";
import { useAppStore } from "@/infraestructure/stores/app";
import { SidebarItem } from "@/domain/models/sidebar-item";
import { linksToShow } from "@/application/mappers/sidebar-mapper";

import { googleTokenLogin } from "vue3-google-login"
const login = () => {
  googleTokenLogin().then((response) => {
    console.log("Handle the response", response)
  })
}

const router = useRouter();
const route = useRoute();

const appStore = useAppStore();

const isCollapsed = ref(false);

watch(route, (newRoute) => {
  const currentLink = SIDEBAR_LINKS.find(
    (link) => link.route === newRoute.path,
  );
  if (currentLink) {
    useHead({ title: currentLink.title });
  } else {
    useHead({ title: appStore.getActivePage });
  }
  document.querySelector(".listInner")?.scrollTo?.(0,0)
  // Keep sidebar expanded on route change for better UX
  // isCollapsed.value = true;
});
onMounted(() => {
  const currentLink = SIDEBAR_LINKS.find((link) => link.route === route.path);
  if (currentLink) {
    useHead({ title: currentLink.title });
    appStore.setActivePage(currentLink.title!);
  }
});

const toggle = () => {
  isCollapsed.value = !isCollapsed.value;
};

const handleItem = (item: SidebarItem): void => {
  appStore.setActivePage(item.title!);
  router.push(item.route);
};


</script>

<template>
  <v-navigation-drawer
    class="sidebar rounded-te-0 rounded-be-0"
    :class="{ 'collapsed-drawer': isCollapsed}"
    :rail="isCollapsed"
    permanent
  >
    <v-list-item class="btn-menu-wrapper justify-center pt-2 pb-3 ml-2 mb-6">
      <v-btn icon="mdi-menu" @click="toggle" class="menu-fab">
      </v-btn>
    </v-list-item>

    <div class="scrollable-content">
      <v-list dense>
        <v-list-item-group
          v-model="route.path"
          density="compact"
          nav
          :class="['options-bar', { 'item-group': isCollapsed }]"
        >
          <v-list-item
            rounded="xl"
            v-for="(link, index) in linksToShow"
            :key="link.title"
            @click="handleItem(link)"
            :title="link.title"
            :class="[
                        'nav-item',
                        { 'active-link': route.path === link.route },
                        { 'mb-2': index === 4 },
                    ]"
          >
            <template v-slot:prepend>
              <v-icon
                v-if="link.icon"
                :color="route.path === link.route ? '#1CBA75' : 'white'"
                class="mr-3"
              >{{ link.icon }}</v-icon>
              <img
                v-else-if="link.svg"
                :src="link.svg"
                :alt="link.title"
                class="custom-svg-icon mr-3 mt-2"
                :class="{ active: route.path === link.route }"
              />
            </template>
            <hr
              v-if="index === 4"
              class="position-absolute left-0 mt-4 w-100 opacity-20"
            />
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>

    <template v-slot:append>
      <div class="pa-3">
        <v-btn
          elevation="0"
          block
          class="justify-center extended-fab py-6"
          :class="{ 'button-buy-crypto': isCollapsed }"
          @click="login"
        >
          <v-icon :class="{ 'mr-2': !isCollapsed }">mdi-currency-btc</v-icon>
          <span v-if="!isCollapsed" class="text-capitalize">Buy Crypto</span>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>

</template>

<style scoped lang="scss">
@import "@/styles/scroll.scss";
@import "@/styles/variables.scss";
.sidebar {
  max-width: 216px;
  min-width: 216px;
  background-color: $nav-background-color;
  color: $nav-default-text-color;
  border-radius: 16px;
  .v-list-item {
    padding: 0 12px;
    white-space: nowrap;
    overflow: visible;
    text-overflow: clip;
    &.active-link {
      background-color: #d5ffed;
      color: #1cba75;
    }
    :deep(.v-list-item-title) {
      white-space: nowrap;
      overflow: visible;
      text-overflow: clip;
      max-width: none;
    }
  }
}
.custom-svg-icon {
  width: 24px;
  height: 24px;
  color: #a1a3a3;
}
.custom-svg-icon.active {
  filter: invert(49%) sepia(62%) saturate(2000%) hue-rotate(98deg)
    brightness(90%) contrast(80%);
  opacity: 0.7;
}
.menu-fab {
  color: #c7d4cf;
  background-color: transparent !important;
  box-shadow: none !important;
  border: none !important;
}
.scrollable-content {
  overflow-y: auto;
  max-height: calc(100vh - 20px);
}

.btn-menu-wrapper {
  position: sticky;
  top: 10px;
  z-index: 1;
  background-color: inherit;
}
.extended-fab {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background-color: #1cba75;
  color: white;
}

.nav-item {
  margin-left: 18px;
  padding: 16px 24px 16px 16px;
  width: calc(100% - 36px);
  white-space: nowrap;
  overflow: visible;
  text-overflow: clip;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  :deep(.v-list-item-title) {
    white-space: nowrap;
    overflow: visible;
    text-overflow: clip;
    max-width: none;
    width: auto;
  }
}

.collapsed-drawer {
  min-width: 90px;
  max-width: 90px;
  border-right: none;
  
  .nav-item {
    :deep(.v-list-item-title) {
      display: none;
    }
  }
}

// When NOT collapsed, ensure full width and text visibility
.sidebar:not(.collapsed-drawer) {
  min-width: 216px;
  max-width: 216px;
  
  .nav-item {
    :deep(.v-list-item-title) {
      display: block;
      white-space: nowrap;
      overflow: visible;
      text-overflow: clip;
    }
  }
}

@media (max-width: $screen-md) {
  .sidebar {
    background-color: rgba(13, 21, 19, 0.98);
  }
  .options-bar.item-group {
    display: none;
    border-right: none;
    overflow: hidden;
    opacity: 0;
    transition: opacity 0.05s ease-in-out;
  }
  .sidebar.collapsed-drawer {
    background-color: transparent;
    transition: background-color 0.2s ease-in-out;
  }
  .button-buy-crypto {
    display: none;
  }
}
</style>
