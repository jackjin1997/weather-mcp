import { Router } from "express";
import { WeatherController } from "../controllers/weatherController";

const router = Router();
const weatherController = new WeatherController();

// Get current weather by city
router.get("/current", weatherController.getCurrentWeather);

// Get weather forecast by city
router.get("/forecast", weatherController.getWeatherForecast);

export default router;
