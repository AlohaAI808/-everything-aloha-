// Moving weather API logic to dedicated service
import type { Location, WeatherData } from '../../types/weather';

const API_KEY = '50db61163805d4977139770e0cb72c86';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function getWeather(coords: Location): Promise<WeatherData> {
  try {
    const params = new URLSearchParams({
      lat: coords.lat.toString(),
      lon: coords.lon.toString(),
      units: 'imperial',
      appid: API_KEY
    });

    const response = await fetch(`${BASE_URL}?${params}`);
    if (!response.ok) {
      throw new Error(`Weather API returned ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Weather API error:', error);
    throw error;
  }
}