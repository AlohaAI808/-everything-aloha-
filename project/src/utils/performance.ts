// Performance monitoring utilities
export function measurePageLoad(): void {
  if (typeof window === 'undefined') return;

  // Record navigation timing
  const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  if (navigationTiming) {
    const timing = {
      dns: navigationTiming.domainLookupEnd - navigationTiming.domainLookupStart,
      tcp: navigationTiming.connectEnd - navigationTiming.connectStart,
      ttfb: navigationTiming.responseStart - navigationTiming.requestStart,
      download: navigationTiming.responseEnd - navigationTiming.responseStart,
      domInteractive: navigationTiming.domInteractive - navigationTiming.responseEnd,
      domComplete: navigationTiming.domComplete - navigationTiming.domInteractive,
      loadEvent: navigationTiming.loadEventEnd - navigationTiming.loadEventStart,
      total: navigationTiming.loadEventEnd - navigationTiming.startTime
    };

    console.debug('Page Load Timing:', timing);
  }

  // Record resource timing
  const resources = performance.getEntriesByType('resource');
  const resourceTiming = resources.reduce((acc, resource: PerformanceResourceTiming) => {
    const type = resource.initiatorType;
    if (!acc[type]) acc[type] = [];
    acc[type].push({
      name: resource.name,
      duration: resource.duration,
      size: resource.transferSize
    });
    return acc;
  }, {} as Record<string, any[]>);

  console.debug('Resource Timing:', resourceTiming);
}

// Monitor long tasks
export function monitorLongTasks(): void {
  if (typeof window === 'undefined') return;

  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.duration > 50) { // Tasks longer than 50ms
        console.warn('Long Task Detected:', {
          duration: entry.duration,
          startTime: entry.startTime,
          name: entry.name
        });
      }
    });
  });

  observer.observe({ entryTypes: ['longtask'] });
}

// Monitor layout shifts
export function monitorLayoutShifts(): void {
  if (typeof window === 'undefined') return;

  let cumulativeLayoutShift = 0;

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) {
        cumulativeLayoutShift += (entry as any).value;
      }
    }
    console.debug('Cumulative Layout Shift:', cumulativeLayoutShift);
  });

  observer.observe({ entryTypes: ['layout-shift'] });
}

// Initialize performance monitoring
export function initializePerformanceMonitoring(): void {
  if (typeof window === 'undefined') return;

  measurePageLoad();
  monitorLongTasks();
  monitorLayoutShifts();
}