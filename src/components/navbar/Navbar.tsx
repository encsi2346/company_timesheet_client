import { useState } from 'react';
import {
    Box,
    IconButton,
    Typography,
    useTheme,
    useMediaQuery
} from "@mui/material";
import {
    DarkMode,
    LightMode,
    Menu,
    Close
} from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const theme = useTheme();

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: -1, marginLeft: -1, marginRight: -1, padding: "1rem 6%", backgroundColor: '#29005C'}} >
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: "1.75rem" }}>
                    <Typography
                        fontWeight="bold"
                        fontSize="clamp(1rem, 2rem, 2.25rem)"
                        color={"#ffffff"}
                        onClick={() => navigate("/home")}
                        sx={{
                            "&:hover": {
                                color: '#aeaeae',
                                cursor: "pointer",
                            },
                        }}>
                        PROJECT PLANNER
                    </Typography>
                </Box>

                {/*DESKTOP NAV*/}
                {isNonMobileScreens ? (
                    <Box sx={{ display: 'flex-end', justifyContent: 'right', alignItems: 'right', gap: "2rem" }}>
                        <IconButton>
                            {theme.palette.mode === "dark" ? (
                                <DarkMode sx={{ fontSize: "25px" }} />
                            ) : (
                                <LightMode sx={{ color: '#ffffff', fontSize: "25px" }} />
                            )}
                        </IconButton>
                    </Box>
                ) : (
                    <IconButton
                        onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                    >
                        <Menu sx={{ color: '#ffffff', fontSize: "25px" }}/>
                    </IconButton>
                )}
            </Box>
        </>
    );
};

export default Navbar;