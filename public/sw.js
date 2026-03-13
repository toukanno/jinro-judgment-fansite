const CACHE_NAME = 'jinro-judgment-fansite-v9';
const ASSETS = [
  './',
  './index.html',
  './roles.html',
  './guide.html',
  './strategy.html',
  './composition.html',
  './glossary.html',
  './character.html',
  './characters.html',
  './copipe.html',
  './queen-wise.html',
  './v3roles.html',
  './templates.html',
  './faq.html',
  './timer.html',
  './exclusion.html',
  './rope-calc.html',
  './synergy.html',
  './quiz.html',
  './notepad.html',
  './memo.html',
  './settings.html',
  './role-compatibility.html',
  './404.html',
  './privacy.html',
  './contact.html',
  './css/style.css',
  './js/common.js',
  './js/roles-data.js',
  './js/theme.js',
  './manifest.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetched = fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => cached);

      return cached || fetched;
    })
  );
});
