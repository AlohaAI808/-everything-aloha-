// Utility functions for image handling
export function getImageDimensions(src: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };
    img.onerror = reject;
    img.src = src;
  });
}

export function generatePlaceholder(width: number, height: number): string {
  // Generate a tiny SVG placeholder with shimmer effect
  const shimmer = `
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#f3f4f6" stop-opacity="1">
          <animate attributeName="offset" values="-2; 1" dur="2s" repeatCount="indefinite" />
        </stop>
        <stop offset="50%" stop-color="#e5e7eb" stop-opacity="1">
          <animate attributeName="offset" values="-1.5; 1.5" dur="2s" repeatCount="indefinite" />
        </stop>
        <stop offset="100%" stop-color="#f3f4f6" stop-opacity="1">
          <animate attributeName="offset" values="-1; 2" dur="2s" repeatCount="indefinite" />
        </stop>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)" />
  `;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">${shimmer}</svg>`;
  
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export function isValidImageUrl(url: string): boolean {
  try {
    new URL(url);
    return /\.(jpg|jpeg|png|webp|avif|gif)$/i.test(url);
  } catch {
    return false;
  }
}

export function getImageType(src: string): string {
  const extension = src.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
    case 'avif':
      return 'image/avif';
    case 'gif':
      return 'image/gif';
    default:
      return 'image/jpeg';
  }
}

export const imageConfig = {
  formats: ['webp', 'avif', 'jpg'],
  defaultQuality: 80,
  breakpoints: [640, 768, 1024, 1280, 1536],
  placeholderSize: 16
};