import {Box, useTheme} from "@mui/material";
import type {SxProps, Theme} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

const backgroundStyle: SxProps<Theme> = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    paddingLeft: '50px',
    paddingRight: '50px',
    paddingTop: '50px',
    paddingBottom: '50px',
    marginBottom: '40px',
    marginTop: '5px',
    marginLeft: '5px',
    marginRight: '5px',
    borderRadius: '13px',
    height: 250,
    width: 450,
    cursor: 'pointer'
}

interface Props {
    text: string;
}

const MyPlannerCard = ({ text }: Props) => {
    const { palette } = useTheme();

    return (
        <Box bgcolor={`${palette.component.darkMax}`} color={`${palette.textColor.light}`} sx={backgroundStyle}>
            <PersonIcon sx={{ height: 150, width: 150, marginRight: 3}} />
            {text}
        </Box>
    );
};

export default MyPlannerCard;