export type ImageFormat = 'webp' | 'avif' | 'jpg' | 'png';

export interface ImageOptions {
  width?: number;
  height?: number;
  format?: ImageFormat;
  quality?: number;
  maxWidth?: number;
  formats?: ImageFormat[];
}

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface ImageMetadata extends ImageDimensions {
  format: ImageFormat;
  src: string;
  blurDataUrl?: string;
}