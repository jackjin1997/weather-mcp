import axios from "axios";
import { WeatherService } from "../services/weatherService";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("WeatherService", () => {
  let weatherService: WeatherService;

  beforeEach(() => {
    weatherService = new WeatherService();
    jest.clearAllMocks();
  });

  describe("getCurrentWeather", () => {
    it("should return weather data for a valid city", async () => {
      // Mock response
      const mockResponse = {
        data: {
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
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await weatherService.getCurrentWeather("北京");

      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://restapi.amap.com/v3/weather/weatherInfo",
        expect.any(Object)
      );
      expect(result).toEqual(mockResponse.data);
      expect(result.status).toBe("1");
      expect(result.lives).toHaveLength(1);
      expect(result.lives?.[0].city).toBe("北京市");
    });

    it("should handle API errors gracefully", async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error("Network error"));

      await expect(weatherService.getCurrentWeather("北京")).rejects.toThrow(
        "Network error"
      );
    });
  });

  describe("getWeatherForecast", () => {
    it("should return forecast data for a valid city", async () => {
      // Mock response
      const mockResponse = {
        data: {
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
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await weatherService.getWeatherForecast("北京");

      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://restapi.amap.com/v3/weather/weatherInfo",
        expect.any(Object)
      );
      expect(result).toEqual(mockResponse.data);
      expect(result.status).toBe("1");
      expect(result.forecasts).toHaveLength(1);
      expect(result.forecasts?.[0].city).toBe("北京市");
      expect(result.forecasts?.[0].casts).toHaveLength(1);
    });

    it("should handle API errors gracefully", async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error("Network error"));

      await expect(weatherService.getWeatherForecast("北京")).rejects.toThrow(
        "Network error"
      );
    });
  });
});
