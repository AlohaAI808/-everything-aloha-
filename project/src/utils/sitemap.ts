interface SitemapItem {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export function generateSitemapXML(items: SitemapItem[]): string {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${items.map(item => `
    <url>
      <loc>${item.url}</loc>
      ${item.lastmod ? `<lastmod>${item.lastmod}</lastmod>` : ''}
      ${item.changefreq ? `<changefreq>${item.changefreq}</changefreq>` : ''}
      ${item.priority ? `<priority>${item.priority}</priority>` : ''}
    </url>
  `).join('')}
</urlset>`;

  return xml.trim();
}

export function getSitemapItems(): SitemapItem[] {
  const baseUrl = 'https://gatewaytoaloha.com';
  
  return [
    {
      url: `${baseUrl}/`,
      changefreq: 'daily',
      priority: 1.0
    },
    {
      url: `${baseUrl}/blog`,
      changefreq: 'daily',
      priority: 0.9
    },
    {
      url: `${baseUrl}/islands/maui`,
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/islands/oahu`,
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/islands/kauai`,
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/islands/big-island`,
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/luxury-experiences`,
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/smart-luxury`,
      changefreq: 'weekly',
      priority: 0.7
    }
  ];
}