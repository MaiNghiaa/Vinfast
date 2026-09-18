// scripts/directus-client.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@vinfastphuongdong.vn';
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'AdminPassword123!';

let accessToken = null;

export async function getAuthToken() {
  if (accessToken) return accessToken;
  const res = await fetch(`${DIRECTUS_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to login to Directus: ${res.status} ${errorText}`);
  }

  const data = await res.json();
  accessToken = data.data.access_token;
  return accessToken;
}

export async function directusFetch(endpoint, options = {}) {
  const token = await getAuthToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    ...(options.headers || {}),
  };

  const url = endpoint.startsWith('http') ? endpoint : `${DIRECTUS_URL}${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers,
  });

  return res;
}

export async function directusJson(endpoint, options = {}) {
  const isPostOrPatch = options.method === 'POST' || options.method === 'PATCH';
  const headers = {
    ...(isPostOrPatch ? { 'Content-Type': 'application/json' } : {}),
    ...(options.headers || {}),
  };

  const res = await directusFetch(endpoint, {
    ...options,
    headers,
  });

  const text = await res.text();
  if (!res.ok) {
    let errObj;
    try { errObj = JSON.parse(text); } catch {}
    const msg = errObj?.errors?.[0]?.message || text;
    const error = new Error(`Directus API Error [${res.status}] ${endpoint}: ${msg}`);
    error.status = res.status;
    error.payload = errObj;
    throw error;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

// Helper: Ensure Folder exists
const folderCache = {};
export async function ensureFolder(name, parentId = null) {
  const cacheKey = `${parentId || 'root'}:${name}`;
  if (folderCache[cacheKey]) return folderCache[cacheKey];

  // Check if folder exists
  const query = parentId 
    ? `?filter[name][_eq]=${encodeURIComponent(name)}&filter[parent][_eq]=${parentId}`
    : `?filter[name][_eq]=${encodeURIComponent(name)}&filter[parent][_null]=true`;
  
  const existing = await directusJson(`/folders${query}`);
  if (existing.data && existing.data.length > 0) {
    folderCache[cacheKey] = existing.data[0].id;
    return existing.data[0].id;
  }

  // Create folder
  const created = await directusJson('/folders', {
    method: 'POST',
    body: JSON.stringify({ name, parent: parentId }),
  });

  folderCache[cacheKey] = created.data.id;
  return created.data.id;
}

// Helper: Download and upload image with caching
const imageMapPath = path.join(__dirname, '.image-map.json');
let imageMap = {};
if (fs.existsSync(imageMapPath)) {
  try {
    imageMap = JSON.parse(fs.readFileSync(imageMapPath, 'utf8'));
  } catch (e) {
    imageMap = {};
  }
}

function saveImageMap() {
  fs.writeFileSync(imageMapPath, JSON.stringify(imageMap, null, 2), 'utf8');
}

export async function uploadImageFromUrl(url, folderName = 'general', title = '') {
  if (!url || typeof url !== 'string' || !url.startsWith('http')) {
    return null;
  }

  // Check cache
  if (imageMap[url]) {
    return imageMap[url];
  }

  console.log(`Downloading asset: ${url}`);
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!res.ok) {
      console.warn(`Failed to fetch image: ${url} (status: ${res.status})`);
      return null;
    }

    const contentType = res.headers.get('content-type') || 'image/jpeg';
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract filename from URL
    const urlObj = new URL(url);
    let filename = path.basename(urlObj.pathname);
    if (!filename || !filename.includes('.')) {
      filename = `image-${Date.now()}.${contentType.split('/')[1] || 'jpg'}`;
    }

    const folderId = folderName ? await ensureFolder(folderName) : null;

    const formData = new FormData();
    const blob = new Blob([buffer], { type: contentType });
    formData.append('file', blob, filename);
    if (folderId) {
      formData.append('folder', folderId);
    }
    if (title) {
      formData.append('title', title);
    }

    const token = await getAuthToken();
    const uploadRes = await fetch(`${DIRECTUS_URL}/files`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!uploadRes.ok) {
      const err = await uploadRes.text();
      console.warn(`Failed to upload file to Directus: ${err}`);
      return null;
    }

    const uploadData = await uploadRes.json();
    const fileId = uploadData.data.id;
    imageMap[url] = fileId;
    saveImageMap();
    return fileId;
  } catch (err) {
    console.error(`Error migrating image ${url}:`, err.message);
    return null;
  }
}
