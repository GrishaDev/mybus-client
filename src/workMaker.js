import config from 'config';

const publicVapidKey = config.vapidkey;
let registration;

// console.log(navigator.serviceWorker);
// console.log(typeof navigator.serviceWorker);

(async ()=> {
    console.log('Registering service worker');
    if ('serviceWorker' in navigator) {
        registration = await navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/worker.js`, {scope: '/public'}).catch(err=> console.log(err));
        console.log('Registered service worker');
    }
    else console.log('no service worker');
})();


export default async () => {

    if ('serviceWorker' in navigator) {
        console.log('Registering service worker');
        const sub = await run().catch(error => { console.log(error)});
        return sub;
    }
}

function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    //eslint-disable-next-line
    var base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

async function run() {

    // const shit = await registration.pushManager.getSubscription();
    // await shit.unsubscribe();
  const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      // The `urlBase64ToUint8Array()` function is the same as in
      // https://www.npmjs.com/package/web-push#using-vapid-key-for-applicationserverkey
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    }).catch(err=> console.log(err));
  console.log('Registered push');
  return subscription;
}
