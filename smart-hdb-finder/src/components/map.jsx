import { useMap } from "react-leaflet";
import L from 'leaflet';
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

import { useEffect } from "react";

// OneMap map uses EPSG:3857 Coordinate System
export default function MapComponent({ position, children, nearbyMarkers, localClickedListing }) {

    const map = useMap();

    // recenter map
    useEffect(() => {
        if (position) {
            map.setView([position.latitude, position.longitude], 17, {
                animate: true, // Enable smooth animation
                duration: 2,   // Set the duration of the transition (in seconds)
            });
        }
    }, [position, map]);

        useEffect(() => {
            const zoomHandler = () => {
                if (map.getZoom() > 17) {
                    map.setZoom(17, { animate: true, duration: 2 });  // zoom restriction to max 17 because map blanks out after
                }
            };
    
            map.on('zoomend', zoomHandler); 
    
            // cleanup the event listener when the component unmounts or re-renders
            return () => {
                map.off('zoomend', zoomHandler); 
            }
         }, [map]);

         useEffect(() => {
            if (nearbyMarkers && nearbyMarkers.length > 0) {
                const boundsArray = [];
                // collect all marker latLngs
                // const boundsArray = nearbyMarkers.map(marker => marker.getLatLng());
        
                // ensure localClickedListing is valid before adding it to bounds
                if (localClickedListing && localClickedListing.latitude && localClickedListing.longitude) {
                    const clickedListingLatLng = L.latLng(localClickedListing.latitude, localClickedListing.longitude);
                    boundsArray.push(clickedListingLatLng);
                }
        
                // calculate the bounds based on the markers
                const bounds = L.latLngBounds(boundsArray);
        
                // adjust map view to fit all markers
                if (map) {
                    map.fitBounds(bounds, { padding: [100, 100] }); // padding to make sure it doesn't cut off right at the marker
        
                    const currentZoom = map.getZoom();
                    if (currentZoom > 17) {
                        map.setZoom(17);
                    }
                }
            }
        }, [nearbyMarkers, map, localClickedListing]); 
    
        // for the legend
        useEffect(() => {
            const legend = L.control({ position: "bottomleft" });
    
            legend.onAdd = function () {
            const div = L.DomUtil.create("div", "info legend");
            div.style.backgroundColor = "white";  
            div.style.padding = "14px";  
            div.style.paddingTop = "6px";
            div.style.paddingBottom = "6px";
            div.style.borderRadius = "8px"; 
            div.style.fontSize = "14px"; 
            div.innerHTML = `
                <div style="margin-bottom: 8px;">
                <b style="font-size: 16px;">Legend:</b>  <!-- Title -->
                </div>
                <div style="margin-bottom: 4px;">
                    <i style="background-color: #6A2C91; border-radius: 50%; width: 14px; height: 14px; display: inline-block;"></i><span style="padding-left: 8px;"> Primary Schools</span>
                </div>
                <div style="margin-bottom: 4px;">
                    <i style="background-color: #D56A6A; border-radius: 50%; width: 14px; height: 14px; display: inline-block;"></i><span style="padding-left: 8px;"> Secondary Schools</span>
                </div>
                <div style="margin-bottom: 4px;">
                    <i style="background-color: #FFEB3B; border-radius: 50%; width: 14px; height: 14px; display: inline-block;"></i><span style="padding-left: 8px;"> Junior Colleges</span>
                </div>
                <div style="margin-bottom: 4px;">
                    <i style="background-color: #2C3D4C; border-radius: 50%; width: 14px; height: 14px; display: inline-block;"></i><span style="padding-left: 8px;"> MRTs</span>
                </div>
                <div style="margin-bottom: 4px;">
                    <i style="background-color: #228B22; border-radius: 50%; width: 14px; height: 14px; display: inline-block;"></i><span style="padding-left: 8px;"> Supermarkets</span>
                </div>
                <div style="margin-bottom: 4px;">
                 <i style="background-color: #E6007E; border-radius: 50%; width: 14px; height: 14px; display: inline-block;"></i><span style="padding-left: 8px;"> Community Club (CC)</span>
                </div>
                <div style="margin-bottom: 4px;">
                    <i style="background-color: #4A5D6D; border-radius: 50%; width: 14px; height: 14px; display: inline-block;"></i><span style="padding-left: 8px;"> Hawker Centres</span>
                </div>
                <div>
                    <i style="background-color: #D7A78D; border-radius: 50%; width: 14px; height: 14px; display: inline-block;"></i><span style="padding-left: 8px;"> Clinics</span>
                </div>
            `;
            return div;
            };
    
            legend.addTo(map);
    
            return () => {
            map.removeControl(legend);
            };
        }, [map]);

    return (
        <div>
            {children} {/* special prop - contains the JSX content placed between the tags of a component */}
        </div>
    );
}
