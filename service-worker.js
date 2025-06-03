const CACHE_NAME = "my-pwa-cache-v1";
const urlsToCache = [
  "index.html",
  "style.css",
  "icon-192.png",
  "icon-512.png",
  "games/bingo.html",
  "games/bingo.png",
  "games/catch-box.html",
  "games/catchbox.jpg",
  "games/odd-one-out.html",
  "games/oddout.jpeg",
  "games/tap-battle.html",
  "games/tapbattle.jpg"
];

// Install event - cache files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Activate event - clean old caches
self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

// Fetch event - serve cached files or fetch from network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
