import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';


export default function useFetchData() {
    const URL = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago';

    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
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
    }, []); // El array vacío asegura que el efecto se ejecute solo una vez después del primer renderizado

    return { data, loading, error };
}