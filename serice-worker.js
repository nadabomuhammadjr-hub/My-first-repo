.const CACHE_NAME = 'fuga-csc-v2';
const urlsToCache = [
  '/My-first-repo/',
  '/My-first-repo/index.html',
  '/My-first-repo/style.css',
  '/My-first-repo/script.js',
  '/My-first-repo/gate.js'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  // Only handle normal GET requests to your own site (not Firebase)
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  // Network first: always try for the newest version, fall back to cache offline
  e.respondWith(
    fetch(req)
      .then(res => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req))
  );
});