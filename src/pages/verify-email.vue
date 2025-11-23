<template>
  <div class="verify-page">
    <div class="verify-container">
      <v-card class="verify-card" elevation="0">
        <v-card-text class="verify-content">
          <!-- Header -->
          <div class="verify-header">
            <h1 class="verify-title">Verifica tu correo</h1>
            <p class="verify-subtitle">
              Hemos enviado un código de verificación a<br />
              <strong>{{ email }}</strong>
            </p>
            
            <!-- Development Mode: Show code if available -->
            <div v-if="devCode" class="dev-code-banner">
              <v-icon size="16" color="#1cba75">mdi-information</v-icon>
              <span>Modo desarrollo: Código = <strong>{{ devCode }}</strong></span>
            </div>
          </div>

          <!-- Code Input Section -->
          <div class="form-section">
            <p class="code-label">Ingresa el código de 6 dígitos</p>
            
            <!-- Code Input Fields -->
            <div class="code-inputs">
              <v-text-field
                v-for="(_, index) in codeDigits"
                :key="index"
                v-model="codeDigits[index]"
                type="text"
                maxlength="1"
                class="code-input"
                :ref="el => { if (el) codeInputRefs[index] = el as HTMLElement; }"
                @input="handleCodeInput(index, $event)"
                @keydown="handleKeyDown(index, $event)"
                @paste="handlePaste"
                hide-details
                autocomplete="off"
              />
            </div>

            <!-- Error Message -->
            <div v-if="error" class="error-message">
              {{ error }}
            </div>

            <!-- Resend Code -->
            <div class="resend-section">
              <p class="resend-text">¿No recibiste el código?</p>
              <v-btn
                variant="text"
                class="resend-btn"
                :disabled="resendCooldown > 0 || isLoading"
                @click="handleResendCode"
              >
                {{ resendCooldown > 0 ? `Reenviar en ${resendCooldown}s` : 'Reenviar código' }}
              </v-btn>
            </div>

            <!-- Verify Button -->
            <v-btn
              color="primary"
              size="large"
              block
              class="verify-btn"
              :disabled="!isCodeComplete || isLoading"
              :loading="isLoading"
              @click="handleVerify"
            >
              Verificar
            </v-btn>
          </div>

          <!-- Back to Register -->
          <div class="back-section">
            <v-btn
              variant="text"
              class="back-btn"
              @click="handleBack"
            >
              ← Cambiar correo electrónico
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import apiService from '@/services/api';
import { useAuthStore } from '@/infraestructure/stores/auth';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const email = ref<string>('');
const codeDigits = ref<string[]>(['', '', '', '', '', '']);
const codeInputRefs = ref<(HTMLElement | null)[]>([]);
const error = ref<string>('');
const isLoading = ref<boolean>(false);
const resendCooldown = ref<number>(0);
const devCode = ref<string>('');

// Get email from query params
onMounted(() => {
  // Check if user is already authenticated
  if (authStore.isLoggedIn) {
    console.log('User already authenticated, redirecting to /exchange');
    router.push('/exchange');
    return;
  }
  
  const emailParam = route.query.email as string;
  const devCodeParam = route.query.devCode as string;
  
  if (emailParam) {
    email.value = emailParam;
    
    // In development, if code is provided in query, show it
    if (import.meta.env.DEV && devCodeParam) {
      devCode.value = devCodeParam;
      console.log('🔐 Verification code (from URL):', devCodeParam);
      // Optionally auto-fill the code for testing
      // Uncomment the next 3 lines if you want to auto-fill in dev mode
      // codeDigits.value = devCodeParam.split('');
    }
    
    // Auto-focus first input
    nextTick(() => {
      const firstInput = codeInputRefs.value[0];
      if (firstInput && 'focus' in firstInput) {
        (firstInput as any).focus();
      }
    });
  } else {
    // If no email, redirect to register
    router.push('/register');
  }
  
  // Start resend cooldown timer
  startResendCooldown();
});

const isCodeComplete = computed(() => {
  return codeDigits.value.every(digit => digit.length === 1);
});

const handleCodeInput = (index: number, event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value.replace(/[^0-9]/g, '');
  
  if (value) {
    codeDigits.value[index] = value;
    error.value = '';
    
    // Move to next input if available
    if (index < 5 && codeInputRefs.value[index + 1]) {
      nextTick(() => {
        (codeInputRefs.value[index + 1] as any)?.focus();
      });
    }
  } else {
    codeDigits.value[index] = '';
  }
};

const handleKeyDown = (index: number, event: KeyboardEvent) => {
  // Handle backspace
  if (event.key === 'Backspace' && !codeDigits.value[index] && index > 0) {
    nextTick(() => {
      (codeInputRefs.value[index - 1] as any)?.focus();
    });
  }
  
  // Handle arrow keys
  if (event.key === 'ArrowLeft' && index > 0) {
    nextTick(() => {
      (codeInputRefs.value[index - 1] as any)?.focus();
    });
  }
  if (event.key === 'ArrowRight' && index < 5) {
    nextTick(() => {
      (codeInputRefs.value[index + 1] as any)?.focus();
    });
  }
};

const handlePaste = (event: ClipboardEvent) => {
  event.preventDefault();
  const pastedData = event.clipboardData?.getData('text') || '';
  const digits = pastedData.replace(/[^0-9]/g, '').slice(0, 6);
  
  digits.split('').forEach((digit, index) => {
    if (index < 6) {
      codeDigits.value[index] = digit;
    }
  });
  
  // Focus last filled input or last input
  const lastIndex = Math.min(digits.length - 1, 5);
  nextTick(() => {
    if (codeInputRefs.value[lastIndex]) {
      (codeInputRefs.value[lastIndex] as any)?.focus();
    }
  });
};

const handleVerify = async () => {
  if (!isCodeComplete.value) {
    return;
  }

  try {
    isLoading.value = true;
    error.value = '';
    
    const code = codeDigits.value.join('');
    
    // Call API to verify code
    const response = await apiService.verifyEmailCode(email.value, code) as any;
    
    // API returns success: true on success, or throws error
    if (response && response.success) {
      // Save user session
      const responseEmail = response.email || email.value;
      if (response.user_id && responseEmail) {
        const userData = {
          id: response.user_id,
          email: responseEmail,
          email_verified: true,
        };
        
        const authToken = response.token || response.access_token || 'temp_token_' + Date.now();
        authStore.setAuth(userData, authToken);
        console.log('✅ User session saved:', userData.email);
      }
      
      // Wait for next tick and cleanup
      await nextTick();
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Force cleanup before navigation
      const listInnerElements = document.querySelectorAll(".listInner");
      listInnerElements.forEach(el => {
        const htmlEl = el as HTMLElement;
        if (!htmlEl.closest('.empty-layout-app')) {
          htmlEl.removeAttribute('style');
        }
      });
      
      // Redirect to exchange or dashboard (use replace to avoid back button issues)
      // Ensure we're using the current origin, not hardcoded localhost
      const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
      console.log('🔀 Redirecting to /exchange on origin:', currentOrigin);
      await router.replace('/exchange');
      
      // Ensure visibility after navigation
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
    } else {
      const responseTyped = response as any;
      error.value = responseTyped?.message || 'Código inválido. Por favor, intenta de nuevo.';
      // Clear code on error
      codeDigits.value = ['', '', '', '', '', ''];
      nextTick(() => {
        if (codeInputRefs.value[0]) {
          (codeInputRefs.value[0] as any)?.focus();
        }
      });
    }
  } catch (err: any) {
    console.error('Verification error:', err);
    error.value = err.message || 'Error al verificar el código. Por favor, intenta de nuevo.';
    // Clear code on error
    codeDigits.value = ['', '', '', '', '', ''];
    nextTick(() => {
      if (codeInputRefs.value[0]) {
        (codeInputRefs.value[0] as any)?.focus();
      }
    });
  } finally {
    isLoading.value = false;
  }
};

const handleResendCode = async () => {
  try {
    isLoading.value = true;
    error.value = '';
    
    // Call API to resend code
    const response = await apiService.resendVerificationCode(email.value) as any;
    
    // Start cooldown
    resendCooldown.value = 60;
    startResendCooldown();
    
    // Show success message (you can add a toast notification here)
    console.log('Código reenviado', response);
    
    // In development, log the code if provided
    if (import.meta.env.DEV && response.code) {
      console.log('Verification code:', response.code);
    }
  } catch (err: any) {
    console.error('Resend error:', err);
    error.value = err.message || 'Error al reenviar el código. Por favor, intenta de nuevo.';
  } finally {
    isLoading.value = false;
  }
};

const startResendCooldown = () => {
  const interval = setInterval(() => {
    if (resendCooldown.value > 0) {
      resendCooldown.value--;
    } else {
      clearInterval(interval);
    }
  }, 1000);
};

const handleBack = () => {
  router.push({ path: '/register', query: { email: email.value } });
};
</script>

<route lang="yaml">
meta:
  layout: empty
</route>

<style lang="scss" scoped>
.verify-page {
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

.verify-container {
  width: 100%;
  max-width: 420px;
  z-index: 10001;
}

.verify-card {
  background: rgba(13, 21, 19, 0.8) !important;
  border: 1px solid #2d4740;
  border-radius: 16px;
  backdrop-filter: blur(4px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.verify-content {
  padding: 40px 32px !important;
}

.verify-header {
  text-align: center;
  margin-bottom: 32px;
  
  .verify-title {
    font-size: 28px;
    font-weight: 700;
    color: white;
    margin-bottom: 12px;
    line-height: 1.2;
  }
  
  .verify-subtitle {
    font-size: 15px;
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
    line-height: 1.5;
    
    strong {
      color: #1cba75;
      font-weight: 600;
    }
  }
  
  .dev-code-banner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 16px;
    padding: 12px 16px;
    background: rgba(28, 186, 117, 0.15);
    border: 1px solid rgba(28, 186, 117, 0.3);
    border-radius: 8px;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.9);
    
    strong {
      color: #1cba75;
      font-weight: 700;
      font-size: 16px;
      letter-spacing: 2px;
      font-family: monospace;
    }
  }
}

.form-section {
  margin-bottom: 24px;
  
  .code-label {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 16px;
    text-align: center;
  }
  
  .code-inputs {
    display: flex;
    gap: 12px;
    justify-content: center;
    margin-bottom: 24px;
    
    .code-input {
      width: 48px;
      max-width: 48px;
      
      :deep(.v-field) {
        background: rgba(13, 21, 19, 0.6) !important;
        border: 1px solid rgba(45, 71, 64, 0.5) !important;
        border-radius: 8px !important;
        height: 56px;
        text-align: center;
        
        &:focus-within {
          border-color: #1cba75 !important;
          box-shadow: 0 0 0 2px rgba(28, 186, 117, 0.15) !important;
        }
      }
      
      :deep(.v-field__input) {
        color: white !important;
        text-align: center;
        font-size: 24px;
        font-weight: 600;
        padding: 0 !important;
        min-height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      :deep(input) {
        color: white !important;
        text-align: center;
        font-size: 24px;
        font-weight: 600;
        padding: 0 !important;
      }
    }
  }
  
  .error-message {
    color: #ef5350;
    font-size: 14px;
    text-align: center;
    margin-bottom: 16px;
    padding: 12px;
    background: rgba(239, 83, 80, 0.1);
    border-radius: 8px;
    border: 1px solid rgba(239, 83, 80, 0.3);
  }
  
  .resend-section {
    text-align: center;
    margin-bottom: 24px;
    
    .resend-text {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 8px;
    }
    
    .resend-btn {
      color: #1cba75 !important;
      text-transform: none;
      font-weight: 600;
      
      &:disabled {
        color: rgba(255, 255, 255, 0.3) !important;
      }
    }
  }
  
  .verify-btn {
    background: #1cba75 !important;
    color: white !important;
    font-weight: 600;
    font-size: 16px;
    height: 52px !important;
    text-transform: none;
    border-radius: 8px !important;
    
    &:hover {
      background: #1dd689 !important;
      box-shadow: 0 4px 12px rgba(28, 186, 117, 0.3) !important;
    }
    
    &:disabled {
      background: rgba(28, 186, 117, 0.3) !important;
      color: rgba(255, 255, 255, 0.5) !important;
    }
  }
}

.back-section {
  text-align: center;
  margin-top: 24px;
  
  .back-btn {
    color: rgba(255, 255, 255, 0.7) !important;
    text-transform: none;
    font-size: 14px;
    
    &:hover {
      color: #1cba75 !important;
    }
  }
}

@media (max-width: 600px) {
  .verify-page {
    padding: 16px;
  }
  
  .verify-content {
    padding: 32px 24px !important;
  }
  
  .verify-header {
    margin-bottom: 28px;
    
    .verify-title {
      font-size: 24px;
    }
    
    .verify-subtitle {
      font-size: 14px;
    }
  }
  
  .form-section {
    .code-inputs {
      gap: 8px;
      
      .code-input {
        width: 44px;
        max-width: 44px;
      }
    }
  }
}
</style>

