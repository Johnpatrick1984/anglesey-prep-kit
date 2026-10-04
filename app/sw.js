/* Keeps the app working without a signal. Bump VERSION when the app changes. */
var VERSION = 'prepkit-v1';
var SHELL = [
  './', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png',
  '../assets/fonts/barlow-latin-400-normal.woff2',
  '../assets/fonts/barlow-latin-500-normal.woff2',
  '../assets/fonts/barlow-latin-600-normal.woff2',
  '../assets/fonts/barlow-condensed-latin-500-normal.woff2',
  '../assets/fonts/barlow-condensed-latin-600-normal.woff2',
  '../assets/fonts/barlow-condensed-latin-700-normal.woff2'
];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  /* Network first so updates arrive; fall back to the saved copy when offline. */
  e.respondWith(fetch(req).then(function (res) {
    if (res && res.ok) { var copy = res.clone(); caches.open(VERSION).then(function (c) { c.put(req, copy); }); }
    return res;
  }).catch(function () {
    return caches.match(req, { ignoreSearch: true }).then(function (hit) { return hit || caches.match('index.html'); });
  }));
});
