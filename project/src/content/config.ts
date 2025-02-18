import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    image: z.string(),
    excerpt: z.string(),
    category: z.string(),
    keywords: z.string().optional()
  })
});

const islands = defineCollection({
  schema: z.object({
    title: z.string(),
    heroImage: z.string(),
    heroTitle: z.string(),
    heroSubtitle: z.string(),
    description: z.string(),
    highlights: z.array(z.object({
      title: z.string(),
      description: z.string()
    })),
    travelTips: z.array(z.string())
  })
});

export const collections = {
  blog,
  islands
};