# Configuración de Leads de Inversión

El formulario de inversores envía los datos directamente a tu email usando **FormSubmit** (servicio gratuito, sin backend requerido).

## Configuración

1. **Crea un archivo `.env` en la raíz del proyecto** (si no existe):

```bash
# Email donde recibirás las solicitudes de inversión
VITE_INVEST_LEADS_EMAIL=tu-email@exury.io
```

2. **Reemplaza `tu-email@exury.io` con tu email real** (ej: `direccion@exury.io`)

3. **Reinicia el servidor de desarrollo**:

```bash
npm run dev
```

## Cómo funciona

- **FormSubmit** es un servicio gratuito que envía emails sin necesidad de backend
- Los datos del formulario se envían directamente desde el navegador a tu email
- No se almacenan credenciales ni se requiere servidor propio
- Si no configuras `VITE_INVEST_LEADS_EMAIL`, el formulario seguirá funcionando pero solo mostrará un mensaje de éxito (los datos no se enviarán)

## Límites

FormSubmit es gratuito y no tiene límites estrictos para uso personal/empresarial razonable. Si necesitas más volumen, considera servicios como Formspree (50 envíos/mes gratis) o Getform (100 envíos/mes gratis).

## Configuración de Agendamiento (Opcional)

Por defecto, el botón "Agenda una llamada" abre un email con asunto pre-rellenado (gratis, no requiere servicio).

Si prefieres usar un servicio de agendamiento gratuito, puedes configurar:

```bash
# Opción 1: Cal.com (gratis, open source)
VITE_SCHEDULING_URL=https://cal.com/exury

# Opción 2: zcal (gratis, reservas ilimitadas)
VITE_SCHEDULING_URL=https://zcal.co/exury

# Opción 3: Google Calendar (si usas Google Workspace)
VITE_SCHEDULING_URL=https://calendar.google.com/calendar/appointments/schedules/...

# Si no configuras nada, usará mailto: (siempre gratis)
```

## Producción

En producción (Firebase Hosting, Vercel, etc.), configura las variables de entorno:
- `VITE_INVEST_LEADS_EMAIL` - Email para recibir leads
- `VITE_SCHEDULING_URL` (opcional) - URL de servicio de agendamiento

