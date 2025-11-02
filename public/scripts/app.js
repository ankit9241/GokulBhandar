// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Register service worker
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}
