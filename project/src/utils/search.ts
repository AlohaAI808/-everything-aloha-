export interface SearchResult {
  title: string;
  description: string;
  url: string;
  type: 'page' | 'blog' | 'island';
  image?: string;
}

const searchIndex: SearchResult[] = [
  {
    title: "Ultimate Guide to Oahu's Most Exclusive Luxury Resorts (2024)",
    description: "Discover Oahu's finest luxury resorts, from the prestigious Halekulani to the ultra-exclusive Ritz-Carlton Residences.",
    url: "/blog/2024-04-20-oahu-luxury-resorts-guide",
    type: "blog",
    image: "https://images.unsplash.com/photo-1507876466758-bc54f384809c"
  },
  {
    title: "Maui's Most Exclusive Luxury Resorts: Ultimate Guide (2024)",
    description: "Experience the height of Hawaiian luxury at Maui's most prestigious resorts.",
    url: "/blog/2024-04-25-maui-luxury-resorts-guide",
    type: "blog",
    image: "https://images.unsplash.com/photo-1542259009477-d625272157b7"
  },
  {
    title: "Luxury Experiences",
    description: "Discover exclusive luxury experiences across the Hawaiian Islands",
    url: "/luxury-experiences",
    type: "page",
    image: "https://images.unsplash.com/photo-1542259009477-d625272157b7"
  },
  {
    title: "Smart Luxury Tips",
    description: "Learn how to experience Hawaiian luxury for less",
    url: "/smart-luxury",
    type: "page",
    image: "https://images.unsplash.com/photo-1505852679233-d9fd70aff56d"
  },
  {
    title: "Maui Luxury Guide",
    description: "Experience world-class luxury resorts and pristine beaches",
    url: "/islands/maui",
    type: "island",
    image: "https://images.unsplash.com/photo-1542259009477-d625272157b7"
  },
  {
    title: "Oahu Luxury Guide",
    description: "Discover the perfect blend of city life and tropical paradise",
    url: "/islands/oahu",
    type: "island",
    image: "https://images.unsplash.com/photo-1507876466758-bc54f384809c"
  }
];

export function searchContent(query: string): SearchResult[] {
  const searchTerm = query.toLowerCase();
  return searchIndex.filter(item => 
    item.title.toLowerCase().includes(searchTerm) ||
    item.description.toLowerCase().includes(searchTerm)
  );
}