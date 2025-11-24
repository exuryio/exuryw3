import { defineStore } from "pinia";
import { ref, computed } from "vue";

interface User {
  id: string;
  email: string;
  email_verified: boolean;
  google_id?: string;
}

export const useAuthStore = defineStore("auth", () => {
  // State
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);
  const isAuthenticated = ref<boolean>(false);

  // Load from localStorage on initialization (only in browser)
  const loadFromStorage = () => {
    if (typeof window === 'undefined') return; // Skip in SSR
    
    try {
      const storedUser = localStorage.getItem("exury_user");
      const storedToken = localStorage.getItem("exury_token");
      
      if (storedUser && storedToken) {
        user.value = JSON.parse(storedUser);
        token.value = storedToken;
        isAuthenticated.value = true;
      }
    } catch (error) {
      console.error("Error loading auth from storage:", error);
      clearAuth();
    }
  };

  // Initialize from storage (only in browser)
  if (typeof window !== 'undefined') {
    loadFromStorage();
  }

  // Actions
  const setAuth = (userData: User, authToken: string) => {
    user.value = userData;
    token.value = authToken;
    isAuthenticated.value = true;
    
    // Save to localStorage (only in browser)
    if (typeof window !== 'undefined') {
      localStorage.setItem("exury_user", JSON.stringify(userData));
      localStorage.setItem("exury_token", authToken);
    }
  };

  const clearAuth = () => {
    user.value = null;
    token.value = null;
    isAuthenticated.value = false;
    
    // Remove from localStorage (only in browser)
    if (typeof window !== 'undefined') {
      localStorage.removeItem("exury_user");
      localStorage.removeItem("exury_token");
    }
  };

  const logout = async () => {
    try {
      // Call logout endpoint if needed
      // await apiService.logout();
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      clearAuth();
    }
  };

  // Getters
  const currentUser = computed(() => user.value);
  const authToken = computed(() => token.value);
  const isLoggedIn = computed(() => isAuthenticated.value);

  return {
    // State
    user,
    token,
    isAuthenticated,
    // Actions
    setAuth,
    clearAuth,
    logout,
    loadFromStorage,
    // Getters
    currentUser,
    authToken,
    isLoggedIn,
  };
});

