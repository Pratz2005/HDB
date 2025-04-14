  "use client"; // Required if you're using Next.js 13+ in the app/ directory
import Image from "next/image";
import Link from "next/link";
import HamburgerMenu from "../../components/Hamburger";

import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function HDBResalePricePrediction() {
  // Form state using consistent keys
  const [formData, setFormData] = useState({
    town: "ANG MO KIO", // Changed from 'address' to 'town'
    flatType: "4 ROOM",
    futureYear: "2028",
    month: "January",
  });
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);
  
  // State to hold the trend data for the graph
  const [trendData, setTrendData] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit and fetch your API prediction
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Send request to the backend prediction endpoint
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          town: formData.town,
          flat_type: formData.flatType,
          future_year: Number(formData.futureYear),
          month: formData.month,
        }),
      });

      if (!response.ok) {
        console.error("Fetch error", response.status, response.statusText);
        throw new Error("Error fetching prediction");
      }
      const data = await response.json();

      // Format the predicted price, e.g., "SGD $718,476.00"
      setPrediction(
        `SGD $${data.predicted_price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      );
    } catch (error) {
      console.error(error);
      setPrediction("Error: Could not fetch prediction");
    } finally {
      setLoading(false);
    }
  };

  // Fetch trend data when town or flatType changes
  useEffect(() => {
    const fetchTrendData = async () => {
      try {
        const url = `http://localhost:8000/trend?town=${encodeURIComponent(
          formData.town
        )}&flat_type=${encodeURIComponent(formData.flatType)}`;
        const trendResponse = await fetch(url);
        if (!trendResponse.ok) {
          console.error(
            "Trend fetch error",
            trendResponse.status,
            trendResponse.statusText
          );
          setTrendData(null);
          return;
        }
        const result = await trendResponse.json();
        // Assuming result.trend is an array of objects with "year" and "average_price"
        const labels = result.trend.map((item) => item.year);
        const dataPoints = result.trend.map((item) => item.average_price);
        setTrendData({
          labels: labels,
          datasets: [
            {
              label: "Average Resale Price",
              data: dataPoints,
              fill: false,
              borderColor: "orange",
              tension: 0.1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching trend data:", error);
        setTrendData(null);
      }
    };

    fetchTrendData();
  }, [formData.town, formData.flatType]);

  return (
    <div className="flex flex-row w-full h-full">
      {/* Left Panel: Input Form */}
      <div className="w-full max-w-sm border-r border-gray-200 p-6 bg-white">
        <h2 className="text-lg font-bold mb-6 text-center border border-gray-500 p-4">
          Predictive Calculator
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Town</label>
            <select
              name="town"
              value={formData.town}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option>ANG MO KIO</option>
              <option>Bedok</option>
              <option>Bukit Batok</option>
              <option>Bukit Merah</option>
              <option>Bukit Panjang</option>
              <option>Choa Chu Kang</option>
              <option>Clementi</option>
              <option>Geylang</option>
              <option>Hougang</option>
              <option>Jurong East</option>
              <option>Jurong West</option>
              <option>Kallang/Whampoa</option>
              <option>Marine Parade</option>
              <option>Pasir Ris</option>
              <option>Punggol</option>
              <option>Queenstown</option>
              <option>Sembawang</option>
              <option>Sengkang</option>
              <option>Tampines</option>
              <option>Toa Payoh</option>
              <option>Woodlands</option>
              <option>Yishun</option>
            </select>
          </div>
  
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Select Flat Type
            </label>
            <select
              name="flatType"
              value={formData.flatType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option>3 ROOM</option>
              <option>4 ROOM</option>
              <option>5 ROOM</option>
              <option>EXECUTIVE</option>
            </select>
          </div>
  
          <div>
            <label className="block mb-1 font-medium text-gray-700">Future Year</label>
            <input
              type="number"
              step="1"
              name="futureYear"
              value={formData.futureYear}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
  
          <div>
            <label htmlFor="month" className="block mb-1 font-medium text-gray-700">
              Month
            </label>
            <select
              id="month"
              name="month"
              value={formData.month}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>
  
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 p-3 text-white rounded transition ${
              loading ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {loading ? "Predicting..." : "Submit"}
          </button>
        </form>
      </div>
  
      {/* Right Panel: Prediction Details and Price Trend Graph */}
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-3">Prediction Results</h2>
        <p className="mb-6">
          Predicted average resale price for a{" "}
          <span className="font-semibold">{formData.flatType}</span> flat in{" "}
          <span className="font-semibold">{formData.town}</span> for the year{" "}
          <span className="font-semibold">{formData.futureYear}</span> during{" "}
          <span className="font-semibold">{formData.month}</span> is{" "}
          <span className="font-bold text-blue-700">
            {prediction || "N/A"}
          </span>.
        </p>
  
        {trendData ? (
          <div>
            <h3 className="text-xl font-bold mb-2">Price Trends</h3>
            <Line data={trendData} />
          </div>
        ) : (
          <p className="text-gray-500">Loading trend data...</p>
        )}
      </div>
    </div>
  );  
}
