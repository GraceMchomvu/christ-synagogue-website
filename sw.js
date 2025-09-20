// Service Worker for Offline Mode
const CACHE_NAME = 'csm-v2';
const STATIC_CACHE = 'csm-static-v2';
const DYNAMIC_CACHE = 'csm-dynamic-v2';

const urlsToCache = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/css/styles.min.css',
  '/css/header-enhanced.css',
  '/css/mobile-first.css',
  '/css/advanced-features.css',
  '/css/gallery-enhancements.css',
  '/css/brooklake-hero.css',
  '/css/moving-photos.css',
  '/css/section-flow.css',
  '/css/service-times.css',
  '/css/about-enhanced.css',
  '/css/giving-enhanced.css',
  '/css/footer-social.css',
  '/css/animated-text.css',
  '/css/creative-layouts.css',
  '/js/main.js',
  '/js/translations.js',
  '/js/gallery-enhancements.js',
  '/assets/favicon.svg',
  '/assets/logo.svg',
  '/assets/icons.svg',
  '/assets/pattern.svg',
  '/images/PROPHET1.jpg',
  '/images/PROPHET2.jpg',
  '/images/IMG_0812.JPG',
  '/images/IMG_1527.JPG',
  '/images/IMG_1530.JPG',
  '/images/IMG_2136.JPG',
  '/images/IMG_0570.JPG',
  '/images/IMG_0588.JPG',
  '/images/IMG_1016.JPG',
  '/images/IMG_1539.JPG',
  '/images/IMG_1542.JPG',
  '/manifest.json',
  '/admin/index.html',
  '/admin.html'
];

// Cache strategies
const CACHE_STRATEGIES = {
  CACHE_FIRST: ['/css/', '/js/', '/assets/', '/images/'],
  NETWORK_FIRST: ['/api/', '/contact', '/prayer'],
  STALE_WHILE_REVALIDATE: ['/']
};

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Push notification handling
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update from Christ Synagogue Ministries',
    icon: '/assets/favicon.svg',
    badge: '/assets/favicon.svg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Website',
        icon: '/assets/icons.svg#globe'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/assets/icons.svg#heart'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Christ Synagogue Ministries', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
