/**
 * API Service for Frontend
 * Handles all API calls to the backend
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
const API_VERSION = 'v1';

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${API_BASE_URL}/${API_VERSION}`;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(error.error || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error: any) {
      console.error('API request failed:', error);
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
}

export const apiService = new ApiService();

