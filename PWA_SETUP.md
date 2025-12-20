# 📱 PWA Setup Guide - Exury

## 🎯 ¿Qué es esto?

Esta es una **PWA ligera** (Progressive Web App) que permite:
- ✅ Instalación como app en móviles y escritorio
- ✅ Experiencia tipo app nativa (sin barra del navegador)
- ✅ Mejor engagement y percepción de marca
- ✅ **SIN** complejidad de Service Worker (por ahora)

## 🚀 Setup Rápido

### 1. Generar Iconos PWA

Primero, instala la dependencia para generar iconos:

```bash
npm install --save-dev sharp
```

Luego, genera los iconos desde el icono fuente:

```bash
npm run pwa:generate-icons
```

**Opciones de icono fuente:**
- `public/pwa-icon-source.png` (recomendado: 512x512px)
- `public/iconoblack.png` (fallback automático)
- Ruta personalizada: `node scripts/generate-pwa-icons.js /ruta/a/icono.png`

### 2. Verificar que los iconos se generaron

Los iconos deberían estar en `public/icons/`:
- `icon-192x192.png`
- `icon-512x512.png`
- `apple-touch-icon.png` (180x180px para iOS)

### 3. Build y Deploy

El resto ya está configurado:
- ✅ `manifest.json` configurado
- ✅ Meta tags en `index.html`
- ✅ Configuración centralizada en `src/config/pwa.config.ts`

Solo ejecuta el build normal:

```bash
npm run build
```

## 📁 Estructura de Archivos

```
public/
├── manifest.json              # Manifest PWA (ya configurado)
├── icons/                     # Iconos PWA (generados)
│   ├── icon-192x192.png
│   ├── icon-512x512.png
│   └── apple-touch-icon.png
└── pwa-icon-source.png         # Icono fuente (crear este)

src/config/
└── pwa.config.ts              # Configuración centralizada

scripts/
└── generate-pwa-icons.js      # Script de generación
```

## 🔧 Configuración

### Actualizar Configuración PWA

Edita `src/config/pwa.config.ts` para cambiar:
- Nombre de la app
- Colores (theme, background)
- Shortcuts
- Categorías
- Etc.

Luego actualiza `public/manifest.json` manualmente o usa la función `generateManifest()` del config.

## 📱 Cómo Funciona

### Para Usuarios

1. **Visitan exury.io en móvil**
2. **Ven el banner "Agregar a pantalla de inicio"** (Android) o opción en menú (iOS)
3. **Instalan la app**
4. **La app se abre sin barra del navegador** (experiencia tipo app nativa)

### Para Desarrolladores

- **Sin Service Worker**: No hay caché complejo, no hay problemas de actualizaciones
- **Solo Manifest**: Permite instalación sin complejidad
- **Escalable**: Fácil agregar Service Worker en el futuro si se necesita

## 🎨 Personalización

### Cambiar Colores

Edita `src/config/pwa.config.ts`:
```typescript
themeColor: "#00BB72",      // Color de la barra de estado
backgroundColor: "#000000", // Color de fondo al cargar
```

### Agregar Shortcuts

Edita `src/config/pwa.config.ts`:
```typescript
shortcuts: [
  {
    name: "Intercambiar",
    url: "/exchange",
    // ...
  },
  // Agregar más shortcuts aquí
]
```

## 🚨 Troubleshooting

### Los iconos no se generan

1. Verifica que `sharp` esté instalado: `npm install --save-dev sharp`
2. Verifica que el icono fuente exista
3. Revisa los permisos del directorio `public/icons/`

### La app no se puede instalar

1. Verifica que `manifest.json` esté en `public/`
2. Verifica que los iconos estén en `public/icons/`
3. Verifica que el sitio esté servido por HTTPS (requerido para PWA)
4. Abre DevTools → Application → Manifest y revisa errores

### Los iconos no se ven

1. Verifica las rutas en `manifest.json` (deben ser `/icons/...`)
2. Verifica que los archivos existan en `public/icons/`
3. Limpia el caché del navegador

## 🔮 Futuro: Service Worker (Opcional)

Si en el futuro necesitas:
- Notificaciones push
- Funcionalidad offline
- Caché avanzado

Puedes agregar un Service Worker sin romper lo existente. La estructura está preparada para escalar.

## 📚 Recursos

- [MDN: Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Web.dev: PWA](https://web.dev/progressive-web-apps/)
- [Manifest Generator](https://www.simicart.com/manifest-generator.html/)

