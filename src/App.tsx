//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import './App.css'
import { Grid, Alert } from '@mui/material';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './functions/useFetchData';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';

function App() {
  //const [count, setCount] = useState(0)
  const { data, loading, error } = useFetchData();
  return (

    <Grid container spacing={5} justifyContent="center" alignItems="center">

      {/* Encabezado */} {/* Json -> xs:12, md: 12*/}
      <Grid size={{ xs: 12, md: 12 }}><HeaderUI /> </Grid>

      {/* Alertas */}
      <Grid size={{ xs: 12, md: 12 }} container justifyContent="right" alignItems="center"> <AlertUI description="No se preveen lluvias" /></Grid>

      {/* Selector */}
      <Grid size={{ xs: 12, md: 3 }}><SelectorUI /></Grid>

      {/* Indicadores */}

      <Grid container size={{ xs: 12, md: 9 }} >
        {loading && (
          <Grid size={{ xs: 12, md: 12 }}>
            <p>Cargando datos meteorológicos...</p>
          </Grid>
        )}
        {error && (
          <Grid size={{ xs: 12, md: 12 }}>
            <Alert severity="error">Error: {error}</Alert>
          </Grid>
        )}

        <Grid size={{ xs: 12, md: 3 }}>
          {data &&
            (<IndicatorUI
              title='Temperatura (2m)'
              description={`${data.current.temperature_2m} ${data.current_units.temperature_2m}`} />)
          }
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          {data &&
            (<IndicatorUI
              title='Temperatura aparente'
              description={`${data.current.apparent_temperature} ${data.current_units.apparent_temperature}`} />)
          }
          {/* IndicatorUI con la Temperatura aparente en °C' */}
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          {data &&
            (<IndicatorUI
              title='Velocidad del viento'
              description={`${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}`} />)
          }
          {/* IndicatorUI con la Velocidad del viento en km/h' */}
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          {data &&
            (<IndicatorUI
              title='Humedad relativa'
              description={`${data.current.relative_humidity_2m} ${data.current_units.relative_humidity_2m}`} />)
          }          {/* IndicatorUI con la Humedad relativa en %' */}
        </Grid>

      </Grid>

      {/* Gráfico */}
      <Grid size={{ xs: 6, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
        <ChartUI />
      </Grid>

      {/* Tabla */}
      <Grid size={{ xs: 6, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
        <TableUI />
      </Grid>

      {/* Información adicional */}
      <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>

    </Grid>
  );
}

export default App
