import type { PaginationRenderItemParams } from '@mui/material';
import { Box, PaginationItem } from '@mui/material';

const CustomPaginationItem = (props: PaginationRenderItemParams) => {
    if (props.type === 'start-ellipsis' || props.type === 'end-ellipsis') {
        return (
            <Box
                sx={{
                    textAlign: 'center',
                    boxSizing: 'border-box',
                    width: 32,
                    height: 32,
                    margin: '0 4px',
                    letterSpacing: '2px',
                    fontSize: '20px',
                    fontWeight: 'bolder',
                    lineHeight: '24px',
                    color: 'rgba(0, 0, 0, 0.25)',
                }}
            >
                ...
            </Box>
        );
    }
    return (
        <PaginationItem
            sx={{
                borderColor: '#D9D9D9',
                '&.Mui-selected': {
                    color: 'primary.main',
                    borderColor: 'primary.main',
                    backgroundColor: 'white',
                },
                '&.Mui-disabled': {
                    opacity: 1,
                    color: '#D9D9D9',
                },
            }}
            {...props}
            data-testid={`pagination-${props.page}`}
        />
    );
};

export default CustomPaginationItem;
