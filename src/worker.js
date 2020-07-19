console.log('Loaded service worker!');

self.addEventListener('push', ev => {
  const data = ev.data.json();
  console.log('Got push', data);
  ev.waitUntil(
    self.registration.showNotification(data.title, {
        body: data.message,
        icon: 'http://mongoosejs.com/docs/images/mongoose5_62x30_transparent.png'
      })
  );
});