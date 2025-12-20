# 🔧 Fix: Theme Color y Background Color Vacíos en DevTools

## Problema

Chrome DevTools muestra los campos "Theme color" y "Background color" vacíos, aunque el manifest.json los tiene correctamente.

## Solución

### 1. Limpiar Caché del Manifest

1. Abre DevTools (F12)
2. Ve a **Application** → **Storage**
3. Haz clic en **"Clear site data"**
4. O manualmente:
   - **Application** → **Cache Storage** → Elimina todos los caches
   - **Application** → **Service Workers** → Haz clic en "Unregister"

### 2. Recargar el Manifest

1. Cierra y vuelve a abrir el navegador completamente
2. O recarga con `Ctrl+Shift+R` (Windows/Linux) o `Cmd+Shift+R` (Mac)

### 3. Verificar el Manifest

Abre en el navegador: `http://localhost:5173/manifest.json`

Deberías ver:
```json
{
  "theme_color": "#00BB72",
  "background_color": "#000000",
  ...
}
```

### 4. Forzar Actualización del Service Worker

En la consola, ejecuta:
```javascript
navigator.serviceWorker.getRegistrations().then(registrations => {
  registrations.forEach(reg => reg.update());
});
```

### 5. Verificar en Modo Incógnito

Abre una ventana de incógnito y ve a `http://localhost:5173/home`:
- Si funciona en incógnito, es un problema de caché
- Si no funciona, hay un problema con el manifest

## Verificación Final

Después de limpiar el caché, en DevTools → Application → Manifest deberías ver:
- ✅ **Theme color**: #00BB72 (verde)
- ✅ **Background color**: #000000 (negro)

Si aún aparecen vacíos, puede ser un bug de Chrome DevTools. El manifest está correcto y la PWA debería funcionar igual.

