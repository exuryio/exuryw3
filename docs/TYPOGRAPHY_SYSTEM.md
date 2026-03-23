# Sistema de Tipografía Unificado - Exury

## 🎯 Objetivo
Sistema de tipografía consistente en todo el sitio web para mejorar la experiencia de usuario, accesibilidad y mantenibilidad.

## 📐 Escala Tipográfica

### Fuente Principal
```css
font-family: 'Futura', 'Futura PT', 'Avenir', 'system-ui', 'sans-serif'
```
**Clase Tailwind**: `font-exury`

### Escala de Tamaños

| Elemento | Mobile | Tablet (sm:) | Desktop (lg:) | Uso |
|----------|--------|--------------|---------------|-----|
| **Hero H1** | `text-4xl` (36px) | `text-5xl` (48px) | `text-7xl` (72px) | Título principal hero |
| **Sección H2** | `text-2xl` (24px) | `text-3xl` (30px) | `text-4xl` (36px) | Títulos de sección |
| **Subtítulo H3** | `text-base` (16px) | `text-lg` (18px) | - | Subtítulos |
| **Body Principal** | `text-sm` (14px) | `text-base` (16px) | `text-lg` (18px) | Párrafos principales |
| **Body Secundario** | `text-xs` (12px) | `text-sm` (14px) | `text-base` (16px) | Texto secundario |
| **Small/Caption** | `text-xs` (12px) | `text-xs` (12px) | `text-sm` (14px) | Labels, badges |

### Pesos de Fuente

| Peso | Clase | Uso |
|------|-------|-----|
| **Bold** | `font-bold` (700) | Títulos principales, números destacados |
| **Semibold** | `font-semibold` (600) | Subtítulos, elementos importantes |
| **Medium** | `font-medium` (500) | Texto base, elementos interactivos |
| **Regular** | `font-normal` (400) | Texto de cuerpo estándar |
| **Light** | `font-light` (300) | Texto secundario, social proof |

### Line Height (Altura de Línea)

| Tipo | Clase | Valor | Uso |
|------|-------|-------|-----|
| **Tight** | `leading-tight` | 1.1 | Títulos grandes (Hero) |
| **Snug** | `leading-snug` | 1.375 | Títulos medianos |
| **Normal** | `leading-normal` | 1.5 | Texto estándar |
| **Relaxed** | `leading-relaxed` | 1.625 | Párrafos largos (recomendado) |
| **Loose** | `leading-loose` | 2 | Texto espaciado |

### Letter Spacing (Espaciado de Letras)

| Tipo | Clase | Uso |
|------|-------|-----|
| **Tighter** | `tracking-tighter` | Títulos grandes |
| **Tight** | `tracking-tight` | Títulos (recomendado) |
| **Normal** | `tracking-normal` | Texto estándar |
| **Wide** | `tracking-wide` | Labels, badges, uppercase |

## 🎨 Colores de Texto

### Colores Principales
```css
text-exury-offwhite        /* #E5E5E5 - Texto principal */
text-exury-offwhite/90     /* 90% opacidad - Texto importante */
text-exury-offwhite/80     /* 80% opacidad - Texto estándar */
text-exury-offwhite/75     /* 75% opacidad - Texto secundario */
text-exury-offwhite/70     /* 70% opacidad - Texto terciario */
text-exury-offwhite/60     /* 60% opacidad - Labels, hints */
```

### Colores de Acento
```css
text-exury-green           /* #00BB72 - CTAs, elementos destacados */
text-exury-green/90        /* 90% opacidad - Hover states */
```

## 📱 Responsive Breakpoints

```css
/* Mobile First */
Base:        < 640px
sm:          ≥ 640px  (tablets)
lg:          ≥ 1024px (desktop)
```

## 🔤 Ejemplos de Uso

### Hero Title
```html
<h1 class="text-4xl font-bold leading-[1.1] tracking-tight text-exury-offwhite sm:text-5xl sm:leading-[1.1] lg:text-7xl lg:leading-[1.05]">
  Título Principal
</h1>
```

### Section Title
```html
<h2 class="text-2xl tracking-tight text-exury-offwhite sm:text-3xl lg:text-4xl">
  Título de Sección
</h2>
<div class="mt-4 h-px w-20 bg-exury-green/40 sm:mt-5" />
```

### Body Text
```html
<p class="text-sm leading-relaxed text-exury-offwhite/80 sm:text-base">
  Texto de cuerpo estándar con buena legibilidad.
</p>
```

### Small Text / Caption
```html
<p class="text-xs font-medium tracking-wide text-exury-offwhite/60 uppercase sm:text-sm">
  Label o Caption
</p>
```

## ✅ Checklist de Implementación

- [ ] Aplicar `font-exury` al contenedor principal
- [ ] Usar escala tipográfica unificada
- [ ] Aplicar `leading-relaxed` a párrafos
- [ ] Usar `tracking-tight` en títulos
- [ ] Aplicar colores de texto consistentes
- [ ] Verificar responsive en mobile, tablet, desktop
- [ ] Asegurar contraste WCAG AA (4.5:1 mínimo)
- [ ] Probar con `prefers-reduced-motion`

## 🚫 Excepciones

- **HOME**: Mantiene su sistema actual con `clamp()` para preservar diseño específico
- **Componentes Vuetify**: Mantienen sus estilos por defecto, pero se pueden sobrescribir con clases Tailwind

## 📚 Referencias

- [Tailwind Typography](https://tailwindcss.com/docs/font-size)
- [WCAG Typography Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/visual-presentation.html)
- [Material Design Typography](https://material.io/design/typography/the-type-system.html)

