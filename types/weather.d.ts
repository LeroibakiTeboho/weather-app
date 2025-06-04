export interface WeatherData {
  coord: { lon: number; lat: number };
  weather: [{ id: number; main: string; description: string; icon: string }];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: { speed: number; deg: number };
  name: string;
  dt: number;
  sys: { country: string; sunrise: number; sunset: number };
}

export interface ForecastData {
  list: {
    dt: number;
    main: { temp: number; humidity: number };
    weather: [{ icon: string; description: string }];
    wind: { speed: number };
  }[];
  city: { name: string };
}

export interface Location {
  name: string;
  lat: number;
  lon: number;
  country: string;
}