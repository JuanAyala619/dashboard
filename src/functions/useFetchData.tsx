import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';
const CITY_COORDS: Record<string, { latitude: number; longitude: number }> = {
  'Guayaquil': { latitude: -2.1962, longitude: -79.8862 },
    'Quito': { latitude: -0.2200, longitude: -78.5100 },
  'Manta': { latitude: -0.9500, longitude: -80.7161 },
  'Cuenca': { latitude: -2.8975, longitude: -79.0044 },
};
interface DataState {
  data: OpenMeteoResponse | null;
  loading: boolean;
  error: string | null;
}

export default function useFetchData(selectedOption: string | null):DataState {
    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
    const cityConfig = selectedOption != null? CITY_COORDS[selectedOption] : CITY_COORDS["Guayaquil"];
    const URL = `https://api.open-meteo.com/v1/forecast?latitude=${cityConfig.latitude}&longitude=${cityConfig.longitude}&hourly=temperature_2m,apparent_temperature&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m`
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
    }, [selectedOption]); 

    return { data, loading, error };
}