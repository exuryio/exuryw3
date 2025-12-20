# 🔧 Troubleshooting: Botón de Instalación PWA

## ✅ Estado Actual

- ✅ Service Worker registrado correctamente
- ✅ Manifest válido
- ✅ Iconos generados
- ✅ Sin errores críticos del Service Worker

## 🔍 Verificar Requisitos para Instalación

### 1. Verifica que el Manifest sea válido

En DevTools → Application → Manifest:
- ✅ Debe mostrar "No errors"
- ⚠️ Warnings sobre screenshots son normales (no críticos)

### 2. Verifica que el Service Worker esté activo

En DevTools → Application → Service Workers:
- Status: debe decir "activated and is running"
- Scope: `http://localhost:5173/`

### 3. Verifica los Iconos

En DevTools → Application → Manifest → Icons:
- Debe mostrar 5 iconos:
  - icon-192x192.png (any)
  - icon-512x512.png (any)
  - icon-192x192.png (maskable)
  - icon-512x512.png (maskable)
  - apple-touch-icon.png (any)

### 4. ¿Dónde buscar el botón de instalación?

#### En Chrome Desktop:
1. **Barra de direcciones**: Busca un icono de "+" o "instalar" a la derecha de la URL
2. **Menú (⋮)**: Menú → "Instalar Exury..." o "Install Exury..."
3. **Banner automático**: A veces aparece un banner en la parte superior

#### En Chrome Mobile:
- Banner automático: "Agregar a pantalla de inicio"
- Menú: Menú (⋮) → "Instalar app" o "Add to Home screen"

### 5. Si NO aparece el botón

#### Opción A: Forzar instalación desde DevTools
1. Abre DevTools → Application → Manifest
2. Haz clic en el link "manifest.json"
3. En la parte superior, busca "Add to homescreen" o "Install"
4. O usa el comando en Console:

```javascript
// Forzar el prompt de instalación (si está disponible)
window.addEventListener('beforeinstallprompt', (e) => {
  e.prompt();
});
```

#### Opción B: Verificar criterios de instalación

Chrome requiere que se cumplan TODOS estos criterios:
- ✅ Manifest válido
- ✅ Service Worker activo
- ✅ HTTPS o localhost (✅ localhost funciona)
- ✅ Al menos un icono de 192x192
- ✅ Al menos un icono de 512x512
- ✅ `display: "standalone"` o `"fullscreen"` (✅ tenemos standalone)
- ✅ `start_url` válido (✅ tenemos `/`)

#### Opción C: Verificar en Console

Ejecuta esto en la consola:

```javascript
// Verificar si el navegador puede instalar PWAs
if ('serviceWorker' in navigator) {
  console.log('✅ Service Worker soportado');
} else {
  console.log('❌ Service Worker NO soportado');
}

// Verificar manifest
fetch('/manifest.json')
  .then(r => r.json())
  .then(m => console.log('✅ Manifest válido:', m))
  .catch(e => console.error('❌ Error en manifest:', e));

// Verificar iconos
['/icons/icon-192x192.png', '/icons/icon-512x512.png'].forEach(url => {
  fetch(url)
    .then(r => r.ok ? console.log(`✅ ${url} accesible`) : console.error(`❌ ${url} no accesible`))
    .catch(e => console.error(`❌ Error con ${url}:`, e));
});
```

### 6. Soluciones Comunes

#### Problema: El botón no aparece después de recargar
**Solución**: 
- Espera 5-10 segundos (Chrome necesita tiempo para evaluar)
- Cierra y vuelve a abrir el navegador completamente
- Prueba en modo incógnito

#### Problema: "Esta app ya está instalada"
**Solución**:
- Ve a `chrome://apps` y desinstala si existe
- O ve a DevTools → Application → Service Workers → Unregister

#### Problema: El manifest tiene errores
**Solución**:
- Revisa DevTools → Application → Manifest
- Corrige cualquier error mostrado
- Recarga la página

### 7. Alternativa: Instalación Manual (iOS)

En iOS Safari:
1. Abre la página
2. Toca el botón "Compartir" (cuadrado con flecha)
3. Selecciona "Agregar a pantalla de inicio"
4. Personaliza el nombre si quieres
5. Toca "Agregar"

## 🎯 Próximos Pasos

1. Ejecuta los comandos de verificación en la consola
2. Espera unos segundos después de recargar
3. Busca el botón en la barra de direcciones o menú
4. Si aún no aparece, prueba en modo incógnito

