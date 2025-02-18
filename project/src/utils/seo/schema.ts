export interface SchemaProps {
  type: 'website' | 'article' | 'product';
  title: string;
  description: string;
  image?: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
}

export function generateSchema(props: SchemaProps) {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': props.type.charAt(0).toUpperCase() + props.type.slice(1),
    'name': props.title,
    'description': props.description,
    'image': props.image,
    'url': props.url,
    'publisher': {
      '@type': 'Organization',
      'name': 'Gateway to Aloha',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://gatewaytoaloha.com/favicon.svg'
      }
    }
  };

  if (props.type === 'article') {
    return {
      ...baseSchema,
      'datePublished': props.datePublished,
      'dateModified': props.dateModified || props.datePublished,
      'author': {
        '@type': 'Person',
        'name': props.author || 'Gateway to Aloha'
      }
    };
  }

  return baseSchema;
}