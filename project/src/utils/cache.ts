// Generic caching utility
interface CacheItem<T> {
  data: T;
  timestamp: number;
}

interface CacheOptions {
  duration: number;
}

export class Cache<T> {
  private cache: Map<string, CacheItem<T>> = new Map();
  private options: CacheOptions;

  constructor(options: CacheOptions) {
    this.options = options;
  }

  get(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > this.options.duration) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  set(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  clear(): void {
    this.cache.clear();
  }
}