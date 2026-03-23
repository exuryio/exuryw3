# Deposit Flow – Gap Analysis vs User Flow Diagram

This document compares the **current frontend** with the **deposit user flow diagram** (Usuario ingresa → Simulador → Continuar → Registro Gmail → Wallet → Instrucciones de pago → Transferencia → Estados 1/2/3 → Fondos en wallet).

---

## Flow steps (diagram) vs implementation

| # | Step (diagram) | Status | What exists | What’s missing |
|---|----------------|--------|-------------|-----------------|
| 1 | **Usuario ingresa a la web** | Done | Landing at `/home`, entry via `/` → `/home` | — |
| 2 | **Simulador abierto – usuario juega con montos** | Done | `PriceSimulatorInline` on home and exchange (EUR ↔ crypto, amounts, quote, timer) | — |
| 3 | **Click en Continuar** | Done | “Continuar” in `PriceSimulatorInline` (and `PriceSimulator` dialog) | — |
| 4 | **Registro social con Gmail** | Done | Login/Register with “Continuar con Google” (Auth0 `google-oauth2`), `auth-callback` | — |
| 5 | **Conexión de wallet – WalletConnect o pegar dirección** | Missing | Only “Conectar Wallet” button; handler is `// TODO: Implement wallet connection` | Wallet connection UI: WalletConnect + input to paste wallet address; persist address for the order/deposit |
| 6 | **Instrucciones de pago – IBAN y referencia** | Missing | After “Continuar” (logged in) we only create order and show “¡Orden creada! ID: …” on `/exchange` | Dedicated step/screen with **IBAN**, **referencia**, amount, and copy/instructions so user can do SEPA transfer |
| 7 | **Usuario realiza transferencia bancaria** | N/A | User action; no UI needed | — |
| 8 | **Estado 1: Envío de fondos – Esperando euros** | Missing | No order/deposit status UI | Status view for “waiting for euros” (e.g. pending payment) |
| 9 | **Estado 2: Verificación – Recibido y procesando** | Missing | Same | Status view for “received, processing” |
| 10 | **Estado 3: Fondos en camino – USDC enviados** | Missing | Same | Status view for “USDC sent” |
| 11 | **Fin: Fondos en wallet** | Missing | No confirmation or “done” state | Final confirmation: “Fondos en wallet” / success state |

---

## Current flow vs diagram flow

- **Diagram:** Simulator → Continuar → (Register with Gmail if needed) → **Connect wallet** → **Payment instructions (IBAN + reference)** → User transfers → **Status 1/2/3** → **Funds in wallet**.
- **Current:** Simulator → Continuar → if not logged in → Register/Login (Gmail OK); if logged in → **create order immediately** → show “Orden creada” with order ID on `/exchange`. No wallet step, no payment instructions screen, no status steps, no “funds in wallet” confirmation.

So we have the **top of the funnel** (entry, simulator, continue, social reg) and **order creation**, but we’re missing the **middle and end** of the deposit flow.

---

## What’s already built (summary)

- **Entry:** `/home` (and `/exchange`).
- **Simulator:** `PriceSimulatorInline` – play with amounts, buy/sell toggle, quote, “Continuar” and “Conectar Wallet”.
- **Continue:** Unauthenticated → `/register`; authenticated → lock quote + `createOrder(quote_id)` → success message with `order_id` on `/exchange`.
- **Auth:** Register + Login with email and **Continuar con Google**; `auth-callback`; auth store.
- **API:** `getQuote`, `lockQuote`, `createOrder`, `getOrders`, `getOrder(orderId)`, `getBalances`, `getBalance(asset)`. No frontend use of `getOrder` for deposit/order detail yet.
- **Exchange page:** Shows simulator + success alert with order ID; no payment instructions, no status, no wallet step.

---

## What needs to be built (to match diagram)

1. **Wallet connection (step 5)**  
   - UI: WalletConnect (e.g. WalletConnect SDK or similar) + optional “Pegar dirección” for wallet address.  
   - Save chosen address (and optionally link to user/order) so it can be used for “send USDC to this address” and for showing “Fondos en wallet” when done.

2. **Order/deposit flow after “Continuar”**  
   - Decide exact sequence (e.g. Continuar → if no wallet → connect wallet → then create order, or create order then show “add wallet + payment instructions”).  
   - Ensure order is created only when we have (or can get) wallet + payment details so backend can return IBAN + reference.

3. **Payment instructions screen (step 6)**  
   - New view (e.g. `/order/:id` or `/deposit/:id` or a step on `/exchange`) that shows:  
     - IBAN  
     - Referencia (payment reference)  
     - Amount (EUR)  
     - Short instructions (e.g. “Realiza una transferencia SEPA con esta referencia”)  
   - Data can come from `getOrder(orderId)` once backend returns it, or from the create-order response if it already includes deposit details.

4. **Deposit/order status (steps 8–10)**  
   - Same order/deposit view (or dedicated “status” section) that shows:  
     - **Estado 1:** Envío de fondos – Esperando euros  
     - **Estado 2:** Verificación – Recibido y procesando  
     - **Estado 3:** Fondos en camino – USDC enviados  
   - Status source: `getOrder(orderId)` (or a dedicated status endpoint) with a `status` or `payment_status` field; map backend values to these three labels.

5. **“Fondos en wallet” (step 11)**  
   - Final state in the same view (or a success screen): “Fondos en wallet” / “USDC enviados a tu wallet” and optional link back to exchange or dashboard.

6. **Navigation/routing**  
   - After creating an order, redirect to the **payment instructions** view (e.g. `/order/:orderId`) instead of only showing the success alert on `/exchange`.  
   - Optional: “Mis órdenes” or “Depósito” entry point that lists orders and opens this same order view (using `getOrders`).

7. **Backend contract**  
   - Confirm with backend:  
     - Does `createOrder` (or a follow-up call) return **IBAN + reference** for the deposit?  
     - Does `getOrder(orderId)` return **status** (e.g. pending_payment, processing, completed) and optionally transaction hash or “USDC sent” flag?

---

## One page vs multiple pages

**Each step does not need to be a separate page.**

- **Recommended:** One **order/deposit page** (e.g. `/order/[orderId]`) that shows different content based on order status:
  - Pending payment → **Instrucciones de pago** (IBAN, referencia, importe).
  - Processing → **Estado 2: Recibido y procesando**.
  - USDC sent → **Estado 3: Fondos en camino**.
  - Completed → **Fin: Fondos en wallet**.
- **Wallet connection** can be a **modal or a section** on the same flow (e.g. on exchange or on the order page), or a single dedicated page (e.g. `/connect-wallet`) only if you want it separate.

So: **one new page** can cover payment instructions + all three states + “Fondos en wallet”; wallet can be that page’s first step, a modal, or one extra page.

---

## Suggested implementation order

1. **Backend:** Confirm payload of `createOrder` and `getOrder` (IBAN, reference, status).  
2. **Order/deposit view:** Add **one** route + page (e.g. `/order/[id]`) that loads order by ID and shows payment instructions + status 1/2/3 + “Fondos en wallet” depending on status.  
3. **Wallet connection:** Implement “Conectar Wallet” (WalletConnect + paste address) as modal or section (or one `/connect-wallet` page if preferred); persist address and plug into order flow.  
4. **Flow wiring:** After “Continuar” (and optional wallet step), create order and redirect to `/order/:orderId`.  
5. **Status copy:** Map backend status to the three diagram states + “Fondos en wallet” in that single order view.

This keeps the existing simulator, continue, and Gmail registration as-is and completes the deposit flow to match the diagram.
