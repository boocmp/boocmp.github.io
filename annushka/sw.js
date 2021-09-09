const urlsToCache = [
  'icon.png',
  'index.html',
];

self.addEventListener('message' , m => {
  yandex.publicFeature.getWallpaperInfo(function(info) {
    if (chrome.runtime.lastError) {
      console.error("oops " + chrome.runtime.lastError.message);
    } else {
      console.log(info);
    }});
});

self.addEventListener('install', e => {
  e.waitUntil(
      caches.open('basic-cache').then((cache) => {
        return cache.addAll(urlsToCache);
      }),
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
      caches.match(e.request).then((response) => {
        if (response) {
          return response;
        }
        return fetch(e.request);
      }),
  );
});
