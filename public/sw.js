self.addEventListener('install', event => event.waitUntil(caches.open('kakatiya-v1').then(cache => cache.addAll(['/','/index.html']))));
self.addEventListener('fetch', event => event.respondWith(caches.match(event.request).then(hit => hit || fetch(event.request))));
