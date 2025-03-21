import { useState, useEffect, useRef } from "react";

export default function PriceRangeSlider() {
  const [minPrice, setMinPrice] = useState(300000);
  const [maxPrice, setMaxPrice] = useState(750000);
  const [isDragging, setIsDragging] = useState(null); // 'min', 'max', or null
  
  const minAllowed = 100000;
  const maxAllowed = 1000000;
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

  // For touch devices
  useEffect(() => {
    const handleTouchMove = (e) => {
      if (!isDragging || !sliderRef.current) return;
      
      const touch = e.touches[0];
      const rect = sliderRef.current.getBoundingClientRect();
      const position = touch.clientX - rect.left;
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
    
    const handleTouchEnd = () => {
      setIsDragging(null);
    };
    
    if (isDragging) {
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }
    
    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, minPrice, maxPrice]);
  
  const minPercent = getPercent(minPrice);
  const maxPercent = getPercent(maxPrice);
  
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2 text-black">Price Range</h3>
      
      {/* Price Labels */}
      <div className="relative flex justify-between text-white mb-8">
        <span 
          className="absolute bg-[#324a78] text-sm px-3 py-1 rounded-lg shadow-md 
          before:content-[''] before:absolute before:bottom-[-6px] before:left-1/2 before:-translate-x-1/2 
          before:border-[6px] before:border-transparent before:border-t-[#324a78]"
          style={{
            left: `${minPercent}%`,
            transform: "translateX(-50%)"
          }}
        >
          {formatPrice(minPrice)}
        </span>
        <span 
          className="absolute bg-[#324a78] text-sm px-3 py-1 rounded-lg shadow-md 
          before:content-[''] before:absolute before:bottom-[-6px] before:left-1/2 before:-translate-x-1/2 
          before:border-[6px] before:border-transparent before:border-t-[#324a78]"
          style={{
            left: `${maxPercent}%`,
            transform: "translateX(-50%)"
          }}
        >
          {formatPrice(maxPrice)}
        </span>
      </div>
      
      {/* Custom Slider */}
      <div 
        className="relative w-full h-16 cursor-pointer" 
        ref={sliderRef}
      >
        {/* Background Track */}
        <div className="absolute top-8 w-full h-2 bg-blue-200 rounded-lg"></div>
        
        {/* Selected Range */}
        <div
          className="absolute top-8 h-2 bg-[#324a78] rounded-lg"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        ></div>
        
        {/* Min Thumb */}
        <div
          ref={minThumbRef}
          className={`absolute top-8 w-5 h-5 bg-[#324a78] rounded-full border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2 cursor-grab ${isDragging === 'min' ? 'cursor-grabbing' : ''}`}
          style={{ left: `${minPercent}%` }}
          onMouseDown={handleMinMouseDown}
          onTouchStart={(e) => {
            e.preventDefault();
            setIsDragging('min');
          }}
        ></div>
        
        {/* Max Thumb */}
        <div
          ref={maxThumbRef}
          className={`absolute top-8 w-5 h-5 bg-[#324a78] rounded-full border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2 cursor-grab ${isDragging === 'max' ? 'cursor-grabbing' : ''}`}
          style={{ left: `${maxPercent}%` }}
          onMouseDown={handleMaxMouseDown}
          onTouchStart={(e) => {
            e.preventDefault();
            setIsDragging('max');
          }}
        ></div>
      </div>
      
      {/* Range Display */}
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <span>{formatPrice(minAllowed)}</span>
        <span>{formatPrice(maxAllowed)}</span>
      </div>
    </div>
  );
}