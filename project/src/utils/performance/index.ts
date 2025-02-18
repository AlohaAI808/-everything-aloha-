export * from './monitoring';
export * from './resourceHints';
export * from './metrics';

import { measurePageLoad, monitorLongTasks, monitorLayoutShifts } from './monitoring';
import { generateResourceHints, generatePreconnectHints, generatePreloadResources } from './resourceHints';

export function initializePerformanceOptimizations(currentPath: string) {
  // Initialize performance monitoring
  measurePageLoad();
  monitorLongTasks();
  monitorLayoutShifts();

  // Generate and apply resource hints dynamically
  const prefetchPaths = generateResourceHints(currentPath);
  const preconnectDomains = generatePreconnectHints();
  const preloadResources = generatePreloadResources(currentPath);

  // Apply resource hints
  prefetchPaths.forEach(path => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = path;
    document.head.appendChild(link);
  });

  // Apply preconnect hints
  preconnectDomains.forEach(domain => {
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = domain;
    preconnect.crossOrigin = 'anonymous';
    document.head.appendChild(preconnect);

    const dnsPrefetch = document.createElement('link');
    dnsPrefetch.rel = 'dns-prefetch';
    dnsPrefetch.href = domain;
    document.head.appendChild(dnsPrefetch);
  });

  // Apply preload resources
  preloadResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    if (resource.type) link.type = resource.type;
    if (resource.crossorigin) link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}