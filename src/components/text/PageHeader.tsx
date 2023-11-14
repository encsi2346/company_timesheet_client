import {Box, Typography} from '@mui/material';
import type {SxProps, Theme} from "@mui/material";

const titleStyle: SxProps<Theme> = {
    fontWeight: 'bold',
    fontSize: '30px',
    lineHeight: '20px',
    color: '#29005C',
    marginTop: '70px',
    marginBottom: '40px',
    marginLeft: '20px',
    marginRight: '20px',
    textTransform: 'uppercase'
}

interface Props {
    text: string;
}

const PageHeader = ({ text }: Props) => {
    return (
        <>
            <Box>
                <Typography sx={titleStyle}>{text}</Typography>
            </Box>
        </>
    );
};

export default PageHeader;