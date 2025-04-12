"use client";
import SearchLayout from './SearchLayout';
import React, { useState, useEffect, useRef } from 'react';
import MapComponent from '../../components/map';
import { Marker, Popup } from "react-leaflet";
import homeIcon from "../../components/homeIcon";
import homeIconHighlighted from "../../components/homeIconHighlighted";
import MarkerClusterGroup from "react-leaflet-markercluster";

export default function DashboardPage() {
  const [localClickedListing, setlocalClickedListing] = useState(null); // store clicked listing
  const [searchResultsMarkers, setSearchResultsMarkers] = useState([]); // store markers for search results
  const [nearbyAmenitiesMarkers, setNearbyAmenitiesMarkers] = useState([]); // store markers for nearby amenities
  const [searchResults, setSearchResults] = useState([]); // store full search results
  const [coordinates, setCoordinates] = useState({ // user's current location
    latitude: 1.3521,
    longitude: 103.8198,
  });

  // ref for clicked listing marker
  const clickedListingMarkerRef = useRef(null);
    // refs array for all nearby amenities markers
  const nearbyAmenitiesMarkerRefs = useRef([]); 

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ latitude, longitude });
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

  const handleClick = (record) => {
    setlocalClickedListing(record); // update local clicked listing
    console.log("Clicked Listing:", record); 
    console.log("Clicked Listing Nearby Amenities:", record.nearby_amenities);
  };

  const getSearchResults = (results) => {
    setSearchResults(results.records);
    console.log("Page.js Results:", results.records); 
  };

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      const markers = searchResults.map((record, index) => (
        <Marker
          key={index}
          position={[record.latitude, record.longitude]}
          icon={homeIcon}
          eventHandlers={{
            click: () => handleClick(record), // update context on marker click
          }}>
          <Popup>
            <b>Postal Code:</b> {record.postal} <br />
            <b>Street:</b> {record.street_name}
          </Popup>
        </Marker>
      ));

      setSearchResultsMarkers(markers);
    } else {
      setSearchResultsMarkers([]);
    }
  }, [searchResults]);

  // when listing is clicked, create amenities markers
  useEffect(() => {
    if (localClickedListing) {

      // Reset refs array
      nearbyAmenitiesMarkerRefs.current = [];

      const amenityMarkers = localClickedListing.nearby_amenities.map((amenity, index) => {
        if (!amenity.latitude || !amenity.longitude || isNaN(amenity.latitude) || isNaN(amenity.longitude)) {
          console.error(`Invalid coordinates for nearby amenity: ${amenity.name}`);
          return null;
        }
  
        return (
          <Marker
            key={`amenity-${index}`}
            position={[amenity.latitude, amenity.longitude]}
            icon={homeIcon}
            ref={(marker) => {
              if (marker) {
                nearbyAmenitiesMarkerRefs.current[index] = marker; // save each marker ref
                console.log("Marker: ", marker)
              }
            }}
          >
            <Popup autoClose={false} closeOnClick={false}>
              <b>{amenity.name}</b><br />
              Distance: {(amenity.distance * 1000).toFixed(0)} meters
            </Popup>
          </Marker>
        );
      });
  
      setNearbyAmenitiesMarkers(amenityMarkers.filter(marker => marker !== null));
    }
  }, [localClickedListing]);

  // when a listing is clicked, popup opens automatically
  const openAllPopups = () => {
    nearbyAmenitiesMarkerRefs.current.forEach((marker, index) => {
      if (marker) {
        setTimeout(() => {
          marker.openPopup();
        }, index * 300); // stagger opening by 300ms per marker
      }
    });
  };

  // when a listing is clicked, popup opens automatically
  useEffect(() => {
    if (localClickedListing && nearbyAmenitiesMarkers.length > 0) {
      const timer = setTimeout(openAllPopups, 100); 
      return () => clearTimeout(timer);
    }
  }, [localClickedListing, nearbyAmenitiesMarkers]);

  return (
    <div className="flex h-screen">
      <SearchLayout onClick={handleClick} getSearchResults={getSearchResults}/>

      <div className="flex flex-col flex-grow px-4 pt-4 bg-gray-100">
        <h1 className="text-2xl font-bold text-black">Dashboard</h1>
        <div className="flex-grow">
          <MapComponent position={localClickedListing || coordinates}>
            <Marker position={[coordinates.latitude, coordinates.longitude]} icon={homeIcon}>
              <Popup>
                You are here.
              </Popup>
            </Marker>

            {searchResultsMarkers}
            <MarkerClusterGroup>
              {nearbyAmenitiesMarkers}
            </MarkerClusterGroup>

            {localClickedListing && (
               <Marker
               position={[localClickedListing.latitude, localClickedListing.longitude]}
               icon={homeIconHighlighted}
               ref={(marker) => {
                 if (marker) {
                   clickedListingMarkerRef.current = marker;
                 }
               }}
              >
                <Popup>
                  <b>Postal Code:</b> {localClickedListing.postal} <br />
                  <b>Street:</b> {localClickedListing.street_name}
                </Popup>
              </Marker>
            )}
          </MapComponent>
        </div>
      </div>
    </div>
  );
}