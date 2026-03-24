# 📦 Guía: Separar Backend en Repositorio Independiente

## Paso 1: Preparar el Backend (Limpiar archivos innecesarios)

### 1.1 Eliminar archivos que no deben estar en el repo:
- `backend/yarn.lock` (backend usa npm, no yarn)
- `backend/dist/` (se genera en build)
- `backend/node_modules/` (se instala con npm install)
- `backend/logs/` (logs locales)

### 1.2 Asegurar que .gitignore esté correcto

## Paso 2: Crear Nuevo Repositorio en GitHub

1. Ve a https://github.com/new
2. Nombre del repositorio: `exuryw3-backend`
3. Descripción: "Exury Backend API - EU Crypto Exchange On/Off-Ramp"
4. **NO marques** "Add a README file" (ya tenemos uno)
5. **NO marques** "Add .gitignore" (ya tenemos uno)
6. Click "Create repository"

## Paso 3: Copiar Backend a Nuevo Repositorio

### 3.1 Crear directorio temporal y copiar backend
```bash
cd ~/Desktop
mkdir exuryw3-backend-temp
cd exuryw3-backend-temp
git init
```

### 3.2 Copiar archivos del backend
```bash
# Copiar todo el contenido de backend/ (excepto node_modules, dist, logs)
cp -r ../exuryw3/backend/* .
# Eliminar archivos que no deben estar en el repo
rm -rf node_modules dist logs yarn.lock
```

### 3.3 Configurar git y hacer commit inicial
```bash
git add .
git commit -m "Initial commit: Backend API separated from monorepo"
git branch -M main
git remote add origin https://github.com/exuryio/exuryw3-backend.git
git push -u origin main
```

## Paso 4: Configurar Railway con Nuevo Repositorio

1. Ve a Railway Dashboard: https://railway.app
2. Click en tu proyecto `exuryw3`
3. Click en el servicio del backend
4. Settings → Source
5. Click "Disconnect" en el repositorio actual
6. Click "Connect Repo"
7. Selecciona `exuryio/exuryw3-backend`
8. **IMPORTANTE**: NO configures Root Directory (ya no es necesario, todo el repo es backend)
9. Railway debería auto-detectar npm y funcionar

## Paso 5: Eliminar Backend del Repositorio Frontend (Opcional)

Si quieres limpiar el repositorio frontend:

```bash
cd ~/Desktop/exuryw3
git rm -r backend/
git commit -m "chore: remove backend - now in separate repository"
git push origin develop
```

## Paso 6: Verificar que Todo Funciona

1. Railway debería desplegar automáticamente desde el nuevo repo
2. Verifica que el backend responde: `https://exuryw3-production.up.railway.app/health`
3. El frontend debería seguir funcionando (ya está configurado para usar Railway URL)

## ✅ Ventajas de Esta Separación

- ✅ Railway no detectará yarn del frontend
- ✅ Despliegues independientes
- ✅ Configuración más simple
- ✅ Menos conflictos
- ✅ Mejor organización

