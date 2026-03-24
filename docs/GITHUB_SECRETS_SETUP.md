# Configuración de Secrets en GitHub para Variables de Entorno

Para que el formulario de inversores funcione correctamente en producción, necesitas configurar los **Secrets** en GitHub. Estos secrets se inyectan durante el build y se incluyen en el código final.

## 🔧 Pasos para Configurar los Secrets

### 1. Ir a la configuración de Secrets en GitHub

1. Ve a tu repositorio en GitHub: `https://github.com/exuryio/exuryw3`
2. Haz clic en **Settings** (Configuración)
3. En el menú lateral izquierdo, haz clic en **Secrets and variables** → **Actions**

### 2. Añadir los Secrets necesarios

Haz clic en **New repository secret** y añade los siguientes secrets:

#### Secret 1: `VITE_INVEST_LEADS_EMAIL` (Requerido)

- **Name**: `VITE_INVEST_LEADS_EMAIL`
- **Value**: Tu email donde recibirás las solicitudes de inversión
  - Ejemplo: `direccion@exury.io`

#### Secret 2: `VITE_SCHEDULING_URL` (Opcional)

- **Name**: `VITE_SCHEDULING_URL`
- **Value**: URL de tu servicio de agendamiento
  - Ejemplo: `https://app.cal.eu/exury`
  - O deja vacío para usar `mailto:` (siempre gratis)

### 3. Verificar que los Secrets están configurados

Después de añadir los secrets, deberías ver:
- ✅ `VITE_INVEST_LEADS_EMAIL` (con el icono de ojo para ver/editar)
- ✅ `VITE_SCHEDULING_URL` (si lo configuraste)

## 🚀 Después de Configurar

1. **Haz merge del PR** o **push a develop/main**
2. El workflow de GitHub Actions ejecutará automáticamente el build con las variables de entorno
3. El nuevo deploy incluirá las variables configuradas
4. El formulario de inversores funcionará correctamente

## ✅ Verificación

Después del deploy, puedes verificar que funciona:

1. Ve a la página de inversores: `/inversores`
2. Llena el formulario y envía
3. Deberías recibir el email en la dirección configurada
4. En la consola del navegador NO debería aparecer el warning:
   ```
   [submitLead] VITE_INVEST_LEADS_EMAIL not set
   ```

## 🔍 Troubleshooting

### El formulario muestra éxito pero no llega el email

1. Verifica que `VITE_INVEST_LEADS_EMAIL` está configurado en GitHub Secrets
2. Verifica que el secret tiene el nombre exacto: `VITE_INVEST_LEADS_EMAIL` (con `VITE_` al inicio)
3. Verifica que el email es válido
4. Revisa la carpeta de spam del email
5. Verifica los logs del workflow en GitHub Actions para ver si hay errores

### El botón "Agenda una llamada" no funciona

1. Si configuraste `VITE_SCHEDULING_URL`, verifica que la URL es correcta
2. Si no configuraste `VITE_SCHEDULING_URL`, usará `mailto:` automáticamente (gratis)

## 📝 Notas Importantes

- Los secrets son **sensibles** y no se muestran en los logs de GitHub Actions
- Los secrets solo están disponibles durante el build, no en runtime
- Si cambias un secret, necesitas hacer un nuevo deploy para que se aplique
- Los secrets son específicos del repositorio, no se comparten entre repos

