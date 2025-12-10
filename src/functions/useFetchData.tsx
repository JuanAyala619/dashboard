import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';
const CITY_COORDS: Record<string, { latitude: number; longitude: number }> = {
  'Guayaquil': { latitude: -2.1962, longitude: -79.8862 },
    'Quito': { latitude: -0.1807, longitude: -78.4678 },
  'Manta': { latitude: -0.9677, longitude: -80.7089 },
  'Cuenca': { latitude: -2.9006, longitude: -79.0045 },
};
interface DataState {
  data: OpenMeteoResponse | null;
  loading: boolean;
  error: string | null;
}

export default function useFetchData(selectedOption: string | null):DataState {
    //const URL = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago';
    //const URL='https://api.open-meteo.com/v1/forecast?latitude=-1.2491&longitude=-78.6167&hourly=temperature_2m,visibility&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m';
    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
            // Parametrice la opción seleccionada en la URL del requerimiento asíncrono
    const cityConfig = selectedOption != null? CITY_COORDS[selectedOption] : CITY_COORDS["Guayaquil"];
    const URL = `https://api.open-meteo.com/v1/forecast?latitude=${cityConfig.latitude}&longitude=${cityConfig.longitude}&hourly=temperature_2m,visibility&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m`
        fetch(URL)
            .then(data => data.json())
            .then(obj => {
                setData(obj)
                setLoading(false)
                setError(null)
            })
            .catch(error => {
                setData(null)
                setError(error.message)
            })
            .finally(() => {
                setLoading(false)
            });
    }, [selectedOption]); // El array vacío asegura que el efecto se ejecute solo una vez después del primer renderizado

    return { data, loading, error };
}