/**
 * Redirect URI for Auth0 authorize/callback. Must match Auth0 app settings and backend.
 * Uses VITE_AUTH0_REDIRECT_URI in production; falls back to current origin in dev/preview.
 */
export function getAuth0RedirectUri(): string {
  const envRedirectUri = import.meta.env.VITE_AUTH0_REDIRECT_URI as string | undefined;

  if (envRedirectUri && !envRedirectUri.includes('localhost')) {
    return envRedirectUri;
  }

  if (typeof window !== 'undefined') {
    return `${window.location.origin}/auth-callback`;
  }

  return envRedirectUri || '';
}
