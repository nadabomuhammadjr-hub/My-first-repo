const CACHE_NAME = 'fuga-csc-v1';
const urlsToCache = ['/My-first-repo/', '/My-first-repo/index.html', '/My-first-repo/style.css', '/My-first-repo/script.js'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});