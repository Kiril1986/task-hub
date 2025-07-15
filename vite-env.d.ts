/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AUTH_EMAIL: string;
  readonly VITE_AUTH_USERNAME: string;
  readonly VITE_AUTH_PASSWORD: string;
  readonly VITE_API_PROJECT_URL: string;
  readonly VITE_API_KEY: string;
  readonly VITE_PROJECT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}