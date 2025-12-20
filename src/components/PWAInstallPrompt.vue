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
  
  // Validar que el evento tenga las propiedades necesarias
  const promptEvent = e as BeforeInstallPromptEvent;
  
  if (!promptEvent.prompt || typeof promptEvent.prompt !== 'function') {
    console.error('❌ ERROR: El evento beforeinstallprompt no tiene el método prompt()');
    return;
  }
  
  // Prevent the default browser install prompt
  e.preventDefault();
  
  // Store the event for later use
  deferredPrompt = promptEvent;
  
  // Pequeño delay antes de mostrar el banner para asegurar que todo esté listo
  // Esto ayuda a evitar el error "too early"
  setTimeout(() => {
    if (deferredPrompt) {
      // Show our custom install button - SOLO cuando tenemos el prompt real y válido
      showInstallButton.value = true;
      
      console.log('✅ Banner de instalación mostrado.');
      console.log('✅ El botón "Instalar ahora" abrirá el diálogo nativo de Chrome cuando hagas clic.');
      console.log('✅ NO se mostrarán instrucciones manuales - solo el diálogo de instalación.');
    }
  }, 500); // 500ms delay para asegurar que Chrome esté completamente listo
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
  // Validación estricta: NO hacer nada si no hay prompt real
  if (!deferredPrompt) {
    console.error('❌ ERROR: No hay prompt de instalación disponible. El banner no debería estar visible.');
    showInstallButton.value = false;
    return;
  }

  // Verificar que el prompt tenga el método prompt()
  if (typeof deferredPrompt.prompt !== 'function') {
    console.error('❌ ERROR: El prompt no tiene el método prompt(). Esto no debería pasar.');
    showInstallButton.value = false;
    deferredPrompt = null;
    return;
  }

  try {
    console.log('🚀 Usuario hizo clic en "Instalar ahora"');
    console.log('🚀 Abriendo diálogo nativo de instalación de Chrome...');
    
    // Pequeño delay para asegurar que el user gesture esté completo
    // Chrome requiere que el prompt se llame dentro de un user gesture handler
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Show the install prompt - esto abre el diálogo nativo de Chrome
    // Este es el ÚNICO método que abre el diálogo de instalación
    // Debe llamarse dentro de un user gesture handler (click event)
    await deferredPrompt.prompt();
    
    console.log('⏳ Esperando respuesta del usuario...');
    
    // Wait for the user's response
    const choiceResult = await deferredPrompt.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      console.log('✅ Usuario aceptó la instalación - La app se está instalando ahora');
      showInstallButton.value = false;
    } else {
      console.log('❌ Usuario rechazó la instalación');
      // Mantener el banner por si cambia de opinión
    }
    
    // Clear the deferred prompt después de usarlo (solo se puede usar una vez)
    deferredPrompt = null;
    showInstallButton.value = false;
  } catch (error: any) {
    console.error('❌ Error al instalar PWA:', error);
    
    // Si el error es "too early", el prompt ya fue usado o descartado
    if (error?.message?.includes('too early') || error?.message?.includes('dismissed')) {
      console.warn('⚠️ El prompt fue descartado. Esto puede pasar si se llamó demasiado rápido o ya fue usado.');
      console.warn('💡 El usuario puede usar el icono de instalación en la barra de direcciones del navegador.');
    }
    
    showInstallButton.value = false;
    deferredPrompt = null;
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

