import * as React from 'react';
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import dataGrid from '../component/dataGrid.css'




export default function DataGridDemo(

    {
        rows,
        columns,
        pageSize,
        setSelectedIDS
    }) {
    return (
        <div style={{height: 650, width: '100%', textAlign: 'center'}}>
            <DataGrid
                className={"dataGrid"}
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                rowsPerPageOptions={[10]}
                checkboxSelection
                onSelectionModelChange={(ids) => {
                    setSelectedIDS(ids)
                }

                }
            />
        </div>

    );
}

