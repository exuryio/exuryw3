<template>
  <!-- Banner cuando Chrome está listo (tiene beforeinstallprompt) -->
  <!-- SOLO se muestra si deferredPrompt existe Y tiene el método prompt() -->
  <div
    v-if="showInstallButton && deferredPrompt && typeof deferredPrompt.prompt === 'function'"
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
          <span v-if="isMobile">Experiencia tipo app sin barra del navegador</span>
          <span v-else>Acceso rápido desde tu escritorio</span>
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
const isMobile = ref(false);
let deferredPrompt: BeforeInstallPromptEvent | null = null;

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

onMounted(() => {
  console.log('✅ PWAInstallPrompt: onMounted ejecutado');
  
  isMobile.value = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  console.log('🔍 PWAInstallPrompt: Componente montado, escuchando eventos...');
  console.log(`📱 Dispositivo: ${isMobile.value ? 'Mobile' : 'Desktop'} ${isIOS ? '(iOS)' : ''}`);
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
  
  // Verificar criterios después de 5 segundos (solo para diagnóstico)
  setTimeout(async () => {
    if (!deferredPrompt && !showInstallButton.value) {
      console.log('🔍 Verificando criterios de instalación de la PWA...');
      await verifyInstallationCriteria();
    }
  }, 5000);
  
  // En mobile, el evento puede tardar más en dispararse
  // Agregar un timeout para verificar si el evento se dispara
  if (isMobile.value) {
    console.log('⏳ Esperando evento beforeinstallprompt en mobile...');
    console.log('💡 En mobile, Chrome puede requerir más interacción antes de mostrar el prompt');
    
    // Verificar después de 30 segundos si el evento se disparó
    setTimeout(async () => {
      if (!deferredPrompt && !showInstallButton.value) {
        console.log('⚠️ No se recibió beforeinstallprompt después de 30 segundos en mobile');
        console.log('💡 Esto es normal en mobile - Chrome puede requerir más visitas o interacción');
        console.log('💡 El usuario puede usar el menú del navegador para instalar la app');
        showInstallationInstructions();
      }
    }, 30000);
  } else {
    console.log('⏳ Esperando evento beforeinstallprompt en desktop...');
    console.log('💡 El banner solo aparecerá cuando Chrome esté listo para instalar');
    
    // En desktop, verificar después de 30 segundos también
    setTimeout(async () => {
      if (!deferredPrompt && !showInstallButton.value) {
        console.log('⚠️ No se recibió beforeinstallprompt después de 30 segundos en desktop');
        console.log('💡 El usuario puede usar el icono de instalación en la barra de direcciones');
        showInstallationInstructions();
      }
    }, 30000);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
});

function handleBeforeInstallPrompt(e: Event) {
  console.log('🎉 beforeinstallprompt event recibido! Chrome está listo para instalar.');
  console.log(`📱 Dispositivo: ${isMobile.value ? 'Mobile' : 'Desktop'}`);
  
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
  const delay = isMobile.value ? 200 : 500;
  
  console.log(`⏳ Esperando ${delay}ms antes de mostrar el banner...`);
  
  // Pequeño delay antes de mostrar el banner para asegurar que todo esté listo
  // Esto ayuda a evitar el error "too early"
  setTimeout(() => {
    // Validación estricta: SOLO mostrar si deferredPrompt existe Y tiene el método prompt()
    if (deferredPrompt && typeof deferredPrompt.prompt === 'function') {
      // Show our custom install button - SOLO cuando tenemos el prompt real y válido
      showInstallButton.value = true;
      
      console.log('✅ Banner de instalación mostrado.');
      console.log('✅ deferredPrompt disponible:', !!deferredPrompt);
      console.log('✅ deferredPrompt.prompt disponible:', typeof deferredPrompt.prompt === 'function');
      console.log('✅ El botón "Instalar ahora" abrirá el diálogo nativo de Chrome cuando hagas clic.');
      
      // Log adicional para mobile
      if (isMobile.value) {
        console.log('📱 En mobile, el diálogo de instalación aparecerá como un modal nativo de Android');
        console.log('📱 Después de instalar, la app se abrirá sin barra del navegador - experiencia tipo app nativa');
      }
    } else {
      console.error('❌ ERROR: deferredPrompt no está disponible o no tiene el método prompt()');
      console.error('❌ deferredPrompt:', deferredPrompt);
      console.error('❌ No se mostrará el banner porque no hay funcionalidad de instalación disponible');
      showInstallButton.value = false;
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
  console.log('🔍 Estado actual cuando se hace clic en "Instalar ahora":');
  console.log('  - showInstallButton:', showInstallButton.value);
  console.log('  - deferredPrompt:', deferredPrompt ? 'Disponible' : '❌ NO disponible');
  console.log('  - deferredPrompt.prompt:', deferredPrompt && typeof deferredPrompt.prompt === 'function' ? 'Función disponible' : '❌ NO disponible');
  
  // Validación estricta: NO hacer nada si no hay prompt real
  if (!deferredPrompt) {
    console.error('❌ ERROR CRÍTICO: No hay prompt de instalación disponible.');
    console.error('❌ El banner se está mostrando pero deferredPrompt es null.');
    console.error('❌ Esto NO debería pasar - el banner solo debería aparecer si deferredPrompt existe.');
    console.error('❌ Posible causa: El evento beforeinstallprompt no se recibió correctamente o se perdió.');
    showInstallButton.value = false;
    alert('Error: No se puede instalar la app en este momento. Por favor, usa el menú del navegador para instalar.');
    return;
  }

  // Verificar que el prompt tenga el método prompt()
  if (typeof deferredPrompt.prompt !== 'function') {
    console.error('❌ ERROR CRÍTICO: El prompt no tiene el método prompt().');
    console.error('❌ deferredPrompt:', deferredPrompt);
    console.error('❌ Esto NO debería pasar - el banner solo debería aparecer si prompt() está disponible.');
    showInstallButton.value = false;
    deferredPrompt = null;
    alert('Error: No se puede instalar la app en este momento. Por favor, usa el menú del navegador para instalar.');
    return;
  }

  try {
    console.log('🚀 Usuario hizo clic en "Instalar ahora"');
    console.log('🚀 deferredPrompt disponible:', !!deferredPrompt);
    console.log('🚀 deferredPrompt.prompt disponible:', typeof deferredPrompt.prompt === 'function');
    console.log('🚀 Abriendo diálogo nativo de instalación de Chrome...');
    
    // NO usar delay - llamar inmediatamente dentro del user gesture
    // El delay puede hacer que Chrome considere que el user gesture expiró
    
    // Show the install prompt - esto abre el diálogo nativo de Chrome
    // Este es el ÚNICO método que abre el diálogo de instalación
    // Debe llamarse dentro de un user gesture handler (click event)
    await deferredPrompt.prompt();
    
    console.log('⏳ Prompt mostrado, esperando respuesta del usuario...');
    
    // Wait for the user's response
    const choiceResult = await deferredPrompt.userChoice;
    
    console.log('📋 Resultado del usuario:', choiceResult.outcome);
    
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
    console.error('❌ Tipo de error:', error?.constructor?.name);
    console.error('❌ Mensaje de error:', error?.message);
    console.error('❌ Stack:', error?.stack);
    
    // Si el error es "too early", el prompt ya fue usado o descartado
    if (error?.message?.includes('too early') || error?.message?.includes('dismissed')) {
      console.warn('⚠️ El prompt fue descartado. Esto puede pasar si se llamó demasiado rápido o ya fue usado.');
      console.warn('💡 El usuario puede usar el icono de instalación en la barra de direcciones del navegador.');
    } else if (error?.message?.includes('user gesture')) {
      console.warn('⚠️ El prompt requiere un user gesture activo. El delay puede haber expirado.');
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


async function verifyInstallationCriteria() {
  console.log('🔍 Verificando criterios de instalación de la PWA...');
  
  const checks = {
    manifest: false,
    icons: false,
    serviceWorker: false,
    https: false,
    notInstalled: true,
  };
  
  // Verificar manifest
  try {
    const manifestResponse = await fetch('/manifest.json');
    if (manifestResponse.ok) {
      const manifest = await manifestResponse.json();
      checks.manifest = !!(manifest.name && manifest.icons && manifest.icons.length > 0);
      console.log(`✅ Manifest: ${checks.manifest ? 'Válido' : 'Incompleto'}`);
    }
  } catch (error) {
    console.error('❌ Error al verificar manifest:', error);
  }
  
  // Verificar iconos
  try {
    const icon192 = await fetch('/icons/icon-192x192.png');
    const icon512 = await fetch('/icons/icon-512x512.png');
    checks.icons = icon192.ok && icon512.ok;
    console.log(`✅ Iconos: ${checks.icons ? 'Disponibles' : 'Faltan'}`);
  } catch (error) {
    console.error('❌ Error al verificar iconos:', error);
  }
  
  // Verificar Service Worker
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      checks.serviceWorker = !!registration;
      console.log(`✅ Service Worker: ${checks.serviceWorker ? 'Registrado' : 'No registrado'}`);
    } catch (error) {
      console.error('❌ Error al verificar Service Worker:', error);
    }
  } else {
    console.warn('⚠️ Service Worker: Navegador no soporta Service Workers');
  }
  
  // Verificar HTTPS
  checks.https = window.location.protocol === 'https:' || window.location.hostname === 'localhost';
  console.log(`✅ HTTPS: ${checks.https ? 'Sí' : 'No'}`);
  
  // Verificar si ya está instalada
  checks.notInstalled = !window.matchMedia('(display-mode: standalone)').matches;
  console.log(`✅ No instalada: ${checks.notInstalled ? 'Sí' : 'No (ya está instalada)'}`);
  
  // Resumen
  const allChecksPass = Object.values(checks).every(check => check === true);
  console.log(`\n📊 Resumen de verificación: ${allChecksPass ? '✅ Todos los criterios cumplidos' : '⚠️ Algunos criterios no se cumplen'}`);
  
  if (!allChecksPass) {
    console.log('💡 Razones por las que Chrome puede no disparar beforeinstallprompt:');
    if (!checks.manifest) console.log('   - Manifest incompleto o inválido');
    if (!checks.icons) console.log('   - Faltan iconos (192x192 o 512x512)');
    if (!checks.serviceWorker) console.log('   - Service Worker no registrado');
    if (!checks.https) console.log('   - No está en HTTPS (requerido en producción)');
    if (!checks.notInstalled) console.log('   - La PWA ya está instalada');
  } else {
    console.log('💡 Todos los criterios se cumplen. Chrome puede requerir:');
    console.log('   - Más tiempo en la página');
    console.log('   - Más interacción del usuario (scroll, clics)');
    console.log('   - Múltiples visitas a la página');
    console.log('   - Que el usuario no haya rechazado la instalación anteriormente');
  }
  
  return allChecksPass;
}

function showInstallationInstructions() {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  console.log('\n📱 INSTRUCCIONES PARA INSTALAR LA APP:');
  console.log('════════════════════════════════════════');
  
  if (isIOS) {
    console.log('🍎 iOS:');
    console.log('   1. Toca el botón "Compartir" (cuadrado con flecha)');
    console.log('   2. Desplázate hacia abajo y toca "Agregar a pantalla de inicio"');
    console.log('   3. Toca "Agregar"');
  } else if (isMobile.value) {
    console.log('📱 Android:');
    console.log('   1. Toca el menú (⋮) en la esquina superior derecha');
    console.log('   2. Busca "Instalar app" o "Agregar a pantalla de inicio"');
    console.log('   3. Toca "Instalar"');
    console.log('   💡 Después de instalar, la app se abrirá sin barra del navegador');
  } else {
    console.log('🖥️ Desktop:');
    console.log('   1. Busca el icono de instalación (➕) en la barra de direcciones');
    console.log('   2. O ve al menú (⋮) → "Instalar Exury..."');
    console.log('   3. Haz clic en "Instalar"');
  }
  
  console.log('════════════════════════════════════════\n');
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

/* Estilo para el banner de instrucciones manuales */
.pwa-manual-instructions .pwa-install-content {
  background: linear-gradient(135deg, rgba(255, 193, 7, 0.2) 0%, rgba(255, 193, 7, 0.1) 100%);
  border-color: rgba(255, 193, 7, 0.4);
}

.pwa-manual-instructions .pwa-install-title {
  color: #FFC107;
}

.pwa-manual-instructions .pwa-install-icon {
  background: rgba(255, 193, 7, 0.2);
}
</style>

