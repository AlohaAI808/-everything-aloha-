// Image optimization utilities
import type { ImageFormat, ImageOptions } from './types';
import { imageConfig } from '../../config/constants';

export function getOptimalImageSize(
  containerWidth: number,
  pixelRatio: number = 1
): number {
  const sizes = imageConfig.breakpoints;
  const optimal = sizes.find(size => size >= containerWidth * pixelRatio) || sizes[sizes.length - 1];
  return optimal;
}

export function generateSrcSet(
  src: string,
  options: ImageOptions = {}
): string {
  const { formats = imageConfig.formats, maxWidth = 1920 } = options;
  const breakpoints = imageConfig.breakpoints.filter(bp => bp <= maxWidth);
  
  return formats
    .map(format => {
      const srcSet = breakpoints
        .map(width => `${getOptimizedImageUrl(src, { width, format })} ${width}w`)
        .join(', ');
      return `${srcSet} ${format === 'webp' ? 'type="image/webp"' : ''}`;
    })
    .join(', ');
}

export function getOptimizedImageUrl(
  src: string,
  options: ImageOptions = {}
): string {
  if (!src || src.startsWith('data:') || src.startsWith('blob:')) {
    return src;
  }

  const {
    width,
    height,
    format,
    quality = imageConfig.defaultQuality
  } = options;

  // For external images, return as is
  if (src.startsWith('http')) {
    return src;
  }

  // For local images, construct optimized URL
  const params = new URLSearchParams();
  if (width) params.set('w', width.toString());
  if (height) params.set('h', height.toString());
  if (format) params.set('f', format);
  if (quality) params.set('q', quality.toString());

  return `/_image/${encodeURIComponent(src)}?${params.toString()}`;
}