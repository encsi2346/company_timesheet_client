import {Box, Typography, useTheme} from '@mui/material';
import type {SxProps, Theme} from "@mui/material";

const titleStyle: SxProps<Theme> = {
    fontWeight: 'bold',
    fontSize: '30px',
    lineHeight: '20px',
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
    const { palette } = useTheme();

    return (
        <>
            <Box>
                <Typography color={`${palette.textColor.dark}`} sx={titleStyle}>{text}</Typography>
            </Box>
        </>
    );
};

export default PageHeader;