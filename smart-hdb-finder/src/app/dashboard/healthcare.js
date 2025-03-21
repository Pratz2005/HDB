'use client'
import { useState } from "react"

export default function Healthcare(){
    const [distance, setDistance] = useState(1000)
    
    return(
        <div className="p-2 text-black text-sm">
            <div className="flex flex-col gap-2">
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>Near Hospitals</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>Near Polyclinics</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>Near GP Clinics</span> 
                </label>
                <div>
                    <label className="block font-semibold">Distance to Clinic(s)</label>
                    <input
                        type="range"
                        min="100"
                        max="2000"
                        step="100"
                        value={distance}
                        onChange={(e) => setDistance(parseInt(e.target.value))}
                        className="w-full appearance-none h-2 rounded-lg bg-orange-200 
                            accent-orange-500"
                        style={{
                            background: `linear-gradient(to right, #f97316 ${(distance - 100) / 19}%, #FFCC80 ${(distance - 100) / 19}%)`,
                        }}
                    />
                    <div className="flex justify-between text-xs">
                        <span>{distance}m</span>
                    </div>
                </div>
            </div>
        </div>
    )
}