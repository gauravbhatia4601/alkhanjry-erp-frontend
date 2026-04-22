import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchWithCredentials } from "../context/AuthContext";

// Generic API hooks
export function useGet(key: string[], url: string, options = {}) {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const response = await fetchWithCredentials(url);
      return response.data || response;
    },
    ...options,
  });
}

export function usePost(_mutationKey: string[], url: string, options = {}) {
  return useMutation({
    mutationFn: async (data: unknown) => {
      const response = await fetchWithCredentials(url, {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response.data || response;
    },
    ...options,
  });
}

export function usePut(_mutationKey: string[], url: string, options = {}) {
  return useMutation({
    mutationFn: async ({ id, data }: { id: string | number; data: unknown }) => {
      const response = await fetchWithCredentials(`${url}/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      return response.data || response;
    },
    ...options,
  });
}

export function useDelete(_mutationKey: string[], url: string, options = {}) {
  return useMutation({
    mutationFn: async (id: string | number) => {
      const response = await fetchWithCredentials(`${url}/${id}`, {
        method: "DELETE",
      });
      return response.data || response;
    },
    ...options,
  });
}

// API client for manual calls
export const apiClient = {
  get: async <T>(url: string): Promise<T> => {
    const response = await fetchWithCredentials(url);
    return response.data || response;
  },
  
  post: async <T>(url: string, data: unknown): Promise<T> => {
    const response = await fetchWithCredentials(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response.data || response;
  },
  
  put: async <T>(url: string, data: unknown): Promise<T> => {
    const response = await fetchWithCredentials(url, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    return response.data || response;
  },
  
  delete: async <T>(url: string): Promise<T> => {
    const response = await fetchWithCredentials(url, {
      method: "DELETE",
    });
    return response.data || response;
  },
};
