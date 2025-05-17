import { Request, Response } from "express";
import { WeatherService } from "../services/weatherService";

export class WeatherController {
  private weatherService: WeatherService;

  constructor() {
    this.weatherService = new WeatherService();
  }

  /**
   * Get current weather by city
   */
  public getCurrentWeather = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { city } = req.query;

      if (!city || typeof city !== "string") {
        res.status(400).json({
          success: false,
          message: "City parameter is required",
        });
        return;
      }

      const weatherData = await this.weatherService.getCurrentWeather(city);

      if (weatherData.status === "1") {
        res.status(200).json({
          success: true,
          data: weatherData.lives,
        });
      } else {
        res.status(400).json({
          success: false,
          message: weatherData.info || "Failed to fetch weather data",
        });
      }
    } catch (error) {
      console.error("Controller error fetching current weather:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch weather data",
      });
    }
  };

  /**
   * Get weather forecast by city
   */
  public getWeatherForecast = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { city } = req.query;

      if (!city || typeof city !== "string") {
        res.status(400).json({
          success: false,
          message: "City parameter is required",
        });
        return;
      }

      const forecastData = await this.weatherService.getWeatherForecast(city);

      if (forecastData.status === "1") {
        res.status(200).json({
          success: true,
          data: forecastData.forecasts,
        });
      } else {
        res.status(400).json({
          success: false,
          message: forecastData.info || "Failed to fetch forecast data",
        });
      }
    } catch (error) {
      console.error("Controller error fetching weather forecast:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch forecast data",
      });
    }
  };
}
