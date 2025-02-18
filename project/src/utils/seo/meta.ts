export interface MetaProps {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  publishedDate?: string;
  modifiedDate?: string;
  author?: string;
  keywords?: string[];
}

export function generateMetaTags(props: MetaProps) {
  const title = `${props.title} | Gateway to Aloha`;
  const image = props.image || 'https://gatewaytoaloha.com/images/default-og.jpg';
  const keywords = [
    ...(props.keywords || []),
    'hawaii travel',
    'hawaii vacation',
    'luxury hawaii resorts',
    'hawaii travel guide',
    'best hawaii hotels',
    'hawaii vacation planning',
    'hawaii luxury travel',
    'hawaii travel tips'
  ];

  return [
    // Primary Meta Tags
    { name: 'title', content: title },
    { name: 'description', content: props.description },
    { name: 'keywords', content: keywords.join(', ') },
    
    // Open Graph
    { property: 'og:type', content: props.type || 'website' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: props.description },
    { property: 'og:image', content: image },
    { property: 'og:site_name', content: 'Gateway to Aloha' },
    
    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: props.description },
    { name: 'twitter:image', content: image }
  ];
}