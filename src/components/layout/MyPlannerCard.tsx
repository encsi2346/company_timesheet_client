import {Box} from "@mui/material";
import type {SxProps, Theme} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

const backgroundStyle: SxProps<Theme> = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#29005C',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    paddingLeft: '50px',
    paddingRight: '50px',
    paddingTop: '50px',
    paddingBottom: '50px',
    marginBottom: '40px',
    marginTop: '5px',
    marginLeft: '5px',
    marginRight: '5px',
    borderRadius: '13px',
    height: 150,
    width: 350,
}

interface Props {
    text: string;
}

const MyPlannerCard = ({ text }: Props) => {
    return (
        <Box sx={backgroundStyle}>
            <PersonIcon sx={{ height: 150, width: 150, marginRight: 3}} />
            {text}
        </Box>
    );
};

export default MyPlannerCard;