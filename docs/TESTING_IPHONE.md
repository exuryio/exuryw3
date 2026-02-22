# Cómo ver y testear el frontend en iPhone (Safari iOS)

En Android el inspeccionar puede verse bien, pero en iPhone el frontend puede verse distinto porque **Safari usa otro motor (WebKit)** y tiene comportamientos distintos a Chrome. Para que quede bien en ambos, hay que **abrir la app en un iPhone real** y, si tienes Mac, **depurarla con Safari**.

---

## Si solo tienes Mac (sin iPhone físico)

Puedes aproximar bastante bien cómo se ve en iPhone usando **Safari en tu Mac** (mismo motor WebKit que iOS) o el **Simulador de iOS** si tienes Xcode.

### Opción A: Modo responsive de Safari (rápido, sin instalar nada extra)

1. Abre **Safari** en tu Mac (no Chrome: Safari usa el mismo motor que el iPhone).
2. Activa el menú **Desarrollo**: **Safari → Preferencias → Avanzado** → marca **“Mostrar menú Desarrollo”**.
3. Arranca la app: `yarn dev` y abre en Safari `http://localhost:5173`.
4. En Safari: **Desarrollo → Entrar en modo responsive** (o **Develop → Enter Responsive Design Mode**).
5. Arriba verás un selector de dispositivo: elige **iPhone 14 Pro**, **iPhone 15**, etc.
6. Redimensiona o usa el tamaño del preset. Así ves la misma WebKit que en iPhone (viewport, scroll, tipografía).

**Ventaja:** Muy rápido, sin instalar nada. **Limitación:** No es 100% idéntico al iPhone (por ejemplo, safe area del notch se simula de forma básica).

### Opción B: Simulador de iOS (Xcode) — lo más parecido a un iPhone real

Si tienes **Xcode** instalado:

1. Abre **Xcode** → **Xcode → Open Developer Tool → Simulator** (o busca “Simulator” en Spotlight).
2. En el Simulador: **File → Open Simulator** y elige un **iPhone** (ej. iPhone 15).
3. En tu Mac, arranca la app: `yarn dev`.
4. En el **Simulador**, abre **Safari** y en la barra de direcciones escribe: `http://localhost:5173` (desde el Simulador, “localhost” es tu Mac).
5. Navega por la app. Es **Safari para iOS** ejecutándose en el simulador: mismo motor, mismas peculiaridades de viewport y safe area que en un iPhone real.

**Ventaja:** Comportamiento muy fiel al iPhone. **Requisito:** Tener Xcode instalado (desde la App Store, pesa bastante).

---

## 1. Ver la app en el iPhone (con dispositivo físico)

### Requisitos
- Ordenador y iPhone en la **misma red WiFi**.
- Servidor de desarrollo arrancado.

### Pasos

1. En el ordenador, en la raíz del proyecto:
   ```bash
   yarn dev
   ```

2. En la terminal verás algo como:
   ```text
   Local:   http://localhost:5173/
   Network: http://192.168.1.XXX:5173/
   ```

3. En el **iPhone**:
   - Abre **Safari** (es el navegador que usan la mayoría en iOS).
   - Escribe en la barra de direcciones la URL **Network** (ej. `http://192.168.1.100:5173`).
   - Acepta si te avisa de que es una conexión no segura (es tu red local).

4. Navega por la app igual que un usuario. Así ves **exactamente** lo que ve Safari en iPhone (no el emulador de Chrome).

### Si no aparece la línea "Network"
- En `vite.config.mts` está `host: true`, así que la URL de red debería salir.
- Si no: averigua la IP de tu ordenador (Mac: Preferencias del Sistema → Red; Windows: `ipconfig`) y abre desde el iPhone: `http://TU_IP:5173`.

---

## 2. Inspeccionar y depurar en iPhone desde el Mac (Safari Web Inspector)

Así puedes ver estilos, DOM y consola **tal como los ejecuta Safari en el iPhone**, no Chrome.

### En el iPhone
1. **Ajustes → Safari → Avanzado**
2. Activa **“Web Inspector”** (o “Inspector web”).

### En el Mac
1. Conecta el iPhone por **USB**.
2. Si te sale “¿Confiar en este ordenador?” en el iPhone, acepta.
3. **Safari (Mac) → Preferencias → Avanzado**
4. Marca **“Mostrar menú Desarrollo”**.
5. En el iPhone, abre Safari y entra en la URL de tu app (la Network, ej. `http://192.168.x.x:5173`).
6. En el Mac: menú **Desarrollo** → **[Nombre de tu iPhone]** → **[la pestaña de tu app]**.

Se abrirá una ventana de inspección. Ahí puedes:
- Ver y editar **estilos** (panel Estilos).
- Ver **errores y logs** en la consola.
- Ver el **DOM** y qué reglas CSS se aplican en Safari iOS.

Así detectas por qué algo “en Android está bien y en iPhone no”: muchas veces es una regla que Safari aplica distinto o un `100vh` / viewport / safe area.

---

## 3. Probar el build de producción en iPhone

Para testear lo que verán los usuarios (minificado, igual que producción):

```bash
yarn build
yarn preview
```

En la terminal verás una URL **Network** (ej. `http://192.168.x.x:4173`). Ábrela desde el **iPhone en Safari**. Así compruebas que en iPhone todo se ve bien también en modo producción.

---

## 4. Diferencias típicas iPhone (Safari) vs Android (Chrome)

| Tema | En el proyecto | Qué revisar en iPhone |
|------|----------------|----------------------|
| **Viewport / altura** | Se usa `100dvh` y `-webkit-fill-available` además de `100vh`. | Que no quede hueco blanco abajo ni contenido cortado al mostrar/ocultar la barra de URL. |
| **Notch / barra de inicio** | `viewport-fit=cover` en el meta viewport y `env(safe-area-inset-*)` en CSS. | Que el header y los botones inferiores no queden bajo el notch o el indicador de inicio. |
| **Header fijo** | Header teleportado a `body` con `position: fixed` y `z-index` alto. | Que al hacer scroll el header no se tape ni desaparezca. |
| **Scroll** | En móvil el scroll es del `body`. | Que el scroll sea fluido y sin saltos raros. |
| **Inputs / teclado** | — | En Safari, el teclado puede redimensionar el viewport; revisar pantallas con muchos inputs. |

Si algo en iPhone se ve mal, abre **Desarrollo → [iPhone] → [pestaña]** en el Mac y mira en Estilos qué reglas aplican y si hay overflow, height o position que Safari esté interpretando distinto.

---

## 5. Resumen rápido

1. **Ver en iPhone:** `yarn dev` → desde el iPhone (Safari) abre la URL **Network** (ej. `http://192.168.x.x:5173`).
2. **Depurar en iPhone:** iPhone por USB + Web Inspector activado → en Mac: **Desarrollo → [iPhone] → [pestaña]**.
3. **Probar producción en iPhone:** `yarn build && yarn preview` → desde el iPhone abre la URL Network de preview.

Así puedes revisar y testear el frontend específicamente para que en navegadores de iPhone (Safari) se vea bien, no solo en el inspeccionar de Android.
