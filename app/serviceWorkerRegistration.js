export function registerServiceWorker(setUpdateAvailable) {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then((registration) => {
      console.log('[Service Worker] Registered:', registration);

      if (registration.waiting) {
        console.log("Waiting service worker found. Activating...");
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
      
      if (!navigator.serviceWorker.controller) {
        // Reload the page to let the service worker take control
        window.location.reload();
      }

      registration.onupdatefound = () => {
        console.log('[Service Worker] New update found!');
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('[Service Worker] Update ready, notifying user...');
            setUpdateAvailable(true);
          }
        };
      };
    });

    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'UPDATE_AVAILABLE') {
        console.log('[Service Worker] Update available message received.');
        setUpdateAvailable(true);
      }
    });
  }
}

// Function to manually check for updates
export function checkForUpdate() {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    console.log('[Service Worker] Checking for updates...');
    navigator.serviceWorker.controller.postMessage('CHECK_FOR_UPDATE');
  }
}