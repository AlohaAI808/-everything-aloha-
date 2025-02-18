export interface Location {
  lat: number;
  lon: number;
}

export interface Locations {
  [key: string]: Location;
}

export interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

export interface WeatherCache {
  [key: string]: {
    data: WeatherData;
    timestamp: number;
  };
}