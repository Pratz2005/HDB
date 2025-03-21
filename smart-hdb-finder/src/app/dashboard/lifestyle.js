"use client";
import { useState } from "react";

export default function Lifestyle() {
  const [nearGyms, setNearGyms] = useState(false);
  const [nearCommunityHub, setNearCommunityHub] = useState(false);
  const [nearExpressways, setNearExpressways] = useState(false);
  const [nearParkConnectors, setNearParkConnectors] = useState(false);
  const [gymSelection, setGymSelection] = useState("");
  const [parkConnectorSelection, setParkConnectorSelection] = useState("");

  return (
    <div className="p-2 text-gray-600 text-sm flex flex-col gap-2">
      {/* Near Gyms */}
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={nearGyms}
          onChange={() => setNearGyms(!nearGyms)}
          className="w-4 h-4 text-blue-500"
        />
        <span>Near Gyms</span>
      </label>
      {nearGyms && (
        <select
          value={gymSelection}
          onChange={(e) => setGymSelection(e.target.value)}
          className="mt-1 block w-full p-2 border border-blue-400 rounded-md shadow-sm text-gray-600 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select</option>
          <option value="gym-1">ActiveSG</option>
          <option value="gym-2">AnytimeFitness</option>
        </select>
      )}

      {/* Near Community Hub */}
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={nearCommunityHub}
          onChange={() => setNearCommunityHub(!nearCommunityHub)}
          className="w-4 h-4 text-blue-500"
        />
        <span>Near Community Hub</span>
      </label>

      {/* Near Expressways */}
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={nearExpressways}
          onChange={() => setNearExpressways(!nearExpressways)}
          className="w-4 h-4 text-blue-500"
        />
        <span>Near Expressways</span>
      </label>

      {/* Near Park Connectors */}
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={nearParkConnectors}
          onChange={() => setNearParkConnectors(!nearParkConnectors)}
          className="w-4 h-4 text-blue-500"
        />
        <span>Near Park Connectors</span>
      </label>
      {nearParkConnectors && (
        <select
          value={parkConnectorSelection}
          onChange={(e) => setParkConnectorSelection(e.target.value)}
          className="mt-1 block w-full p-2 border border-blue-400 rounded-md shadow-sm text-gray-600 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select</option>
          <option value="East Coast">East Coast Park Connector</option>
          <option value="Punggol">Punggol Park Connector</option>
          <option value="Jurong">Jurong Park Connector</option>
        </select>
      )}
    </div>
  );
}
