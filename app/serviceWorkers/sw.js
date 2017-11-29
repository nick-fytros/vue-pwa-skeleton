var filesToCache = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/img/logo.png',
    '/js/main.js'
];

this.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('v0.0.1').then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});