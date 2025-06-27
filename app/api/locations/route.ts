import { NextRequest } from "next/server";
import axios from "axios";

// Define interface for location data
interface GeoLocation {
  name: string;
  lat: number;
  lon: number;
  country: string;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!query) {
    return new Response(JSON.stringify([]), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const response = await axios.get(
      "https://api.openweathermap.org/geo/1.0/direct",
      {
        params: {
          q: query,
          limit: 5,
          appid: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY,
        },
      }
    );

    // Use defined interface instead of any
    const locations: GeoLocation[] = response.data.map((loc: GeoLocation) => ({
      name: loc.name,
      lat: loc.lat,
      lon: loc.lon,
      country: loc.country,
    }));

    return new Response(JSON.stringify(locations), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Use the error variable (logging to console)
    console.error("Geocoding API error:", error);
    return new Response(JSON.stringify([]), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
