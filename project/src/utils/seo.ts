export interface SEOProps {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  publishedDate?: string;
  modifiedDate?: string;
  author?: string;
  keywords?: string[];
}

export function generateCanonicalURL(pathname: string): string {
  return `https://everything-aloha.netlify.app${pathname}`;
}

export function generateSchema(props: SEOProps) {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": props.type === 'article' ? 'Article' : 'WebPage',
    "headline": props.title,
    "description": props.description,
    "image": props.image,
    "publisher": {
      "@type": "Organization",
      "name": "Everything Aloha",
      "logo": {
        "@type": "ImageObject",
        "url": "https://everything-aloha.netlify.app/favicon.svg"
      }
    }
  };

  if (props.type === 'article') {
    return {
      ...baseSchema,
      "datePublished": props.publishedDate,
      "dateModified": props.modifiedDate || props.publishedDate,
      "author": {
        "@type": "Person",
        "name": props.author || "Everything Aloha"
      }
    };
  }

  return baseSchema;
}

export const defaultKeywords = [
  "hawaii travel",
  "hawaii vacation",
  "hawaiian islands",
  "luxury hawaii",
  "hawaii travel guide",
  "maui vacation",
  "oahu travel",
  "kauai guide",
  "big island hawaii",
  "hawaii hotels",
  "hawaii flights",
  "hawaii activities"
];

export function generateMetaTags(props: SEOProps) {
  const tags = [
    { name: "description", content: props.description },
    { name: "keywords", content: [...defaultKeywords, ...(props.keywords || [])].join(", ") },
    { property: "og:title", content: props.title },
    { property: "og:description", content: props.description },
    { property: "og:type", content: props.type || "website" },
    { property: "og:image", content: props.image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: props.title },
    { name: "twitter:description", content: props.description },
    { name: "twitter:image", content: props.image }
  ];

  if (props.type === 'article') {
    tags.push(
      { property: "article:published_time", content: props.publishedDate },
      { property: "article:modified_time", content: props.modifiedDate || props.publishedDate },
      { property: "article:author", content: props.author || "Everything Aloha" }
    );
  }

  return tags;
}