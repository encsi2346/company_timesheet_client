import { styled } from '@mui/material/styles';
import type { GridCellParams, GridFeatureMode, MuiEvent } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import type { NavigateFunction } from 'react-router-dom';

import CustomPagination from './CustomPagination.tsx';

const StyledDataGrid = styled(DataGrid)(() => ({
    border: 0,

    '& .MuiDataGrid-iconSeparator': {
        display: 'none',
    },
    '& .MuiDataGrid-columnHeaders': {
        backgroundColor: '#FAFAFA',
        borderColor: 'rgba(0, 0, 0, 0.06)',
    },
    '& .MuiDataGrid-columnHeaderTitle': {
        textOverflow: 'clip',
        whiteSpace: 'break-spaces',
        lineHeight: 1.2,
    },
    '& .MuiDataGrid-columnHeader': {
        boxShadow: '-13px 0px 0px -12px rgba(0, 0, 0, 0.06)',
    },
    '& .MuiDataGrid-cell': {
        borderColor: 'rgba(0, 0, 0, 0.06)',
        padding: '0 16px',
    },
    '& .MuiDataGrid-cell.vertical-top': {
        alignItems: 'flex-start',
        paddingTop: '10px',
    },
    '& .MuiDataGrid-cell.wage-table-vertical-padding': {
        alignItems: 'flex-start',
        paddingTop: '12px',
    },
    '& .MuiDataGrid-cell.vertical-padding': {
        alignItems: 'flex-start',
        paddingTop: '10px',
        paddingBottom: '10px',
    },
    '& .MuiDataGrid-cell.no-padding': {
        paddingLeft: 0,
        paddingRight: 0,
    },
    '& .MuiDataGrid-cell.vertical-padding-center': {
        paddingTop: '10px',
        paddingBottom: '10px',
    },
    '& .MuiDataGrid-row:nth-of-type(even):not(.Mui-selected):not(.MuiDataGrid-row:hover)': {
        backgroundColor: '#FAFAFA',
    },
    '& .MuiDataGrid-cell:focus, ': {
        outline: 'none',
    },
    '& .MuiDataGrid-cell:focus-within': {
        outline: 'none',
    },
    '& .MuiDataGrid-columnHeaderTitleContainer ': {
        outline: 'none',
    },
    '& .MuiPaginationItem-root': {
        borderRadius: 0,
    },
    '& .summary-row': {
        '> .MuiDataGrid-cell': {
            backgroundColor: '#F2F2F2',
            fontWeight: 700,
        },
    },
})) as typeof DataGrid;

export default StyledDataGrid;

export const sharedDataGridProps = {
    autoHeight: true,
    checkboxSelection: true,
    disableSelectionOnClick: true,
    disableColumnMenu: true,
    rowsPerPageOptions: [10, 25, 50, 75, 100],
    sortingMode: 'server' as GridFeatureMode,
    paginationMode: 'server' as GridFeatureMode,
    components: {
        Pagination: CustomPagination,
    },
};

export const handleDataGridCellClick = (
    params: GridCellParams,
    event: MuiEvent<React.MouseEvent>,
    navigate: NavigateFunction,
    queryParams?: any
) => {
    if (params.field === '__check__' || params.field === 'actions') {
        return;
    }
    event.defaultMuiPrevented = true;
    navigate(String(params.row.id), { state: { queryParams } });
};
