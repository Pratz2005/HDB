"use client"; // Required if you're using Next.js 13+ in the app/ directory

import { useState } from "react";

export default function HDBResalePricePrediction() {
  // Form state using consistent keys
  const [formData, setFormData] = useState({
    town: "ANG MO KIO",     // Changed from 'address' to 'town'
    flatType: "4 ROOM",
    futureYear: "2028",
    month: "January",
  });
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit + fetch your API prediction
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Send request to the backend
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
      setPrediction(`SGD $${data.predicted_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
    } catch (error) {
      console.error(error);
      setPrediction("Error: Could not fetch prediction");
    } finally {
      setLoading(false);
    }
  };

  return ( <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800"> {/* Header */} <header className="bg-orange-500 text-white p-4 text-center"> <h1 className="text-2xl font-bold">HDB Resale Price Prediction</h1> </header>
  {/* Main Content */}
  <main className="flex flex-row flex-1">
    {/* Left Panel: Input Form */}
    <div className="w-full max-w-sm border-r border-gray-200 p-6 bg-white">
      <h2 className="text-lg font-bold mb-6 text-center border border-gray-500 p-4">Predictive Calculator</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Town */}
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

        {/* Flat Type */}
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

        {/* Future Year */}
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

        {/* Month */}
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

        {/* Submit Button */}
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

    {/* Right Panel: Prediction Details */}
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
    </div>
  </main>
  

  {/* Footer */}
  <footer className="bg-orange-500 p-4 text-center">
    <p>© 2025 HDB Resale Price Prediction App</p>
  </footer>
</div>
); }




