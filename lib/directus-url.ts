// lib/directus-url.ts
export const DIRECTUS_PUBLIC_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055';
export const DIRECTUS_SERVER_URL = process.env.DIRECTUS_SERVER_URL || DIRECTUS_PUBLIC_URL;
export const DIRECTUS_STATIC_TOKEN = process.env.DIRECTUS_STATIC_TOKEN || 'vf_secret_service_token_2026';

/**
 * Convert a Directus file UUID or existing URL to a full image URL
 */
export function getDirectusAssetUrl(fileIdOrUrl?: string | null): string {
  if (!fileIdOrUrl) return '';
  if (fileIdOrUrl.startsWith('http://') || fileIdOrUrl.startsWith('https://')) {
    return fileIdOrUrl;
  }
  // Remove trailing slashes
  const baseUrl = (typeof window === 'undefined' ? DIRECTUS_SERVER_URL : DIRECTUS_PUBLIC_URL).replace(/\/+$/, '');
  return `${baseUrl}/assets/${fileIdOrUrl}`;
}
