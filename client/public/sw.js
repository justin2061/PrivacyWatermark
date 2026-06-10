const CACHE_NAME = 'watermark-tool-v2';
const PRECACHE_URLS = ['/'];

self.addEventListener('install', (event) => {
  // Activate the new SW immediately instead of waiting for old tabs to close.
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  // Network-first for navigations so freshly deployed routes (and the
  // current index.html / route table) always win over a stale cache.
  // This is what was breaking new pages like /batch: the old cache-first
  // logic served a stale app shell whose router had no /batch route, so
  // the SPA rendered its own 404.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put('/', copy));
          return response;
        })
        .catch(() => caches.match('/'))
    );
    return;
  }

  // Cache-first for everything else (hashed static assets, fonts, etc.).
  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request))
  );
});
