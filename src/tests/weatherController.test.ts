import { Request, Response } from "express";
import { WeatherController } from "../controllers/weatherController";
import { WeatherService } from "../services/weatherService";

// Mock WeatherService
jest.mock("../services/weatherService");

describe("WeatherController", () => {
  let weatherController: WeatherController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Setup mock response
    jsonMock = jest.fn();
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jsonMock,
    };

    // Create new controller for each test
    weatherController = new WeatherController();
  });

  describe("getCurrentWeather", () => {
    it("should return 400 if city parameter is missing", async () => {
      // Setup mock request with no city
      mockRequest = {
        query: {},
      };

      // Call controller
      await weatherController.getCurrentWeather(
        mockRequest as Request,
        mockResponse as Response
      );

      // Expect response
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        message: "City parameter is required",
      });
    });

    it("should return weather data for a valid city", async () => {
      // Setup mock request
      mockRequest = {
        query: { city: "北京" },
      };

      // Setup mock service response
      const mockWeatherData = {
        status: "1",
        count: "1",
        info: "OK",
        infocode: "10000",
        lives: [
          {
            province: "北京市",
            city: "北京市",
            adcode: "110000",
            weather: "晴",
            temperature: "28",
            winddirection: "西南",
            windpower: "≤3",
            humidity: "40",
            reporttime: "2023-08-10 16:00:00",
          },
        ],
      };

      // Mock the service method
      const mockGetCurrentWeather = jest
        .fn()
        .mockResolvedValue(mockWeatherData);

      // Manually replace the method in the prototype
      const originalPrototype =
        Object.getPrototypeOf(weatherController).constructor.prototype;
      const originalWeatherService = originalPrototype.weatherService;

      // Create a new instance with our mock
      originalPrototype.weatherService = {
        getCurrentWeather: mockGetCurrentWeather,
      };

      // Call controller
      await weatherController.getCurrentWeather(
        mockRequest as Request,
        mockResponse as Response
      );

      // Restore original
      originalPrototype.weatherService = originalWeatherService;

      // Expect service to be called
      expect(mockGetCurrentWeather).toHaveBeenCalledWith("北京");

      // Expect response
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        data: mockWeatherData.lives,
      });
    });

    it("should handle API errors gracefully", async () => {
      // Setup mock request
      mockRequest = {
        query: { city: "北京" },
      };

      // Setup mock service to throw error
      const mockGetCurrentWeather = jest
        .fn()
        .mockRejectedValue(new Error("API error"));

      // Manually replace the method in the prototype
      const originalPrototype =
        Object.getPrototypeOf(weatherController).constructor.prototype;
      const originalWeatherService = originalPrototype.weatherService;

      // Create a new instance with our mock
      originalPrototype.weatherService = {
        getCurrentWeather: mockGetCurrentWeather,
      };

      // Call controller
      await weatherController.getCurrentWeather(
        mockRequest as Request,
        mockResponse as Response
      );

      // Restore original
      originalPrototype.weatherService = originalWeatherService;

      // Expect response
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        message: "Failed to fetch weather data",
      });
    });
  });

  describe("getWeatherForecast", () => {
    it("should return 400 if city parameter is missing", async () => {
      // Setup mock request with no city
      mockRequest = {
        query: {},
      };

      // Call controller
      await weatherController.getWeatherForecast(
        mockRequest as Request,
        mockResponse as Response
      );

      // Expect response
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        message: "City parameter is required",
      });
    });

    it("should return forecast data for a valid city", async () => {
      // Setup mock request
      mockRequest = {
        query: { city: "北京" },
      };

      // Setup mock service response
      const mockForecastData = {
        status: "1",
        count: "1",
        info: "OK",
        infocode: "10000",
        forecasts: [
          {
            city: "北京市",
            adcode: "110000",
            province: "北京市",
            reporttime: "2023-08-10 16:00:00",
            casts: [
              {
                date: "2023-08-10",
                week: "4",
                dayweather: "晴",
                nightweather: "晴",
                daytemp: "33",
                nighttemp: "22",
                daywind: "西南",
                nightwind: "西南",
                daypower: "≤3",
                nightpower: "≤3",
              },
            ],
          },
        ],
      };

      // Mock the service method
      const mockGetWeatherForecast = jest
        .fn()
        .mockResolvedValue(mockForecastData);

      // Manually replace the method in the prototype
      const originalPrototype =
        Object.getPrototypeOf(weatherController).constructor.prototype;
      const originalWeatherService = originalPrototype.weatherService;

      // Create a new instance with our mock
      originalPrototype.weatherService = {
        getWeatherForecast: mockGetWeatherForecast,
      };

      // Call controller
      await weatherController.getWeatherForecast(
        mockRequest as Request,
        mockResponse as Response
      );

      // Restore original
      originalPrototype.weatherService = originalWeatherService;

      // Expect service to be called
      expect(mockGetWeatherForecast).toHaveBeenCalledWith("北京");

      // Expect response
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        data: mockForecastData.forecasts,
      });
    });

    it("should handle API errors gracefully", async () => {
      // Setup mock request
      mockRequest = {
        query: { city: "北京" },
      };

      // Setup mock service to throw error
      const mockGetWeatherForecast = jest
        .fn()
        .mockRejectedValue(new Error("API error"));

      // Manually replace the method in the prototype
      const originalPrototype =
        Object.getPrototypeOf(weatherController).constructor.prototype;
      const originalWeatherService = originalPrototype.weatherService;

      // Create a new instance with our mock
      originalPrototype.weatherService = {
        getWeatherForecast: mockGetWeatherForecast,
      };

      // Call controller
      await weatherController.getWeatherForecast(
        mockRequest as Request,
        mockResponse as Response
      );

      // Restore original
      originalPrototype.weatherService = originalWeatherService;

      // Expect response
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        message: "Failed to fetch forecast data",
      });
    });
  });
});
