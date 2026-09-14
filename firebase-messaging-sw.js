/* يستبدل firebase-messaging-sw.js الحالي.
   لازم يفضل في جذر الريبو: /wave-private-booking/firebase-messaging-sw.js */
importScripts('https://www.gstatic.com/firebasejs/12.19.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.19.0/firebase-messaging-compat.js');

const BASE = 'https://mohanadislam990.github.io/wave-private-booking/';

firebase.initializeApp({
  apiKey: 'AIzaSyARqz_WHes4OdCDHSx14FAAkgNloTOSF7Y',
  authDomain: 'wave-club-580a0.firebaseapp.com',
  projectId: 'wave-club-580a0',
  storageBucket: 'wave-club-580a0.firebasestorage.app',
  messagingSenderId: '17354802356',
  appId: '1:17354802356:web:58f38f3c27b18156ab03e1',
  measurementId: 'G-B94VD456NW'
});

const messaging = firebase.messaging();

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

messaging.onBackgroundMessage((payload) => {
  const d = payload.data || {};
  const n = payload.notification || {};
  const title = n.title || d.title || 'Wave Club';
  const body  = n.body  || d.body  || 'لديك إشعار جديد';

  return self.registration.showNotification(title, {
    body,
    icon: BASE + 'icon-192.png',
    badge: BASE + 'icon-192.png',
    tag: d.tag || 'wave-generic',   // نفس الـ tag = يستبدل القديم بدل ما يتكرر
    renotify: true,
    dir: 'rtl',
    lang: 'ar',
    vibrate: [120, 60, 120],
    requireInteraction: d.important === '1',
    data: { url: d.url || BASE }
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification?.data?.url || BASE;
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if (c.url.startsWith(BASE)) { c.focus(); if ('navigate' in c) c.navigate(url); return; }
      }
      return clients.openWindow(url);
    })
  );
});
