import type { WeatherData } from './types';

export function updateWeatherUI(location: string, data: WeatherData): void {
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