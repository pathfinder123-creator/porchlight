/* Porchlight PWA — same-origin cache with network-first freshness. */
const CACHE_NAME = 'porchlight-site-20261124-expansion1-r4';
const APP_FILES = ["./", "./index.html", "./about.html", "./assessment.html", "./discover.html", "./saved.html", "./getting-started.html", "./css/styles.css", "./css/discovery.css", "./data/opportunities.json", "./data/organizations.json", "./images/porchlight-painterly-banner.png", "./images/icon-192.png", "./images/icon-512.png", "./images/icon-maskable-512.png", "./js/assessment.js", "./js/discovery-profile.js", "./js/discovery.js", "./js/mobile-discovery-nav.js", "./js/navigation.js", "./js/opportunity-data.js", "./js/report-config.js", "./js/saved.js", "./manifest.webmanifest", "./js/pwa.js", "./data/version.json", "./images/apple-touch-icon.png", "./images/favicon-48.png"];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES.map(path=>new Request(path,{cache:'reload'})))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(Promise.all([
    caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('porchlight-site-') && key !== CACHE_NAME).map(key => caches.delete(key)))),
    self.clients.claim()
  ]));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(new URL(self.registration.scope).pathname)) return;
  if (url.pathname.endsWith('/data/version.json') && url.searchParams.has('check')) { event.respondWith(fetch(request)); return; }
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    try {
      const response = await fetch(request);
      if (response.ok && response.type === 'basic') await cache.put(request, response.clone());
      return response;
    } catch (error) {
      const cached = await cache.match(request, {ignoreSearch:true});
      if (cached) return cached;
      if (request.mode === 'navigate') {
        const fallback = await cache.match('./index.html');
        if (fallback) return fallback;
      }
      return Response.error();
    }
  })());
});

self.addEventListener("message",e=>{if(e.data?.type==="VERSION"&&e.ports[0])e.ports[0].postMessage({version:"2026.11.24-expansion1-r4"})});
