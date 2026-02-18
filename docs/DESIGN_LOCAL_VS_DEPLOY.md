# Por qué el diseño puede cambiar de local a deploy

## Causas habituales

### 1. **Cookiebot solo en producción**
- En **local** y **preview**: Cookiebot no se carga → la app pinta todo desde el inicio.
- En **producción** (exury.io): Cookiebot se carga y puede:
  - Mostrar un banner que empuja el contenido.
  - Bloquear o retrasar scripts hasta aceptar cookies → el layout puede pintarse distinto o más tarde.

**Qué hacer:** Revisar en exury.io si el cambio de diseño coincide con la aparición del banner de cookies. Ajustar estilos del banner o su posición para que no mueva el resto de la página.

---

### 2. **Probar el build igual que en deploy**
En local con `yarn dev` no se minifica ni se aplica el mismo orden de CSS que en producción.

**Qué hacer:** Probar el build de producción en tu máquina:
```bash
yarn build
yarn preview
```
Abre http://localhost:4173 (o el puerto que indique) y revisa si el diseño ya se parece al deploy. Si en `preview` se ve bien y en el servidor no, el problema está en el entorno de deploy (dominio, base URL, etc.).

---

### 3. **Base URL y rutas**
Si el deploy está en un **subpath** (ej. `https://dominio.com/app/`) y en Vite no está configurado `base: '/app/'`, los assets (imágenes, JS, CSS) pueden cargar mal y el diseño romperse.

**Qué hacer:** En `vite.config.mts` define `base` si tu deploy no está en la raíz:
```ts
export default defineConfig({
  base: '/',  // o '/app/' si despliegas en subpath
  // ...
});
```
En Firebase Hosting en la raíz, `base: '/'` (por defecto) suele ser correcto.

---

### 4. **Fuentes (Google Fonts)**
Si las fuentes se cargan con otro timing en producción (o fallan por CORS/red), el texto cambia de tamaño y el layout se desplaza (FOUT).

**Qué hacer:** Comprobar en DevTools → pestaña Network si las fuentes (Roboto, etc.) cargan bien en la URL de deploy. Si no, revisar `unplugin-fonts` o usar `font-display: optional` para reducir el salto.

---

### 5. **Doble layout (v-app anidado)**
Si en la página de orden (o en otras) se usa un layout que incluye otro `v-app` dentro del de `App.vue`, en deploy puede verse **doble sidebar / doble contenido** (sobre todo en preview).

**Qué hacer:** Asegurarse de que solo hay **un** `v-app` en toda la app (en `App.vue`). Los layouts (`default.vue`, `empty.vue`) no deben usar `<v-app>` ni `<v-main>`, sino `<div>` con las mismas clases.

---

### 6. **Variables de entorno**
Si colores, tamaños o URLs dependen de `import.meta.env.VITE_*` y en deploy no están definidas (o son distintas), el diseño puede cambiar.

**Qué hacer:** Revisar que en el proyecto de deploy (Firebase, GitHub Actions, etc.) estén configuradas las mismas variables que usas en local para estilos o assets.

---

## Checklist rápido

- [ ] Ejecutar `yarn build && yarn preview` y comparar con local.
- [ ] Abrir la URL de deploy en una ventana de incógnito (sin extensiones).
- [ ] Comprobar en DevTools (Network) que no haya recursos en rojo (404).
- [ ] Confirmar que solo hay un `v-app` (buscar "v-app" en los layouts).
- [ ] En producción, revisar si Cookiebot o el banner de cookies mueven el contenido.
