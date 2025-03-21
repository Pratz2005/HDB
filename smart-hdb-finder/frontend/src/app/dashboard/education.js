'use client'
import { useState } from "react"

export default function Education(){
    const [distance, setDistance] = useState(1000)
    const [tertiary, setTertiary] = useState(false)
    
    return(
        <div className="p-2 text-black text-sm">
            <div className="flex flex-col gap-2">
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>Near Primary Schools</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>Near Secondary Schools</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="w-4 h-4" onChange={(e) => setTertiary(e.target.checked)} /> 
                    <span>Near Tertiary Schools</span> 
                </label>

                {tertiary && (
                    <select className="border rounded p-2 mt-2">
                        <option value="">Select an Institution</option>
                        <option value="childcare">Childcare Centres</option>
                        <option value="polytechnic">Polytechnic Institutes</option>
                        <option value="junior_college">Junior Colleges</option>
                        <option value="university">Universities</option>
                    </select>
                )}

                <div>
                    <label className="block font-semibold">Distance to Centre(s)</label>
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
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="w-4 h-4"/>
                    <span>Exclude International Schools</span> 
                </label>
            </div>
        </div>
    )
}