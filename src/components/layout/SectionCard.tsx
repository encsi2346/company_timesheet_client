import {Box, useTheme} from "@mui/material";
import type {SxProps, Theme} from "@mui/material";
import {ReactNode} from "react";

const backgroundStyle: SxProps<Theme> = {
    paddingLeft: '70px',
    paddingRight: '70px',
    paddingTop: '5px',
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

const SectionCard = ({ children }: Props) => {
    const { palette } = useTheme();

    return (
        <Box bgcolor={`${palette.component.lightMax}`} sx={backgroundStyle}>
            {children}
        </Box>
    );
};

export default SectionCard;