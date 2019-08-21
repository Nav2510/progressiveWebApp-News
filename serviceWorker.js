importScripts('node_modules/workbox-sw/build/importScripts/workbox-sw.dev.v2.1.1.js');

const staticAssets = [
    './',
    './style.css',
    './app.js',
    './images/fallback.jpg',
    './fallback.json'
];

const wb = new WorkboxSW();

wb.precache(staticAssets);

wb.router.registerRoute('https://newsapi.org/(.*)', wb.strategies.networkFirst());
