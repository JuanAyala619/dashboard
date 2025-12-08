import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import useFetchData from '../functions/useFetchData';

export default function ChartUI() {
    const { data, loading, error } = useFetchData();
    if (!data || loading) {
        return <p>Cargando...</p>;
    }
    const arrValues1 = data.hourly.temperature_2m.slice(0,30);
    const arrValues2 = data.hourly.visibility.slice(0,30);
    const arrLabels = data.hourly.time.slice(0,30);
 
    if (error)
        return <p>Error: {error}</p>;
    return (
        <>
            <Typography variant="h5" component="div">
                Chart Tiempo vs Temperatura & Visibilidad
            </Typography>
            <LineChart
                height={300}
                series={[
                    { data: arrValues1, label: 'temperatura' },
                    { data: arrValues2, label: 'visibilidad' },
                ]}
                xAxis={[{ scaleType: 'point', data: arrLabels }]}
            />
        </>
    );
}