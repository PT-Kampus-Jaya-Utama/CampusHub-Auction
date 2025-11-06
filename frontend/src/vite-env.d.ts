/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AUTH_SERVICE: string
  readonly VITE_REGISTRATION_SERVICE: string
  readonly VITE_SEARCH_SERVICE: string
  readonly VITE_BIDDING_SERVICE: string
  readonly VITE_RECOMMENDATION_SERVICE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
