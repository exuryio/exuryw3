<template>
  <div
    v-if="showInstallButton && deferredPrompt"
    class="pwa-install-prompt"
    role="banner"
    aria-label="Instalar Exury como app"
  >
    <div class="pwa-install-content">
      <div class="pwa-install-icon">
        <v-icon icon="mdi-download" size="24" />
      </div>
      <div class="pwa-install-text">
        <p class="pwa-install-title">
          Instala Exury
        </p>
        <p class="pwa-install-subtitle">
          Acceso rápido desde tu escritorio
        </p>
      </div>
      <div class="pwa-install-actions">
        <v-btn
          color="primary"
          variant="flat"
          size="small"
          @click="installPWA"
          class="pwa-install-btn"
        >
          Instalar ahora
        </v-btn>
        <v-btn
          icon
          variant="text"
          size="small"
          @click="dismissPrompt"
          class="pwa-install-close"
          aria-label="Cerrar"
        >
          <v-icon icon="mdi-close" size="20" />
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const showInstallButton = ref(false);
let deferredPrompt: BeforeInstallPromptEvent | null = null;

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

onMounted(() => {
  console.log('🔍 PWAInstallPrompt: Componente montado, escuchando eventos...');
  
  // Check if already installed first
  if (checkIfInstalled()) {
    return; // Don't show prompt if already installed
  }
  
  // Listen for the beforeinstallprompt event - this is the ONLY way to show the banner
  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  
  console.log('⏳ Esperando evento beforeinstallprompt de Chrome...');
  console.log('💡 El banner solo aparecerá cuando Chrome esté listo para instalar');
});

onBeforeUnmount(() => {
  window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
});

function handleBeforeInstallPrompt(e: Event) {
  console.log('🎉 beforeinstallprompt event recibido! Chrome está listo para instalar.');
  
  // Prevent the default browser install prompt
  e.preventDefault();
  
  // Store the event for later use
  deferredPrompt = e as BeforeInstallPromptEvent;
  
  // Show our custom install button - SOLO cuando tenemos el prompt real
  showInstallButton.value = true;
  
  console.log('✅ Banner de instalación mostrado. El botón "Instalar ahora" funcionará inmediatamente.');
}

function checkIfInstalled(): boolean {
  // Check if running in standalone mode (already installed)
  if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('ℹ️ PWA ya está instalada (standalone mode)');
    showInstallButton.value = false;
    return true;
  }
  
  // Check if it's in the installed apps list (not 100% reliable)
  if ((window.navigator as any).standalone === true) {
    console.log('ℹ️ PWA ya está instalada (iOS standalone)');
    showInstallButton.value = false;
    return true;
  }
  
  console.log('ℹ️ PWA no está instalada, esperando evento beforeinstallprompt...');
  return false;
}

async function installPWA() {
  if (!deferredPrompt) {
    console.warn('⚠️ No hay prompt de instalación disponible');
    showInstallButton.value = false;
    return;
  }

  try {
    console.log('🚀 Mostrando prompt de instalación de Chrome...');
    
    // Show the install prompt - esto abre el diálogo nativo de Chrome
    await deferredPrompt.prompt();
    
    // Wait for the user's response
    const choiceResult = await deferredPrompt.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      console.log('✅ Usuario aceptó la instalación - La app se está instalando');
      showInstallButton.value = false;
    } else {
      console.log('❌ Usuario rechazó la instalación');
      // Mantener el banner visible por si el usuario cambia de opinión
    }
    
    // Clear the deferred prompt después de usarlo
    deferredPrompt = null;
    showInstallButton.value = false;
  } catch (error) {
    console.error('❌ Error al instalar PWA:', error);
    showInstallButton.value = false;
  }
}

function dismissPrompt() {
  console.log('❌ Usuario cerró el banner de instalación');
  showInstallButton.value = false;
  
  // Store dismissal in sessionStorage to not show again for this session
  sessionStorage.setItem('pwa-install-dismissed', 'true');
  
  // No limpiar deferredPrompt - puede que el usuario quiera instalar más tarde
  // El banner volverá a aparecer si el usuario recarga la página
}


</script>

<style scoped>
.pwa-install-prompt {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  max-width: 90%;
  width: 100%;
  max-width: 450px;
  animation: slideUp 0.4s ease-out;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

@keyframes slideUp {
  from {
    transform: translateX(-50%) translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
}

.pwa-install-content {
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, rgba(0, 187, 114, 0.25) 0%, rgba(0, 187, 114, 0.15) 100%);
  border: 2px solid rgba(0, 187, 114, 0.5);
  border-radius: 16px;
  padding: 16px 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 187, 114, 0.3), 0 0 0 1px rgba(0, 187, 114, 0.2);
}


.pwa-install-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(0, 187, 114, 0.2);
  border-radius: 50%;
  flex-shrink: 0;
}

.pwa-install-text {
  flex: 1;
  min-width: 0;
}

.pwa-install-title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #00BB72;
  line-height: 1.3;
  text-shadow: 0 1px 2px rgba(0, 187, 114, 0.3);
}

.pwa-install-subtitle {
  margin: 2px 0 0 0;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.2;
}

.pwa-install-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.pwa-install-btn {
  background: #00BB72 !important;
  color: #000 !important;
  font-weight: 600;
  text-transform: none;
  border-radius: 8px;
}

.pwa-install-close {
  color: rgba(255, 255, 255, 0.6) !important;
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .pwa-install-prompt {
    bottom: 80px; /* Above WhatsApp button */
    left: 16px;
    right: 16px;
    max-width: calc(100% - 32px);
    transform: none;
  }

  .pwa-install-content {
    padding: 10px 12px;
  }

  .pwa-install-title {
    font-size: 13px;
  }

  .pwa-install-subtitle {
    font-size: 11px;
  }
}

/* Hide if already dismissed in this session */
.pwa-install-prompt[data-dismissed="true"] {
  display: none;
}
</style>

