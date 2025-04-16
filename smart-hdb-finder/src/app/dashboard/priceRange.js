import { useState, useEffect, useRef } from "react";

export default function PriceRangeSlider({ onPriceChange }) {
  const [minPrice, setMinPrice] = useState(300000);
  const [maxPrice, setMaxPrice] = useState(750000);
  const [isDragging, setIsDragging] = useState(null); // 'min', 'max', or null

  const minAllowed = 100000;
  const maxAllowed = 2000000;
  const step = 50000;
  const range = maxAllowed - minAllowed;

  const sliderRef = useRef(null);
  const minThumbRef = useRef(null);
  const maxThumbRef = useRef(null);

  const formatPrice = (value) => `$${value.toLocaleString()}`;

  // Calculate position as percentage
  const getPercent = (value) => ((value - minAllowed) / range) * 100;

  // Convert position to value
  const getValueFromPosition = (position, width) => {
    const percent = Math.min(Math.max(0, position / width), 1);
    const rawValue = percent * range + minAllowed;
    // Round to nearest step
    return Math.round(rawValue / step) * step;
  };

  // Call onPriceChange whenever the values update.
  useEffect(() => {
    if (onPriceChange) {
      onPriceChange(minPrice, maxPrice);
    }
  }, [minPrice, maxPrice, onPriceChange]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || !sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const position = e.clientX - rect.left;
      const width = rect.width;

      let newValue = getValueFromPosition(position, width);

      if (isDragging === 'min') {
        newValue = Math.min(newValue, maxPrice - step);
        setMinPrice(Math.max(minAllowed, newValue));
      } else {
        newValue = Math.max(newValue, minPrice + step);
        setMaxPrice(Math.min(maxAllowed, newValue));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(null);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, minPrice, maxPrice]);

  const handleMinMouseDown = (e) => {
    e.preventDefault();
    setIsDragging('min');
  };

  const handleMaxMouseDown = (e) => {
    e.preventDefault();
    setIsDragging('max');
  };

  const minPercent = getPercent(minPrice);
  const maxPercent = getPercent(maxPrice);

  return (
    <div className="mb-6">
      <h3 className="text-base font-semibold text-black">Price Range</h3>
      <div className="relative w-full h-16 cursor-pointer" ref={sliderRef}>
        <div className="absolute top-8 w-full h-2 bg-orange-200 rounded-lg"></div>
        <div
          className="absolute top-8 h-2 bg-orange-500 rounded-lg"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        ></div>
        <div
          ref={minThumbRef}
          className={`absolute top-8 w-5 h-5 bg-orange-500 rounded-full border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2 cursor-grab ${isDragging === 'min' ? 'cursor-grabbing' : ''}`}
          style={{ left: `${minPercent}%` }}
          onMouseDown={handleMinMouseDown}
        ></div>
        <div
          ref={maxThumbRef}
          className={`absolute top-8 w-5 h-5 bg-orange-500 rounded-full border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2 cursor-grab ${isDragging === 'max' ? 'cursor-grabbing' : ''}`}
          style={{ left: `${maxPercent}%` }}
          onMouseDown={handleMaxMouseDown}
        ></div>
      </div>
      <div className="flex justify-between mt-2 text-sm text-black font-semibold">
        <span>{formatPrice(minPrice)}</span>
        <span>{formatPrice(maxPrice)}</span>
      </div>
    </div>
  );
}