// A no-op fetch handler.
self.addEventListener('fetch', e => {});

self.addEventListener('message', async function(event) {
  if (event.data.command == 'setAppBadge') {
    await navigator.setAppBadge(event.data.badge);
    event.ports[0].postMessage('OK');
  }
  event.ports[0].postMessage('ERROR');
});
