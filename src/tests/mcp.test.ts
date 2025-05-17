import { mcp_amap_maps_maps_weather } from "../mcp/weatherMcp";
import { WeatherService } from "../services/weatherService";

// Mock WeatherService constructor
jest.mock("../services/weatherService", () => {
  return {
    WeatherService: jest.fn().mockImplementation(() => ({
      getCurrentWeather: jest.fn(),
      getWeatherForecast: jest.fn(),
    })),
  };
});

describe("Weather MCP Function", () => {
  let mockGetCurrentWeather: jest.Mock;
  let mockGetWeatherForecast: jest.Mock;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Get mock instance from constructor
    const mockInstance = new WeatherService();
    mockGetCurrentWeather = mockInstance.getCurrentWeather as jest.Mock;
    mockGetWeatherForecast = mockInstance.getWeatherForecast as jest.Mock;
  });

  it("should return error if city parameter is missing", async () => {
    const result = await mcp_amap_maps_maps_weather({ city: "" });

    expect(result).toEqual({
      status: "ERROR",
      error: "City parameter is required",
    });
  });

  it("should return weather and forecast data for a valid city", async () => {
    // Mock weather service responses
    const mockCurrentWeather = {
      status: "1",
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

    const mockForecastWeather = {
      status: "1",
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

    // Set mock return values
    mockGetCurrentWeather.mockResolvedValue(mockCurrentWeather);
    mockGetWeatherForecast.mockResolvedValue(mockForecastWeather);

    // Call MCP function
    const result = await mcp_amap_maps_maps_weather({ city: "北京" });

    // Expect service methods to be called
    expect(mockGetCurrentWeather).toHaveBeenCalledWith("北京");
    expect(mockGetWeatherForecast).toHaveBeenCalledWith("北京");

    // Expect correct response format
    expect(result).toEqual({
      status: "OK",
      data: {
        current: mockCurrentWeather.lives[0],
        forecast: mockForecastWeather.forecasts[0].casts,
      },
    });
  });

  it("should handle API errors gracefully", async () => {
    // Setup mock to throw error
    mockGetCurrentWeather.mockRejectedValue(new Error("API error"));

    // Call MCP function
    const result = await mcp_amap_maps_maps_weather({ city: "北京" });

    // Expect error response
    expect(result).toEqual({
      status: "ERROR",
      error: "Failed to fetch weather data",
    });
  });

  it("should handle unsuccessful API response", async () => {
    // Mock unsuccessful response
    const mockErrorResponse = {
      status: "0",
      info: "INVALID_KEY",
      infocode: "10001",
    };

    // Set mock return values
    mockGetCurrentWeather.mockResolvedValue(mockErrorResponse);
    mockGetWeatherForecast.mockResolvedValue(mockErrorResponse);

    // Call MCP function
    const result = await mcp_amap_maps_maps_weather({ city: "北京" });

    // Expect error response with API info
    expect(result).toEqual({
      status: "ERROR",
      error: "INVALID_KEY",
    });
  });
});
