var filesToCache = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/img/logo.png',
    '/js/main.js'
];

var cacheVerion = 'v0.0.1';

this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheVerion).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});

this.addEventListener('activate', function(event) {
    var cacheWhitelist = [cacheVerion];

    event.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(
                keyList.map(function(key) {
                    if (cacheWhitelist.indexOf(key) === -1) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

this.addEventListener('fetch', function(event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function(resp) {
                return (
                    resp ||
                    fetch(event.request).then(function(response) {
                        caches.open(cacheVerion).then(function(cache) {
                            cache.put(event.request, response.clone());
                        });
                        return response;
                    })
                );
            })
            .catch(function() {
                // not network and no cache
                return caches.match('/img/logo.png');
            })
    );
});
