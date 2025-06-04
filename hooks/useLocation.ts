import { useState, useEffect } from 'react';
import { Location } from '@/types/weather';
import toast from 'react-hot-toast';

export const useGeolocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
          );
          const data = await response.json();
          
          if (data && data.length > 0) {
            setLocation({
              name: data[0].name,
              lat: latitude,
              lon: longitude,
              country: data[0].country,
            });
          } else {
            setError('Location not found');
          }
        } catch (err) {
          toast.error('Failed to fetch location data');
          setError('Location service error');
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
  }, []);

  return { location, loading, error };
};