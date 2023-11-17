import {Button, useTheme} from "@mui/material";
import type {SxProps, Theme} from "@mui/material";

const titleStyle: SxProps<Theme> = {
    fontWeight: 'regular',
    fontSize: '14px',
    borderRadius: '13px',
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '20px',
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

const SaveButton = ({ text }: Props) => {
    const { palette } = useTheme();

    return (
        <Button sx={{backgroundColor: `${palette.component.darkMax}`, color: `${palette.textColor.light}` }}>
            {text}
        </Button>
    );
};

export default SaveButton;