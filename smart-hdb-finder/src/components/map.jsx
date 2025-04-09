import { MapContainer, TileLayer, useMap } from "react-leaflet"
import L from 'leaflet';
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { useEffect } from "react";

// OneMap map uses EPSG:3857 Coordinate System
export default function MapComponent({ position, children }) {

    function RecenterMap({center}) {
        const map = useMap();

        useEffect(() => {
            if(center) {
                map.setView(center);
            }
        }, [center, map]);
    }

    return (
        <MapContainer 
            center={[position.latitude, position.longitude]}
            zoom={16} 
            scrollWheelZoom={true} 
            maxZoom={19} 
            minZoom={11}
            maxBounds={L.latLngBounds([1.144, 103.535], [1.494, 104.502])}
            style={{ height: '95%', width: '100%' }}
        >
        <TileLayer
            url='https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png'
            detectRetina={true}
            /** DO NOT REMOVE the OneMap attribution below **/
            attribution='<img src="https://www.onemap.gov.sg/web-assets/images/logo/om_logo.png" style="height:20px;width:20px;"/>&nbsp;<a href="https://www.onemap.gov.sg/" target="_blank" rel="noopener noreferrer">OneMap</a>&nbsp;&copy;&nbsp;contributors&nbsp;&#124;&nbsp;<a href="https://www.sla.gov.sg/" target="_blank" rel="noopener noreferrer">Singapore Land Authority</a>'
        />
        <RecenterMap center={[position.latitude, position.longitude]}/>
        {children} {/* special prop - contains the JSX content placed between the tags of a component */}
        </MapContainer>
    );
}
