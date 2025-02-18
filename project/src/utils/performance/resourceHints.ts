// Resource hint utilities
export function generateResourceHints(currentPath: string) {
  // Base paths that should always be prefetched
  const basePaths = ['/blog', '/islands/maui', '/islands/oahu'];
  
  // Dynamic paths based on current location
  const dynamicPaths = [];
  
  if (currentPath.startsWith('/blog/')) {
    // Prefetch related blog posts
    dynamicPaths.push('/blog');
  } else if (currentPath.startsWith('/islands/')) {
    // Prefetch other island pages
    const islands = ['maui', 'oahu', 'kauai', 'big-island'];
    const currentIsland = currentPath.split('/').pop();
    dynamicPaths.push(...islands
      .filter(island => island !== currentIsland)
      .map(island => `/islands/${island}`));
  }
  
  return [...new Set([...basePaths, ...dynamicPaths])];
}

export function generatePreconnectHints() {
  return [
    'https://images.unsplash.com',
    'https://res.cloudinary.com',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ];
}

export function generatePreloadResources(currentPath: string) {
  const resources = [
    { href: '/fonts/inter-var.woff2', as: 'font', type: 'font/woff2', crossorigin: true },
    { href: '/images/logo.svg', as: 'image' }
  ];

  // Add page-specific preloads
  if (currentPath === '/') {
    resources.push({
      href: 'https://images.unsplash.com/photo-1542259009477-d625272157b7?auto=format&fit=crop&w=2000&q=80',
      as: 'image'
    });
  }

  return resources;
}