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

// Log inmediato para verificar que el componente se carga
console.log('🚀 PWAInstallPrompt: Script ejecutándose...');

const showInstallButton = ref(false);
let deferredPrompt: BeforeInstallPromptEvent | null = null;

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

onMounted(() => {
  console.log('✅ PWAInstallPrompt: onMounted ejecutado');
  
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  console.log('🔍 PWAInstallPrompt: Componente montado, escuchando eventos...');
  console.log(`📱 Dispositivo: ${isMobile ? 'Mobile' : 'Desktop'} ${isIOS ? '(iOS)' : ''}`);
  console.log(`🌐 User Agent: ${navigator.userAgent.substring(0, 50)}...`);
  
  // Check if already installed first
  console.log('🔍 Verificando si la PWA ya está instalada...');
  if (checkIfInstalled()) {
    console.log('ℹ️ PWA ya está instalada, no se mostrará el banner');
    return; // Don't show prompt if already installed
  }
  console.log('✅ PWA no está instalada, continuando...');
  
  // En iOS, el evento beforeinstallprompt no existe
  // iOS usa el banner nativo del navegador
  if (isIOS) {
    console.log('ℹ️ iOS detectado - El evento beforeinstallprompt no está disponible');
    console.log('💡 En iOS, usa el botón "Compartir" → "Agregar a pantalla de inicio"');
    return;
  }
  
  // Listen for the beforeinstallprompt event - this is the ONLY way to show the banner
  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  
  // En mobile, el evento puede tardar más en dispararse
  // Agregar un timeout para verificar si el evento se dispara
  if (isMobile) {
    console.log('⏳ Esperando evento beforeinstallprompt en mobile...');
    console.log('💡 En mobile, Chrome puede requerir más interacción antes de mostrar el prompt');
    
    // Verificar después de 10 segundos si el evento se disparó
    setTimeout(() => {
      if (!deferredPrompt && !showInstallButton.value) {
        console.log('⚠️ No se recibió beforeinstallprompt después de 10 segundos en mobile');
        console.log('💡 Esto es normal en mobile - Chrome puede requerir más visitas o interacción');
        console.log('💡 El usuario puede usar el menú del navegador para instalar la app');
      }
    }, 10000);
  } else {
    console.log('⏳ Esperando evento beforeinstallprompt en desktop...');
    console.log('💡 El banner solo aparecerá cuando Chrome esté listo para instalar');
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
});

function handleBeforeInstallPrompt(e: Event) {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  console.log('🎉 beforeinstallprompt event recibido! Chrome está listo para instalar.');
  console.log(`📱 Dispositivo: ${isMobile ? 'Mobile' : 'Desktop'}`);
  
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
  
  // En mobile, usar un delay más corto porque el evento ya está listo
  // En desktop, usar el delay normal
  const delay = isMobile ? 200 : 500;
  
  console.log(`⏳ Esperando ${delay}ms antes de mostrar el banner...`);
  
  // Pequeño delay antes de mostrar el banner para asegurar que todo esté listo
  // Esto ayuda a evitar el error "too early"
  setTimeout(() => {
    if (deferredPrompt) {
      // Show our custom install button - SOLO cuando tenemos el prompt real y válido
      showInstallButton.value = true;
      
      console.log('✅ Banner de instalación mostrado.');
      console.log('✅ El botón "Instalar ahora" abrirá el diálogo nativo de Chrome cuando hagas clic.');
      console.log('✅ NO se mostrarán instrucciones manuales - solo el diálogo de instalación.');
      
      // Log adicional para mobile
      if (isMobile) {
        console.log('📱 En mobile, el diálogo de instalación aparecerá como un modal nativo de Android');
      }
    }
  }, delay);
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
    z-index: 10000; /* Asegurar que esté por encima de otros elementos en mobile */
    position: fixed !important; /* Forzar posición fixed en mobile */
  }

  .pwa-install-content {
    padding: 12px 16px; /* Más padding en mobile para mejor UX */
    min-height: 60px; /* Altura mínima para mejor visibilidad */
  }

  .pwa-install-title {
    font-size: 14px; /* Ligeramente más grande en mobile */
    font-weight: 700;
  }

  .pwa-install-subtitle {
    font-size: 12px; /* Ligeramente más grande en mobile */
  }
  
  .pwa-install-btn {
    font-size: 13px !important; /* Tamaño de fuente para mobile */
    padding: 8px 16px !important; /* Más padding para mejor área de toque */
    min-height: 36px; /* Altura mínima para mejor accesibilidad */
  }
}

/* Hide if already dismissed in this session */
.pwa-install-prompt[data-dismissed="true"] {
  display: none;
}
</style>

