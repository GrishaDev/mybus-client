import config from 'config';

const publicVapidKey = config.vapidkey;


console.log(navigator.serviceWorker);
console.log(typeof navigator.serviceWorker);

export default async () => {

    if ('serviceWorker' in navigator) {
        console.log('Registering service worker');
        const sub = await run().catch(error => { console.log(error)});
        return sub;
    }
}

function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

async function run() {
  console.log('Registering service worker');
  const registration = await navigator.serviceWorker.register('./worker.js', {scope: '/'});
  console.log('Registered service worker');
  console.log('Registering push');

  const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      // The `urlBase64ToUint8Array()` function is the same as in
      // https://www.npmjs.com/package/web-push#using-vapid-key-for-applicationserverkey
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
  console.log('Registered push');
  console.log(subscription);
  console.log(JSON.stringify(subscription));
  return subscription;
}
