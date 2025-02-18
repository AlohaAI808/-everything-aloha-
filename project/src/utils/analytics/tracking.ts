import type { PageView, UserInteraction } from './types';

// Queue events until analytics is loaded
const eventQueue: Array<PageView | UserInteraction> = [];

export function trackPageView(path: string, title: string): void {
  const pageView: PageView = {
    path,
    title,
    referrer: document.referrer,
    timestamp: Date.now()
  };

  if (window.plausible) {
    window.plausible('pageview', { props: pageView });
  } else {
    eventQueue.push(pageView);
  }
}

export function trackInteraction(
  type: UserInteraction['type'],
  target: string,
  details?: Record<string, any>
): void {
  const interaction: UserInteraction = {
    type,
    target,
    details,
    timestamp: Date.now()
  };

  if (window.plausible) {
    window.plausible(type, { props: interaction });
  } else {
    eventQueue.push(interaction);
  }
}

// Process queued events when analytics loads
export function processEventQueue(): void {
  if (!window.plausible) return;

  while (eventQueue.length > 0) {
    const event = eventQueue.shift();
    if (event) {
      if ('path' in event) {
        window.plausible('pageview', { props: event });
      } else {
        window.plausible(event.type, { props: event });
      }
    }
  }
}