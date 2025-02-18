import { Cache } from '../../utils/cache';
import { WeatherData } from '../../types/weather';
import { WEATHER_CONFIG } from '../../config/constants';

// Create weather-specific cache instance
export const weatherCache = new Cache<WeatherData>({
  duration: WEATHER_CONFIG.cacheDuration
});