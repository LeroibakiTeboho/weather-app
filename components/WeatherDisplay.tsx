import { WeatherData } from "@/types/weather";
import Image from "next/image";


export default function WeatherDisplay({ data }: { data: WeatherData }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-gray-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">
            {data.name}, {data.sys.country}
          </h2>
          <p className="text-gray-500">
            {new Date(data.dt * 1000).toLocaleDateString()}
          </p>
        </div>
        <div className="text-right">
          <Image
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].description}
            className="w-24 h-24"
          />
          <p className="capitalize">{data.weather[0].description}</p>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-6xl font-bold">{Math.round(data.main.temp)}°C</p>
        <p className="text-gray-500 mt-2">
          Feels like {Math.round(data.main.feels_like)}°C
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="text-center">
          <p className="text-gray-500">Humidity</p>
          <p className="text-xl font-semibold">{data.main.humidity}%</p>
        </div>
        <div className="text-center">
          <p className="text-gray-500">Wind</p>
          <p className="text-xl font-semibold">{data.wind.speed} m/s</p>
        </div>
        <div className="text-center">
          <p className="text-gray-500">Pressure</p>
          <p className="text-xl font-semibold">{data.main.pressure} hPa</p>
        </div>
      </div>
    </div>
  );
}
