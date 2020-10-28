'use strict';

async function registerServiceWorker(script, scope) {
  try {
    await navigator.serviceWorker.register(script, { scope });
    return 'OK';
  } catch (error) {
    return `EXCEPTION: ${error}`;
  }
}

async function postMessageToServiceWorker(scope, message) {
  const registration = await navigator.serviceWorker.getRegistration(scope);
  if (!registration) {
    return `ERROR: No service worker registration exists for scope: '${
      scope}.'`;
  }
  const serviceWorker =
    registration.active || registration.waiting || registration.installing;

  var channel = new MessageChannel();

  let promise = new Promise((resolve, reject) => {
    channel.port1.onmessage = e => resolve(e.data);
  });

  serviceWorker.postMessage(message, [channel.port2]);
  let result = await promise;
  return result;
}
