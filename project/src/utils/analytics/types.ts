export interface PageView {
  path: string;
  title: string;
  referrer?: string;
  timestamp: number;
}

export interface UserInteraction {
  type: 'click' | 'search' | 'booking';
  target: string;
  details?: Record<string, any>;
  timestamp: number;
}

export interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
}