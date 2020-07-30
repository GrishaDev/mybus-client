
self.addEventListener('push', ev => {
  const data = ev.data.json();
  console.log('Got push', data);
  ev.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.message,
      icon: 'https://publicdomainvectors.org/photos/drunken_duck_bus.png'
    })
    );
  });
  //http://mongoosejs.com/docs/images/mongoose5_62x30_transparent.png
  console.log('Loaded service worker!');