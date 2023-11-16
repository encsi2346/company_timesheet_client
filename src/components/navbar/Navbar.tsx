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
} from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Sidebar from "../sidebar/Sidebar.tsx";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const theme = useTheme();

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: -1, marginLeft: -1, marginRight: -1, paddingTop: 2, paddingBottom: 2, backgroundColor: '#29005C'}} >
               <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
                   <IconButton
                       onClick={() => setIsOpen(!isOpen)}
                   >
                       {isOpen
                           ? <CloseRoundedIcon sx={{color: '#ffffff', fontSize: "25px"}}/>
                           : <MenuRoundedIcon sx={{color: '#ffffff', fontSize: "25px"}}/>
                       }
                   </IconButton>
                   <Sidebar isSidebarOpen={isOpen} />
               </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: "1.75rem", marginRight: 65, marginLeft: 65 }}>
                    <Typography
                        fontWeight="bold"
                        fontSize="clamp(1rem, 2rem, 2.25rem)"
                        color={"#ffffff"}
                        onClick={() => navigate("/dashboard/my-dashboard")}
                        sx={{
                            "&:hover": {
                                color: '#aeaeae',
                                cursor: "pointer",
                            },
                        }}>
                        PROJECT PLANNER
                    </Typography>
                </Box>


                {isNonMobileScreens && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <IconButton>
                            {theme.palette.mode === "dark" ? (
                                <DarkMode sx={{ color: '#ffffff', fontSize: "25px" }} />
                            ) : (
                                <LightMode sx={{ color: '#ffffff', fontSize: "25px" }} />
                            )}
                        </IconButton>
                    </Box>
                )}
            </Box>
        </>
    );
};

export default Navbar;