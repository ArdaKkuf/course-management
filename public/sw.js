self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('dershane-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/login',
        '/dashboard',
        '/manifest.json',
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
