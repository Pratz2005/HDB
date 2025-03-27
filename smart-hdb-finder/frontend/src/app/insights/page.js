"use client";
import { useState } from "react";

export default function PricePredictor() {
  const [form, setForm] = useState({
    town: "",
    flat_type: "",
    floor_area_sqm: "",
    remaining_lease: "",
    storey_range: "",
    flat_model: "",
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const predictPrice = async () => {
    const response = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    setResult(data.predicted_price);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Predict Resale Price</h2>
      <div className="grid gap-4">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            placeholder={key}
            value={form[key]}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          />
        ))}
        <button
          onClick={predictPrice}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Predict
        </button>
        {result && (
          <div className="mt-4 text-lg">
            <strong>Predicted Price:</strong> ${result}
          </div>
        )}
      </div>
    </div>
  );
}
