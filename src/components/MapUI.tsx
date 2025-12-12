import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Paper, Box, Typography } from '@mui/material';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapUIProps {
    data: OpenMeteoResponse;
}

export default function MapUI({ data }: MapUIProps) {
    const { latitude, longitude } = data;
    const currentTemp = data.current.temperature_2m;

    const customIcon = L.divIcon({
        html: `
      <div style="
        background: ${currentTemp > 25 ? '#ff4444' : currentTemp < 15 ? '#4488ff' : '#44aa44'};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 10px;
      ">
        ${Math.round(currentTemp)}°
      </div>
    `,
        className: '',
        iconSize: [32, 32],
        iconAnchor: [24, 32],
    });

    return (
        <Paper elevation={3} sx={{ overflow: 'hidden', borderRadius: 2 }}>
            <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    🗺️ Ubicación Actual
                </Typography>
            </Box>

            <Box sx={{ height: 400, width: '100%' }}>
                <MapContainer
                    center={[latitude, longitude]} 
                    zoom={10}
                    style={{ height: '100%', width: '100%' }}
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker position={[latitude, longitude]} icon={customIcon}>
                        <Popup>
                            <div style={{ textAlign: 'center' }}>
                                <strong>📍 Ubicación Actual</strong><br />
                                🌡️ Temperatura: {currentTemp}°C<br />
                                💧 Humedad: {data.current.relative_humidity_2m}%<br />
                                📏 Coordenadas: {latitude.toFixed(4)}°, {longitude.toFixed(4)}°
                            </div>
                        </Popup>
                    </Marker>
                </MapContainer>
            </Box>
        </Paper>
    );
}