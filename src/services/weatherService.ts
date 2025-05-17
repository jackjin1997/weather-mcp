import axios from "axios";
import { WeatherResponse } from "../types/weather";
import dotenv from "dotenv";

dotenv.config();

const AMAP_KEY = process.env.AMAP_KEY;

export class WeatherService {
  /**
   * Get current weather information by city name or adcode
   * @param city City name or adcode
   * @returns WeatherResponse
   */
  public async getCurrentWeather(city: string): Promise<WeatherResponse> {
    try {
      const response = await axios.get(
        "https://restapi.amap.com/v3/weather/weatherInfo",
        {
          params: {
            key: AMAP_KEY,
            city,
            extensions: "base",
            output: "JSON",
          },
        }
      );

      return response.data as WeatherResponse;
    } catch (error) {
      console.error("Error fetching current weather:", error);
      throw error;
    }
  }

  /**
   * Get weather forecast information by city name or adcode
   * @param city City name or adcode
   * @returns WeatherResponse
   */
  public async getWeatherForecast(city: string): Promise<WeatherResponse> {
    try {
      const response = await axios.get(
        "https://restapi.amap.com/v3/weather/weatherInfo",
        {
          params: {
            key: AMAP_KEY,
            city,
            extensions: "all",
            output: "JSON",
          },
        }
      );

      return response.data as WeatherResponse;
    } catch (error) {
      console.error("Error fetching weather forecast:", error);
      throw error;
    }
  }
}
