import { styled } from '@mui/material/styles';
import type { GridCellParams, GridFeatureMode, MuiEvent } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import type { NavigateFunction } from 'react-router-dom';

import CustomPagination from './CustomPagination.tsx';
import {useSelector} from "react-redux";

const StyledDataGrid = styled(DataGrid)(() => ({
    border: 0,

    '& .MuiDataGrid-iconSeparator': {
        display: 'none',
    },
    '& .MuiDataGrid-columnHeaders': {
        backgroundColor: 'rgba(0, 0, 0, 0.00)' ,
        border: 'none',
    },
    '& .MuiDataGrid-columnHeaderTitle': {
        textOverflow: 'clip',
        whiteSpace: 'break-spaces',
        lineHeight: 1.2,
        color: useSelector((state) => state.mode) === 'light' ? '#29005C' : 'rgb(255,255,255)',
        fontWeight: 'regular',
        fontSize: 15,
        textTransform: 'uppercase',
    },
    '& .MuiDataGrid-columnHeader': {
        boxShadow: '-13px 0px 0px -12px rgba(0, 0, 0, 0.06)',
        textAlign: 'center',
        justifyContent: 'center',
        display: 'flex'
    },
    '& .MuiDataGrid-cell': {
        border: 'none',
        padding: '0 16px',
    },
    '& .MuiDataGrid-cell.vertical-top': {
        alignItems: 'flex-start',
        paddingTop: '10px',
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
        paddingTop: '15px',
        paddingBottom: '15px',
    },
    "& .MuiDataGrid-row": {
        backgroundColor: useSelector((state) => state.mode) === 'light' ? 'rgba(255, 255, 255, 0.36)' : 'rgba(255,255,255,0.89)',
        borderRadius: '13px',
        paddingTop: 30,
        paddingBottom: 30,
        marginTop:10,
        display: 'flex',
        alignItems: 'center',
        color: '#29005C',
        fontSize: 15
    },
    '& .MuiDataGrid-row:nth-of-type(even):not(.Mui-selected):not(.MuiDataGrid-row:hover)': {
        backgroundColor: useSelector((state) => state.mode) === 'light' ? 'rgba(41, 0, 92, 0.32)' : '#1a082a',
        borderRadius: '13px',
        color: '#ffffff'
    },
    "& .MuiDataGrid-row:hover": {
        backgroundColor: useSelector((state) => state.mode) === 'light' ? 'rgba(41, 0, 92, 0.12)' : 'rgba(146,146,146,0.91)',
        borderRadius: '13px',
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
})) as typeof DataGrid;

export default StyledDataGrid;

export const sharedDataGridProps = {
    autoHeight: true,
    height: '100%',
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
