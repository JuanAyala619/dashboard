import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import useFetchData from '../functions/useFetchData';
function combineArrays(arrLabels: Array<string>, arrValues1: Array<number>, arrValues2: Array<number>) {
    return arrLabels.map((label, index) => ({
        id: index,
        label: label,
        value1: arrValues1[index],
        value2: arrValues2[index]
    }));
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'label',
        headerName: 'Zona',
        width: 125,
    },
    {
        field: 'value1',
        headerName: 'Temperatura',
        width: 125,
    },
    {
        field: 'value2',
        headerName: 'Visibilidad',
        width: 125,
    },
    {
        field: 'resumen',
        headerName: 'Resumen',
        description: 'Este es un resumen de la información mostrada en las otras columnas',
        sortable: false,
        hideable: false,
        width: 100,
        valueGetter: (_, row) => `${row.label || ''} ${row.value1 || ''} ${row.value2 || ''}`,
    },
];


export default function TableUI() {
    const { data, loading, error } = useFetchData();
    if (!data || loading) {
        return <p>Cargando...</p>;
    }
    const arrValues1 = data.hourly.temperature_2m;
    const arrValues2 = data.hourly.visibility;
    const arrLabels = data.hourly.time;
    if (error)
        return <p>Error: {error}</p>;
    const rows = combineArrays(arrLabels, arrValues1, arrValues2);
    return (
        <Box sx={{ height: 350, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[10]}
                disableRowSelectionOnClick
            />
        </Box>
    );
}