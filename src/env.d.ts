/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_PAYMENT_BACKEND_URL: string;
  readonly VITE_MERCHANT_DASHBOARD_URL: string;
  readonly VITE_KYC_DASHBOARD_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
