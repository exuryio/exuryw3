# Investigación UX: Primera impresión al entrar al producto (fintech)

## Objetivo
Definir qué debería ver el usuario al entrar por primera vez a un producto financiero centrado en la experiencia del cliente, y cómo manejar el sidebar y la primera pantalla.

---

## Hallazgos de la investigación

### 1. Primera pantalla después del login (fintech)

- **Claridad, confianza y valor inmediato.** La primera vista debe priorizar eso, no abrumar con información (Eleken, Merge Rocks).
- **Un solo foco de atención.** Mostrar la información financiera principal (saldo, estado de la cuenta o última acción) y **una acción principal** (NN/G, IxDF – progressive disclosure).
- **Simplicidad frente a complejidad.** Flujos en pasos claros, carga cognitiva baja. En la primera pantalla solo lo esencial (controles y acciones clave).
- **Señales de confianza.** La interfaz debe transmitir seguridad y transparencia sin fricción; el diseño debe ser coherente con la marca.
- **Personalización.** Ajustar contenido y mensajes al usuario (saludo, siguiente paso sugerido).
- **Datos:** ~89% de usuarios cambiaría de banco por mejor UX (Eleken). Una primera pantalla confusa en un producto con dinero afecta la confianza.

### 2. Onboarding y dashboards en crypto / exchange

- **Menos fricción al inicio.** Permitir explorar y actuar antes de pedir todo (p. ej. KYC completo); reducir pasos en el primer uso.
- **Dashboard con progreso y una acción clara.** Incluir: indicador de progreso (si aplica), tareas pendientes claras, **un botón de acción principal** (depositar, comprar, etc.) (Elsewhen, Subframe).
- **Transparencia.** Comisiones, plazos y pasos visibles para reducir ansiedad.
- **Confirmaciones y feedback.** Confirmaciones en tiempo real y estados claros aumentan la confianza en contextos financieros (DataDrivenInvestor).

### 3. Sidebar y carga cognitiva

- **Límite de 7±2 ítems.** Demasiados ítems en un menú aumentan la carga cognitiva (NN/G, Checkly). Hoy el sidebar tiene muchos enlaces de golpe.
- **Iconos + etiquetas.** Siempre mostrar etiquetas con los iconos; solo iconos genera dudas y clics al azar (Checkly).
- **Agrupar y priorizar.** Agrupar en categorías (Producto, Empresa, Ayuda, etc.) en lugar de una lista plana larga.
- **Progressive disclosure.** Mostrar primero solo lo necesario; el resto en “Más”, “Menú” o secundario (NN/G).

---

## Qué debería ver el usuario al entrar (recomendación)

### Primera pantalla (dashboard)

1. **Saludo breve y personalizado**  
   Ej.: “Hola, [Nombre]” (nombre legible, no el email completo).

2. **Un mensaje de valor en una línea**  
   Ej.: “Todo listo para cambiar euros por cripto” (ya lo tienes).

3. **Una acción principal muy visible**  
   “Cambia euros por cripto” como CTA único y destacado (botón o card principal).

4. **Una acción secundaria accesible pero no competidora**  
   Ej.: “Ver mis órdenes” o “Tu última orden” (si existe), en segundo plano visual.

5. **Señales de confianza mínimas**  
   Ej.: Regulado, SEPA rápido, “Tú controlas” (ya las tienes en la parte inferior).

6. **Sin ruido**  
   Evitar en la primera vista: muchos números, muchas cards, o un menú lateral con demasiados ítems.

### Sidebar en la primera impresión

- **Reducir ítems visibles al entrar.** No mostrar de entrada 9+ enlaces; priorizar:
  - **Inicio** (dashboard).
  - **Comprar / Cambiar** (ir al exchange).
  - **Mis órdenes** (si existe).
  - **Ayuda / Contacto** o **FAQ** (un solo ítem si es posible).
- **Resto en “Más” o “Descubre”:** How it works, Discover, Company, Blog, Inversores, etc., agrupados en un solo ítem expandible o en una sección “Más” para no competir con la acción principal.
- **Objetivo:** Que la primera sensación sea “esto es simple y me lleva a lo que quiero hacer”, no “hay muchas cosas y no sé por dónde empezar”.

---

## Resumen de principios

| Principio | Aplicación |
|----------|------------|
| **Progressive disclosure** | Mostrar en la primera pantalla solo lo necesario; el resto (sidebar completo, opciones avanzadas) se revela después. |
| **Una acción principal** | “Cambia euros por cripto” como único CTA dominante al entrar. |
| **Confianza** | Mantener señales claras (regulado, SEPA, tú controlas) sin saturar. |
| **Sidebar simplificado** | Menos ítems visibles al entrar; agrupar el resto en “Más” o categorías. |
| **Personalización** | Saludo con nombre legible y, si hay datos, “última orden” o siguiente paso sugerido. |

Con esto, la primera sensación al entrar debería ser: **“Estoy en un sitio serio, claro y que me lleva directo a cambiar euros por cripto”**, sin la impresión de “demasiadas cosas en el sidebar”.
