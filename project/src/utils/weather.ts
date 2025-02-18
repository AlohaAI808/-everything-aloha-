interface Location {
  lat: number;
  lon: number;
}

interface Locations {
  [key: string]: Location;
}

interface WeatherCache {
  [key: string]: {
    data: any;
    timestamp: number;
  }
}

// Cache weather data for 30 minutes
const CACHE_DURATION = 30 * 60 * 1000;
const weatherCache: WeatherCache = {};

export const locations: Locations = {
  honolulu: { lat: 21.3069, lon: -157.8583 },
  lahaina: { lat: 20.8783, lon: -156.6825 },
  lihue: { lat: 21.9811, lon: -159.3711 },
  kona: { lat: 19.6398, lon: -155.9969 }
};

export async function fetchWeatherData(location: string, coords: Location): Promise<any> {
  try {
    // Check cache first
    const cached = weatherCache[location];
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    const API_KEY = '50db61163805d4977139770e0cb72c86';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=imperial&appid=${API_KEY}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather API returned ${response.status}`);
    }

    const data = await response.json();
    
    // Update cache
    weatherCache[location] = {
      data,
      timestamp: Date.now()
    };

    return data;
  } catch (error) {
    console.error(`Weather API error for ${location}:`, error);
    throw error;
  }
}

export function updateWeatherUI(location: string, data: any): void {
  const weatherCard = document.querySelector(`[data-location="${location}"] .weather-data`);
  if (!weatherCard) return;

  weatherCard.classList.remove('animate-pulse');
  weatherCard.innerHTML = `
    <div class="flex items-center justify-between p-2 rounded-lg bg-white/50">
      <div>
        <div class="text-3xl font-bold text-blue-900">${Math.round(data.main.temp)}°F</div>
        <div class="text-sm text-gray-600 capitalize">${data.weather[0].description}</div>
      </div>
      <img 
        src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
        alt="${data.weather[0].description}"
        class="w-16 h-16"
        loading="lazy"
      />
    </div>
    <div class="mt-3 grid grid-cols-2 gap-2 text-sm">
      <div class="bg-white/50 p-2 rounded">
        <span class="text-gray-600">Humidity</span>
        <div class="font-semibold">${data.main.humidity}%</div>
      </div>
      <div class="bg-white/50 p-2 rounded">
        <span class="text-gray-600">Wind</span>
        <div class="font-semibold">${Math.round(data.wind.speed)} mph</div>
      </div>
    </div>
  `;
}

export function showWeatherError(location: string): void {
  const weatherCard = document.querySelector(`[data-location="${location}"] .weather-data`);
  if (!weatherCard) return;

  weatherCard.classList.remove('animate-pulse');
  weatherCard.innerHTML = `
    <div class="text-center p-4">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-red-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <div class="text-sm text-gray-500 mb-2">Unable to load weather data</div>
      <button 
        class="text-blue-500 hover:text-blue-600 text-xs font-medium"
        onclick="window.dispatchEvent(new CustomEvent('retryWeather', {detail: '${location}'}))"
      >
        Try Again
      </button>
    </div>
  `;
}