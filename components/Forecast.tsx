import { ForecastData } from "@/types/weather";

export default function Forecast({ data }: { data: ForecastData }) {
  return (
    <div className="mt-8 bg-white rounded-xl shadow-md p-6">
      <h3 className="text-2xl text-gray-500 font-bold mb-4">7-Day Forecast</h3>
      <div className="grid grid-cols-7 gap-2">
        {data.list.slice(0, 7).map((day, index) => (
          <div key={index} className="text-center text-gray-500">
            <p className="font-semibold">
              {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt={day.weather[0].description}
              className="mx-auto my-2"
            />
            <p className="font-bold">{Math.round(day.main.temp)}°C</p>
            <p className="text-sm text-gray-500">{day.wind.speed} m/s</p>
          </div>
        ))}
      </div>
    </div>
  );
}
