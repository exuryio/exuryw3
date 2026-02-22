# Backend y flujo del frontend

## ¿Qué backend usa este frontend?

**Un solo backend** atiende todo lo que hace el frontend:

- Los **precios del simulador** (cotización EUR → crypto)
- El **bloqueo de cotización** (lock quote)
- La **creación de órdenes** (create order)
- La **consulta de una orden** (get order)
- Auth, balances, etc.

No hay un backend distinto para “precios” y otro para “órdenes”. Es el mismo API.

---

## ¿Ese backend ya existe?

**Sí.** Está descrito e implementado en la Fase 1 del proyecto:

- En la **documentación** de este repo se habla de una carpeta `backend/` con:
  - Motor de precios (cotizaciones, TTL)
  - Integración Binance (precios y ejecución)
  - Integración PayDo (SEPA, depósitos/retiros)
  - Órdenes, ledger, usuarios, etc.
- Ese backend **no está en este repositorio** (exuryw3). Según `BACKEND_SEPARATION_GUIDE.md`, se movió a un **repositorio aparte** (por ejemplo `exuryw3-backend`) y se despliega en **Railway**.

En resumen: el backend **ya está construido** (en otro repo) y el frontend está pensado para hablar con él. No falta “crear” un backend nuevo; lo que puede faltar es tenerlo desplegado y accesible (Railway o local).

---

## ¿A qué URL llama el frontend?

En `src/services/api.ts`:

- Si existe **`VITE_API_BASE_URL`** en el `.env` del frontend → se usa esa URL (por ejemplo `http://localhost:3001` para backend local).
- Si no está definida → se usa por defecto:
  - **`https://exury-backend-production.up.railway.app`**  
  (comentario en código: “Backend in separate repository”).

Todas las peticiones (simulador, órdenes, auth, etc.) van a esa base + `/v1/...`.

---

## ¿Cómo saber si el backend respondió o no?

- **Sí respondió:** al hacer clic en “Continuar” te lleva a una URL como **`/order/abc-123-real-id`** (id que devuelve el backend). En la página de la orden, si el backend devuelve IBAN y referencia, verás datos reales.
- **No respondió / falló:** el frontend genera un id temporal **`temp-1234567890`** y te lleva a **`/order/temp-1234567890`**. Los datos de la orden vienen del simulador (guardados en `sessionStorage`); IBAN/referencia aparecen como “—” porque no hubo respuesta del backend.

Para probar con backend local:

1. Arrancar el backend (en su repo) en un puerto, p.ej. `3001`.
2. En este proyecto (exuryw3), crear o editar `.env` y poner:
   ```bash
   VITE_API_BASE_URL=http://localhost:3001
   ```
3. Reiniciar el servidor del frontend (`yarn dev` o `npm run dev`).

Así el simulador y “Continuar” usarán tu backend local; si todo va bien, verás un `order_id` real y no `temp-...`.
