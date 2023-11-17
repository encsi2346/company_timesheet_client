import {Box, Typography, useTheme} from "@mui/material";
import {SxProps, Theme} from "@mui/material";

const titleStyle: SxProps<Theme> = {
    fontWeight: 'bold',
    fontSize: '22px',
    lineHeight: '20px',
    marginTop: '80px',
    marginBottom: '40px',
    marginLeft: '10px',
    marginRight: '20px',
    textTransform: 'uppercase'
}

interface Props {
    text: string;
}

const CardText = ({ text }: Props) => {
    const { palette } = useTheme();

    return (
        <>
            <Box>
                <Typography color={`${palette.textColor.light}`} sx={titleStyle}>{text}</Typography>
            </Box>
        </>
    );
};

export default CardText;