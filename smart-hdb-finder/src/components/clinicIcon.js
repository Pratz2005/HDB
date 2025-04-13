import L from 'leaflet';

const clinicIcon = L.icon({
    iconUrl: '/clinics.png', 
    iconSize: [72, 72],
    iconAnchor: [36, 72],
    popupAnchor: [0, -72]
});

export default clinicIcon;