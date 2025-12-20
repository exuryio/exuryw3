# 📱 Guía de Instalación de PWA

## 🔍 Verificar que Todo Esté Correcto

### 1. Verifica en DevTools → Application → Manifest

Deberías ver:
- ✅ **Name**: "Exury - Intercambio de Criptomonedas"
- ✅ **Short name**: "Exury"
- ✅ **Icons**: 5 iconos listados (sin errores)
- ✅ **Theme color**: #00BB72
- ✅ **Start URL**: /
- ⚠️ Puede haber warnings sobre screenshots (no crítico)

### 2. Verifica que los Iconos Estén Accesibles

Abre estas URLs en el navegador:
- `http://localhost:5173/icons/icon-192x192.png` → Debe mostrar la imagen
- `http://localhost:5173/icons/icon-512x512.png` → Debe mostrar la imagen
- `http://localhost:5173/manifest.json` → Debe mostrar el JSON

## 🚀 Cómo Instalar la PWA

### Método 1: Botón en la Barra de Direcciones (Chrome/Edge)

1. **Espera unos segundos** después de cargar la página
2. Busca el icono de **instalación** en la barra de direcciones:
   - Icono de **"+"** o **"instalar"** a la derecha de la URL
   - O un icono de **"descargar"**
3. Haz clic en el icono
4. Se abrirá un diálogo → Haz clic en **"Instalar"**

### Método 2: Menú del Navegador (Chrome/Edge)

1. Haz clic en el **menú** (⋮) en la esquina superior derecha
2. Busca la opción **"Instalar Exury..."** o **"Instalar aplicación"**
3. Haz clic en ella
4. Confirma la instalación

### Método 3: Forzar Instalación desde DevTools

Si no aparece el botón, puedes forzar la instalación:

1. Abre **DevTools** (F12)
2. Ve a **Application** → **Manifest**
3. Haz clic en el botón **"Add to homescreen"** o **"Install"** (si está disponible)
4. O usa la consola: `window.addEventListener('beforeinstallprompt', (e) => { e.prompt(); });`

### Método 4: Desde la Consola (Forzar)

Abre la consola (F12 → Console) y ejecuta:

```javascript
// Esto forzará el prompt de instalación si está disponible
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('✅ Usuario aceptó la instalación');
    } else {
      console.log('❌ Usuario rechazó la instalación');
    }
    deferredPrompt = null;
  });
});
```

## ⚠️ Por Qué Puede No Aparecer el Botón

### Razones Comunes:

1. **Ya está instalada**: Si ya instalaste la PWA antes, no aparecerá el botón
   - **Solución**: Desinstala primero (Chrome → Configuración → Aplicaciones → Exury → Desinstalar)

2. **Chrome no detecta que es instalable**: 
   - **Solución**: Recarga la página (Ctrl+R o Cmd+R)
   - Espera 5-10 segundos después de cargar

3. **Faltan requisitos mínimos**:
   - ✅ Manifest válido (ya lo tienes)
   - ✅ Iconos accesibles (verifica arriba)
   - ✅ HTTPS o localhost (localhost funciona)
   - ✅ Service Worker (opcional, pero ayuda)

4. **Cache del navegador**:
   - **Solución**: Limpia el cache (Ctrl+Shift+Delete) o usa modo incógnito

## 🔧 Solución Rápida: Agregar Service Worker Mínimo

Chrome a veces requiere un Service Worker para mostrar el botón de instalación. Vamos a agregar uno mínimo:

### Crear Service Worker

Crea `public/sw.js`:

```javascript
// Service Worker mínimo para PWA
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
```

### Registrar en index.html

Agrega antes de `</body>`:

```html
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(() => console.log('✅ Service Worker registrado'))
      .catch(err => console.log('❌ Error:', err));
  }
</script>
```

## ✅ Verificación Final

Después de hacer los cambios:

1. **Recarga la página** (Ctrl+R)
2. **Espera 5-10 segundos**
3. **Busca el icono de instalación** en la barra de direcciones
4. Si aún no aparece, usa el **Método 4** (consola) para forzar

## 📱 Probar en Móvil

Para probar en un dispositivo móvil real:

1. **Misma red WiFi**: Conecta tu móvil a la misma WiFi que tu PC
2. **Encuentra tu IP**: 
   - Windows: `ipconfig` → busca "IPv4"
   - Mac/Linux: `ifconfig` → busca "inet"
3. **En tu móvil**: Abre `http://TU_IP:5173`
4. **Instala**: Verás el banner "Agregar a pantalla de inicio"

