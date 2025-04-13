"use client";
import SearchLayout from './SearchLayout';
import React, { useState, useEffect, useRef } from 'react';
import MapComponent from '../../components/map';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import homeIcon from "../../components/homeIcon";
import homeIconHighlighted from "../../components/homeIconHighlighted";
import IconFactory from './IconFactory';

export default function DashboardPage() {
  const [localClickedListing, setlocalClickedListing] = useState(null); // store clicked listing
  const [searchResultsMarkers, setSearchResultsMarkers] = useState([]); // store markers for search results
  const [nearbyAmenitiesMarkers, setNearbyAmenitiesMarkers] = useState([]); // store markers for nearby amenities
  const [searchResults, setSearchResults] = useState([]); // store full search results
  const [loadingAmenities, setLoadingAmenities] = useState(true); // to track loading state for the amenity markers
  const [furthestAmenity, setFurthestAmenity] = useState(null); // to get further amenity for rendering map
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
    console.log("Clicked Listing Nearby Amenities`:", record.nearby_amenities);

    if (record.nearby_amenities && record.nearby_amenities.length > 0) {
      const furthest = record.nearby_amenities.reduce((max, amenity) => {
        return amenity.distance > max.distance ? amenity : max;
      });
  
    // Save the furthest amenity to the state
    setFurthestAmenity(furthest);
    console.log("Furthest Amenity:", furthest);  // Log the furthest amenity
    }
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
      setLoadingAmenities(true);

      // Reset refs array
      nearbyAmenitiesMarkerRefs.current = [];

      const amenityMarkers = localClickedListing.nearby_amenities.map((amenity, index) => {
        if (!amenity.latitude || !amenity.longitude || isNaN(amenity.latitude) || isNaN(amenity.longitude)) {
          console.error(`Invalid coordinates for nearby amenity: ${amenity.name}`);
          return null;
        }

         // get the appropriate icon using the factory
        const icon = IconFactory.getIcon(amenity.name);
  
        return (
          <Marker
            key={`amenity-${amenity.name || amenity.id}-${index}`} // using unique key for each marker
            position={[amenity.latitude, amenity.longitude]}
            icon={icon}
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

      setLoadingAmenities(false);
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
        <MapContainer
            center={[coordinates.latitude, coordinates.longitude]}
            zoom={17}
            scrollWheelZoom={true}
            maxZoom={19}
            minZoom={11}
            maxBounds={L.latLngBounds([1.144, 103.535], [1.494, 104.502])}
            style={{ height: "95%", width: "100%" }}
          >
            <TileLayer
                url='https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png'
                detectRetina={true}
                /** DO NOT REMOVE the OneMap attribution below **/
                attribution='<img src="https://www.onemap.gov.sg/web-assets/images/logo/om_logo.png" style="height:20px;width:20px;"/>&nbsp;<a href="https://www.onemap.gov.sg/" target="_blank" rel="noopener noreferrer">OneMap</a>&nbsp;&copy;&nbsp;contributors&nbsp;&#124;&nbsp;<a href="https://www.sla.gov.sg/" target="_blank" rel="noopener noreferrer">Singapore Land Authority</a>'
            />

            {/* Pass the relevant props to MapComponent */}
            <MapComponent
              position={localClickedListing || coordinates}
              nearbyMarkers={nearbyAmenitiesMarkerRefs.current}
              localClickedListing={localClickedListing}
              furthestAmenity={furthestAmenity}
            >
              {/* Marker for user's current location */}
              <Marker position={[coordinates.latitude, coordinates.longitude]} icon={homeIcon}>
                <Popup>You are here.</Popup>
              </Marker>

              {/* Render the search result markers */}
              {searchResultsMarkers}

              {/* Render nearby amenities markers */}
              {!loadingAmenities ? (
                nearbyAmenitiesMarkers.map((marker, index) => (
                  <React.Fragment key={index}>{marker}</React.Fragment>
                ))
              ) : (
                <div>Loading amenities...</div>
              )}

              {/* Render the clicked listing */}
              {localClickedListing && (
                <Marker position={[localClickedListing.latitude, localClickedListing.longitude]} icon={homeIconHighlighted}>
                  <Popup>
                    BLK {localClickedListing.block} {localClickedListing.street_name}
                    <br />
                    <b>Postal Code:</b> {localClickedListing.postal}
                  </Popup>
                </Marker>
              )}
            </MapComponent>
          </MapContainer>
        </div>
      </div>
    </div>
  );
}