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
  
  <!-- Banner informativo con instrucciones manuales -->
  <!-- Se muestra si beforeinstallprompt no se ha disparado después de unos segundos -->
  <div
    v-if="showManualBanner && !showInstallButton && !sessionDismissed"
    class="pwa-install-prompt pwa-manual-instructions"
    role="banner"
    aria-label="Instalar Exury como app"
    @click="showInstallModal = true"
  >
    <div class="pwa-install-content">
      <div class="pwa-install-icon">
        <v-icon :icon="isIOS ? 'mdi-apple' : isMobile ? 'mdi-cellphone' : 'mdi-monitor'" size="24" />
      </div>
      <div class="pwa-install-text">
        <p class="pwa-install-title">
          {{ isMobile ? 'Agrega Exury a tu pantalla de inicio' : 'Instala Exury como app' }}
        </p>
        <p class="pwa-install-subtitle">
          <span v-if="isIOS">Toca para ver cómo agregar</span>
          <span v-else-if="isMobile">Toca para ver instrucciones paso a paso</span>
          <span v-else>Busca el icono (➕) en la barra de direcciones</span>
        </p>
      </div>
      <div class="pwa-install-actions">
        <v-btn
          color="primary"
          variant="flat"
          size="small"
          @click.stop="showInstallModal = true"
          class="pwa-install-btn-manual"
        >
          Ver cómo
        </v-btn>
        <v-btn
          icon
          variant="text"
          size="small"
          @click.stop="dismissManualBanner"
          class="pwa-install-close"
          aria-label="Cerrar"
        >
          <v-icon icon="mdi-close" size="20" />
        </v-btn>
      </div>
    </div>
  </div>
  
  <!-- Modal con instrucciones detalladas -->
  <v-dialog
    v-model="showInstallModal"
    max-width="90%"
    width="400"
    scrollable
    class="pwa-install-modal"
  >
    <v-card class="pwa-install-modal-card">
      <v-card-title class="pwa-install-modal-title">
        <span>Instala Exury como app</span>
        <v-btn
          icon
          variant="text"
          size="small"
          @click="showInstallModal = false"
          class="pwa-install-modal-close"
        >
          <v-icon icon="mdi-close" size="20" />
        </v-btn>
      </v-card-title>
      
      <v-card-text class="pwa-install-modal-content">
        <!-- Instrucciones para iOS -->
        <div v-if="isIOS" class="pwa-install-steps">
          <div class="pwa-install-step">
            <div class="pwa-install-step-number">1</div>
            <div class="pwa-install-step-content">
              <p class="pwa-install-step-title">Toca el botón "Compartir"</p>
              <p class="pwa-install-step-description">Busca el icono de compartir (cuadrado con flecha hacia arriba) en la barra inferior de Safari</p>
            </div>
          </div>
          <div class="pwa-install-step">
            <div class="pwa-install-step-number">2</div>
            <div class="pwa-install-step-content">
              <p class="pwa-install-step-title">Desplázate y toca "Agregar a pantalla de inicio"</p>
              <p class="pwa-install-step-description">En el menú de compartir, desplázate hacia abajo hasta encontrar esta opción</p>
            </div>
          </div>
          <div class="pwa-install-step">
            <div class="pwa-install-step-number">3</div>
            <div class="pwa-install-step-content">
              <p class="pwa-install-step-title">Confirma la instalación</p>
              <p class="pwa-install-step-description">Toca "Agregar" en la esquina superior derecha</p>
            </div>
          </div>
        </div>
        
        <!-- Instrucciones para Android -->
        <div v-else-if="isMobile" class="pwa-install-steps">
          <div class="pwa-install-step">
            <div class="pwa-install-step-number">1</div>
            <div class="pwa-install-step-content">
              <p class="pwa-install-step-title">Toca el menú (⋮) en Chrome</p>
              <p class="pwa-install-step-description">Busca los tres puntos en la esquina superior derecha de la barra del navegador</p>
            </div>
          </div>
          <div class="pwa-install-step">
            <div class="pwa-install-step-number">2</div>
            <div class="pwa-install-step-content">
              <p class="pwa-install-step-title">Busca "Instalar app" o "Agregar a pantalla de inicio"</p>
              <p class="pwa-install-step-description">En el menú, desplázate y busca esta opción. Puede aparecer como "Instalar app", "Agregar a pantalla de inicio" o "Agregar a inicio"</p>
            </div>
          </div>
          <div class="pwa-install-step">
            <div class="pwa-install-step-number">3</div>
            <div class="pwa-install-step-content">
              <p class="pwa-install-step-title">Confirma tocando "Instalar"</p>
              <p class="pwa-install-step-description">Aparecerá un diálogo de confirmación. Toca "Instalar" o "Agregar"</p>
            </div>
          </div>
          <div class="pwa-install-note">
            <v-icon icon="mdi-information" size="20" class="pwa-install-note-icon" />
            <p><strong>¡Listo!</strong> Después de instalar, encontrarás el icono de Exury en tu pantalla de inicio. Al abrirlo, se verá como una app nativa sin barra del navegador.</p>
          </div>
          <div class="pwa-install-tip">
            <v-icon icon="mdi-lightbulb-on" size="20" class="pwa-install-tip-icon" />
            <p><strong>Tip:</strong> Si no ves la opción "Instalar app", intenta recargar la página o espera unos segundos. Chrome puede tardar en mostrar esta opción.</p>
          </div>
        </div>
        
        <!-- Instrucciones para Desktop -->
        <div v-else class="pwa-install-steps">
          <div class="pwa-install-step">
            <div class="pwa-install-step-number">1</div>
            <div class="pwa-install-step-content">
              <p class="pwa-install-step-title">Busca el icono de instalación (➕)</p>
              <p class="pwa-install-step-description">En la barra de direcciones del navegador, busca el icono de instalación</p>
            </div>
          </div>
          <div class="pwa-install-step">
            <div class="pwa-install-step-number">2</div>
            <div class="pwa-install-step-content">
              <p class="pwa-install-step-title">O usa el menú del navegador</p>
              <p class="pwa-install-step-description">Ve al menú (⋮) → "Instalar Exury..."</p>
            </div>
          </div>
          <div class="pwa-install-step">
            <div class="pwa-install-step-number">3</div>
            <div class="pwa-install-step-content">
              <p class="pwa-install-step-title">Confirma la instalación</p>
              <p class="pwa-install-step-description">Haz clic en "Instalar" en el diálogo de confirmación</p>
            </div>
          </div>
        </div>
      </v-card-text>
      
      <v-card-actions class="pwa-install-modal-actions">
        <v-btn
          color="primary"
          variant="flat"
          block
          @click="showInstallModal = false"
          class="pwa-install-modal-btn"
        >
          Entendido
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

// Log inmediato para verificar que el componente se carga
console.log('🚀 PWAInstallPrompt: Script ejecutándose...');

const showInstallButton = ref(false);
const showManualBanner = ref(false);
const showInstallModal = ref(false);
const isMobile = ref(false);
const isIOS = ref(false);
const sessionDismissed = ref(false);
let deferredPrompt: BeforeInstallPromptEvent | null = null;

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

onMounted(() => {
  console.log('✅ PWAInstallPrompt: onMounted ejecutado');
  
  isMobile.value = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  isIOS.value = /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  // Verificar si el usuario ya cerró el banner en esta sesión
  sessionDismissed.value = !!sessionStorage.getItem('pwa-manual-banner-dismissed');
  
  console.log('🔍 PWAInstallPrompt: Componente montado, escuchando eventos...');
  console.log(`📱 Dispositivo: ${isMobile.value ? 'Mobile' : 'Desktop'} ${isIOS.value ? '(iOS)' : ''}`);
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
  if (isIOS.value) {
    console.log('ℹ️ iOS detectado - El evento beforeinstallprompt no está disponible');
    console.log('💡 Mostrando banner informativo para iOS');
    // Mostrar banner informativo después de 3 segundos en iOS
    setTimeout(() => {
      if (!sessionDismissed.value) {
        showManualBanner.value = true;
        console.log('✅ Banner informativo mostrado para iOS');
      }
    }, 3000);
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
  
  // Mostrar banner informativo después de 8 segundos si beforeinstallprompt no se ha disparado
  // Esto asegura que los usuarios siempre vean cómo instalar la app
  setTimeout(() => {
    if (!deferredPrompt && !showInstallButton.value && !sessionDismissed.value) {
      console.log('💡 Mostrando banner informativo con instrucciones de instalación');
      showManualBanner.value = true;
    }
  }, 8000);
});

onBeforeUnmount(() => {
  window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
});

function handleBeforeInstallPrompt(e: Event) {
  console.log('🎉🎉🎉 beforeinstallprompt event recibido! Chrome está listo para instalar.');
  console.log(`📱 Dispositivo: ${isMobile.value ? 'Mobile' : 'Desktop'}`);
  console.log('✅ Esto significa que el usuario PUEDE instalar con un solo clic!');
  
  // Validar que el evento tenga las propiedades necesarias
  const promptEvent = e as BeforeInstallPromptEvent;
  
  if (!promptEvent.prompt || typeof promptEvent.prompt !== 'function') {
    console.error('❌ ERROR: El evento beforeinstallprompt no tiene el método prompt()');
    return;
  }
  
  // Prevent the default browser install prompt
  e.preventDefault();
  e.stopPropagation();
  
  // Store the event for later use
  deferredPrompt = promptEvent;
  
  // Ocultar banner manual inmediatamente si está visible
  showManualBanner.value = false;
  
  // En mobile, mostrar el banner inmediatamente (sin delay)
  // En desktop, usar un pequeño delay
  const delay = isMobile.value ? 0 : 300;
  
  if (delay > 0) {
    console.log(`⏳ Esperando ${delay}ms antes de mostrar el banner...`);
  }
  
  // Mostrar el banner funcional inmediatamente (o con pequeño delay en desktop)
  setTimeout(() => {
    // Validación estricta: SOLO mostrar si deferredPrompt existe Y tiene el método prompt()
    if (deferredPrompt && typeof deferredPrompt.prompt === 'function') {
      // Show our custom install button - SOLO cuando tenemos el prompt real y válido
      showInstallButton.value = true;
      
      console.log('✅✅✅ Banner de instalación FUNCIONAL mostrado.');
      console.log('✅ deferredPrompt disponible:', !!deferredPrompt);
      console.log('✅ deferredPrompt.prompt disponible:', typeof deferredPrompt.prompt === 'function');
      console.log('✅✅✅ El botón "Instalar ahora" abrirá el diálogo nativo de Chrome cuando hagas clic.');
      console.log('✅✅✅ El usuario puede instalar con UN SOLO CLIC!');
      
      // Log adicional para mobile
      if (isMobile.value) {
        console.log('📱 En mobile, el diálogo de instalación aparecerá como un modal nativo de Android');
        console.log('📱 Después de instalar, la app se abrirá sin barra del navegador - experiencia tipo app nativa');
        console.log('📱📱📱 ESTO ES LO QUE QUEREMOS: Instalación con un solo clic en mobile!');
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

function dismissManualBanner() {
  console.log('❌ Usuario cerró el banner informativo');
  showManualBanner.value = false;
  sessionDismissed.value = true;
  
  // Store dismissal in sessionStorage to not show again for this session
  sessionStorage.setItem('pwa-manual-banner-dismissed', 'true');
}


async function verifyInstallationCriteria() {
  console.log('🔍 Verificando criterios de instalación de la PWA...');
  
  const checks = {
    manifest: false,
    icons: false,
    serviceWorker: false,
    serviceWorkerActive: false,
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
      if (checks.manifest) {
        console.log(`   - Nombre: ${manifest.name}`);
        console.log(`   - Iconos: ${manifest.icons?.length || 0}`);
      }
    } else {
      console.error(`❌ Manifest: Error HTTP ${manifestResponse.status}`);
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
    if (!checks.icons) {
      console.log(`   - icon-192x192.png: ${icon192.ok ? '✅' : '❌'}`);
      console.log(`   - icon-512x512.png: ${icon512.ok ? '✅' : '❌'}`);
    }
  } catch (error) {
    console.error('❌ Error al verificar iconos:', error);
  }
  
  // Verificar Service Worker
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      checks.serviceWorker = !!registration;
      console.log(`✅ Service Worker: ${checks.serviceWorker ? 'Registrado' : 'No registrado'}`);
      
      if (registration) {
        // Verificar si el service worker está activo
        if (registration.active) {
          checks.serviceWorkerActive = true;
          console.log(`   - Estado: Activo (${registration.active.state})`);
          console.log(`   - Scope: ${registration.scope}`);
        } else if (registration.installing) {
          console.log(`   - Estado: Instalándose (${registration.installing.state})`);
        } else if (registration.waiting) {
          console.log(`   - Estado: Esperando (${registration.waiting.state})`);
        } else {
          console.log(`   - Estado: No activo`);
        }
      } else {
        console.log('   - 💡 Intentando registrar Service Worker...');
        // Intentar registrar el service worker si no está registrado
        try {
          const newRegistration = await navigator.serviceWorker.register('/sw.js');
          console.log('   - ✅ Service Worker registrado exitosamente');
          checks.serviceWorker = true;
          if (newRegistration.active) {
            checks.serviceWorkerActive = true;
          }
        } catch (swError) {
          console.error('   - ❌ Error al registrar Service Worker:', swError);
        }
      }
    } catch (error) {
      console.error('❌ Error al verificar Service Worker:', error);
    }
  } else {
    console.warn('⚠️ Service Worker: Navegador no soporta Service Workers');
  }
  
  // Verificar HTTPS
  checks.https = window.location.protocol === 'https:' || window.location.hostname === 'localhost';
  console.log(`✅ HTTPS: ${checks.https ? 'Sí' : 'No'} (${window.location.protocol})`);
  
  // Verificar si ya está instalada
  checks.notInstalled = !window.matchMedia('(display-mode: standalone)').matches;
  console.log(`✅ No instalada: ${checks.notInstalled ? 'Sí' : 'No (ya está instalada)'}`);
  
  // Resumen
  const allChecksPass = Object.values(checks).every(check => check === true);
  console.log(`\n📊 Resumen de verificación: ${allChecksPass ? '✅ Todos los criterios cumplidos' : '⚠️ Algunos criterios no se cumplen'}`);
  
  if (!allChecksPass) {
    console.log('\n❌ PROBLEMAS DETECTADOS:');
    if (!checks.manifest) {
      console.log('   ❌ Manifest incompleto o inválido');
      console.log('   💡 Solución: Verifica que /manifest.json sea accesible');
    }
    if (!checks.icons) {
      console.log('   ❌ Faltan iconos (192x192 o 512x512)');
      console.log('   💡 Solución: Verifica que /icons/icon-192x192.png y /icons/icon-512x512.png existan');
    }
    if (!checks.serviceWorker) {
      console.log('   ❌ Service Worker no registrado');
      console.log('   💡 Solución: Verifica que /sw.js sea accesible y esté registrado');
    }
    if (!checks.serviceWorkerActive) {
      console.log('   ⚠️ Service Worker registrado pero no activo');
      console.log('   💡 Solución: Recarga la página o espera unos segundos');
    }
    if (!checks.https) {
      console.log('   ❌ No está en HTTPS (requerido en producción)');
      console.log('   💡 Solución: La PWA debe estar en HTTPS en producción');
    }
    if (!checks.notInstalled) {
      console.log('   ℹ️ La PWA ya está instalada');
    }
  } else {
    console.log('\n✅ TODOS LOS CRITERIOS SE CUMPLEN');
    console.log('💡 Si Chrome aún no muestra la opción de instalación, puede requerir:');
    console.log('   1. Más tiempo en la página (espera 10-30 segundos)');
    console.log('   2. Más interacción del usuario (haz scroll, toca botones)');
    console.log('   3. Múltiples visitas a la página');
    console.log('   4. Que el usuario no haya rechazado la instalación anteriormente');
    console.log('   5. Recargar la página (Ctrl+R o Cmd+R)');
    console.log('\n💡 En mobile Android, busca el icono de instalación en el menú del navegador (⋮)');
  }
  
  return allChecksPass;
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

.pwa-manual-instructions .pwa-install-content {
  cursor: pointer;
  transition: all 0.3s ease;
}

.pwa-manual-instructions .pwa-install-content:hover {
  background: linear-gradient(135deg, rgba(255, 193, 7, 0.3) 0%, rgba(255, 193, 7, 0.2) 100%);
  border-color: rgba(255, 193, 7, 0.6);
  transform: translateY(-2px);
}

.pwa-manual-instructions .pwa-install-content:active {
  transform: translateY(0);
}

/* Estilos para el modal de instalación */
:deep(.pwa-install-modal-card) {
  background: #000 !important;
  border: 1px solid rgba(0, 187, 114, 0.3);
  border-radius: 16px;
}

.pwa-install-modal-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 187, 114, 0.1);
}

.pwa-install-modal-title span {
  font-size: 18px;
  font-weight: 700;
  color: #00BB72;
}

.pwa-install-modal-close {
  color: rgba(255, 255, 255, 0.6) !important;
}

.pwa-install-modal-content {
  padding: 24px;
  background: #000;
}

.pwa-install-steps {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.pwa-install-step {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.pwa-install-step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  min-width: 32px;
  background: rgba(0, 187, 114, 0.2);
  border: 2px solid #00BB72;
  border-radius: 50%;
  color: #00BB72;
  font-weight: 700;
  font-size: 14px;
}

.pwa-install-step-content {
  flex: 1;
}

.pwa-install-step-title {
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
  color: #E5E5E5;
  line-height: 1.4;
}

.pwa-install-step-description {
  margin: 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
}

.pwa-install-note {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 16px;
  background: rgba(0, 187, 114, 0.1);
  border: 1px solid rgba(0, 187, 114, 0.3);
  border-radius: 8px;
  margin-top: 8px;
}

.pwa-install-note-icon {
  color: #00BB72;
  flex-shrink: 0;
  margin-top: 2px;
}

.pwa-install-note p {
  margin: 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
}

.pwa-install-modal-actions {
  padding: 16px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.5);
}

.pwa-install-modal-btn {
  background: #00BB72 !important;
  color: #000 !important;
  font-weight: 600;
  text-transform: none;
  border-radius: 8px;
  padding: 12px 24px !important;
}

/* Mobile adjustments for modal */
@media (max-width: 768px) {
  :deep(.pwa-install-modal) {
    margin: 0;
  }
  
  :deep(.pwa-install-modal-card) {
    border-radius: 16px 16px 0 0;
    max-height: 90vh;
  }
  
  .pwa-install-modal-title {
    padding: 16px 20px;
  }
  
  .pwa-install-modal-title span {
    font-size: 16px;
  }
  
  .pwa-install-modal-content {
    padding: 20px;
  }
  
  .pwa-install-steps {
    gap: 16px;
  }
  
  .pwa-install-step {
    gap: 12px;
  }
  
  .pwa-install-step-number {
    width: 28px;
    height: 28px;
    min-width: 28px;
    font-size: 12px;
  }
  
  .pwa-install-step-title {
    font-size: 15px;
  }
  
  .pwa-install-step-description {
    font-size: 13px;
  }
  
  .pwa-install-modal-actions {
    padding: 12px 20px;
  }
}
</style>

