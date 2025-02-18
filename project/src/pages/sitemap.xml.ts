import type { APIRoute } from 'astro';
import { generateSitemapXML, getSitemapItems } from '../utils/sitemap';

export const GET: APIRoute = async ({ site, url }) => {
  const items = getSitemapItems({ site, url } as any);
  const xml = generateSitemapXML(items);

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
};