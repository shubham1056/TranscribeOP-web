import axios, { AxiosError, type AxiosInstance } from 'axios';

import { API_BASE_URL, API_PREFIX, STORAGE_KEYS } from '@/lib/constants';

class ApiClient {
  private readonly http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: `${API_BASE_URL}${API_PREFIX}`,
      timeout: 30_000,
      headers: { 'Content-Type': 'application/json' },
    });

    this.http.interceptors.request.use((config) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem(STORAGE_KEYS.accessToken);
        if (token) config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.http.interceptors.response.use(
      (r) => r,
      async (error: AxiosError) => {
        if (error.response?.status === 401 && typeof window !== 'undefined') {
          // Clear tokens; UI will redirect to /login via the auth store
          localStorage.removeItem(STORAGE_KEYS.accessToken);
          localStorage.removeItem(STORAGE_KEYS.refreshToken);
        }
        return Promise.reject(error);
      },
    );
  }

  get instance() {
    return this.http;
  }
}

export const apiClient = new ApiClient().instance;
