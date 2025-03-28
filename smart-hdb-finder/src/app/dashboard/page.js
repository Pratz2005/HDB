"use client"
import SearchLayout from './SearchLayout';
import React, { useState, useEffect } from 'react';
import MapComponent from '../../components/map';
import { Marker, Popup } from "react-leaflet"

export default function DashboardPage() {
  const [coordinates, setCoordinates] = useState({
    latitude: 1.3521,  // Singapore Latitude
    longitude: 103.8198,  // Singapore longitude
    });

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords; // geolocation uses WGS84 Coordinate System
            setCoordinates({latitude, longitude});
        },
        (error) => {
            console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    console.log(coordinates);
  }, [coordinates]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SearchLayout />

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow px-4 pt-4 bg-gray-100">
        <h1 className="text-2xl font-bold text-black">Dashboard</h1>
        <div className="flex-grow">
          <MapComponent position={coordinates}>
            <Marker position={[coordinates.latitude, coordinates.longitude]}>
              <Popup>
                You are here.
              </Popup>
            </Marker>
          </MapComponent>
        </div>
      </div>


    </div>
  );
}
