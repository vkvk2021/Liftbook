// Liftbook service worker: makes the app open offline. It caches only the app's own files;
// workout data never passes through here (it lives in the browser's localStorage).
// Bump VERSION whenever you change icons or fonts, so phones fetch the new ones.
const VERSION = 'liftbook-v1';
const SHELL = ['./', './index.html', './manifest.webmanifest',
  './icons/icon-32.png', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png',
  './fonts/public-sans.woff2', './fonts/saira-condensed-500.woff2', './fonts/saira-condensed-600.woff2',
  './fonts/saira-condensed-700.woff2', './fonts/saira-condensed-800.woff2'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // The page itself: try the network first so updates arrive, fall back to the cached copy offline.
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(res => {
      const copy = res.clone(); caches.open(VERSION).then(c => c.put('./index.html', copy)); return res;
    }).catch(() => caches.match('./index.html')));
    return;
  }

  // The app's own files: serve from cache, refresh in the background.
  if (url.origin === self.location.origin) {
    e.respondWith(caches.open(VERSION).then(async c => {
      const hit = await c.match(req);
      const net = fetch(req).then(res => { if (res && res.ok) c.put(req, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    }));
  }
});
