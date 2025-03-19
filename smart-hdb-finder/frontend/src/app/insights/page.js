"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Bedok", priceChange: 10 },
  { name: "Tampines", priceChange: 10 },
  { name: "Tanah Merah", priceChange: -20 },
];

const topAreas = ["Simei", "Marine Parade", "Pioneer", "Woodlands"];

export default function Insights() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600">HDB Insights Page</h1>

      {/* Grid Layout for Two Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        
        {/* Bar Chart Section */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">HDB Price Changes</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="priceChange" fill="#3B82F6" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Singapore's Most Budget Friendly HDB Areas */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">Singapore's Most Budget Friend HDB Areas</h2>
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
    </div>
  );
}
