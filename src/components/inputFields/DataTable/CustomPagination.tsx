import { Box, MenuItem, Pagination, Select } from '@mui/material';
import {
    gridPageCountSelector,
    gridPageSelector,
    gridPageSizeSelector,
    gridPaginationRowRangeSelector,
    useGridApiContext,
    useGridRootProps,
    useGridSelector,
} from '@mui/x-data-grid';

import CustomPaginationItem from './CustomPaginationItem.tsx';

const CustomPagination = () => {
    const apiRef = useGridApiContext();
    const rootProps = useGridRootProps();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
    const pageSize = useGridSelector(apiRef, gridPageSizeSelector);
    const rowRange = useGridSelector(apiRef, gridPaginationRowRangeSelector);

    return (
        <Box display="flex" alignItems="center">
            <Box mr={2}>
                {page * pageSize + 1}-{page * pageSize + (rowRange?.lastRowIndex ?? 0) + 1} of {apiRef.current.getRowsCount()}{' '}
                items
            </Box>

            <Pagination
                variant="outlined"
                shape="rounded"
                color="primary"
                count={pageCount}
                page={page + 1}
                renderItem={CustomPaginationItem}
                onChange={(_event, value) => apiRef.current.setPage(value - 1)}
            />

            <Select
                size="small"
                value={pageSize}
                onChange={(event) => apiRef.current.setPageSize(+event.target.value)}
                sx={{ marginLeft: '16px', height: '32px', borderRadius: '2px' }}
            >
                {rootProps.rowsPerPageOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}/page
                    </MenuItem>
                ))}
            </Select>
        </Box>
    );
};

export default CustomPagination;
