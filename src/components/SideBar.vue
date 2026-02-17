<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useHead } from "@vueuse/head";
import {
  SIDEBAR_LINKS,
  SIDEBAR_LINKS_FOCUSED,
  SIDEBAR_LINKS_MORE,
  isFocusedRoute,
} from "@/domain/constants/sidebar.constant";
import { useAppStore } from "@/infraestructure/stores/app";
import { useAuthStore } from "@/infraestructure/stores/auth";
import { SidebarItem } from "@/domain/models/sidebar-item";
import { linksToShow } from "@/application/mappers/sidebar-mapper";
import { useI18n } from "vue-i18n";

const router = useRouter();
const route = useRoute();

const appStore = useAppStore();
const authStore = useAuthStore();
const { t } = useI18n();

function sidebarTitle(link: SidebarItem | { titleKey?: string; title?: string }): string {
  if (link.titleKey) return t(`sidebar.${link.titleKey}`);
  return (link as SidebarItem).title ?? "";
}

// Check if mobile on mount and set initial state
const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 960; // $screen-md breakpoint
};

const isCollapsed = ref(isMobile());
const moreExpanded = ref(false);
appStore.setSidebarCollapsed(isCollapsed.value);

const isFocusedMode = computed(() => isFocusedRoute(route.path));
const primaryLinks = computed(() =>
  isFocusedMode.value ? SIDEBAR_LINKS_FOCUSED : linksToShow
);
const showMoreSection = computed(
  () => isFocusedMode.value && SIDEBAR_LINKS_MORE.length > 0
);

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
// Handle window resize to update collapsed state on mobile
let resizeHandler: (() => void) | null = null;

onMounted(() => {
  const currentLink = SIDEBAR_LINKS.find((link) => link.route === route.path);
  if (currentLink) {
    useHead({ title: currentLink.title });
    appStore.setActivePage(currentLink.title!);
  }
  
  // Handle window resize to update collapsed state on mobile
  resizeHandler = () => {
    if (isMobile()) {
      isCollapsed.value = true;
      appStore.setSidebarCollapsed(true);
    }
  };
  window.addEventListener('resize', resizeHandler);
  appStore.setSidebarCollapsed(isCollapsed.value);
});

onUnmounted(() => {
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler);
  }
});

const toggle = () => {
  isCollapsed.value = !isCollapsed.value;
  appStore.setSidebarCollapsed(isCollapsed.value);
};

const handleItem = (item: SidebarItem): void => {
  appStore.setActivePage(item.title!);
  router.push(item.route);
};

const handleBuyCrypto = (): void => {
  if (authStore.isLoggedIn) {
    // User is authenticated, go to exchange
    router.push('/exchange');
  } else {
    // User is not authenticated, go to login
    router.push('/login');
  }
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
            v-for="(link, index) in primaryLinks"
            :key="`primary-${link.route}`"
            @click="handleItem(link)"
            :title="sidebarTitle(link)"
            :class="[
              'nav-item',
              { 'active-link': route.path === link.route },
              { 'mb-2': showMoreSection && index === primaryLinks.length - 1 },
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
              v-if="showMoreSection && index === primaryLinks.length - 1"
              class="position-absolute left-0 mt-4 w-100 opacity-20"
            />
          </v-list-item>
          <template v-if="showMoreSection">
            <v-list-item
              rounded="xl"
              class="nav-item more-trigger"
              :class="{ 'active-link': moreExpanded }"
              @click="moreExpanded = !moreExpanded"
              :title="isCollapsed ? undefined : sidebarTitle({ titleKey: 'mas' })"
            >
              <template v-slot:prepend>
                <v-icon
                  class="mr-3"
                  :color="moreExpanded ? '#1CBA75' : 'white'"
                >{{ moreExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </template>
            </v-list-item>
            <template v-if="moreExpanded">
              <v-list-item
                rounded="xl"
                v-for="link in SIDEBAR_LINKS_MORE"
                :key="`more-${link.route}`"
                @click="handleItem(link)"
                :title="sidebarTitle(link)"
                :class="[
                  'nav-item',
                  { 'active-link': route.path === link.route },
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
              </v-list-item>
            </template>
          </template>
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
          @click="handleBuyCrypto"
        >
          <v-icon :class="{ 'mr-2': !isCollapsed }">mdi-currency-btc</v-icon>
          <span v-if="!isCollapsed" class="text-capitalize">{{ t('sidebar.buyCrypto') }}</span>
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
  display: flex !important;
  flex-direction: column !important;
  height: 100% !important;
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
/* Contenido central con scroll: el append (Buy Crypto) queda fijo abajo */
.sidebar :deep(.v-navigation-drawer__content) {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.sidebar :deep(.v-navigation-drawer__append) {
  flex-shrink: 0;
}
.scrollable-content {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
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
