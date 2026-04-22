import { useState, useEffect, createContext, useContext } from "react";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  role: "admin" | "salesman";
  is_active: boolean;
  permissions?: string[]; // <— sent by backend when RBAC is live
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = "/api";

// Fetch wrapper with credentials
async function fetchWithCredentials(url: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.headers,
    },
    credentials: "include",
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 419) {
      // Session expired or unauthenticated
      throw new Error("Unauthorized");
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP ${response.status}`);
  }

  return response.json();
}

// TEMP: Set to true to bypass auth and browse all pages without backend
const BYPASS_AUTH = true;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(
    BYPASS_AUTH
      ? {
          id: 1,
          name: "Admin User",
          username: "admin",
          email: "admin@alkhanjry.com",
          role: "admin",
          is_active: true,
        }
      : null
  );
  const [isLoading, setIsLoading] = useState(!BYPASS_AUTH);

  // Check auth status on mount
  useEffect(() => {
    if (BYPASS_AUTH) return;
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const data = await fetchWithCredentials("/auth/me");
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const data = await fetchWithCredentials("/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      setUser(data.user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Login failed",
      };
    }
  };

  const logout = async () => {
    try {
      await fetchWithCredentials("/auth/logout", {
        method: "POST",
      });
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Export fetch helper for API calls
export { fetchWithCredentials };
