import type { CredentialsMode } from "./types.ts"

export const API_CONFIG = {
  baseUrl:
    import.meta.env.VITE_ENV === "production" ? import.meta.env.VITE_API_PROD_URL : import.meta.env.VITE_API_DEV_URL,
  credentials:
    import.meta.env.VITE_ENV === "production"
      ? ("same-origin" as CredentialsMode) // More secure default for production
      : ("omit" as CredentialsMode) // Relaxed for development
}
