// service-worker.js
const CACHE_NAME = 'cspscout-cache-v2.97';
const urlsToCache = [
  '/',
  '/index.html',
  './touch-icon-512.png',
  '/manifest.json',
  'toggledrawericon.png'  // Add your app assets here
];

// Install event: Cache necessary files
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // Ensure the service worker installs immediately
});

// Activate event: Clean old caches properly
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch event: Ensure we serve correct files without forcing reload
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return; // Ignore POST requests

  // Always bypass cache for manifest.json
  if (event.request.url.includes('manifest.json')) {
    console.log('[Service Worker] Bypassing cache for manifest.json');
    event.respondWith(fetch(event.request));  // Always fetch the latest manifest
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((response) => {
        if (event.request.destination === 'script' || event.request.destination === 'style') {
          return caches.open(CACHE_NAME).then((cache) => {
            try {
              cache.put(event.request, response.clone());
            } catch (err) {
            }
            return response;
          });
        }
        return response;
      });
    })
  );
});

// Handle updates correctly without forcing reloads
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[Service Worker] Skipping waiting and applying update...');
    self.skipWaiting();
  }
});

// public/service-worker.js
self.addEventListener('push', (event) => {
  console.log('Push Event:', event);

  const data = event.data ? event.data.json() : { title: 'Default Title', body: 'Default body' };

  self.registration.showNotification(data.title, {
    body: data.body,
    icon: './touch-icon-512.png',  // Add your icon path
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://reefscape.web.app')  // Replace with your PWA URL
  );
});