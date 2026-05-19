const CACHE_NAME = 'wordnote-v1';
const ASSETS = [
  'index.html',
  'css/style.css',
  'js/app.js',
  'js/store.js',
  'js/sm2.js',
  'data/vocabulary.js',
  'icon-192.png',
  'icon-512.png'
];

// 安装：缓存所有静态资源
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// 激活：清理旧缓存
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    })
  );
  self.clients.claim();
});

// 拦截请求：优先从缓存返回，没有则从网络获取
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      return cached || fetch(e.request);
    })
  );
});
