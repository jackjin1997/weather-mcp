import express from "express";
import dotenv from "dotenv";
import weatherRoutes from "./routes/weatherRoutes";
import { mcp_amap_maps_maps_weather } from "./mcp/weatherMcp";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/weather", weatherRoutes);

// MCP function endpoint
app.post("/mcp/weather", async (req, res) => {
  try {
    const { city } = req.body;
    const result = await mcp_amap_maps_maps_weather({ city });
    res.status(result.status === "OK" ? 200 : 400).json(result);
  } catch (error) {
    console.error("Error in MCP endpoint:", error);
    res.status(500).json({
      status: "ERROR",
      error: "Internal server error",
    });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", service: "weather-mcp" });
});

// Start the server
app.listen(port, () => {
  console.log(`Weather MCP server running on port ${port}`);
});

// Export MCP function for direct use
export { mcp_amap_maps_maps_weather };
