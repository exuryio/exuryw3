<template>
  <div class="login-page">
    <div class="login-container">
      <!-- Logo Section -->
      <div class="logo-section">
        <img
          src="/LogoExury1.png"
          alt="Exury"
          class="login-logo"
        />
      </div>
      
      <v-card class="login-card" elevation="0">
        <v-card-text class="login-content">
          <div class="login-header">
            <h1 class="login-title">Iniciar sesión</h1>
          </div>

          <div class="social-login-section">
            <v-btn
              variant="outlined"
              size="large"
              block
              class="social-btn google-btn"
              @click="handleGoogleLogin"
            >
              <v-icon start>mdi-google</v-icon>
              Continuar con Google
            </v-btn>
            
            <v-btn
              variant="outlined"
              size="large"
              block
              class="social-btn apple-btn"
              @click="handleAppleLogin"
            >
              <v-icon start>mdi-apple</v-icon>
              Continuar con Apple
            </v-btn>
            
            <v-btn
              variant="outlined"
              size="large"
              block
              class="social-btn facebook-btn"
              @click="handleFacebookLogin"
            >
              <v-icon start>mdi-facebook</v-icon>
              Continuar con Facebook
            </v-btn>
          </div>

          <v-alert
            v-if="showError && errorMessage"
            type="error"
            variant="tonal"
            class="error-alert"
            dismissible
            @click:close="showError = false"
          >
            {{ errorMessage }}
          </v-alert>

          <div class="register-link-section">
            <span class="register-text">¿No tienes una cuenta?</span>
            <router-link to="/register" class="register-link">Crear una cuenta de Exury</router-link>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/infraestructure/stores/auth';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const errorMessage = ref<string>('');
const showError = ref<boolean>(false);

onMounted(() => {
  if (typeof window !== 'undefined') {
    authStore.loadFromStorage();
    if (authStore.isLoggedIn) {
      router.replace('/dashboard');
    }
  }

  if (route.query.authError) {
    errorMessage.value = 'No se pudo completar la autenticación, por favor intenta de nuevo';
    showError.value = true;
  }
});

const handleSocialLogin = (connection: string) => {
  errorMessage.value = '';
  showError.value = false;

  const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN || 'exury.eu.auth0.com';
  const auth0ClientId = import.meta.env.VITE_AUTH0_CLIENT_ID || '';
  const redirectUri = `${window.location.origin}/auth-callback`;
  
  if (auth0ClientId) {
    const auth0Url = `https://${auth0Domain}/authorize?` +
      `client_id=${auth0ClientId}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `response_type=code&` +
      `scope=openid profile email&` +
      `connection=${connection}`;
    
    window.location.href = auth0Url;
  } else {
    errorMessage.value = 'No se pudo completar la autenticación, por favor intenta de nuevo';
    showError.value = true;
  }
};

const handleGoogleLogin = () => {
  handleSocialLogin('google-oauth2');
};

const handleAppleLogin = () => {
  handleSocialLogin('apple');
};

const handleFacebookLogin = () => {
  handleSocialLogin('facebook');
};
</script>

<route lang="yaml">
meta:
  layout: empty
</route>

<style lang="scss" scoped>
.login-page {
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

.login-container {
  width: 100%;
  max-width: 448px;
  z-index: 10001;
}

.logo-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 26px;
}

.login-logo {
  height: 51px;
  width: auto;
  object-fit: contain;
}

.login-card {
  background: rgba(18, 18, 18, 0.94) !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  border-radius: 22px !important;
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.45);
}

.login-content {
  padding: 38px 32px 34px !important;
  color: #ffffff;
}

.login-header {
  margin-bottom: 42px;
}

.login-title {
  font-size: clamp(27px, 5vw, 35px);
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  line-height: 1.2;
}

.social-login-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 35px;
}

.social-btn {
  background: rgba(255, 255, 255, 0.04) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: #ffffff !important;
  text-transform: none;
  letter-spacing: 0;
  height: 53px !important;
  border-radius: 11px !important;
  font-size: 17px;
  font-weight: 700;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05) !important;
    border-color: rgba(255, 255, 255, 0.3) !important;
  }

  :deep(.v-icon) {
    font-size: 22px;
    margin-inline-end: 16px;
  }
}

.google-btn {
  :deep(.v-icon) {
    color: #4285f4;
  }
}

.apple-btn {
  :deep(.v-icon) {
    color: #ffffff;
  }
}

.facebook-btn {
  :deep(.v-icon) {
    color: #1877f2;
  }
}

.register-link-section {
  text-align: center;
  margin-top: 0;
}

.register-text {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  margin-right: 8px;
}

.register-link {
  color: #1cba75;
  text-decoration: none;
  font-size: 14px;
  font-weight: 700;
  transition: color 0.2s;
  
  &:hover {
    color: #17a066;
    text-decoration: underline;
  }
}

// Responsive adjustments
@media (max-width: 480px) {
  .login-content {
    padding: 29px 22px !important;
  }
  
  .login-title {
    font-size: 24px;
  }
  
  .login-logo {
    height: 38px;
  }

  .social-login-section {
    gap: 11px;

    .social-btn {
      height: 46px !important;
      font-size: 14px;
    }
  }
}
</style>

