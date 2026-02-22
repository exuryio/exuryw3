# UX – Estado del depósito: técnicas y justificación

## ¿Scroll para ver todos los pasos o mostrar solo el paso actual?

**Recomendación: mostrar todos los pasos y permitir scroll (con foco en el paso actual).**

### Por qué no mostrar solo un paso cada vez (revelado incremental)

- En este flujo los pasos **no los completa el usuario** con un clic; los actualiza el **sistema** (backend) cuando recibe la transferencia, verifica, envía USDC, etc.
- Si solo mostráramos “el paso actual”, el usuario no vería el recorrido completo y podría preguntarse: “¿cuántos pasos quedan?”, “¿qué viene después?”.
- Eso aumenta la **incertidumbre** y la sensación de falta de control, algo que en UX suele empeorar la experiencia en procesos de espera (pagos, envíos).

### Por qué sí mostrar todos los pasos (timeline visible)

- **Visibilidad del estado del sistema (Nielsen):** el usuario debe poder entender en qué estado está el proceso sin tener que adivinar. Una timeline con todos los pasos (Envío → Verificación → Fondos en camino → Fondos en wallet) cumple ese principio.
- **Reducción de la incertidumbre:** ver el camino completo y el paso actual reduce ansiedad y preguntas del tipo “¿y ahora qué?”.
- **Modelo mental de “seguimiento de pedido”:** es el mismo patrón que usan webs de envíos o banca (tracking de transferencias): todos los estados visibles, uno resaltado como actual.
- **Scroll + foco en el paso actual:** se mantiene la timeline completa y se mejora la experiencia con:
  - **Scroll suave al paso actual** al cargar la página y al cambiar de estado.
  - Botón **“Ver paso actual”** para volver al paso relevante si el usuario ha scrolleado.

Así se combina “ver todo el proceso” (claridad) con “no tener que buscar a mano dónde estoy” (scroll automático y botón).

---

## Técnicas UX aplicadas y justificación

### 1. **Jerarquía visual clara (paso actual vs completado vs pendiente)**

- **Paso actual (active):** fondo verde suave, borde verde, círculo más grande con glow. Badge “Actual”.
- **Completados (done):** check en el círculo, opacidad algo menor, badge “Completado”.
- **Pendientes (pending):** opacidad más baja (~0.45), texto más suave.

**Por qué:** El ojo debe ir primero al paso que importa “ahora”. Un único paso claramente destacado (color, contraste, tamaño) reduce la carga cognitiva y evita que todo compita por la atención (ley de Prägnanz / figura-fondo).

### 2. **Etiquetas de estado (“Actual”, “Completado”)**

- Texto explícito además del color y el icono.

**Por qué:** Refuerza la accesibilidad y la comprensión: no todo el mundo interpreta igual solo el color o el check. Etiquetas cortas y claras mejoran la legibilidad y la confianza (principio de “visibility of system status”).

### 3. **Scroll suave al paso actual**

- Al cargar la página: tras pintar la orden, se hace scroll suave para dejar el paso actual en zona central.
- Al cambiar el estado (p. ej. tras actualizar datos): se vuelve a hacer scroll al nuevo paso actual.
- Botón **“Ver paso actual”**: lleva de nuevo al paso actual si el usuario ha bajado o subido por la página.

**Por qué:** El usuario no tiene que buscar “dónde estoy” en una página larga. Se prioriza el contenido relevante sin esconder el resto (evitamos revelado incremental completo pero damos el beneficio de “ir al paso actual” cuando hace falta).

### 4. **Timeline completa siempre visible (no colapsar pasos futuros)**

- Los cuatro pasos se muestran siempre; solo cambia el estilo (active / done / pending).

**Por qué:** Coherencia con el patrón de “order tracking” y con el principio de visibilidad del estado del sistema. Ver el camino completo reduce la sensación de “caja negra” y genera expectativas correctas (“después de Verificación vendrá Fondos en camino”).

### 5. **Transiciones suaves**

- `transition` en fondo, opacidad y sombra del paso actual.

**Por qué:** Cuando el estado cambia (p. ej. de “Envío de fondos” a “Verificación”), el cambio visual es progresivo y no brusco, lo que hace el cambio más comprensible y menos intrusivo.

### 6. **Botón “Ver paso actual”**

- Acción explícita para llevar la vista al paso actual.

**Por qué:** Da control al usuario (puede “volver” al paso actual después de leer instrucciones o el resumen) sin depender solo del scroll automático. Refuerza la idea de que hay un “paso actual” definido.

### 7. **Caja instructiva encima del estado**

- Texto que explica que el estado se actualiza solo al recibir el pago y que no hace falta pulsar nada.

**Por qué:** Establece expectativas correctas (no hay botón “Siguiente”) y reduce errores de uso y soporte (“¿por qué no avanza?”). Es información preventiva en el momento adecuado.

---

## Resumen

| Decisión | Justificación |
|----------|----------------|
| Mostrar todos los pasos con scroll | Visibilidad del estado del sistema; reducir incertidumbre; patrón conocido de tracking. |
| No revelado incremental estricto | Los pasos los mueve el sistema, no el usuario; el usuario se beneficia de ver el camino completo. |
| Scroll al paso actual + botón | Mejorar el foco sin ocultar información; usuario no tiene que buscar dónde está. |
| Paso actual muy destacado | Jerarquía visual y reducción de carga cognitiva. |
| Etiquetas “Actual” / “Completado” | Claridad y accesibilidad además del color/icono. |
