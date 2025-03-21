'use client'
import { useState } from "react"

export default function Family(){
    const [distance, setDistance] = useState(1000)  
      
    return(
        <div className="p-2 text-black text-sm">
            <div className="flex flex-col gap-2">
                <div>
                    <label className="block font-semibold">Distance to Facilities</label>
                    <input
                        type="range"
                        min="100"
                        max="2000"
                        step="100"
                        value={distance}
                        onChange={(e) => setDistance(parseInt(e.target.value))}
                        className="w-full"
                    />
                    <div className="flex justify-between text-xs">
                        <span>{distance}m</span>
                    </div>
                </div>
            </div>
        </div>
    )
}