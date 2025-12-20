/**
 * Service Worker Mínimo para PWA
 * 
 * Este Service Worker es mínimo y solo permite la instalación de la PWA.
 * NO implementa caché complejo para evitar problemas con actualizaciones.
 */

const CACHE_NAME = 'exury-pwa-v1';
const urlsToCache = [
  '/',
  '/manifest.json',
];

// Install event - Cache essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Cache abierto');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('Service Worker: Error al cachear', error);
      })
  );
  // Force activation of new service worker
  self.skipWaiting();
});

// Activate event - Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Eliminando cache antiguo', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Take control of all pages immediately
  return self.clients.claim();
});

// Fetch event - Network first strategy (no cache for dynamic content)
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // For PWA installation, we use network first
  // This ensures users always get the latest version
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // If network request succeeds, return it
        return response;
      })
      .catch(() => {
        // Only use cache if network fails
        return caches.match(event.request).then((cachedResponse) => {
          // If cache has the resource, return it
          if (cachedResponse) {
            return cachedResponse;
          }
          // If not in cache either, return a basic response
          // This prevents the "Failed to convert value to 'Response'" error
          return new Response('Network error', {
            status: 408,
            statusText: 'Request Timeout',
          });
        });
      })
  );
});

