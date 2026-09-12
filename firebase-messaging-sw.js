importScripts('https://www.gstatic.com/firebasejs/12.19.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.19.0/firebase-messaging-compat.js');

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

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message:', payload);

  const title =
    payload.notification?.title ||
    payload.data?.title ||
    'Wave Club';

  const body =
    payload.notification?.body ||
    payload.data?.body ||
    'لديك إشعار جديد';

  self.registration.showNotification(title, {
    body: body,
    icon: '/icon-192.png',
    data: {
      url: 'https://mohanadislam990.github.io/wave-private-booking/'
    }
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const url =
    event.notification?.data?.url ||
    'https://mohanadislam990.github.io/wave-private-booking/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.startsWith('https://mohanadislam990.github.io/wave-private-booking/')) {
          return client.focus();
        }
      }

      return clients.openWindow(url);
    })
  );
});
