"use client";
import { useState } from "react";

export default function Transport() {
  const [mrtDistance, setMrtDistance] = useState(1000);
  const [busStopDistance, setBusStopDistance] = useState(500);

  return (
    <div className="p-2 text-black text-sm">
      <div className="flex flex-col gap-2">
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="w-4 h-4 text-blue-500" />
          <span>Near Bus Interchange</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="w-4 h-4 text-blue-500" />
          <span>Near Expressways</span>
        </label>

        {/* Distance to MRT Station */}
        <div>
          <label className="block font-semibold">Distance to MRT Station(s)</label>
          <input
            type="range"
            min="100"
            max="2000"
            step="100"
            value={mrtDistance}
            onChange={(e) => setMrtDistance(parseInt(e.target.value))}
            className="w-full appearance-none h-2 rounded-lg bg-orange-200 
               accent-orange-500"
            style={{
              background: `linear-gradient(to right, #f97316 ${(mrtDistance - 100) / 19}%, #FFCC80 ${(mrtDistance - 100) / 19}%)`,
            }}
          />
          <div className="flex justify-between text-xs">
            <span>{mrtDistance}m</span>
          </div>
        </div>

        {/* Distance to Bus Stop */}
        <div>
          <label className="block font-semibold">Distance to Bus Stop</label>
          <input
            type="range"
            min="50"
            max="1000"
            step="50"
            value={busStopDistance}
            onChange={(e) => setBusStopDistance(parseInt(e.target.value))}
            className="w-full appearance-none h-2 rounded-lg bg-orange-200 
               accent-orange-500"
            style={{
              background: `linear-gradient(to right, #f97316 ${(busStopDistance - 50) / 9.5}%, #FFCC80 ${(busStopDistance - 50) / 9.5}%)`,
            }}
          />
          <div className="flex justify-between text-xs bg-orange">
            <span>{busStopDistance}m</span>
          </div>
        </div>

        {/* Park Connectors Dropdown */}
        <div>
          <label className="block font-semibold">Park Connectors</label>
          <select className="mt-1 block w-full p-2 border border-blue-400 rounded-md shadow-sm text-gray-600 focus:ring-blue-500 focus:border-blue-500">
            <option value="">Select</option>
            <option value="East Coast">East Coast Park Connector</option>
            <option value="Punggol">Punggol Park Connector</option>
            <option value="Jurong">Jurong Park Connector</option>
          </select>
        </div>
      </div>
    </div>
  );
}
