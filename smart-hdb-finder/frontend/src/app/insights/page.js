"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample multi-series data:
// Each object represents one time point (e.g., a year).
// Keys match flat types, and values are median (or predicted) prices.
const multiSeriesData = [
  {
    year: 2012,
    "1 ROOM": 200000,
    "2 ROOM": 220000,
    "3 ROOM": 280000,
    "4 ROOM": 340000,
    "5 ROOM": 420000,
    EXECUTIVE: 600000,
    "MULTI-GENERATION": 720000
  },
  {
    year: 2013,
    "1 ROOM": 210000,
    "2 ROOM": 230000,
    "3 ROOM": 290000,
    "4 ROOM": 360000,
    "5 ROOM": 440000,
    EXECUTIVE: 620000,
    "MULTI-GENERATION": 750000
  },
  // ... add more data for additional years
];

// List of flat types to display as separate lines
const flatTypes = [
  "1 ROOM",
  "2 ROOM",
  "3 ROOM",
  "4 ROOM",
  "5 ROOM",
  "EXECUTIVE",
  "MULTI-GENERATION"
];

// Example list of budget-friendly areas
const topAreas = ["Simei", "Marine Parade", "Pioneer", "Woodlands"];

// Optional: define a color palette for each line
const COLORS = [
  "#8884d8", // 1 ROOM
  "#82ca9d", // 2 ROOM
  "#ffc658", // 3 ROOM
  "#d84d8f", // 4 ROOM
  "#ca8282", // 5 ROOM
  "#58ffc6", // EXECUTIVE
  "#4dd8ca", // MULTI-GENERATION
];

export default function Insights() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600">HDB Insights Page</h1>

      {/* Chart Section */}
      <div className="bg-white p-6 shadow-lg rounded-lg mt-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Median Resale Price of Each Flat Type Over the Years
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={multiSeriesData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            {/* X-axis uses 'year' from our data objects */}
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />

            {/* Create one <Line> per flat type */}
            {flatTypes.map((type, index) => (
              <Line
                key={type}
                type="monotone"
                dataKey={type}
                stroke={COLORS[index] || "#8884d8"} // Fallback color if needed
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Singapore's Most Budget Friendly HDB Areas */}
      <div className="bg-white p-6 shadow-lg rounded-lg mt-6">
        <h2 className="text-xl font-semibold text-gray-700">
          Singapore's Most Budget Friendly HDB Areas
        </h2>
        <ul className="mt-4 space-y-2 text-lg text-gray-600">
          {topAreas.map((area, index) => (
            <li key={index} className="flex items-center">
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full mr-3">
                {index + 1}
              </span>
              {area}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
