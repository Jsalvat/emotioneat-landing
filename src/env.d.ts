/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_MIXPANEL_TOKEN: string;
  readonly PUBLIC_APP_URL: string;
  readonly DEV: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

