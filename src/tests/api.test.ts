import axios from "axios";
import { createServer } from "http";
import express from "express";
import { WeatherService } from "../services/weatherService";
import { WeatherController } from "../controllers/weatherController";

// Mock WeatherService
jest.mock("../services/weatherService");

describe("API Integration Tests", () => {
  let server: any;
  let PORT: number;
  let api: string;
  let app: express.Application;

  beforeAll(async () => {
    // Create a test server
    app = express();
    app.use(express.json());

    // Create simplified routes for testing
    app.get("/api/weather/current", (req, res) => {
      const controller = new WeatherController();
      controller.getCurrentWeather(req, res);
    });

    app.get("/api/weather/forecast", (req, res) => {
      const controller = new WeatherController();
      controller.getWeatherForecast(req, res);
    });

    // Start server on random port
    PORT = 40000 + Math.floor(Math.random() * 10000);
    api = `http://localhost:${PORT}`;

    server = createServer(app);
    await new Promise<void>((resolve) => {
      server.listen(PORT, () => {
        resolve();
      });
    });
  });

  afterAll(async () => {
    // Shutdown server
    await new Promise<void>((resolve) => {
      server.close(() => {
        resolve();
      });
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Weather API", () => {
    it("should return 400 if city parameter is missing", async () => {
      try {
        await axios.get(`${api}/api/weather/current`);
        fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.response.status).toBe(400);
        expect(error.response.data).toEqual({
          success: false,
          message: "City parameter is required",
        });
      }
    });
  });
});
