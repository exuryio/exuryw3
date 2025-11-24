/**
 * API Service for Frontend
 * Handles all API calls to the backend
 */
// Determine API base URL based on environment
const getApiBaseUrl = (): string => {
  // If explicitly set in env, use it (highest priority)
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  // If running in browser, detect deployment environment
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // Production/preview URLs: exurydev--prXX-*.web.app or exury.io
    if (hostname.includes('exurydev') || hostname.includes('exury.io')) {
      // Use Railway URL from env, or fallback to Railway domain
      // Priority: VITE_RAILWAY_API_URL > VITE_API_BASE_URL > Railway default
      // TEMPORARY: Using Railway domain until api.exury.io is configured
      return import.meta.env.VITE_RAILWAY_API_URL || 
             import.meta.env.VITE_API_BASE_URL || 
             'https://exuryw3-production.up.railway.app'; // Temporary Railway domain
    }
  }
  
  // Default to localhost for local development
  return 'http://localhost:3001';
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
    this.baseUrl = `${API_BASE_URL}/${API_VERSION}`;
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
   * Create a new order
   */
  async createOrder(quoteId: string) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify({ quote_id: quoteId }),
    });
  }

  /**
   * Get user orders
   */
  async getOrders() {
    return this.request('/orders');
  }

  /**
   * Get order details
   */
  async getOrder(orderId: string) {
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

