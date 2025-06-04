import { WeatherData } from '@/types/weather';

export default function AlertBadge({ weather }: { weather: WeatherData }) {
  // Simple alert logic - real implementation would use alert data from API
  const getAlertLevel = () => {
    if (weather.weather[0].main === 'Thunderstorm') return 'red';
    if (weather.wind.speed > 10) return 'orange';
    if (weather.main.humidity > 85) return 'yellow';
    return null;
  };

  const alertLevel = getAlertLevel();
  const alertMessages: Record<string, string> = {
    red: 'Severe weather warning! Thunderstorms expected',
    orange: 'Weather advisory: Strong winds',
    yellow: 'Humidity alert: High moisture levels'
  };

  if (!alertLevel) return null;

  return (
    <div className={`mt-4 p-3 rounded-lg bg-${alertLevel}-100 border border-${alertLevel}-300`}>
      <div className="flex items-center">
        <span className={`h-3 w-3 rounded-full bg-${alertLevel}-500 mr-2`}></span>
        <span className={`font-semibold text-${alertLevel}-800`}>
          {alertMessages[alertLevel]}
        </span>
      </div>
    </div>
  );
}