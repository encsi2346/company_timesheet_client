import {Box, Typography, useTheme} from "@mui/material";
import {SxProps, Theme} from "@mui/material";

const titleStyle: SxProps<Theme> = {
    fontWeight: 'bold',
    fontSize: '17px',
    lineHeight: '20px',
    marginTop: '20px',
    marginBottom: '20px',
    marginLeft: '10px',
    marginRight: '20px',
    textTransform: 'uppercase'
}

interface Props {
    text: string;
}

const NormalText = ({ text }: Props) => {
    const { palette } = useTheme();

    return (
        <>
            <Box>
                <Typography color={`${palette.textColor.dark}`} sx={titleStyle}>{text}</Typography>
            </Box>
        </>
    );
};

export default NormalText;