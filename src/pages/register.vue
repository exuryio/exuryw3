<template>
  <div class="register-page">
    <div class="register-container">
      <div class="logo-section">
        <img
          src="/LogoExury1.png"
          alt="Exury"
          class="register-logo"
        />
      </div>
      
      <v-card class="register-card" elevation="0">
        <v-card-text class="register-content">
          <div class="register-header">
            <h1 class="register-title">Empieza en segundos</h1>
            <p class="register-subtitle">
              Cambia euros por cripto al instante.<br />
              Sin esperas. Tú controlas tus fondos.
            </p>
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
              Registrarse con Google
            </v-btn>
            
            <v-btn
              variant="outlined"
              size="large"
              block
              class="social-btn apple-btn"
              @click="handleAppleLogin"
            >
              <v-icon start>mdi-apple</v-icon>
              Registrarse con Apple
            </v-btn>
            
            <v-btn
              variant="outlined"
              size="large"
              block
              class="social-btn facebook-btn"
              @click="handleFacebookLogin"
            >
              <v-icon start>mdi-facebook</v-icon>
              Registrarse con Facebook
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

          <div class="terms-section">
            <v-checkbox
              v-model="acceptTerms"
              hide-details
              class="terms-checkbox"
              :rules="[v => !!v || 'Debes aceptar los términos']"
            >
              <template #label>
                <span class="terms-text">
                  Al crear una cuenta, aceptas la
                  <router-link to="/privacy-policy" class="terms-link">Política de privacidad</router-link>
                  y los
                  <router-link to="/terms-conditions" class="terms-link">Términos y condiciones</router-link>.
                </span>
              </template>
            </v-checkbox>
          </div>

          <div class="login-link-section">
            <span class="login-text">¿Ya tienes una cuenta?</span>
            <router-link to="/login" class="login-link">Inicia sesión</router-link>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/infraestructure/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const acceptTerms = ref<boolean>(false);
const errorMessage = ref<string>('');
const showError = ref<boolean>(false);

onMounted(() => {
  if (authStore.isLoggedIn) {
    router.push('/dashboard');
  }
});

const handleSocialLogin = (connection: string) => {
  if (!acceptTerms.value) {
    errorMessage.value = 'Debes aceptar la Política de privacidad y los Términos y condiciones para continuar.';
    showError.value = true;
    return;
  }
  
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
.register-page {
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

.register-container {
  width: 100%;
  max-width: 448px;
  z-index: 10001;
}

.logo-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 26px;
  
  .register-logo {
    height: 32px;
    width: auto;
    object-fit: contain;
    filter: brightness(1);
  }
}

.register-card {
  background: rgba(18, 18, 18, 0.94) !important;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 22px;
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.45);
}

.register-content {
  padding: 38px 32px 34px !important;
}

.register-header {
  margin-bottom: 32px;
  
  .register-title {
    font-size: clamp(27px, 5vw, 38px);
    font-weight: 800;
    color: white;
    margin-bottom: 14px;
    line-height: 1.2;
  }
  
  .register-subtitle {
    font-size: clamp(14px, 2.4vw, 18px);
    color: rgba(255, 255, 255, 0.68);
    margin: 0;
    line-height: 1.35;
  }
}

.terms-section {
  margin: 22px 0 29px;
  
  .terms-checkbox {
    align-items: flex-start;

    :deep(.v-selection-control__input) {
      color: #1cba75 !important;
      margin-top: 2px;
    }
    
    .terms-text {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.66);
      line-height: 1.6;
    }
    
    .terms-link {
      color: #1cba75;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.social-login-section {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 0;
  
  .social-btn {
    height: 53px !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    background: rgba(255, 255, 255, 0.04) !important;
    color: white !important;
    text-transform: none;
    font-size: 17px;
    font-weight: 700;
    border-radius: 11px !important;
    
    &:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.1) !important;
      border-color: rgba(255, 255, 255, 0.3) !important;
    }
    :deep(.v-icon) {
      font-size: 22px;
      margin-inline-end: 16px;
    }
  }
  
  .google-btn {
    :deep(.v-icon) {
      color: #4285f4 !important;
    }
  }
  
  .apple-btn {
    :deep(.v-icon) {
      color: #ffffff !important;
    }
  }
  
  .facebook-btn {
    :deep(.v-icon) {
      color: #1877f2 !important;
    }
  }
  
}

.error-alert {
  margin: 19px 0 0;
  
  .error-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .error-text {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
  }
  
  .go-to-login-btn {
    color: #1cba75 !important;
    text-transform: none;
    font-weight: 600;
    
    &:hover {
      background: rgba(28, 186, 117, 0.1) !important;
    }
  }
}

.login-link-section {
  text-align: center;
  margin-top: 0;
  
  .login-text {
    color: rgba(255, 255, 255, 0.58);
    font-size: 14px;
    margin-right: 8px;
  }
  
  .login-link {
    color: #1cba75;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

@media (max-width: 600px) {
  .register-page {
    padding: 16px;
  }
  
  .logo-section {
    margin-bottom: 19px;
    
    .register-logo {
      height: 29px;
    }
  }
  
  .register-content {
    padding: 29px 22px !important;
  }
  
  .register-header {
    margin-bottom: 22px;
    
    .register-title {
      font-size: 22px;
    }
    
    .register-subtitle {
      font-size: 12px;
    }
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
