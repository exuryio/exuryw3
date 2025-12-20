# Técnicas UX/UI Aplicadas en la Sección Company

## 🎯 Técnicas Implementadas y Justificación

### 1. **Visual Hierarchy (Jerarquía Visual)**
**Técnica**: Uso de tamaño, peso, color y espaciado para guiar la atención del usuario.
**Por qué**: Los usuarios escanean páginas en 2-3 segundos. Necesitamos que identifiquen inmediatamente qué es importante.
**Implementación**:
- Título Hero: `text-6xl` (más grande) con `font-bold`
- Subtítulos de sección: `text-4xl` (medio)
- Texto body: `text-base` (pequeño)
- Uso de `text-exury-green` para elementos clave
- Espaciado vertical progresivo entre secciones

### 2. **F-Pattern Scanning**
**Técnica**: Organizar contenido siguiendo el patrón natural de lectura (F: horizontal superior, vertical izquierda).
**Por qué**: Los usuarios leen en forma de "F": primero horizontalmente en la parte superior, luego verticalmente por la izquierda.
**Implementación**:
- Títulos de sección siempre a la izquierda (`lg:col-span-5`)
- Contenido principal a la derecha (`lg:col-span-7`)
- Información más importante arriba
- Trust badges en la parte superior del Hero

### 3. **Progressive Disclosure (Revelación Progresiva)**
**Técnica**: Mostrar información esencial primero, detalles después.
**Por qué**: Reduce la carga cognitiva. Los usuarios pueden decidir si quieren más información.
**Implementación**:
- Hero muestra lo esencial (qué es, regulación, stats básicas)
- Historia completa en sección dedicada
- Timeline expandible visualmente
- Detalles en hover/interacción

### 4. **Gestalt Principles (Principios de Gestalt)**
**Técnica**: Proximidad, similitud, continuidad, cierre.
**Por qué**: El cerebro agrupa elementos visualmente relacionados automáticamente.
**Implementación**:
- **Proximidad**: Cards agrupadas con `gap-4`
- **Similitud**: Mismo estilo de cards en cada sección
- **Continuidad**: Timeline con línea vertical conectando elementos
- **Cierre**: Bordes redondeados completan formas

### 5. **White Space / Negative Space (Espacio Negativo)**
**Técnica**: Uso estratégico de espacio vacío para separar y dar respiro.
**Por qué**: Mejora legibilidad, reduce fatiga visual, enfoca atención.
**Implementación**:
- Padding vertical generoso: `py-14 lg:py-16`
- Gap entre elementos: `gap-8 lg:gap-10`
- Márgenes laterales: `max-w-7xl` (contenedor centrado)
- Espaciado entre secciones: `mt-12 sm:mt-16`

### 6. **Color Psychology (Psicología del Color)**
**Técnica**: Uso de colores para evocar emociones y transmitir mensajes.
**Por qué**: El verde transmite confianza, crecimiento, seguridad. El negro transmite premium, seriedad.
**Implementación**:
- Verde (`exury-green`) para: CTAs, elementos interactivos, trust signals
- Negro para: fondo premium, seriedad institucional
- Opacidades graduales para jerarquía: `text-exury-offwhite/90` (importante) vs `/60` (secundario)

### 7. **Microinteractions (Microinteracciones)**
**Técnica**: Feedback visual inmediato en interacciones (hover, click, focus).
**Por qué**: Confirma que el sistema responde, mejora percepción de calidad.
**Implementación**:
- Hover: `hover:-translate-y-1`, `hover:scale-110`, `hover:border-exury-green/30`
- Active: `active:scale-[0.98]` (feedback táctil)
- Focus: `focus-visible:ring-2 focus-visible:ring-exury-green` (accesibilidad)
- Transitions: `transition-all duration-300`

### 8. **Card-based Design (Diseño Basado en Tarjetas)**
**Técnica**: Contenido organizado en tarjetas escaneables.
**Por qué**: Facilita escaneo visual, agrupa información relacionada, mejora responsive.
**Implementación**:
- Cards con `rounded-2xl`, `border`, `bg-gradient-to-br`
- Grid system: `grid gap-4 sm:grid-cols-2`
- Cada card es un "chunk" de información

### 9. **Visual Storytelling (Narrativa Visual)**
**Técnica**: Contar la historia a través de elementos visuales y estructura.
**Por qué**: Las historias se recuerdan mejor que datos aislados. Crea conexión emocional.
**Implementación**:
- Timeline visual para historia (2019-2023)
- Progresión visual: Hero → Historia → Stats → Fundadores → Logros
- Gradientes que "fluyen" entre secciones

### 10. **Trust Signals Placement (Ubicación de Señales de Confianza)**
**Técnica**: Colocar elementos que generan confianza en puntos estratégicos.
**Por qué**: Los usuarios buscan validación antes de comprometerse.
**Implementación**:
- Badge "Regulada por el Banco de España" en Hero (arriba, visible)
- Logo Banco de España en sección regulación
- Estadísticas (+1,000 usuarios, +100k transacciones) temprano
- Timeline de logros (licencias, partnerships)

### 11. **Scannable Content (Contenido Escaneable)**
**Técnica**: Estructurar contenido para escaneo rápido (headers, bullets, números).
**Por qué**: Los usuarios no leen, escanean. Necesitan encontrar información rápidamente.
**Implementación**:
- Headers claros: `text-2xl sm:text-3xl lg:text-4xl`
- Bullets con iconos: `h-2 w-2 rounded-full bg-exury-green`
- Números destacados: `text-2xl font-bold sm:text-3xl`
- Líneas divisoras: `border-t border-exury-green/10`

### 12. **Progressive Enhancement (Mejora Progresiva)**
**Técnica**: Base funcional para todos, mejoras para dispositivos/capacidades avanzadas.
**Por qué**: Asegura accesibilidad y funcionalidad universal.
**Implementación**:
- Base: Contenido legible sin JS
- Mejora: Animaciones con Intersection Observer
- Mejora: Hover effects (desktop)
- Fallback: `@media (prefers-reduced-motion: reduce)`

### 13. **8pt Grid System (Sistema de Cuadrícula de 8px)**
**Técnica**: Espaciado basado en múltiplos de 8px para consistencia.
**Por qué**: Crea ritmo visual, facilita alineación, mejora consistencia.
**Implementación**:
- Padding: `p-4` (16px), `p-6` (24px), `p-8` (32px)
- Gap: `gap-4` (16px), `gap-6` (24px), `gap-8` (32px)
- Margin: `mt-4` (16px), `mt-6` (24px), `mt-8` (32px)

### 14. **Contrast Ratio (Ratio de Contraste)**
**Técnica**: Asegurar suficiente contraste entre texto y fondo (WCAG AA: 4.5:1).
**Por qué**: Mejora legibilidad, especialmente para usuarios con discapacidad visual.
**Implementación**:
- Texto principal: `text-exury-offwhite` (#E5E5E5) sobre negro (#000000) = 16.6:1 ✓
- Texto secundario: `text-exury-offwhite/75` sobre negro = ~12.5:1 ✓
- Verde sobre negro: `text-exury-green` (#00BB72) sobre negro = 4.8:1 ✓

### 15. **Affordances (Aportaciones)**
**Técnica**: Elementos que sugieren interactividad (botones parecen clickeables).
**Por qué**: Los usuarios deben poder identificar qué es interactivo sin pensar.
**Implementación**:
- Botones: `rounded-xl`, `bg-exury-green`, `shadow-exury-glow`
- Links: `hover:underline`, cambio de color
- Cards interactivas: `hover:-translate-y-1`, `cursor-pointer`
- Focus states visibles

### 16. **Chunking (Fragmentación)**
**Técnica**: Dividir información en "chunks" manejables.
**Por qué**: La memoria de trabajo tiene límite (7±2 items). Chunks facilitan procesamiento.
**Implementación**:
- Stats: 4 cards (no 10)
- Valores: 4 pilares (no 8)
- Timeline: 5 hitos (no 20)
- Secciones claramente separadas

### 17. **Z-Pattern para CTAs**
**Técnica**: Colocar CTAs siguiendo patrón Z de lectura.
**Por qué**: Los usuarios escanean en Z, especialmente en landing pages.
**Implementación**:
- CTA principal en Hero (esquina superior derecha visual)
- CTA final al final de página (esquina inferior derecha)
- CTAs secundarios distribuidos estratégicamente

### 18. **Depth & Layering (Profundidad y Capas)**
**Técnica**: Usar sombras, gradientes y z-index para crear profundidad.
**Por qué**: Crea jerarquía visual, guía atención, mejora percepción de calidad.
**Implementación**:
- Gradientes de fondo: `bg-gradient-to-br`
- Sombras: `shadow-exury-glow`, `shadow-[0_0_0_1px_...]`
- Z-index: `relative z-10` para contenido sobre gradientes
- Backdrop blur: `backdrop-blur-xl`

### 19. **Responsive Typography (Tipografía Responsiva)**
**Técnica**: Tamaños de fuente que se adaptan al viewport.
**Por qué**: Mejora legibilidad en todos los dispositivos.
**Implementación**:
- `text-4xl sm:text-5xl lg:text-6xl` (Hero)
- `text-2xl sm:text-3xl lg:text-4xl` (Secciones)
- `text-base sm:text-lg lg:text-xl` (Body)

### 20. **Loading States & Skeleton Screens**
**Técnica**: Mostrar estados de carga para mejorar percepción de velocidad.
**Por qué**: Reduce ansiedad del usuario, mejora percepción de rendimiento.
**Implementación**:
- Animaciones de entrada: `opacity: 0` → `opacity: 1`
- Staggered animations: `animation-delay: ${index * 0.1}s`
- Intersection Observer para carga progresiva

---

## 📊 Métricas de Éxito Esperadas

- **Tiempo en página**: > 2 minutos (indica engagement)
- **Scroll depth**: > 75% (usuarios llegan al final)
- **Bounce rate**: < 40% (página genera interés)
- **CTR en CTAs**: > 5% (llamadas a acción efectivas)
- **Conversión**: Usuarios que visitan Company luego se registran

---

## 🎨 Mejoras Específicas Implementadas

1. **Hero Section**:
   - Trust badges arriba (F-pattern)
   - Título más grande y bold (jerarquía)
   - Stats en cards (chunking)
   - Gradientes sutiles (profundidad)

2. **Historia**:
   - Timeline visual (storytelling)
   - Cards por período (chunking)
   - Progresión temporal clara (continuidad Gestalt)

3. **Stats**:
   - Grid 2x2 (chunking)
   - Números grandes y bold (escaneable)
   - Iconos (affordances visuales)

4. **Fundadores**:
   - Cards lado a lado (proximidad)
   - Iniciales grandes (jerarquía)
   - Hover effects (microinteractions)

5. **Timeline**:
   - Línea vertical (continuidad)
   - Dots destacados (affordances)
   - Badges por tipo (similitud)

6. **Valores/Cultura**:
   - Grid system (chunking)
   - Iconos consistentes (similitud)
   - Hover states (microinteractions)

7. **Regulación**:
   - Card destacada (jerarquía)
   - Logo visible (trust signal)
   - Información clara (escaneable)

8. **CTA Final**:
   - Múltiples opciones (progressive disclosure)
   - Stats de confianza (trust signals)
   - Botones destacados (affordances)

