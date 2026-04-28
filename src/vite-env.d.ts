/// <reference types="vite/client" />
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_RAILWAY_API_URL?: string;
  readonly VITE_BANK_BENEFICIARY?: string;
  readonly VITE_BANK_IBAN?: string;
  readonly VITE_BANK_NAME?: string;
  // JSON stringificado con las wallets de Exury (fallback dev-only).
  // En prod debe estar vacío; la fuente es EXURY_DEPOSIT_WALLETS_JSON en el backend.
  readonly VITE_EXURY_DEPOSIT_WALLETS_JSON?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
