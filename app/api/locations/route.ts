import { NextRequest } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  
  if (!query) {
    return new Response(JSON.stringify([]), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const response = await axios.get(
      'https://api.openweathermap.org/geo/1.0/direct',
      {
        params: {
          q: query,
          limit: 5,
          appid: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY,
        },
      }
    );

    return new Response(JSON.stringify(response.data.map((loc: any) => ({
      name: loc.name,
      lat: loc.lat,
      lon: loc.lon,
      country: loc.country,
    }))), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify([]), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}