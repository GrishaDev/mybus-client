
self.addEventListener('push', ev => {
  const data = ev.data.json();
  // const date = new Date();
  // const hours = date.getHours();
  // const minutes = date.getMinutes();
  // const message = `Bus arrival times: 7, 14, 25 minutes \n Generated at ${hours}:${minutes}`;
  // const data = {title: 'Your bus is coming in 7 minutes', message, id: '1234'};
  console.log('Got push', data);

  const actions = [
    {
      action: 'stop-action',
      title: 'Stop schedule',
      // icon: '/images/demos/action-1-128x128.png'
    },
    {
      action: 'open-action',
      title: 'Open app',
      // icon: '/images/demos/action-2-128x128.png'
    }
  ]

  ev.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.message,
      data: data.id,
      actions: actions,
      icon: `/logo512.png`,
      badge: `/logo192.png`,
      vibrate: [300,100,400]
    }));
});


self.addEventListener('notificationclick', async (event) => {
  const id = event.notification.data;
  if(event.action === 'stop-action') {
    const bla = await fetch(`api/stopschedule/${id}`).catch(err=> console.log('fetch fail'));
    console.log(`stop schedule ${id}`);
  }
  else {
    console.log('open the app');
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
});

  //http://mongoosejs.com/docs/images/mongoose5_62x30_transparent.png

//  registration.showNotification('test', {
//     body: 'hello',
//     icon: 'https://publicdomainvectors.org/photos/drunken_duck_bus.png'
//   });

  console.log('Loaded service worker!');


  

// registration.showNotification('test', {
//     body: 'hello2',
//     icon: `${process.env.PUBLIC_URL}/logo512.png`,
//     badge: `${process.env.PUBLIC_URL}/logo192.png`,
//     actions: actions,
//     vibrate: [300,100,400]
// });