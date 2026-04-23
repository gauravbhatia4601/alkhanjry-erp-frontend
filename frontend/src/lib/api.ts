import { useQuery, useMutation } from "@tanstack/react-query";
import { apiFetch, getStoredToken } from "../context/AuthContext";

const API_V1 = "/v1";

function resolveUrl(url: string): string {
  // If URL already starts with /v1, don't double-prefix
  if (url.startsWith("/v1")) return url;
  return `${API_V1}${url}`;
}

// ---------------------------------------------------------------------------
// Generic API hooks (TanStack Query)
// ---------------------------------------------------------------------------
export function useGet(key: string[], url: string, options = {}) {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const wrapped = await apiFetch<{ success: boolean; data: unknown }>(resolveUrl(url));
      if (!wrapped.success) throw new Error("Request failed.");
      return wrapped.data;
    },
    ...options,
  });
}

export function usePost(_mutationKey: string[], url: string, options = {}) {
  return useMutation({
    mutationFn: async (data: unknown) => {
      const wrapped = await apiFetch<{ success: boolean; data: unknown }>(resolveUrl(url), {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!wrapped.success) throw new Error("Request failed.");
      return wrapped.data;
    },
    ...options,
  });
}

export function usePut(_mutationKey: string[], url: string, options = {}) {
  return useMutation({
    mutationFn: async ({ id, data }: { id: string | number; data: unknown }) => {
      const wrapped = await apiFetch<{ success: boolean; data: unknown }>(resolveUrl(`${url}/${id}`), {
        method: "PUT",
        body: JSON.stringify(data),
      });
      if (!wrapped.success) throw new Error("Request failed.");
      return wrapped.data;
    },
    ...options,
  });
}

export function useDelete(_mutationKey: string[], url: string, options = {}) {
  return useMutation({
    mutationFn: async (id: string | number) => {
      const wrapped = await apiFetch<{ success: boolean; data: unknown }>(resolveUrl(`${url}/${id}`), {
        method: "DELETE",
      });
      if (!wrapped.success) throw new Error("Request failed.");
      return wrapped.data;
    },
    ...options,
  });
}

// ---------------------------------------------------------------------------
// Low-level API client for direct use
// ---------------------------------------------------------------------------
export const apiClient = {
  get: async <T>(url: string): Promise<T> => {
    const wrapped = await apiFetch<{ success: boolean; data: T }>(resolveUrl(url));
    if (!wrapped.success) throw new Error("GET request failed.");
    return wrapped.data;
  },

  post: async <T>(url: string, data: unknown): Promise<T> => {
    const wrapped = await apiFetch<{ success: boolean; data: T }>(resolveUrl(url), {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!wrapped.success) throw new Error("POST request failed.");
    return wrapped.data;
  },

  put: async <T>(url: string, data: unknown): Promise<T> => {
    const wrapped = await apiFetch<{ success: boolean; data: T }>(resolveUrl(url), {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (!wrapped.success) throw new Error("PUT request failed.");
    return wrapped.data;
  },

  delete: async <T>(url: string): Promise<T> => {
    const wrapped = await apiFetch<{ success: boolean; data: T }>(resolveUrl(url), {
      method: "DELETE",
    });
    if (!wrapped.success) throw new Error("DELETE request failed.");
    return wrapped.data;
  },
};

export { getStoredToken };
