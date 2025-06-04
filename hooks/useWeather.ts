import axios from "axios";
import { useState, useEffect } from "react";
import { WeatherData, ForecastData } from "@/types/weather";

const API_URL = "https://api.openweathermap.org/data/2.5";

export const useWeather = (
  lat: number | null,
  lon: number | null,
  unit: "metric" | "imperial" = "metric"
) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lat || !lon) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const [weatherRes, forecastRes] = await Promise.all([
          axios.get(`${API_URL}/weather`, {
            params: {
              lat,
              lon,
              appid: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY,
              units: unit,
            },
          }),
          axios.get(`${API_URL}/forecast`, {
            params: {
              lat,
              lon,
              appid: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY,
              units: unit,
              cnt: 7,
            },
          }),
        ]);

        setWeather(weatherRes.data);
        setForecast(forecastRes.data);
      } catch (err) {
        setError("Failed to fetch weather data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lat, lon, unit]); // Add unit as dependency

  return { weather, forecast, loading, error };
};
