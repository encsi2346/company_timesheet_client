import {Button} from "@mui/material";
import type {SxProps, Theme} from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const titleStyle: SxProps<Theme> = {
    fontWeight: 'regular',
    fontSize: '14px',
    color: '#ffffff',
    backgroundColor: '#29005C',
    borderRadius: '13px',
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '80px',
    marginBottom: '20px',
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: '30px',
    paddingRight: '30px',
    textTransform: 'none',
}

interface Props {
    text: string;
}

const AddButton = ({ text }: Props) => {
    return (
        <Button sx={titleStyle}>
            <AddRoundedIcon sx={{ marginRight: 2}}/>
            {text}
        </Button>
    );
};

export default AddButton;