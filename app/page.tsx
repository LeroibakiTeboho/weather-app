"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import SearchBar from "@/components/SearchBar";
import WeatherDisplay from "@/components/WeatherDisplay";
import Forecast from "@/components/Forecast";
import AlertBadge from "@/components/AlertBadge";
import { useWeather } from "@/hooks/useWeather";
import { useGeolocation } from "@/hooks/useLocation";
import { Location } from "@/types/weather";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import dynamic from "next/dynamic";

export default function Home() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [locations, setLocations] = useState<Location[]>([]);
  const [activeLocation, setActiveLocation] = useState<Location | null>(null);
  const { location: currentLocation, loading: geoLoading } = useGeolocation();
  const { weather, forecast, loading, error } = useWeather(
    activeLocation?.lat || null,
    activeLocation?.lon || null,
    unit
  );

  const WeatherMap = dynamic(() => import("@/components/WeatherMap"), {
    ssr: false,
  });

  // Set current location as default
  useEffect(() => {
    if (currentLocation && !activeLocation) {
      setActiveLocation(currentLocation);
      setLocations((prev) => [currentLocation, ...prev]);
    }
  }, [currentLocation, activeLocation]);

  const handleLocationSelect = (location: Location) => {
    if (
      !locations.some(
        (loc) => loc.lat === location.lat && loc.lon === location.lon
      )
    ) {
      setLocations((prev) => [...prev, location]);
    }
    setActiveLocation(location);
    toast.success(`Showing weather for ${location.name}`);
  };

  const removeLocation = (index: number) => {
    const newLocations = [...locations];
    const removed = newLocations.splice(index, 1);

    if (removed[0].lat === activeLocation?.lat) {
      setActiveLocation(newLocations[0] || null);
    }

    setLocations(newLocations);
  };

  return (
    <div className="min-h-screen pb-20 bg-gradient-to-br from-blue-50 to-cyan-100 p-4 text-gray-500">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-5xl text-gray-600 font-extrabold text-center my-8">
            Weather Forecast
          </h1>
          <div className="flex items-center space-x-2">
            <span className="text-gray-700">Units:</span>
            <button
              onClick={() => setUnit("metric")}
              className={`px-3 py-1 rounded-full ${
                unit === "metric" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              °C
            </button>
            <button
              onClick={() => setUnit("imperial")}
              className={`px-3 py-1 rounded-full ${
                unit === "imperial" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              °F
            </button>
          </div>
        </div>

        <SearchBar onSelect={handleLocationSelect} />

        {geoLoading && (
          <p className="text-center m-8 text-3xl">Detecting your location...</p>
        )}
        {loading && <LoadingSkeleton />}
        {error && <p className="text-center text-red-500 mt-8">{error}</p>}

        <div className="flex space-x-2 mt-4 overflow-x-auto pb-4">
          {locations.map((location, index) => (
            <div key={index} className="relative group">
              <button
                onClick={() => setActiveLocation(location)}
                className={`px-4 py-2 mt-8 rounded-full whitespace-nowrap flex items-center ${
                  activeLocation?.lat === location.lat
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                {location.name}, {location.country}
              </button>
              <button
                onClick={() => removeLocation(index)}
                className="absolute top-4 -right-2 bg-red-500 rounded-full w-5 h-5 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {geoLoading && (
          <p className="text-center mt-8">Detecting your location...</p>
        )}
        {loading && <p className="text-center mt-8">Loading weather data...</p>}
        {error && <p className="text-center text-red-500 mt-8">{error}</p>}

        {weather && activeLocation && (
          <>
            <WeatherDisplay data={weather} />
            <AlertBadge weather={weather} />
            {forecast && <Forecast data={forecast} />}
            <WeatherMap lat={activeLocation.lat} lon={activeLocation.lon} />
          </>
        )}

        {!loading && !weather && (
          <div className="text-center mt-12">
            <p className="text-xl text-gray-600">No weather data available</p>
            <p className="mt-2 text-gray-500">
              Search for a location to see weather information
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
