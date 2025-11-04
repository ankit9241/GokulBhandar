import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './styles/globals.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

// Only register service worker in production
if (import.meta.env.PROD) {
  import('./serviceWorkerRegistration').then(({ register }) => {
    register({
      onSuccess: (registration) => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      },
      onUpdate: (registration) => {
        console.log('New content is available; please refresh.');
        if (window.confirm('New version available! Would you like to update?')) {
          const waitingServiceWorker = registration.waiting;
          if (waitingServiceWorker) {
            waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
            window.location.reload();
          }
        }
      },
    });
  });
}
