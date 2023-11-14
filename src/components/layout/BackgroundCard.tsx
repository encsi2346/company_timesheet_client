import {Box} from "@mui/material";
import type {SxProps, Theme} from "@mui/material";
import {ReactNode} from "react";

const backgroundStyle: SxProps<Theme> = {
    backgroundColor: '#ffffff',
    paddingLeft: '100px',
    paddingRight: '100px',
    paddingTop: '50px',
    paddingBottom: '50px',
    marginBottom: '40px',
    marginTop: '5px',
    marginLeft: '5px',
    marginRight: '5px',
    height: '100%',
    borderRadius: '19px'
}

interface Props {
    children: ReactNode;
}

const BackgroundCard = ({ children }: Props) => {
    return (
        <Box sx={backgroundStyle}>
            {children}
        </Box>
    );
};

export default BackgroundCard;