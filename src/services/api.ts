/**
 * API Service for Frontend
 * Handles all API calls to the backend
 */
// Determine API base URL based on environment
const getApiBaseUrl = (): string => {
  const explicit = import.meta.env.VITE_API_BASE_URL?.trim();

  // URL absoluta explícita (Railway, backend en otro host, etc.)
  if (explicit) {
    return explicit.replace(/\/$/, "");
  }

  // Dev local: peticiones a /v1 (mismo origen) → proxy Vite → localhost:3001
  if (import.meta.env.DEV) {
    return "";
  }

  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;

    if (hostname.includes("exurydev") || hostname.includes("exury.io")) {
      return (
        import.meta.env.VITE_RAILWAY_API_URL ||
        "https://exury-backend-production.up.railway.app"
      );
    }
  }

  return "https://exury-backend-production.up.railway.app";
};

const API_BASE_URL = getApiBaseUrl();
const API_VERSION = 'v1';

// Log the API base URL for debugging
if (typeof window !== 'undefined') {
  console.log('🌐 API Configuration:', {
    hostname: window.location.hostname,
    apiBaseUrl: API_BASE_URL,
    apiVersion: API_VERSION,
    fullApiUrl: `${API_BASE_URL}/${API_VERSION}`
  });
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL
      ? `${API_BASE_URL}/${API_VERSION}`
      : `/${API_VERSION}`;
    console.log('📡 ApiService initialized with baseUrl:', this.baseUrl);
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    // Get auth token from localStorage (only in browser)
    const token = typeof window !== 'undefined' ? localStorage.getItem('exury_token') : null;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }));
        const errorMessage = error.error || error.message || `HTTP ${response.status}`;
        console.error(`❌ API request failed: ${url}`, {
          status: response.status,
          error: errorMessage,
          fullError: error
        });
        const apiError = new Error(errorMessage);
        (apiError as any).response = {
          status: response.status,
          error: errorMessage,
          data: error
        };
        (apiError as any).status = response.status;
        throw apiError;
      }

      const data = await response.json();
      console.log(`✅ API request successful: ${url}`, data);
      return data;
    } catch (error: any) {
      console.error('❌ API request failed:', url, error);
      throw error;
    }
  }

  /**
   * Get a quote for EUR → Crypto conversion
   */
  async getQuote(base: string, asset: string, amount: number, cacheBuster?: number) {
    const params = new URLSearchParams({
      base,
      asset,
      amount: amount.toString(),
    });
    
    // Add cache buster to ensure fresh quote
    if (cacheBuster) {
      params.append('_t', cacheBuster.toString());
    }
    
    return this.request(`/quotes?${params}`);
  }

  /**
   * Lock a quote
   */
  async lockQuote(quoteId: string) {
    return this.request(`/quotes/${quoteId}/lock`, {
      method: 'POST',
    });
  }

  /**
   * Create a new order.
   * `extras` permite pasar iban (sell) o wallet (buy) para que el backend los persista
   * y los relacione con la orden vía bank_account_id / user_wallet_id.
   */
  async createOrder(
    quoteId: string,
    type: 'buy' | 'sell' = 'buy',
    amounts?: { amount_eur?: number; amount_crypto?: number },
    extras?: {
      iban?: string;
      bank_account_id?: string;
      user_wallet_id?: string;
      wallet_address?: string;
      wallet_network?: string;
    }
  ) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify({ quote_id: quoteId, type, ...amounts, ...extras }),
    });
  }

  // Dispara la retirada SEPA para una sell order tras el depósito crypto.
  // El IBAN viaja aquí en claro: el backend lo usa para PayDo y lo persiste
  // en orders.iban (si no estaba) + upsert del hash en bank_accounts.
  async initiateSellPayout(orderId: string, iban: string) {
    return this.request<{
      payment_id: string;
      withdrawal_transaction_id: string;
      crypto_transaction_id: string;
      binance_order_id: string;
    }>(`/orders/${orderId}/sell/payout`, {
      method: 'POST',
      body: JSON.stringify({ iban }),
    });
  }

  // --- Bank accounts (sell flow) -----------------------------------------
  // El backend sólo guarda hash(IBAN) + bank_name ligados al user_id autenticado.
  // El IBAN en claro NO se almacena en bank_accounts; vive "per order" en orders.iban.
  // Por eso getBankAccounts NUNCA devuelve el IBAN: sólo id, bank_name y created_at.

  // Lista cuentas verificadas del usuario. Útil para mostrar "tienes N cuentas guardadas".
  async getBankAccounts() {
    return this.request<{ accounts: Array<{ id: string; bank_name: string | null; created_at: string }> }>(
      '/users/me/bank-accounts'
    );
  }

  // Verifica y registra el IBAN del usuario. El backend calcula SHA256 y hace upsert
  // por (user_id, iban_hash); si la cuenta ya existía, sólo actualiza bank_name.
  async saveBankAccount(iban: string, bankName?: string) {
    return this.request<{ id: string; bank_name: string | null; created_at: string }>(
      '/users/me/bank-accounts',
      {
        method: 'POST',
        body: JSON.stringify({ iban, bank_name: bankName || null }),
      }
    );
  }

  async deleteBankAccount(id: string) {
    return this.request<void>(`/users/me/bank-accounts/${id}`, { method: 'DELETE' });
  }

  // --- User wallets (buy flow) -------------------------------------------
  // A diferencia del IBAN, la address on-chain es pública: se guarda en claro para
  // poder ejecutar la transferencia al usuario cuando compra. Clave única por
  // (user_id, address, network): el mismo 0x… en la misma red es una sola wallet,
  // aunque reciba varios tokens (USDC, ETH, USDT…) — el asset lo lleva la orden.

  async getUserWallets() {
    return this.request<{ wallets: Array<{ id: string; address: string; network: string; name: string | null; created_at: string }> }>(
      '/users/me/wallets'
    );
  }

  async saveUserWallet(address: string, network: string, name?: string) {
    return this.request<{ id: string; address: string; network: string; name: string | null; created_at: string }>(
      '/users/me/wallets',
      {
        method: 'POST',
        body: JSON.stringify({ address, network, name: name || null }),
      }
    );
  }

  async deleteUserWallet(id: string) {
    return this.request<void>(`/users/me/wallets/${id}`, { method: 'DELETE' });
  }

  // --- Exury deposit wallets (public) ------------------------------------
  // Endpoint público (sin JWT): devuelve las direcciones de recepción de Exury
  // agrupadas por asset y red. La fuente real es la env var EXURY_DEPOSIT_WALLETS_JSON
  // del backend; el fallback del frontend se usa sólo si el backend no responde.
  async getDepositWallets() {
    return this.request<{
      wallets: Record<string, Array<{ value: string; label: string; address: string }>>;
    }>('/deposit-wallets');
  }

  /**
   * Get user orders
   */
  async getOrders() {
    return this.request('/orders');
  }

  /**
   * Get order details.
   * El backend expone GET /orders/:id (el `type` es informativo en el cliente).
   */
  async getOrder(orderId: string, _type?: 'buy' | 'sell') {
    return this.request(`/orders/${orderId}`);
  }

  /**
   * Get user balances
   */
  async getBalances() {
    return this.request('/users/me/balances');
  }

  /**
   * Get balance for specific asset
   */
  async getBalance(asset: string) {
    return this.request(`/users/me/balances/${asset}`);
  }

  /**
   * Register a new user with email
   */
  async registerUser(email: string) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  /**
   * Login with email - sends verification code
   */
  async loginWithEmail(email: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  /**
   * Verify email with code
   */
  async verifyEmailCode(email: string, code: string) {
    return this.request('/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({ email, code }),
    });
  }

  /**
   * Resend verification code
   */
  async resendVerificationCode(email: string) {
    return this.request('/auth/resend-code', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  /**
   * Handle Auth0 callback
   */
  async handleAuth0Callback(code: string, redirectUri?: string) {
    // Use the redirect_uri from the request, or construct it from window.location
    const finalRedirectUri = redirectUri || 
      (typeof window !== 'undefined' ? `${window.location.origin}/auth-callback` : '');
    
    return this.request('/auth/auth0/callback', {
      method: 'POST',
      body: JSON.stringify({ code, redirect_uri: finalRedirectUri }),
    });
  }

  /**
   * Logout user
   */
  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }
}

export default new ApiService();

