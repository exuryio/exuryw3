<template>
  <!-- Debug: Mostrar siempre para verificar que el componente se renderiza -->
  <div
    v-if="showInstallButton || showDebug"
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
          {{ showInstallButton ? 'Acceso rápido desde tu escritorio' : 'Esperando a que Chrome esté listo...' }}
        </p>
      </div>
      <div class="pwa-install-actions">
        <v-btn
          v-if="showInstallButton"
          color="primary"
          variant="flat"
          size="small"
          @click="installPWA"
          class="pwa-install-btn"
        >
          Instalar ahora
        </v-btn>
        <v-btn
          v-else
          color="primary"
          variant="flat"
          size="small"
          :disabled="!canInstall"
          @click="tryForceInstall"
          class="pwa-install-btn"
        >
          {{ canInstall ? 'Instalar' : 'Esperando...' }}
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
const showDebug = ref(false); // Para debugging
const canInstall = ref(false); // Si podemos intentar instalar
let deferredPrompt: BeforeInstallPromptEvent | null = null;
let checkInterval: ReturnType<typeof setInterval> | null = null;

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

onMounted(() => {
  console.log('🔍 PWAInstallPrompt: Componente montado, escuchando eventos...');
  
  // Listen for the beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  
  // Check if already installed
  checkIfInstalled();
  
  // Verificar periódicamente si Chrome está listo (para casos donde el evento no se dispara)
  setTimeout(() => {
    console.log('🔍 PWAInstallPrompt: Verificando estado después de 2 segundos...');
    
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(() => {
        console.log('✅ Service Worker listo');
      });
    }
    
    // Si después de 10 segundos no hay prompt, verificar si podemos mostrar el banner de todas formas
    setTimeout(async () => {
      if (!showInstallButton.value && !deferredPrompt) {
        console.log('⚠️ No se recibió beforeinstallprompt después de 10 segundos');
        
        // Verificar si la PWA es instalable (todos los requisitos cumplidos)
        const isInstallable = await checkInstallability();
        
        if (isInstallable) {
          console.log('✅ PWA es instalable, mostrando banner aunque Chrome no haya disparado el evento');
          // Mostrar banner para que el usuario sepa que puede instalar
          showDebug.value = true;
          canInstall.value = true; // Permitir intentar instalar
        }
      }
    }, 8000);
    
    // Verificar cada 5 segundos si Chrome dispara el evento
    checkInterval = setInterval(() => {
      if (deferredPrompt && !showInstallButton.value) {
        console.log('✅ Prompt disponible, mostrando banner');
        showInstallButton.value = true;
        if (checkInterval) clearInterval(checkInterval);
      }
    }, 5000);
  }, 2000);
});

onBeforeUnmount(() => {
  window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  if (checkInterval) {
    clearInterval(checkInterval);
    checkInterval = null;
  }
});

function handleBeforeInstallPrompt(e: Event) {
  console.log('🎉 beforeinstallprompt event recibido!', e);
  
  // Prevent the default browser install prompt
  e.preventDefault();
  
  // Store the event for later use
  deferredPrompt = e as BeforeInstallPromptEvent;
  
  // Show our custom install button
  showInstallButton.value = true;
  canInstall.value = true;
  showDebug.value = false; // Ocultar modo debug si estaba activo
  
  console.log('✅ PWA instalable - Mostrando botón de instalación');
  console.log('📱 deferredPrompt guardado:', deferredPrompt);
}

function checkIfInstalled() {
  // Check if running in standalone mode (already installed)
  if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('ℹ️ PWA ya está instalada (standalone mode)');
    showInstallButton.value = false;
    return;
  }
  
  // Check if it's in the installed apps list (not 100% reliable)
  if ((window.navigator as any).standalone === true) {
    console.log('ℹ️ PWA ya está instalada (iOS standalone)');
    showInstallButton.value = false;
    return;
  }
  
  console.log('ℹ️ PWA no está instalada, esperando evento beforeinstallprompt...');
}

async function installPWA() {
  if (!deferredPrompt) {
    console.warn('⚠️ No hay prompt de instalación disponible');
    return;
  }

  try {
    // Show the install prompt
    await deferredPrompt.prompt();
    
    // Wait for the user's response
    const choiceResult = await deferredPrompt.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      console.log('✅ Usuario aceptó la instalación');
      showInstallButton.value = false;
    } else {
      console.log('❌ Usuario rechazó la instalación');
    }
    
    // Clear the deferred prompt
    deferredPrompt = null;
  } catch (error) {
    console.error('❌ Error al instalar PWA:', error);
  }
}

function dismissPrompt() {
  showInstallButton.value = false;
  showDebug.value = false;
  deferredPrompt = null;
  
  // Store dismissal in localStorage to not show again for this session
  sessionStorage.setItem('pwa-install-dismissed', 'true');
}

async function checkInstallability() {
  console.log('🔍 Verificando instalabilidad de la PWA...');
  
  // Verificar manifest
  try {
    const manifestResponse = await fetch('/manifest.json');
    const manifest = await manifestResponse.json();
    console.log('✅ Manifest válido:', {
      name: manifest.name,
      icons: manifest.icons?.length || 0,
      display: manifest.display,
    });
  } catch (error) {
    console.error('❌ Error al cargar manifest:', error);
    return false;
  }
  
  // Verificar iconos
  const iconChecks = await Promise.all([
    fetch('/icons/icon-192x192.png').then(r => r.ok),
    fetch('/icons/icon-512x512.png').then(r => r.ok),
  ]);
  console.log('📱 Iconos:', iconChecks);
  
  // Verificar Service Worker
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.getRegistration();
    console.log('🔧 Service Worker:', registration ? '✅ Registrado' : '❌ No registrado');
  }
  
  // Verificar si está en modo standalone
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  console.log('📱 Modo standalone:', isStandalone ? '✅ Sí (ya instalada)' : '❌ No');
  
  return !isStandalone;
}

async function tryForceInstall() {
  console.log('🔄 Intentando instalar...');
  
  // Si tenemos el prompt, usarlo directamente
  if (deferredPrompt) {
    console.log('✅ Usando prompt disponible');
    await installPWA();
    return;
  }
  
  // Intentar capturar el evento si está disponible (puede que Chrome lo dispare ahora)
  console.log('⏳ Esperando evento beforeinstallprompt...');
  
  const event = await new Promise<BeforeInstallPromptEvent | null>((resolve) => {
    const handler = (e: Event) => {
      e.preventDefault();
      console.log('🎉 Evento capturado al intentar instalar!');
      resolve(e as BeforeInstallPromptEvent);
    };
    
    window.addEventListener('beforeinstallprompt', handler, { once: true });
    
    // Esperar hasta 3 segundos
    setTimeout(() => {
      window.removeEventListener('beforeinstallprompt', handler);
      resolve(null);
    }, 3000);
  });
  
  if (event) {
    deferredPrompt = event;
    showInstallButton.value = true;
    canInstall.value = true;
    await installPWA();
  } else {
    // Si no hay prompt disponible después de esperar, mostrar instrucciones
    console.log('⚠️ No se pudo obtener el prompt, mostrando instrucciones');
    showManualInstallGuide();
  }
}

function showManualInstallGuide() {
  const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  
  let message = '📱 Para instalar Exury como app:\n\n';
  
  if (isChrome) {
    message += '1. Busca el icono de instalación en la barra de direcciones (lado derecho)\n';
    message += '2. O ve al menú (⋮) → "Instalar Exury..."\n';
    message += '3. Haz clic en "Instalar"\n\n';
    message += '💡 El icono puede tardar unos segundos en aparecer.';
  } else {
    message += '1. Usa Chrome o Edge para instalar PWAs\n';
    message += '2. Busca el icono de instalación en la barra de direcciones\n';
    message += '3. O ve al menú → "Instalar aplicación"';
  }
  
  alert(message);
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

