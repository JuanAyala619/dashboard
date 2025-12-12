import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import { type OpenMeteoResponse } from '../types/DashboardTypes';
interface ChartProps {
    data: OpenMeteoResponse;
}
export default function ChartUI({ data }: ChartProps) {

    const arrValues1 = data.hourly.temperature_2m.slice(0,30);
    const arrValues2 = data.hourly.apparent_temperature.slice(0,30);
    const arrLabels = data.hourly.time.slice(0,30);
 

    return (
        <>
            <Typography variant="h5" component="div">
                Chart Tiempo vs Temperatura & Temperatura aparente
            </Typography>
            <LineChart
                height={300}
                series={[
                    { data: arrValues1, label: 'temperatura' },
                    { data: arrValues2, label: 'temperatura aparente' },
                ]}
                xAxis={[{ scaleType: 'point', data: arrLabels }]}
            />
        </>
    );
}