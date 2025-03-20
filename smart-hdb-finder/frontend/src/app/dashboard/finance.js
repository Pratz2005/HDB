'use client'
import { useState } from "react"

export default function Finance(){
    const [distance, setDistance] = useState([500,1000])    
    
    return(
        <div className="p-2 text-black text-sm">
            <div className="flex flex-col gap-2">
                <div>
                    <label className="block font-semibold">Distance to Facilities</label>
                    <input
                        type="range"
                        min="100"
                        max="2000"
                        value={distance[0]}
                        onChange={(e) => setDistance([parseInt(e.target.value), distance[1]])}
                        className="w-full"
                    />
                    <input
                        type="range"
                        min="100"
                        max="2000"
                        value={distance[1]}
                        onChange={(e) => setDistance([distance[0], parseInt(e.target.value)])}
                        className="w-full"
                    />
                    <div className="flex justify-between text-xs">
                        <span>{distance[0]}m</span>
                        <span>{distance[1]}m</span>
                    </div>
                </div>
            </div>
        </div>
    )
}