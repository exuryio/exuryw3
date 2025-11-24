# 🚂 Railway Setup - Backend Deployment

Guía rápida para desplegar el backend en Railway (la opción más barata, rápida y fácil).

## ✅ Ventajas de Railway

- **💰 Muy barato**: 
  - Plan Free: $0/mes (30 días trial con $5 créditos, luego $1/mes)
  - Plan Hobby: $5/mes mínimo (incluye $5 de créditos mensuales)
  - Solo pagas por lo que usas después de los créditos
- **⚡ Rápido**: Despliegue en 2 minutos
- **🎯 Fácil**: Solo conectar GitHub y listo
- **🔄 Auto-deploy**: Se despliega automáticamente en cada push
- **🗄️ PostgreSQL**: Base de datos incluida
- **📊 Precios por uso**: 
  - Memory: $0.00000386/GB-seg
  - CPU: $0.00000772/vCPU-seg
  - Egress: $0.05/GB

## 🚀 Pasos para desplegar

### 1. Crear cuenta en Railway

1. Ve a [railway.app](https://railway.app)
2. Haz clic en "Start a New Project"
3. Conecta con GitHub
4. Autoriza el acceso a tu repositorio

### 2. Crear nuevo proyecto

1. En Railway Dashboard, haz clic en "New Project"
2. Selecciona "Deploy from GitHub repo"
3. Elige el repositorio `exuryw3`
4. Railway detectará automáticamente que es un proyecto Node.js

### 3. Configurar el servicio

Railway intentará detectar automáticamente, pero necesitas configurar:

1. **Root Directory**: Cambia a `backend` (Railway debe ejecutar desde la carpeta backend)
2. **Build Command**: `npm install && npm run build`
3. **Start Command**: `npm start`

### 4. Agregar PostgreSQL (Base de datos)

1. En el proyecto de Railway, haz clic en "New"
2. Selecciona "Database" → "Add PostgreSQL"
3. Railway creará automáticamente una base de datos
4. Copia la variable `DATABASE_URL` que Railway genera

### 5. Configurar variables de entorno

En Railway Dashboard → Tu servicio → Variables:

Agrega todas las variables de tu `backend/.env`:

**Base de datos:**
- `DATABASE_URL` - (Railway lo genera automáticamente, úsalo)
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` - (Opcional si usas DATABASE_URL)

**Auth0:**
- `AUTH0_DOMAIN=exury.eu.auth0.com`
- `AUTH0_CLIENT_ID=tu_client_id`
- `AUTH0_CLIENT_SECRET=tu_client_secret`
- `AUTH0_REDIRECT_URI=https://exury.io/auth-callback`
- `FRONTEND_URL=https://exury.io`

**JWT:**
- `JWT_SECRET=tu_secret_aleatorio`

**Email (SendGrid):**
- `SMTP_HOST=smtp.sendgrid.net`
- `SMTP_PORT=587`
- `SMTP_SECURE=false`
- `SMTP_USER=apikey`
- `SMTP_PASSWORD=tu_sendgrid_api_key`
- `SMTP_FROM=noreply@exury.io`

**Binance (opcional - usa mocks si no tienes):**
- `BINANCE_API_KEY=tu_key`
- `BINANCE_API_SECRET=tu_secret`

**PayDo (opcional - usa mocks si no tienes):**
- `PAYDO_API_KEY=tu_key`
- `PAYDO_API_SECRET=tu_secret`

**Otros:**
- `PORT=3001` (Railway lo asigna automáticamente, pero puedes fijarlo)
- `NODE_ENV=production`
- `API_VERSION=v1`

### 6. Obtener la URL del backend

1. En Railway Dashboard → Tu servicio
2. Ve a la pestaña "Settings" → "Networking"
3. Copia la "Public Domain" (algo como `exuryw3-production.up.railway.app`)
4. La URL completa será: `https://exuryw3-production.up.railway.app`
5. **Temporalmente**: Usa esta URL mientras configuras el subdominio personalizado
6. **Después**: Cuando `api.exury.io` esté listo, actualiza las variables de entorno

### 7. Actualizar el frontend

Agrega la variable de entorno en Firebase Hosting:

1. Ve a Firebase Console → Hosting → Configuración
2. Agrega variable de entorno:
   - Nombre: `VITE_RAILWAY_API_URL`
   - Valor: `https://tu-proyecto.up.railway.app`

O actualiza el código para usar la URL directamente (ya está configurado para detectarla).

### 8. Ejecutar migraciones de base de datos

Una vez desplegado, ejecuta las migraciones:

```bash
# Opción 1: Desde Railway Dashboard
# Ve a tu servicio → "Deployments" → "View Logs"
# Ejecuta manualmente las migraciones si es necesario

# Opción 2: Desde tu máquina local
# Conecta a la base de datos de Railway y ejecuta:
psql $DATABASE_URL < backend/migrations/001_initial_schema.sql
psql $DATABASE_URL < backend/migrations/002_add_email_verification.sql
psql $DATABASE_URL < backend/migrations/003_add_apple_facebook_ids.sql
```

## 🎉 ¡Listo!

Tu backend estará disponible en `https://tu-proyecto.up.railway.app`

El frontend detectará automáticamente esta URL cuando esté desplegado en Firebase.

## 📊 Monitoreo

- **Logs**: Railway Dashboard → Tu servicio → "Deployments" → "View Logs"
- **Métricas**: Railway Dashboard → Tu servicio → "Metrics"
- **Base de datos**: Railway Dashboard → PostgreSQL → "Data" (para ver/editar datos)

## 💡 Tips

- Railway hace auto-deploy en cada push a la branch principal
- Puedes configurar diferentes entornos (staging, production)
- Los logs se actualizan en tiempo real
- Puedes hacer rollback fácilmente desde el dashboard

