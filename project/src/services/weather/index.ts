import { getWeather } from '../api/weather';
import { weatherCache } from '../cache/weatherCache';
import type { Location, WeatherData } from '../../types/weather';
import { WEATHER_CONFIG } from '../../config/constants';

export async function getLocationWeather(location: string): Promise<WeatherData> {
  try {
    // Check cache first
    const cached = weatherCache.get(location);
    if (cached) return cached;

    // Get coordinates for location
    const coords = WEATHER_CONFIG.locations[location];
    if (!coords) {
      throw new Error(`Invalid location: ${location}`);
    }

    // Fetch fresh data
    const data = await getWeather(coords);
    
    // Update cache
    weatherCache.set(location, data);

    return data;
  } catch (error) {
    console.error(`Weather error for ${location}:`, error);
    throw error;
  }
}