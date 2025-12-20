# Guía de Imágenes para la Sección Company

## 📁 Estructura de Directorios

Las imágenes deben colocarse en: `/public/assets/company/`

## 🖼️ Imágenes Requeridas

### 1. Hero Section
- **`hero-pattern.svg`** (opcional)
  - Patrón decorativo sutil para el fondo del Hero
  - Formato: SVG con fondo transparente
  - Estilo: Abstracto, relacionado con finanzas/tecnología
  - Tamaño recomendado: 800x600px

### 2. Historia (Timeline)
- **`history-2019.svg`**
  - Ilustración para "La visión" (2019)
  - Concepto: Visión, oportunidad, Ethereum
  - Estilo: Minimalista, en tonos verdes/negros
  - Tamaño: 128x128px

- **`history-2019-21.svg`**
  - Ilustración para "La maestría" (2019-2021)
  - Concepto: Aprendizaje, estudio, conocimiento
  - Estilo: Minimalista, en tonos verdes/negros
  - Tamaño: 128x128px

- **`history-2021.svg`**
  - Ilustración para "La innovación" (2021 - THE MACHINE)
  - Concepto: Tecnología, algoritmo, código
  - Estilo: Minimalista, destacado (más visible)
  - Tamaño: 144x144px

- **`history-2021-23.svg`**
  - Ilustración para "La transformación" (2021-2023)
  - Concepto: Viaje, crecimiento, expansión global
  - Estilo: Minimalista, en tonos verdes/negros
  - Tamaño: 128x128px

- **`history-2023.svg`**
  - Ilustración para "La fundación" (2023)
  - Concepto: Fundación, institución, regulación
  - Estilo: Minimalista, destacado (más visible)
  - Tamaño: 144x144px

### 3. Fundadores
- **`founder-rafael-tuta.jpg`**
  - Foto de perfil de Rafael Tuta (CEO, Ingeniero Civil)
  - Formato: JPG o PNG
  - Tamaño: 400x400px (cuadrado)
  - Estilo: Profesional, fondo neutro o transparente
  - Si no está disponible, se mostrará la inicial "R"

- **`founder-yisell-puentes.jpg`**
  - Foto de perfil de Yisell Puentes (CTO, Ingeniera Informática)
  - Formato: JPG o PNG
  - Tamaño: 400x400px (cuadrado)
  - Estilo: Profesional, fondo neutro o transparente
  - Si no está disponible, se mostrará la inicial "Y"

### 4. Estadísticas
- **`stats-pattern.svg`** (opcional)
  - Patrón decorativo sutil para la sección de estadísticas
  - Formato: SVG con fondo transparente
  - Estilo: Abstracto, relacionado con datos/números
  - Tamaño recomendado: 256x256px

### 5. Valores
- **`value-excelencia-regulatoria.svg`**
  - Ilustración para "Excelencia regulatoria"
  - Concepto: Escudo, protección, regulación
  - Tamaño: 96x96px

- **`value-transparencia-absoluta.svg`**
  - Ilustración para "Transparencia absoluta"
  - Concepto: Ojo, claridad, visibilidad
  - Tamaño: 96x96px

- **`value-soberania-del-usuario.svg`**
  - Ilustración para "Soberanía del usuario"
  - Concepto: Llave, control, autonomía
  - Tamaño: 96x96px

- **`value-exito.svg`**
  - Ilustración para "Éxito"
  - Concepto: Trofeo, logro, crecimiento
  - Tamaño: 96x96px

### 6. Cultura
- **`culture-libertad-con-proposito.svg`**
  - Ilustración para "Libertad con propósito"
  - Concepto: Libertad, autonomía, dirección
  - Tamaño: 96x96px

- **`culture-excelencia-como-estandar.svg`**
  - Ilustración para "Excelencia como estándar"
  - Concepto: Estrella, excelencia, calidad
  - Tamaño: 96x96px

- **`culture-sabiduria-consciente.svg`**
  - Ilustración para "Sabiduría consciente"
  - Concepto: Luz, conocimiento, conciencia
  - Tamaño: 96x96px

- **`culture-liderazgo-desde-el-poder.svg`**
  - Ilustración para "Liderazgo desde el poder"
  - Concepto: Rayo, poder, liderazgo
  - Tamaño: 96x96px

### 7. Timeline de Logros
- **`timeline-pattern.svg`** (opcional)
  - Patrón decorativo sutil para la timeline
  - Formato: SVG con fondo transparente
  - Estilo: Abstracto, relacionado con progreso/tiempo
  - Tamaño recomendado: 192x192px

## 🎨 Especificaciones de Diseño

### Colores
- **Primario**: Verde Exury (#00BB72)
- **Fondo**: Negro (#000000) o transparente
- **Acento**: Tonos de verde oscuro (#054629, #02321C)

### Estilo
- **Minimalista**: Líneas limpias, formas simples
- **Consistente**: Mismo estilo visual en todas las ilustraciones
- **Sutil**: Opacidad baja (5-15%) para no competir con el contenido
- **Responsive**: SVG preferible para escalabilidad

### Formato
- **SVG**: Preferido para ilustraciones (escalable, ligero)
- **JPG/PNG**: Solo para fotos de fundadores
- **Optimización**: Comprimir imágenes antes de subir

## 📝 Notas de Implementación

1. **Fallback**: Todas las imágenes tienen `onerror` handlers que ocultan la imagen si no existe
2. **Lazy Loading**: Todas las imágenes usan `loading="lazy"` excepto el Hero
3. **Accesibilidad**: Imágenes decorativas tienen `aria-hidden="true"` y `alt=""`
4. **Performance**: Imágenes se cargan solo cuando son visibles (Intersection Observer)

## ✅ Checklist

- [ ] Crear directorio `/public/assets/company/`
- [ ] Agregar imágenes de historia (5 SVG)
- [ ] Agregar fotos de fundadores (2 JPG/PNG)
- [ ] Agregar ilustraciones de valores (4 SVG)
- [ ] Agregar ilustraciones de cultura (4 SVG)
- [ ] Agregar patrones decorativos (3 SVG opcionales)
- [ ] Optimizar todas las imágenes
- [ ] Verificar que todas las rutas sean correctas

## 🔗 Referencias de Estilo

Las imágenes deben seguir el mismo estilo visual que:
- `/assets/discover-us/` - Ilustraciones minimalistas
- `/assets/how-it-works/` - Estilo limpio y profesional
- `/assets/contact/` - Consistencia visual

