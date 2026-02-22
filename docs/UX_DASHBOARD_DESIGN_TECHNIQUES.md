# Técnicas de diseño aplicadas al dashboard

Justificación de las decisiones de UX/UI en la primera pantalla del producto (dashboard).  
Incluye **Material Design 3** para sensación de **ágil, fácil, simple y seguro** (vendiendo confianza).

---

## 1. **Sistema de espaciado (8pt grid)**

- **Qué:** Espaciado basado en múltiplos de 8px (`$space-8`, `$space-16`, `$space-24`, etc.).
- **Por qué:** Consistencia visual y ritmo predecible; alineación más clara entre bloques y menos “números mágicos”.
- **Dónde:** Padding del contenedor, gaps entre secciones, padding del CTA y del bloque de acciones.

---

## 2. **Escala tipográfica y jerarquía visual**

- **Qué:** Saludo más pequeño (14px) y en mayúsculas; título grande (26–36px) y con mayor peso (700); subtítulo con ancho máximo ~32 caracteres.
- **Por qué:** El ojo distingue primero el título y luego el CTA; el subtítulo no compite. Límite de caracteres mejora legibilidad en pantallas anchas.
- **Dónde:** `.dashboard-greeting`, `.dashboard-title`, `.dashboard-subtitle`.

---

## 3. **Un solo CTA dominante (affordance + ley de Fitts)**

- **Qué:** Un único botón principal (“Cambiar euros por cripto”), grande, con `min-height: 56px`, padding generoso y estado hover/focus visible.
- **Por qué:** Affordance: se entiende que es clickeable. Fitts: objetivo grande y fácil de alcanzar (especialmente en móvil).
- **Dónde:** `.hero-cta`, `:focus-visible` con outline para accesibilidad.

---

## 4. **Proximidad y chunking**

- **Qué:** “Siguiente paso” y “Ver mis órdenes” están dentro de un mismo bloque (`.actions-chunk`) con fondo y borde suaves.
- **Por qué:** La proximidad indica que son información relacionada (“qué hacer después”); se perciben como una sola unidad y se reduce la carga cognitiva.
- **Dónde:** `<section class="actions-chunk">` con `.next-step` y `.secondary-link`.

---

## 5. **Reducción del peso visual de elementos secundarios**

- **Qué:** La línea de confianza (Regulado, SEPA rápido, Tú controlas) tiene tipografía más pequeña (12px), color más suave (opacidad ~0.5) y separador más discreto.
- **Por qué:** Que no compita con el CTA ni con “Siguiente paso”; refuerza la jerarquía (acción principal > contexto > garantías).
- **Dónde:** `.dashboard-trust`, `.trust-item`; iconos de 16px en lugar de 18px.

---

## 6. **Reconocimiento frente a recall**

- **Qué:** Icono numérico (“1”) junto al label “Siguiente paso” en el bloque de acciones.
- **Por qué:** Refuerza que es el primer paso sin que el usuario tenga que recordar el flujo; reconocimiento rápido.
- **Dónde:** `.next-step-badge` con `mdi-numeric-1-circle-outline`.

---

## 7. **Accesibilidad (focus visible y semántica)**

- **Qué:** `:focus-visible` en el CTA (outline blanco); `role="group"` y `aria-label` en la zona de confianza; `aria-hidden="true"` en iconos decorativos.
- **Por qué:** Navegación por teclado y lectores de pantalla sin perder el diseño; los iconos no duplican información.
- **Dónde:** `.hero-cta:focus-visible`, `role="group"` en `.dashboard-trust`, `aria-hidden` en iconos del CTA.

---

## 8. **Microinteracciones y feedback**

- **Qué:** Hover en el CTA (ligero `translateY`, cambio de sombra y de tono de verde); hover en el enlace secundario (cambio de color).
- **Por qué:** Confirmación inmediata de que el elemento es interactivo y de que la acción es posible.
- **Dónde:** `.hero-cta:hover`, `.secondary-link:hover`.

---

## 9. Material Design 3 (vendiendo confianza)

- **Superficies tonales:** Contenedor principal con surface-container y bordes 28px; sensación de "hoja" segura.
- **State layer en CTA:** Capa de estado en hover/active; sensación ágil.
- **Chips de confianza:** Primary-container para Regulado, SEPA rápido, Tú controlas.
- **Tipografía:** Saludo en sentence case; título "Cambia euros por cripto en minutos".
- **Formas MD3:** Border radius 20px en botón y cards.

---

## Resumen

| Técnica              | Objetivo principal                          |
|---------------------|--------------------------------------------|
| 8pt grid            | Consistencia y ritmo visual                |
| Escala tipográfica  | Jerarquía clara (título > CTA > resto)     |
| CTA único + Fitts   | Acción obvia y fácil de pulsar             |
| Chunking / proximidad | Agrupar “siguiente paso” y “órdenes”    |
| Peso visual bajo (trust) | No competir con el CTA                |
| Icono “1”           | Reconocimiento del primer paso             |
| Focus + ARIA        | Accesibilidad y usabilidad por teclado      |
| Hover / feedback    | Afirmar que los elementos son interactivos |
