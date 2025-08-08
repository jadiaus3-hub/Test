import { QueryClient } from "@tanstack/react-query";

const defaultQueryFn = async ({ queryKey }: { queryKey: [string, ...unknown[]] }) => {
  const [url, ...params] = queryKey;
  let fullUrl = url;
  
  if (params.length > 0 && params[0]) {
    // Handle query parameters
    const searchParams = new URLSearchParams(params[0] as string);
    if (searchParams.toString()) {
      fullUrl += `?${searchParams.toString()}`;
    }
  }
  
  const response = await fetch(fullUrl);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export async function apiRequest(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  url: string,
  data?: unknown
): Promise<Response> {
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data && method !== 'GET') {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response;
}