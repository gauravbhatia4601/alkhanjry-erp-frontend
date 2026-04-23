import { useState, useEffect, createContext, useContext, useCallback } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: "admin" | "salesman";
  is_active: boolean;
  permissions: string[];
  last_login_at?: string;
}

interface LoginResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
  };
  error: null | { code: string; message: string; details?: Record<string, string[]> };
  meta: { message?: string; timestamp: string };
}

interface MeResponse {
  success: boolean;
  data: {
    user: User;
    permissions: string[];
    roles: string[];
  };
  error: null | { code: string; message: string };
  meta: { timestamp: string };
}

interface ApiError {
  success: false;
  data: null;
  error: { code: string; message: string; details?: unknown };
  meta: { timestamp: string };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const API_BASE_URL = "/api";
const TOKEN_KEY = "alkhanjry_auth_token";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

function setStoredToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

function clearStoredToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

// ---------------------------------------------------------------------------
// Fetch wrapper with auth and standardized error handling
// ---------------------------------------------------------------------------
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getStoredToken();
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    body = {};
  }

  // Standardized error envelope from backend
  if (!response.ok) {
    const apiError = body as ApiError;
    const message =
      apiError?.error?.message || `HTTP ${response.status}`;
    const code = apiError?.error?.code || `ERR_${response.status}`;
    const details = apiError?.error?.details;
    const error = new Error(message);
    (error as unknown as Record<string, unknown>).code = code;
    (error as unknown as Record<string, unknown>).details = details;
    throw error;
  }

  return body as T;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user on mount if token exists
  useEffect(() => {
    const token = getStoredToken();
    if (!token) {
      setIsLoading(false);
      return;
    }
    fetchCurrentUser().finally(() => setIsLoading(false));
  }, []);

  const fetchCurrentUser = async (): Promise<boolean> => {
    try {
      const response = await apiFetch<MeResponse>("/v1/auth/me");
      if (response.success && response.data.user) {
        const enriched: User = {
          ...response.data.user,
          permissions: response.data.permissions || [],
        };
        setUser(enriched);
        return true;
      }
      return false;
    } catch {
      clearStoredToken();
      setUser(null);
      return false;
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await apiFetch<LoginResponse>("/v1/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (!response.success || !response.data?.token) {
        const apiErr = response.error;
        return {
          success: false,
          error: apiErr?.message || "Invalid credentials.",
        };
      }

      setStoredToken(response.data.token);

      // Enrich user with permissions from login response
      const enriched: User = {
        ...response.data.user,
        permissions: [],
      };
      setUser(enriched);

      // Fetch /me immediately to get full permissions
      await fetchCurrentUser();

      return { success: true };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Login failed";
      return { success: false, error: message };
    }
  };

  const logout = useCallback(async () => {
    try {
      await apiFetch("/v1/auth/logout", { method: "POST" });
    } catch {
      // Ignore — always clear client-side state
    } finally {
      clearStoredToken();
      setUser(null);
    }
  }, []);

  const refreshToken = useCallback(async (): Promise<boolean> => {
    try {
      const response = await apiFetch<{
        success: boolean;
        data: { token: string };
      }>("/v1/auth/refresh", { method: "POST" });

      if (response.success && response.data?.token) {
        setStoredToken(response.data.token);
        return true;
      }
      return false;
    } catch {
      clearStoredToken();
      setUser(null);
      return false;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Re-export fetch helper for non-auth API calls
export { apiFetch, getStoredToken };
