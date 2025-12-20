# 📱 Guía para Probar la Versión Mobile

## Opción 1: DevTools del Navegador (Más Rápido) ⚡

### Chrome/Edge:
1. Abre `http://localhost:5173` en Chrome
2. Presiona `F12` o `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)
3. Haz clic en el icono de dispositivo móvil (📱) o presiona `Cmd+Shift+M` / `Ctrl+Shift+M`
4. Selecciona un dispositivo:
   - iPhone 12 Pro / iPhone 13 Pro
   - Samsung Galaxy S20
   - iPad
   - O crea uno personalizado
5. Recarga la página (`Cmd+R` / `Ctrl+R`)

### Firefox:
1. Abre `http://localhost:5173` en Firefox
2. Presiona `F12` o `Cmd+Option+I` / `Ctrl+Shift+I`
3. Haz clic en el icono de dispositivo móvil (📱) o presiona `Cmd+Shift+M` / `Ctrl+Shift+M`
4. Selecciona un dispositivo y recarga

### Ventajas:
- ✅ Instantáneo, no requiere configuración
- ✅ Puedes cambiar de dispositivo fácilmente
- ✅ Herramientas de debugging incluidas
- ✅ Puedes simular diferentes tamaños de pantalla

### Limitaciones:
- ⚠️ No es 100% igual a un dispositivo real
- ⚠️ Algunas características móviles no funcionan (touch gestures, sensores)

---

## Opción 2: Acceso desde tu Teléfono Real (Más Realista) 📲

### Paso 1: Iniciar el servidor de desarrollo

```bash
npm run dev
```

Verás algo como:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.80.194:5173/
```

### Paso 2: Conectar tu teléfono a la misma red WiFi

Asegúrate de que tu Mac y tu teléfono estén en la misma red WiFi.

### Paso 3: Abrir en el teléfono

En el navegador de tu teléfono (Chrome, Safari, etc.), abre:

```
http://192.168.80.194:5173
```

**Nota:** Reemplaza `192.168.80.194` con la IP que muestra Vite en "Network:"

### Ventajas:
- ✅ Experiencia 100% real
- ✅ Puedes probar gestos táctiles reales
- ✅ Puedes probar la instalación PWA real
- ✅ Puedes probar en diferentes navegadores móviles

### Solución de Problemas:

**Si no puedes acceder desde el teléfono:**

1. **Verifica el firewall de Mac:**
   ```bash
   # Verificar si el puerto está bloqueado
   sudo lsof -i :5173
   ```

2. **Permitir conexiones en el firewall:**
   - Ve a: Sistema → Configuración → Red → Firewall
   - Asegúrate de que Vite/Node esté permitido

3. **Verifica la IP:**
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```
   Usa la IP que aparece (generalmente empieza con `192.168.x.x`)

4. **Verifica que estés en la misma red WiFi:**
   - Mac y teléfono deben estar en la misma red
   - No uses datos móviles en el teléfono

---

## Opción 3: Usar ngrok (Acceso desde Cualquier Red) 🌐

Si quieres probar desde cualquier lugar (no solo en la misma red):

### Instalación:
```bash
# Instalar ngrok
brew install ngrok

# O descargar desde: https://ngrok.com/download
```

### Uso:
```bash
# Terminal 1: Iniciar servidor de desarrollo
npm run dev

# Terminal 2: Crear túnel
ngrok http 5173
```

Ngrok te dará una URL pública como:
```
https://abc123.ngrok.io
```

Abre esta URL en tu teléfono desde cualquier lugar.

### Ventajas:
- ✅ Funciona desde cualquier red
- ✅ Puedes compartir con otros para pruebas
- ✅ Útil para pruebas remotas

### Desventajas:
- ⚠️ Requiere cuenta de ngrok (gratis con limitaciones)
- ⚠️ La URL cambia cada vez (a menos que uses cuenta de pago)

---

## Opción 4: Emuladores/Simuladores (Para Desarrollo Avanzado) 💻

### Android Studio (Android):
1. Instala Android Studio
2. Crea un AVD (Android Virtual Device)
3. Inicia el emulador
4. Abre Chrome en el emulador
5. Ve a `http://10.0.2.2:5173` (IP especial para Android emulator)

### Xcode (iOS):
1. Instala Xcode
2. Abre Simulator (Xcode → Open Developer Tool → Simulator)
3. Abre Safari en el simulador
4. Ve a `http://localhost:5173`

---

## 🎯 Recomendación

**Para desarrollo rápido:** Usa **Opción 1** (DevTools)
- Cambia de dispositivo instantáneamente
- Debugging integrado
- Perfecto para ajustes de diseño

**Para pruebas finales:** Usa **Opción 2** (Teléfono real)
- Experiencia 100% real
- Prueba gestos táctiles
- Prueba instalación PWA real
- Prueba en diferentes navegadores móviles

---

## 📝 Notas Importantes

1. **HTTPS en producción:** Las PWAs requieren HTTPS en producción. En desarrollo local, `localhost` funciona sin HTTPS.

2. **Service Worker:** Si cambias el Service Worker, limpia el caché:
   - Chrome: DevTools → Application → Service Workers → Unregister
   - O usa modo incógnito para pruebas limpias

3. **Hot Reload:** Los cambios se reflejan automáticamente en el teléfono cuando usas `npm run dev`

4. **Red local:** Si cambias de red WiFi, la IP cambiará. Vite mostrará la nueva IP cuando reinicies el servidor.

