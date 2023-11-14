import {Box} from "@mui/material";
import type {SxProps, Theme} from "@mui/material";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const backgroundStyle: SxProps<Theme> = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(41, 0, 92, 0.12)',
    color: '#ffffff',
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
    height: 150,
    width: 350,
}

interface Props {
    text: string;
}

const EmployeesPlannerCard = ({ text }: Props) => {
    return (
        <Box sx={backgroundStyle}>
            <PeopleAltIcon sx={{ height: 150, width: 150, marginRight: 3}} />
            {text}
        </Box>
    );
};

export default EmployeesPlannerCard;