import {Box, Typography, useTheme} from '@mui/material';
import {useSelector} from "react-redux";

interface Props {
    text: string;
}

const PageHeader = ({ text }: Props) => {
    const { palette } = useTheme();
    const mode = useSelector((state) => state.mode);

    return (
        <>
            <Box>
                <Typography
                    sx={{
                        fontWeight: 'regular',
                        fontSize: '30px',
                        lineHeight: '20px',
                        marginTop: '70px',
                        marginBottom: '40px',
                        marginLeft: '20px',
                        marginRight: '20px',
                        textTransform: 'uppercase',
                        color: mode === 'light' ? `${palette.textColor.dark}` : `${palette.component.light}`,
                    }}
                    data-testid='page-header'
                >
                    {text}</Typography>
            </Box>
        </>
    );
};

export default PageHeader;