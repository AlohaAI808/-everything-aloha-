export * from './types';
export * from './locations';
export * from './api';
export * from './cache';
export * from './ui';

import { Location, WeatherData } from './types';
import { fetchWeatherAPI } from './api';
import { getCachedWeather, setCachedWeather } from './cache';
import { updateWeatherUI, showWeatherError } from './ui';

export async function fetchWeatherData(location: string, coords: Location): Promise<WeatherData> {
  try {
    // Check cache first
    const cached = getCachedWeather(location);
    if (cached) {
      return cached;
    }

    // Fetch fresh data
    const data = await fetchWeatherAPI(coords);
    
    // Update cache
    setCachedWeather(location, data);

    return data;
  } catch (error) {
    console.error(`Weather API error for ${location}:`, error);
    throw error;
  }
}