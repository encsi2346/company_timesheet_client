import { Box } from '@mui/material';
import type { GridRenderCellParams } from '@mui/x-data-grid';

const LockedRenderCell = (params: GridRenderCellParams<string>) => {
    const isActive = !!params.value;

    return (
        <Box display="flex" alignItems="center">
            <Box width="6px" height="6px" borderRadius="50%" mr="8px" bgcolor={isActive ? '#52C41A' : '#FF4D4F'}></Box>
            <Box>{isActive ? 'ACTIVE' : 'INACTIVE'}</Box>
        </Box>
    );
};

export default LockedRenderCell;
