<template>
  <div class="avatar-menu">
    <v-menu location="bottom end" offset="8">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          icon
          variant="text"
          class="avatar-button"
          :class="{ 'authenticated': isLoggedIn }"
        >
          <v-avatar
            v-if="isLoggedIn && currentUser"
            size="32"
            color="#1cba75"
          >
            <span class="avatar-text">{{ userInitials }}</span>
          </v-avatar>
          <v-icon v-else>mdi-account-circle</v-icon>
        </v-btn>
      </template>

      <v-list class="user-menu-list">
        <!-- User Info Section -->
        <v-list-item v-if="isLoggedIn && currentUser" class="user-info-section">
          <v-list-item-title class="user-email">
            {{ currentUser.email }}
          </v-list-item-title>
          <v-list-item-subtitle v-if="currentUser.email_verified" class="user-status">
            <v-icon size="12" color="#1cba75">mdi-check-circle</v-icon>
            Verificado
          </v-list-item-subtitle>
        </v-list-item>

        <v-divider v-if="isLoggedIn" class="my-2" />

        <!-- Menu Items -->
        <v-list-item
          v-if="isLoggedIn"
          prepend-icon="mdi-account"
          title="Mi Perfil"
          @click="goToProfile"
        />
        
        <v-list-item
          v-if="isLoggedIn"
          prepend-icon="mdi-cog"
          title="Configuración"
          @click="goToSettings"
        />

        <v-divider v-if="isLoggedIn" class="my-2" />

        <!-- Logout -->
        <v-list-item
          v-if="isLoggedIn"
          prepend-icon="mdi-logout"
          title="Cerrar Sesión"
          class="logout-item"
          @click="handleLogout"
        />

        <!-- Login/Register -->
        <v-list-item
          v-if="!isLoggedIn"
          prepend-icon="mdi-login"
          title="Iniciar Sesión"
          @click="goToLogin"
        />
        
        <v-list-item
          v-if="!isLoggedIn"
          prepend-icon="mdi-account-plus"
          title="Registrarse"
          @click="goToRegister"
        />
      </v-list>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/infraestructure/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

// Ensure store is loaded
onMounted(() => {
  if (typeof window !== 'undefined') {
    authStore.loadFromStorage();
  }
});

const isLoggedIn = computed(() => authStore.isLoggedIn);
const currentUser = computed(() => authStore.currentUser);

const userInitials = computed(() => {
  if (!currentUser.value?.email) return '?';
  const email = currentUser.value.email;
  const parts = email.split('@')[0].split('.');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return email[0].toUpperCase();
});

const goToProfile = () => {
  router.push('/profile');
};

const goToSettings = () => {
  router.push('/settings');
};

const goToLogin = () => {
  router.push('/login');
};

const goToRegister = () => {
  router.push('/register');
};

const handleLogout = async () => {
  try {
    await authStore.logout();
    router.push('/home');
  } catch (error) {
    console.error('Error during logout:', error);
    // Even if logout fails, clear local session
    authStore.clearAuth();
    router.push('/home');
  }
};
</script>

<style lang="scss" scoped>
.avatar-menu {
  .avatar-button {
    color: rgba(255, 255, 255, 0.7) !important;
    
    &.authenticated {
      .v-avatar {
        background: #1cba75 !important;
      }
    }
    
    &:hover {
      color: #1cba75 !important;
    }
  }
}

.user-menu-list {
  background: rgba(13, 21, 19, 0.95) !important;
  border: 1px solid #2d4740;
  min-width: 240px;
  
  .user-info-section {
    padding: 16px;
    
    .user-email {
      color: #ffffff;
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 4px;
    }
    
    .user-status {
      color: rgba(255, 255, 255, 0.7);
      font-size: 12px;
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }
  
  :deep(.v-list-item) {
    color: rgba(255, 255, 255, 0.9) !important;
    min-height: 44px;
    
    &:hover {
      background: rgba(28, 186, 117, 0.1) !important;
    }
    
    .v-list-item-title {
      font-size: 14px;
    }
    
    .v-icon {
      color: rgba(255, 255, 255, 0.7) !important;
    }
  }
  
  .logout-item {
    color: #ef5350 !important;
    
    :deep(.v-icon) {
      color: #ef5350 !important;
    }
    
    &:hover {
      background: rgba(239, 83, 80, 0.1) !important;
    }
  }
}

.avatar-text {
  color: #ffffff;
  font-weight: 600;
  font-size: 14px;
}
</style>
