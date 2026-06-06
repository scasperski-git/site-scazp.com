const CACHE_NAME = 'lock-portal-v1';

// Senarai fail asas untuk dicache (boleh biarkan kosong jika tak nak cache)
const urlsToCache = [
  '/',
  '/lockconfig.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Strategi Network-First (Penting untuk portal yang sentiasa perlukan data live)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
