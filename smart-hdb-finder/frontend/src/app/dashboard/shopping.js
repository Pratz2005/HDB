'use client'
import { useState } from "react"

export default function Shopping(){
    const [distance, setDistance] = useState([500,1000])    
    
    return(
        <div className="p-2 text-black text-sm">
            <div className="flex flex-col gap-2">
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>Near Malls</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>Near SuperMarkets</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="w-4 h-4" onChange={(e) => setTertiary(e.target.checked)} />
                    <span>Near Hawker Centres</span> 
                </label>
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