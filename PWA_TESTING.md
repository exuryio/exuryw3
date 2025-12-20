# 🧪 Cómo Probar la PWA en Localhost

## 🚀 Método 1: Desarrollo Normal (Vite Dev Server)

### 1. Iniciar el servidor de desarrollo

```bash
npm run dev
```

El servidor se iniciará en `http://localhost:5173`

### 2. Abrir en el navegador

Abre Chrome o Edge y ve a: `http://localhost:5173`

**Nota**: Localhost es una excepción especial - las PWA funcionan en localhost sin HTTPS.

### 3. Verificar el Manifest

1. Abre **DevTools** (F12 o Cmd+Option+I)
2. Ve a la pestaña **Application** (o **Aplicación**)
3. En el menú lateral, busca **Manifest**
4. Deberías ver:
   - ✅ Nombre: "Exury - Intercambio de Criptomonedas"
   - ✅ Iconos: 3 iconos listados
   - ✅ Theme color: #00BB72
   - ✅ Sin errores

### 4. Probar Instalación

#### En Chrome/Edge (Desktop):
1. Busca el icono de **instalación** en la barra de direcciones (icono de "+" o "instalar")
2. O ve a: **Menú (⋮) → Instalar Exury...**
3. Haz clic en "Instalar"
4. La app se abrirá en una ventana sin barra del navegador

#### En Chrome (Android - usando USB Debugging):
1. Conecta tu Android al PC
2. Habilita **Depuración USB** en Android
3. En Chrome Desktop, ve a `chrome://inspect`
4. Abre la URL en tu Android
5. Verás el banner "Agregar a pantalla de inicio"

#### En Safari (iOS - usando Simulador o dispositivo):
1. Abre Safari en iOS
2. Ve a la URL de localhost (necesitas estar en la misma red)
3. Toca el botón **Compartir** (cuadrado con flecha)
4. Selecciona **Agregar a pantalla de inicio**

## 🔍 Verificar que Todo Funciona

### Checklist de Verificación:

- [ ] **Manifest accesible**: `http://localhost:5173/manifest.json` se carga correctamente
- [ ] **Iconos accesibles**: 
  - `http://localhost:5173/icons/icon-192x192.png`
  - `http://localhost:5173/icons/icon-512x512.png`
  - `http://localhost:5173/icons/apple-touch-icon.png`
- [ ] **Sin errores en Console**: Abre DevTools → Console, no debería haber errores relacionados con PWA
- [ ] **Application Tab**: En DevTools → Application → Manifest, todo debería estar en verde

## 🐛 Troubleshooting

### "Manifest no encontrado"
- Verifica que `public/manifest.json` exista
- Verifica que Vite esté sirviendo archivos de `public/`

### "Iconos no encontrados"
- Verifica que los iconos estén en `public/icons/`
- Verifica las rutas en `manifest.json` (deben ser `/icons/...`)

### "No aparece el botón de instalar"
- Asegúrate de usar Chrome, Edge o Safari
- Verifica que no haya errores en el manifest (DevTools → Application → Manifest)
- Intenta cerrar y reabrir el navegador

### "La app instalada no funciona"
- Verifica que `start_url` en manifest sea `/`
- Verifica que no haya errores en la consola
- Intenta desinstalar y reinstalar

## 📱 Probar en Dispositivo Real

### Opción 1: Misma Red WiFi
1. Encuentra tu IP local: `ipconfig` (Windows) o `ifconfig` (Mac/Linux)
2. En tu móvil, conectado a la misma WiFi, ve a: `http://TU_IP:5173`
3. Deberías poder instalar la PWA

### Opción 2: ngrok (Túnel HTTPS)
```bash
# Instalar ngrok
npm install -g ngrok

# En otra terminal, mientras npm run dev está corriendo
ngrok http 5173
```
Esto te dará una URL HTTPS pública que puedes usar en cualquier dispositivo.

## ✅ Pruebas Recomendadas

1. **Instalación**: ¿Se puede instalar correctamente?
2. **Apertura**: ¿Se abre sin barra del navegador?
3. **Iconos**: ¿Se ven los iconos correctos?
4. **Navegación**: ¿La navegación funciona normalmente?
5. **Tema**: ¿El color de la barra de estado es verde (#00BB72)?

## 🎯 Resultado Esperado

Cuando instales la PWA:
- ✅ Se crea un icono en el escritorio/homescreen
- ✅ Al abrir, no hay barra del navegador
- ✅ La barra de estado tiene el color verde (#00BB72)
- ✅ Funciona como una app nativa

