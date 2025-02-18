import type { PerformanceMetrics } from './types';

export function captureWebVitals(): void {
  if ('web-vitals' in window) {
    import('web-vitals').then(({ onFCP, onLCP, onFID, onCLS, onTTFB }) => {
      onFCP(metric => reportMetric('fcp', metric.value));
      onLCP(metric => reportMetric('lcp', metric.value));
      onFID(metric => reportMetric('fid', metric.value));
      onCLS(metric => reportMetric('cls', metric.value));
      onTTFB(metric => reportMetric('ttfb', metric.value));
    });
  }
}

function reportMetric(name: keyof PerformanceMetrics, value: number): void {
  if (window.plausible) {
    window.plausible('performance', {
      props: {
        metric: name,
        value: Math.round(value),
        path: window.location.pathname
      }
    });
  }
}

export function measurePageLoad(): void {
  if (window.performance) {
    const pageLoadTime = window.performance.now();
    window.addEventListener('load', () => {
      const loadTime = window.performance.now() - pageLoadTime;
      if (window.plausible) {
        window.plausible('page_load', {
          props: {
            duration: Math.round(loadTime),
            path: window.location.pathname
          }
        });
      }
    });
  }
}