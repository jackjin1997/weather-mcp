# Weather MCP

A TypeScript-based weather Messaging and Cloud Platform (MCP) application that provides weather information using the AMAP API.

## Features

- Get current weather by city name or adcode
- Get weather forecast by city name or adcode
- RESTful API design
- TypeScript for type safety

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- AMAP API key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/weather-mcp.git
cd weather-mcp
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your AMAP API key:
```
PORT=3000
AMAP_KEY=your_amap_key_here
```

## Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm run build
npm start
```

## API Endpoints

### Get Current Weather
```
GET /api/weather/current?city={city}
```
- `city`: City name or adcode (required)

### Get Weather Forecast
```
GET /api/weather/forecast?city={city}
```
- `city`: City name or adcode (required)

### Health Check
```
GET /health
```

## Example API Responses

### Current Weather
```json
{
  "success": true,
  "data": [
    {
      "province": "北京市",
      "city": "北京市",
      "adcode": "110000",
      "weather": "晴",
      "temperature": "28",
      "winddirection": "西南",
      "windpower": "≤3",
      "humidity": "40",
      "reporttime": "2023-08-10 16:00:00"
    }
  ]
}
```

### Weather Forecast
```json
{
  "success": true,
  "data": [
    {
      "city": "北京市",
      "adcode": "110000",
      "province": "北京市",
      "reporttime": "2023-08-10 16:00:00",
      "casts": [
        {
          "date": "2023-08-10",
          "week": "4",
          "dayweather": "晴",
          "nightweather": "晴",
          "daytemp": "33",
          "nighttemp": "22",
          "daywind": "西南",
          "nightwind": "西南",
          "daypower": "≤3",
          "nightpower": "≤3"
        },
        // More forecast days...
      ]
    }
  ]
}
```

## License

ISC 