import { build, files, version } from '$service-worker';

const CACHE = `cache-${version}`;

const ASSETS = [
    ...build,
    ...files
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE)
            .then((cache) => cache.addAll(ASSETS))
            .then(() => {
                self.skipWaiting();
            })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(async (keys) => {
            for (const key of keys) {
                if (key !== CACHE) await caches.delete(key);
            }
            self.clients.claim();
        })
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.open(CACHE).then((cache) => {
            return cache.match(event.request).then((cached) => {
                const networked = fetch(event.request)
                    .then((response) => {
                        cache.put(event.request, response.clone());
                        return response;
                    })
                    .catch(() => cached);

                return cached || networked;
            });
        })
    );
});
