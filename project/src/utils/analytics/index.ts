export * from './types';
export * from './tracking';
export * from './performance';

import { trackPageView, processEventQueue } from './tracking';
import { captureWebVitals, measurePageLoad } from './performance';

export function initializeAnalytics(): void {
  // Initialize Plausible Analytics
  const script = document.createElement('script');
  script.defer = true;
  script.dataset.domain = 'everything-aloha.netlify.app';
  script.src = 'https://plausible.io/js/script.js';
  
  script.onload = () => {
    processEventQueue();
    captureWebVitals();
    measurePageLoad();
    
    // Track initial page view
    trackPageView(
      window.location.pathname,
      document.title
    );
  };

  document.head.appendChild(script);
}