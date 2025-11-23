<template>
  <div class="register-page">
    <div class="register-container">
      <!-- Logo Section -->
      <div class="logo-section">
        <img
          src="/LogoExury1.png"
          alt="Exury"
          class="register-logo"
        />
      </div>
      
      <v-card class="register-card" elevation="0">
        <v-card-text class="register-content">
          <!-- Header -->
          <div class="register-header">
            <h1 class="register-title">Empieza en segundos</h1>
            <p class="register-subtitle">
              Cambia euros por cripto al instante.<br />
              Sin esperas. Tú controlas tus fondos.
            </p>
          </div>

          <!-- Form Section -->
          <div class="form-section">
            <!-- Email Input -->
            <v-text-field
              v-model="email"
              type="email"
              label="Correo electrónico"
              placeholder="tu@email.com"
              variant="outlined"
              density="comfortable"
              class="form-input"
              :rules="emailRules"
              hide-details="auto"
              required
            />

            <!-- Terms and Privacy Checkbox -->
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
                    <router-link to="/terms-conditions" class="terms-link">Política de privacidad</router-link>
                    y los
                    <router-link to="/terms-conditions" class="terms-link">Términos y condiciones</router-link>.
                  </span>
                </template>
              </v-checkbox>
            </div>

            <!-- Error Alert -->
            <v-alert
              v-if="showError && errorMessage"
              type="error"
              variant="tonal"
              class="error-alert mt-2"
              dismissible
              @click:close="showError = false"
            >
              <div class="error-content">
                <p class="error-text">{{ errorMessage }}</p>
                <v-btn
                  v-if="errorMessage.includes('ya está registrado')"
                  color="primary"
                  size="small"
                  variant="text"
                  class="go-to-login-btn mt-2"
                  @click="router.push({ path: '/login', query: { email: email } })"
                >
                  Ir a iniciar sesión
                </v-btn>
              </div>
            </v-alert>

            <!-- Register with Email Button -->
            <v-btn
              color="primary"
              size="large"
              block
              class="continue-btn"
              :disabled="!isFormValid"
              :loading="isLoading"
              @click="handleRegister"
            >
              Registrarse con correo
            </v-btn>
          </div>

          <!-- Separator -->
          <div class="separator">
            <div class="separator-line"></div>
            <span class="separator-text">o</span>
            <div class="separator-line"></div>
          </div>

          <!-- Social Login Buttons -->
          <div class="social-login-section">
            <v-btn
              variant="outlined"
              size="large"
              block
              class="social-btn google-btn"
              :disabled="!acceptTerms"
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
              :disabled="!acceptTerms"
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
              :disabled="!acceptTerms"
              @click="handleFacebookLogin"
            >
              <v-icon start>mdi-facebook</v-icon>
              Continuar con Facebook
            </v-btn>
            
            <!-- Info message when terms not accepted -->
            <p v-if="!acceptTerms" class="terms-required-message">
              Debes aceptar los términos y condiciones para continuar
            </p>
          </div>

          <!-- Login Link -->
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
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import apiService from '@/services/api';
import { useAuthStore } from '@/infraestructure/stores/auth';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const email = ref<string>('');
const acceptTerms = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const errorMessage = ref<string>('');
const showError = ref<boolean>(false);

// Get email from query params if coming from home
onMounted(() => {
  // If user is already authenticated, redirect to exchange
  if (authStore.isLoggedIn) {
    console.log('User already authenticated, redirecting to /exchange');
    router.push('/exchange');
    return;
  }
  
  const emailParam = route.query.email as string;
  if (emailParam) {
    email.value = emailParam;
  }
});

// Validation rules
const emailRules = [
  (v: string) => !!v || 'El correo electrónico es requerido',
  (v: string) => /.+@.+\..+/.test(v) || 'El correo electrónico debe ser válido',
];

const isFormValid = computed(() => {
  return (
    email.value &&
    acceptTerms.value &&
    /.+@.+\..+/.test(email.value)
  );
});

const handleRegister = async () => {
  if (!isFormValid.value) {
    return;
  }

  try {
    isLoading.value = true;
    errorMessage.value = '';
    showError.value = false;
    
    // Call API to register user and send verification code
    const response = await apiService.registerUser(email.value) as any;
    
    // In development, log the code if provided
    if (import.meta.env.DEV && response.code) {
      console.log('🔐 Verification code:', response.code);
    }
    
    // Redirect to verification page
    router.push({
      path: '/verify-email',
      query: { 
        email: email.value,
        // In development, pass code as query param for easy testing
        ...(import.meta.env.DEV && response.code ? { devCode: response.code } : {})
      }
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    console.error('Error details:', error.response || error);
    
    // Show user-friendly error message
    let message = 'Error al registrar. Por favor, intenta de nuevo.';
    let shouldRedirectToLogin = false;
    
    // Check if it's a 409 status code (user already exists)
    const errorResponse = error.response as any;
    const statusCode = errorResponse?.status || error.status || (error.message?.match(/HTTP (\d+)/)?.[1]);
    const is409 = statusCode === 409 || 
                  statusCode === '409' ||
                  error.message?.includes('409') || 
                  error.message?.includes('ya está registrado') ||
                  error.message?.includes('ya está registrado y verificado') ||
                  error.message?.includes('Este correo ya está registrado');
    
    console.log('🔍 Error details:', {
      statusCode,
      message: error.message,
      response: error.response,
      is409
    });
    
    if (is409) {
      message = 'Este correo electrónico ya está registrado. Por favor, inicia sesión.';
      shouldRedirectToLogin = true;
    } else if (error.message) {
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        message = 'No se pudo conectar al servidor. Por favor, verifica que el backend esté corriendo en el puerto 3001.';
      } else if (error.message.includes('400')) {
        message = error.message || 'Datos inválidos. Por favor, verifica tu correo electrónico.';
      } else {
        message = error.message;
      }
    }
    
    errorMessage.value = message;
    showError.value = true;
    
    // If user already exists, show message and offer to redirect to login
    if (shouldRedirectToLogin) {
      // Auto-redirect after 3 seconds, or user can click button
      setTimeout(() => {
        router.push({
          path: '/login',
          query: { email: email.value }
        });
      }, 3000);
    }
  } finally {
    isLoading.value = false;
  }
};

const handleSocialLogin = (connection: string, providerName: string) => {
  // Validate that user has accepted terms and conditions
  if (!acceptTerms.value) {
    errorMessage.value = 'Debes aceptar la Política de privacidad y los Términos y condiciones para continuar.';
    showError.value = true;
    
    // Scroll to error message
    setTimeout(() => {
      const errorElement = document.querySelector('.error-alert');
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
    
    return;
  }
  
  // Clear any previous errors
  errorMessage.value = '';
  showError.value = false;
  
  // Redirect to Auth0 for social authentication
  const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN || 'exury.eu.auth0.com';
  const auth0ClientId = import.meta.env.VITE_AUTH0_CLIENT_ID || '';
  
  // CRITICAL: redirect_uri MUST match exactly what's configured in Auth0 and backend
  // Always use window.location.origin dynamically to support preview/production environments
  // Only use VITE_AUTH0_REDIRECT_URI if it's explicitly set and not localhost (for production configs)
  const envRedirectUri = import.meta.env.VITE_AUTH0_REDIRECT_URI;
  const redirectUri = (envRedirectUri && !envRedirectUri.includes('localhost')) 
    ? envRedirectUri 
    : `${window.location.origin}/auth-callback`;
  
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
    // Fallback message
    errorMessage.value = `${providerName} login no está configurado. Por favor, contacta al administrador.`;
    showError.value = true;
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
  max-width: 420px;
  z-index: 10001;
}

.logo-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
  
  .register-logo {
    height: 40px;
    width: auto;
    object-fit: contain;
    filter: brightness(1);
  }
}

.register-card {
  background: rgba(13, 21, 19, 0.8) !important;
  border: 1px solid #2d4740;
  border-radius: 16px;
  backdrop-filter: blur(4px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.register-content {
  padding: 40px 32px !important;
}

.register-header {
  text-align: center;
  margin-bottom: 32px;
  
  .register-title {
    font-size: 28px;
    font-weight: 700;
    color: white;
    margin-bottom: 8px;
    line-height: 1.2;
  }
  
  .register-subtitle {
    font-size: 15px;
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
    line-height: 1.5;
  }
}

.form-section {
  margin-bottom: 24px;
  
  .form-input {
    margin-bottom: 4px;
    
    :deep(.v-field) {
      background: rgba(13, 21, 19, 0.6) !important;
      border: 1px solid rgba(45, 71, 64, 0.5) !important;
      border-radius: 8px !important;
      min-height: 56px;
      
      &:focus-within {
        border-color: #1cba75 !important;
        box-shadow: 0 0 0 2px rgba(28, 186, 117, 0.15) !important;
      }
      
      &.v-field--error {
        border-color: #ef5350 !important;
        
        &:focus-within {
          border-color: #ef5350 !important;
          box-shadow: 0 0 0 2px rgba(239, 83, 80, 0.15) !important;
        }
      }
    }
    
    :deep(.v-field__input) {
      color: white !important;
      padding: 0 16px !important;
      min-height: 56px;
      display: flex;
      align-items: center;
      position: relative;
      z-index: 1;
    }
    
    :deep(.v-label) {
      color: rgba(255, 255, 255, 0.7) !important;
      font-size: 16px;
      top: 50% !important;
      left: 16px !important;
      transform: translateY(-50%) !important;
      transform-origin: top left;
      transition: all 0.2s ease;
      pointer-events: none;
      z-index: 1;
      margin: 0;
      
      &.v-field-label--floating {
        transform: translateY(-10px) scale(0.75) !important;
        top: 6px !important;
        left: 12px !important;
        background: rgba(13, 21, 19, 0.95) !important;
        padding: 0 4px !important;
        z-index: 2;
      }
    }
    
    :deep(.v-field--focused .v-label),
    :deep(.v-field--active .v-label),
    :deep(.v-field--dirty .v-label) {
      transform: translateY(-10px) scale(0.75) !important;
      top: 6px !important;
      left: 12px !important;
      background: rgba(13, 21, 19, 0.95) !important;
      padding: 0 4px !important;
      z-index: 2;
    }
    
    :deep(.v-field--error .v-label) {
      color: #ef5350 !important;
    }
    
    :deep(input) {
      color: white !important;
      font-size: 16px;
      padding: 0 !important;
      height: 100%;
    }
    
    :deep(input::placeholder) {
      color: rgba(255, 255, 255, 0.4) !important;
    }
    
    :deep(.v-messages) {
      padding: 4px 16px 0 16px !important;
      min-height: 20px;
      margin-top: 4px;
    }
    
    :deep(.v-messages__message) {
      color: #ef5350 !important;
      font-size: 12px !important;
      line-height: 1.4;
      margin: 0;
    }
  }
}

.terms-section {
  margin: 16px 0 24px 0;
  
  .terms-checkbox {
    :deep(.v-selection-control__input) {
      color: #1cba75 !important;
    }
    
    .terms-text {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.7);
      line-height: 1.5;
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

.continue-btn {
  background: #1cba75 !important;
  color: white !important;
  font-weight: 600;
  font-size: 16px;
  height: 52px !important;
  text-transform: none;
  border-radius: 8px !important;
  margin-top: 0;
  
  &:hover {
    background: #1dd689 !important;
    box-shadow: 0 4px 12px rgba(28, 186, 117, 0.3) !important;
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
  gap: 16px;
  
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
}

.social-login-section {
  margin-bottom: 24px;
  
  .social-btn {
    height: 52px !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    background: rgba(255, 255, 255, 0.05) !important;
    color: white !important;
    text-transform: none;
    font-weight: 500;
    border-radius: 8px !important;
    
    &:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.1) !important;
      border-color: rgba(255, 255, 255, 0.3) !important;
    }
    
    &:disabled {
      opacity: 0.5 !important;
      cursor: not-allowed !important;
      pointer-events: none !important;
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
  
  .terms-required-message {
    color: rgba(255, 255, 255, 0.6);
    font-size: 12px;
    text-align: center;
    margin-top: 12px;
    font-style: italic;
  }
}

.error-alert {
  margin-bottom: 16px;
  
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
    color: rgba(255, 255, 255, 0.7);
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
    margin-bottom: 24px;
    
    .register-logo {
      height: 36px;
    }
  }
  
  .register-content {
    padding: 32px 24px !important;
  }
  
  .register-header {
    margin-bottom: 28px;
    
    .register-title {
      font-size: 24px;
    }
    
    .register-subtitle {
      font-size: 14px;
    }
  }
  
  .form-section {
    margin-bottom: 20px;
  }
  
  .separator {
    margin: 20px 0;
  }
  
  .social-login-section {
    margin-bottom: 20px;
  }
}
</style>
