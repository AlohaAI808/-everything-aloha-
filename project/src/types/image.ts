// Type definitions for image components
export interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  class?: string;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  priority?: boolean;
}