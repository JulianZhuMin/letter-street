// Offline support for Letter's Street 字母街. Bump CACHE (and APP_VERSION in index.html) on every release.
var CACHE = 'letter-street-v1b';
var FILES = ['./', './index.html', './manifest.json', './icon.svg', './icon-180.png', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './audio/ask-A.mp3', './audio/ask-A-en.mp3', './audio/yay-A.mp3', './audio/ask-B.mp3', './audio/ask-B-en.mp3', './audio/yay-B.mp3', './audio/ask-C.mp3', './audio/ask-C-en.mp3', './audio/yay-C.mp3', './audio/ask-D.mp3', './audio/ask-D-en.mp3', './audio/yay-D.mp3', './audio/ask-E.mp3', './audio/ask-E-en.mp3', './audio/yay-E.mp3', './audio/ask-F.mp3', './audio/ask-F-en.mp3', './audio/yay-F.mp3', './audio/ask-G.mp3', './audio/ask-G-en.mp3', './audio/yay-G.mp3', './audio/ask-H.mp3', './audio/ask-H-en.mp3', './audio/yay-H.mp3', './audio/ask-I.mp3', './audio/ask-I-en.mp3', './audio/yay-I.mp3', './audio/ask-J.mp3', './audio/ask-J-en.mp3', './audio/yay-J.mp3', './audio/ask-K.mp3', './audio/ask-K-en.mp3', './audio/yay-K.mp3', './audio/ask-L.mp3', './audio/ask-L-en.mp3', './audio/yay-L.mp3', './audio/ask-M.mp3', './audio/ask-M-en.mp3', './audio/yay-M.mp3', './audio/ask-N.mp3', './audio/ask-N-en.mp3', './audio/yay-N.mp3', './audio/ask-O.mp3', './audio/ask-O-en.mp3', './audio/yay-O.mp3', './audio/ask-P.mp3', './audio/ask-P-en.mp3', './audio/yay-P.mp3', './audio/ask-Q.mp3', './audio/ask-Q-en.mp3', './audio/yay-Q.mp3', './audio/ask-R.mp3', './audio/ask-R-en.mp3', './audio/yay-R.mp3', './audio/ask-S.mp3', './audio/ask-S-en.mp3', './audio/yay-S.mp3', './audio/ask-T.mp3', './audio/ask-T-en.mp3', './audio/yay-T.mp3', './audio/ask-U.mp3', './audio/ask-U-en.mp3', './audio/yay-U.mp3', './audio/ask-V.mp3', './audio/ask-V-en.mp3', './audio/yay-V.mp3', './audio/ask-W.mp3', './audio/ask-W-en.mp3', './audio/yay-W.mp3', './audio/ask-X.mp3', './audio/ask-X-en.mp3', './audio/yay-X.mp3', './audio/ask-Y.mp3', './audio/ask-Y-en.mp3', './audio/yay-Y.mp3', './audio/ask-Z.mp3', './audio/ask-Z-en.mp3', './audio/yay-Z.mp3', './audio/yeah.mp3', './audio/byebye.mp3', './audio/well-done.mp3', './audio/lets-learn.mp3', './audio/lets-learn-en.mp3', './audio/landscape.mp3', './audio/landscape-en.mp3', './audio/group-done.mp3'];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return c.addAll(FILES.map(function (f) { return new Request(f, { cache: 'reload' }); }));
  }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  var cacheFirst = /\/audio\/[\w-]+\.mp3$|\.png$|\.svg$/.test(url.pathname);
  if (cacheFirst) {
    e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(function (m) {
      return m || fetch(e.request).then(function (r) {
        if (r && r.ok) { var copy = r.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, copy); }); }
        return r;
      });
    }));
    return;
  }
  e.respondWith(fetch(e.request, { cache: 'no-cache' }).then(function (r) {
    if (r && r.ok) { var copy = r.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, copy); }); }
    return r;
  }).catch(function () {
    return caches.match(e.request, { ignoreSearch: true }).then(function (m) { return m || caches.match('./index.html'); });
  }));
});
