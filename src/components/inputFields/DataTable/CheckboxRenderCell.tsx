import { Checkbox } from '@mui/material';
import type { GridRenderCellParams } from '@mui/x-data-grid';

const CheckboxRenderCell = (params: GridRenderCellParams<string>) => {
    const isActive = !!params.value;

    return (
        <Checkbox
            checked={isActive}
            disabled
            sx={{
                '&.Mui-disabled.Mui-checked': {
                    color: '#E5EBD4',
                },
            }}
        />
    );
};

export default CheckboxRenderCell;
