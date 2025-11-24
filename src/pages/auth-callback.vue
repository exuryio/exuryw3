<template>
  <div class="callback-page">
    <div class="callback-container">
      <v-card class="callback-card" elevation="0">
        <v-card-text class="callback-content">
          <div v-if="isLoading" class="loading-section">
            <v-progress-circular
              indeterminate
              color="#1cba75"
              size="64"
            ></v-progress-circular>
            <p class="loading-text">{{ loadingMessage }}</p>
          </div>
          <div v-else-if="error" class="error-section">
            <v-icon color="#ef5350" size="64">mdi-alert-circle</v-icon>
            <h2 class="error-title">Error de autenticación</h2>
            <p class="error-message">{{ error }}</p>
            <v-btn
              color="primary"
              @click="handleRetry"
              class="retry-btn"
            >
              Intentar de nuevo
            </v-btn>
            <v-btn
              variant="text"
              @click="handleBackToRegister"
              class="back-btn"
            >
              Volver al registro
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import apiService from '@/services/api';
import { useAuthStore } from '@/infraestructure/stores/auth';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const isLoading = ref<boolean>(true);
const error = ref<string>('');
const loadingMessage = ref<string>('Procesando autenticación...');

onMounted(async () => {
  try {
    // Get authorization code from query params
    const code = route.query.code as string;
    const errorParam = route.query.error as string;
    const errorDescription = route.query.error_description as string;

    console.log('🔐 Auth callback - Code received:', code ? 'Yes' : 'No');
    console.log('🔐 Auth callback - Error:', errorParam || 'None');

    if (errorParam) {
      throw new Error(errorDescription || errorParam);
    }

    if (!code) {
      throw new Error('Código de autorización no encontrado');
    }

    // Exchange code for token and create/update user
    console.log('🔄 Calling backend to exchange code for token...');
    console.log('   Code:', code.substring(0, 10) + '...');
    
    // Get the redirect_uri that was used in the Auth0 authorization request
    // This should match what was sent to Auth0
    const redirectUri = typeof window !== 'undefined' 
      ? `${window.location.origin}/auth-callback`
      : '';
    
    const response = await apiService.handleAuth0Callback(code, redirectUri);
    console.log('✅ Backend response received:', response);
    console.log('   Response type:', typeof response);
    console.log('   Response keys:', response ? Object.keys(response) : 'null');

    // Check if response has success property
    if (response && (response as any).success === true) {
      console.log('✅ Authentication successful (success=true)');
      
      // Check if user was already registered
      const alreadyRegistered = (response as any).already_registered === true;
      
      if (alreadyRegistered) {
        console.log('ℹ️ User was already registered, logging in...');
        loadingMessage.value = 'Ya estás registrado. Iniciando sesión...';
        // Small delay to show the message
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      // Save user session
      const userData = {
        id: (response as any).user_id,
        email: (response as any).email,
        email_verified: true,
        google_id: (response as any).google_id,
      };
      
      const authToken = (response as any).token || (response as any).access_token || 'temp_token_' + Date.now();
      
      // Store authentication
      authStore.setAuth(userData, authToken);
      console.log('✅ User session saved:', userData.email);
      
      // Wait for next tick and a bit longer to ensure everything is ready
      await nextTick();
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Force cleanup of any hidden styles before navigation
      const listInnerElements = document.querySelectorAll(".listInner");
      listInnerElements.forEach(el => {
        const htmlEl = el as HTMLElement;
        if (!htmlEl.closest('.empty-layout-app')) {
          htmlEl.removeAttribute('style');
        }
      });
      
      // Use replace instead of push to avoid back button issues
      // Ensure we're using the current origin, not hardcoded localhost
      const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
      console.log('🔀 Redirecting to /exchange on origin:', currentOrigin);
      console.log('🔀 Current URL:', typeof window !== 'undefined' ? window.location.href : 'N/A');
      
      // Force navigation using current origin to prevent localhost redirects
      if (typeof window !== 'undefined' && currentOrigin && !currentOrigin.includes('localhost')) {
        // If we're on preview/production, ensure we stay on that domain
        await router.replace('/exchange');
      } else {
        // Fallback to router navigation
        await router.replace('/exchange');
      }
      
      // After navigation, ensure visibility one more time
      await nextTick();
      setTimeout(() => {
        const listInnerElements = document.querySelectorAll(".listInner");
        listInnerElements.forEach(el => {
          const htmlEl = el as HTMLElement;
          if (!htmlEl.closest('.empty-layout-app')) {
            htmlEl.style.setProperty('display', 'block', 'important');
            htmlEl.style.setProperty('visibility', 'visible', 'important');
            htmlEl.style.setProperty('opacity', '1', 'important');
          }
        });
      }, 100);
    } else if (response && (response as any).error) {
      console.error('❌ Response has error:', (response as any).error);
      throw new Error((response as any).error || 'Error al procesar autenticación');
    } else if (response && (response as any).user_id) {
      // If response has user_id, authentication was successful
      console.log('✅ Authentication successful (user_id present)');
      
      // Save user session
      const userData = {
        id: (response as any).user_id,
        email: (response as any).email,
        email_verified: true,
        google_id: (response as any).google_id,
      };
      
      const authToken = (response as any).access_token || (response as any).token || 'temp_token_' + Date.now();
      
      // Store authentication
      authStore.setAuth(userData, authToken);
      console.log('✅ User session saved:', userData.email);
      
      const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
      console.log('🔀 Redirecting to /exchange on origin:', currentOrigin);
      await new Promise(resolve => setTimeout(resolve, 100));
      router.push('/exchange');
    } else {
      // If no success property but no error either, assume success
      console.log('✅ Authentication successful (no explicit success flag)');
      const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
      console.log('🔀 Redirecting to /exchange on origin:', currentOrigin);
      await new Promise(resolve => setTimeout(resolve, 100));
      router.push('/exchange');
    }
  } catch (err: any) {
    console.error('❌ Auth callback error:', err);
    console.error('Error details:', err.response || err);
    console.error('Error stack:', err.stack);
    
    // Extract error message
    let errorMessage = 'Error al procesar la autenticación';
    if (err.response?.error) {
      errorMessage = err.response.error;
    } else if (err.message) {
      errorMessage = err.message;
    } else if (typeof err === 'string') {
      errorMessage = err;
    }
    
    console.error('❌ Setting error message:', errorMessage);
    error.value = errorMessage;
    isLoading.value = false;
  }
});

const handleRetry = () => {
  router.push('/register');
};

const handleBackToRegister = () => {
  router.push('/register');
};
</script>

<route lang="yaml">
meta:
  layout: empty
</route>

<style lang="scss" scoped>
.callback-page {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  overflow: hidden;
}

.callback-container {
  width: 100%;
  max-width: 420px;
  z-index: 10001;
}

.callback-card {
  background: rgba(13, 21, 19, 0.8) !important;
  border: 1px solid #2d4740;
  border-radius: 16px;
  backdrop-filter: blur(4px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.callback-content {
  padding: 60px 32px !important;
  text-align: center;
}

.loading-section {
  .loading-text {
    color: rgba(255, 255, 255, 0.7);
    font-size: 16px;
    margin-top: 24px;
  }
}

.error-section {
  .error-title {
    color: white;
    font-size: 24px;
    font-weight: 700;
    margin: 24px 0 12px 0;
  }
  
  .error-message {
    color: rgba(255, 255, 255, 0.7);
    font-size: 15px;
    margin-bottom: 32px;
    line-height: 1.5;
  }
  
  .retry-btn {
    background: #1cba75 !important;
    color: white !important;
    font-weight: 600;
    font-size: 16px;
    height: 48px !important;
    text-transform: none;
    border-radius: 8px !important;
    margin-bottom: 16px;
    width: 100%;
    
    &:hover {
      background: #1dd689 !important;
    }
  }
  
  .back-btn {
    color: rgba(255, 255, 255, 0.7) !important;
    text-transform: none;
    font-size: 14px;
    width: 100%;
    
    &:hover {
      color: #1cba75 !important;
    }
  }
}

@media (max-width: 600px) {
  .callback-content {
    padding: 48px 24px !important;
  }
}
</style>

