import axios, { AxiosError, type AxiosInstance } from 'axios';

const baseURL = import.meta.env.VITE_API_PROJECT_URL;
if (!baseURL) {
  throw new Error('VITE_API_PROJECT_URL is not defined');
}

const api: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
});

interface SupabaseAuthToken {
  currentSession?: {
    access_token?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

api.interceptors.request.use(config => {
  const raw = localStorage.getItem(`sb-${import.meta.env.VITE_PROJECT_ID}-auth-token`);
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as SupabaseAuthToken;
      const accessToken = parsed?.currentSession?.access_token;
      if (accessToken && config.headers?.set) {
        config.headers.set('Authorization', `Bearer ${accessToken}`);
      }
    } catch (e) {
      console.warn('Failed to parse Supabase auth token:', e);
    }
  }

  return config;
});

api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response) {
      console.error('API error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('API error:', error.message);
    }
    return Promise.reject(error);
  },
);

export default api;
