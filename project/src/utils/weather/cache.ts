import type { WeatherCache, WeatherData } from './types';

const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes
const weatherCache: WeatherCache = {};

export function getCachedWeather(location: string): WeatherData | null {
  const cached = weatherCache[location];
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
}

export function setCachedWeather(location: string, data: WeatherData): void {
  weatherCache[location] = {
    data,
    timestamp: Date.now()
  };
}