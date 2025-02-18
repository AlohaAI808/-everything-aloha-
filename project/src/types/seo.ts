export interface MetaProps {
  title: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
  keywords?: string[];
  publishedDate?: string;
  modifiedDate?: string;
  author?: string;
}