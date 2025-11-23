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
          <!-- Header -->
          <div class="login-header">
            <div class="title-row">
              <h1 class="login-title">Iniciar sesión</h1>
              <v-icon 
                class="qr-icon" 
                color="rgba(255, 255, 255, 0.6)"
                size="20"
                @click="showQRLogin = !showQRLogin"
              >
                mdi-qrcode
              </v-icon>
            </div>
          </div>

          <!-- Form Section -->
          <div class="form-section">
            <!-- Email/Phone Input -->
            <v-text-field
              v-model="emailOrPhone"
              type="text"
              label="Correo o número de teléfono"
              placeholder="Correo electrónico o teléfono"
              variant="outlined"
              density="comfortable"
              class="form-input"
              :rules="emailOrPhoneRules"
              hide-details="auto"
              required
              @keyup.enter="handleLogin"
            />

            <!-- Continue Button -->
            <v-btn
              color="primary"
              size="large"
              block
              class="continue-btn"
              :disabled="!isFormValid"
              :loading="isLoading"
              @click="handleLogin"
            >
              Continuar
            </v-btn>
          </div>

          <!-- Separator -->
          <div class="separator">
            <div class="separator-line"></div>
            <span class="separator-text">o</span>
            <div class="separator-line"></div>
          </div>

          <!-- Social Login Section -->
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
              class="social-btn apple-btn mt-2"
              @click="handleAppleLogin"
            >
              <v-icon start>mdi-apple</v-icon>
              Continuar con Apple
            </v-btn>
            
            <v-btn
              variant="outlined"
              size="large"
              block
              class="social-btn facebook-btn mt-2"
              @click="handleFacebookLogin"
            >
              <v-icon start>mdi-facebook</v-icon>
              Continuar con Facebook
            </v-btn>
          </div>

          <!-- Register Link -->
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
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import apiService from '@/services/api';
import { useAuthStore } from '@/infraestructure/stores/auth';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const emailOrPhone = ref<string>('');
const isLoading = ref<boolean>(false);
const showQRLogin = ref<boolean>(false);

// Get email from query params if coming from other pages
onMounted(() => {
  // Check if user is already authenticated
  if (typeof window !== 'undefined') {
    authStore.loadFromStorage();
    if (authStore.isLoggedIn) {
      console.log('User already authenticated, redirecting to /exchange');
      router.replace('/exchange');
      return;
    }
  }

  const emailParam = route.query.email as string;
  if (emailParam) {
    emailOrPhone.value = emailParam;
  }
});

// Validation rules
const emailOrPhoneRules = [
  (v: string) => {
    if (!v || !v.trim()) {
      return 'Correo o teléfono es requerido';
    }
    // Check if it's an email or phone number
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
    const isPhone = /^[\d\s\-\+\(\)]+$/.test(v.trim()) && v.trim().length >= 8;
    
    if (!isEmail && !isPhone) {
      return 'Ingresa un correo electrónico o número de teléfono válido';
    }
    return true;
  },
];

const isFormValid = computed(() => {
  if (!emailOrPhone.value || !emailOrPhone.value.trim()) {
    return false;
  }
  const value = emailOrPhone.value.trim();
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isPhone = /^[\d\s\-\+\(\)]+$/.test(value) && value.length >= 8;
  return isEmail || isPhone;
});

const handleLogin = async () => {
  if (!isFormValid.value) {
    return;
  }

  try {
    isLoading.value = true;
    const emailOrPhoneValue = emailOrPhone.value.trim();
    
    // Check if it's an email
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrPhoneValue);
    
    if (isEmail) {
      // Login with email - send verification code
      try {
        await apiService.loginWithEmail(emailOrPhoneValue);
        // Redirect to verify email page
        router.push({
          path: '/verify-email',
          query: { email: emailOrPhoneValue, login: 'true' }
        });
      } catch (err: any) {
        console.error('Login error:', err);
        const errorMessage = err.message || 'Error al iniciar sesión. Por favor, intenta de nuevo.';
        alert(errorMessage);
      }
    } else {
      // Phone login - TODO: Implement phone verification
      alert('El inicio de sesión con teléfono aún no está disponible. Por favor, usa tu correo electrónico.');
    }
  } catch (err: any) {
    console.error('Login error:', err);
    const errorMessage = err.message || 'Error al iniciar sesión. Por favor, intenta de nuevo.';
    alert(errorMessage);
  } finally {
    isLoading.value = false;
  }
};

const handleSocialLogin = (connection: string, providerName: string) => {
  // Redirect to Auth0 for social authentication
  const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN || 'exury.eu.auth0.com';
  const auth0ClientId = import.meta.env.VITE_AUTH0_CLIENT_ID || '';
  
  // CRITICAL: redirect_uri MUST match exactly what's configured in Auth0 and backend
  const redirectUri = import.meta.env.VITE_AUTH0_REDIRECT_URI || `${window.location.origin}/auth-callback`;
  
  console.log(`🔐 Initiating Auth0 ${providerName} login...`);
  console.log('   Domain:', auth0Domain);
  console.log('   Client ID:', auth0ClientId ? '***' + auth0ClientId.slice(-4) : 'NOT SET');
  console.log('   Redirect URI:', redirectUri);
  console.log('   Connection:', connection);
  
  if (auth0ClientId) {
    // Use Auth0 for social login
    const auth0Url = `https://${auth0Domain}/authorize?` +
      `client_id=${auth0ClientId}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `response_type=code&` +
      `scope=openid profile email&` +
      `connection=${connection}`;
    
    console.log('   Auth0 URL:', auth0Url.replace(auth0ClientId, '***' + auth0ClientId.slice(-4)));
    window.location.href = auth0Url;
  } else {
    alert(`${providerName} login no está configurado. Por favor, contacta al administrador.`);
  }
};

const handleGoogleLogin = () => {
  handleSocialLogin('google-oauth2', 'Google');
};

const handleAppleLogin = () => {
  handleSocialLogin('apple', 'Apple');
};

const handleFacebookLogin = () => {
  handleSocialLogin('facebook', 'Facebook');
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
  max-width: 420px;
  z-index: 10001;
}

.logo-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
}

.login-logo {
  height: 48px;
  width: auto;
  object-fit: contain;
}

.login-card {
  background: rgba(13, 21, 19, 0.8) !important;
  border: 1px solid #2d4740 !important;
  border-radius: 16px !important;
  backdrop-filter: blur(10px);
}

.login-content {
  padding: 32px 24px !important;
  color: #ffffff;
}

.login-header {
  margin-bottom: 32px;
}

.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.login-title {
  font-size: 28px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  line-height: 1.2;
}

.qr-icon {
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 1;
  }
}

.form-section {
  margin-bottom: 24px;
}

.form-input {
  margin-bottom: 20px;
  
  :deep(.v-field) {
    background: rgba(13, 21, 19, 0.6) !important;
    border: 1px solid rgba(45, 71, 64, 0.5) !important;
    border-radius: 8px !important;
  }
  
  :deep(.v-field__input) {
    color: #ffffff !important;
    padding: 12px 16px !important;
  }
  
  :deep(.v-label) {
    color: rgba(255, 255, 255, 0.7) !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    background: rgba(13, 21, 19, 0.95) !important;
    padding: 0 4px !important;
    z-index: 2;
    pointer-events: none;
  }
  
  :deep(.v-field--focused .v-label),
  :deep(.v-field--active .v-label) {
    top: 6px !important;
    transform: translateY(-10px) scale(0.75) !important;
    background: rgba(13, 21, 19, 0.95) !important;
    padding: 0 4px !important;
  }
  
  :deep(.v-field-label--floating) {
    background: rgba(13, 21, 19, 0.95) !important;
    padding: 0 4px !important;
  }
}

.continue-btn {
  background: #1cba75 !important;
  color: #ffffff !important;
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0;
  height: 48px;
  border-radius: 8px;
  
  &:hover {
    background: #17a066 !important;
  }
  
  &:disabled {
    background: rgba(28, 186, 117, 0.3) !important;
    color: rgba(255, 255, 255, 0.5) !important;
  }
}

.separator {
  display: flex;
  align-items: center;
  margin: 24px 0;
  gap: 12px;
}

.separator-line {
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
}

.separator-text {
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  font-weight: 500;
}

.social-login-section {
  margin-bottom: 24px;
}

.social-btn {
  background: transparent !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: #ffffff !important;
  text-transform: none;
  letter-spacing: 0;
  height: 48px;
  border-radius: 8px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05) !important;
    border-color: rgba(255, 255, 255, 0.3) !important;
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
  margin-top: 24px;
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
  font-weight: 500;
  transition: color 0.2s;
  
  &:hover {
    color: #17a066;
    text-decoration: underline;
  }
}

// Responsive adjustments
@media (max-width: 480px) {
  .login-content {
    padding: 24px 20px !important;
  }
  
  .login-title {
    font-size: 24px;
  }
  
  .login-logo {
    height: 40px;
  }
}
</style>

