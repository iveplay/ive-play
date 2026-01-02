const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.iveplay.io';

type FetchOptions = RequestInit & {
  token?: string | null;
};

class ApiClient {
  private baseUrl: string;
  private getToken: (() => Promise<string | null>) | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setTokenGetter(getter: () => Promise<string | null>) {
    this.getToken = getter;
  }

  private async request<T>(path: string, options: FetchOptions = {}): Promise<T> {
    const { token, ...fetchOptions } = options;

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    };

    // Get token from getter or use provided token
    const authToken = token ?? (await this.getToken?.());
    if (authToken) {
      (headers as Record<string, string>).Authorization = `Bearer ${authToken}`;
    }

    const response = await fetch(`${this.baseUrl}${path}`, {
      ...fetchOptions,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new ApiError(response.status, error.error || 'Request failed');
    }

    return response.json();
  }

  get<T>(path: string, options?: FetchOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: 'GET' });
  }

  post<T>(path: string, body?: unknown, options?: FetchOptions): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  put<T>(path: string, body?: unknown, options?: FetchOptions): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  delete<T>(path: string, options?: FetchOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: 'DELETE' });
  }
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const apiClient = new ApiClient(API_BASE);
