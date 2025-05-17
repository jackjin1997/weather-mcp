import { WeatherService } from "../services/weatherService";

/**
 * MCP Function to get weather information by city
 *
 * @param city City name or adcode
 * @returns Weather information for the specified city
 */
export async function mcp_amap_maps_maps_weather(params: { city: string }) {
  const { city } = params;

  if (!city) {
    return {
      status: "ERROR",
      error: "City parameter is required",
    };
  }

  try {
    const weatherService = new WeatherService();
    const currentWeather = await weatherService.getCurrentWeather(city);
    const weatherForecast = await weatherService.getWeatherForecast(city);

    if (currentWeather.status === "1" && weatherForecast.status === "1") {
      return {
        status: "OK",
        data: {
          current: currentWeather.lives?.[0] || null,
          forecast: weatherForecast.forecasts?.[0]?.casts || [],
        },
      };
    } else {
      return {
        status: "ERROR",
        error:
          currentWeather.info ||
          weatherForecast.info ||
          "Failed to fetch weather data",
      };
    }
  } catch (error) {
    console.error("Error in weather MCP function:", error);
    return {
      status: "ERROR",
      error: "Failed to fetch weather data",
    };
  }
}
