const APP_VERSION = "1.0.2";
const CACHE_NAME = `spouse-nudge-${APP_VERSION}`;
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css?v=1.0.2",
  "./app.js?v=1.0.2",
  "./manifest.webmanifest?v=1.0.2",
  "./icon.svg?v=1.0.2"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key.startsWith("spouse-nudge-") && key !== CACHE_NAME).map((key) => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  const shouldPreferNetwork = ["document", "script", "style"].includes(event.request.destination)
    || url.pathname.endsWith("/")
    || url.pathname.endsWith("/index.html")
    || url.pathname.endsWith("/app.js")
    || url.pathname.endsWith("/styles.css");

  if (shouldPreferNetwork) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});

self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};
  event.waitUntil(
    self.registration.showNotification(data.title || "Spouse Nudge", {
      body: data.body || "Have you done it already?",
      icon: "./icon.svg?v=1.0.2",
      badge: "./icon.svg?v=1.0.2"
    })
  );
});
