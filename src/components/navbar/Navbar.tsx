import { useState } from 'react';
import {
    Box,
    IconButton,
    Typography,
    useTheme,
    useMediaQuery
} from "@mui/material";
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { useNavigate } from "react-router-dom";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Sidebar from "../sidebar/Sidebar.tsx";
import {useDispatch} from "react-redux";
import {setMode} from "../../state.ts";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const dispatch = useDispatch();
    const theme = useTheme();

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 2, paddingBottom: 2, backgroundColor: `${theme.palette.component.darkMax}`}} >
               <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
                   <IconButton onClick={() => setIsOpen(!isOpen)} >
                       {isOpen
                           ? <CloseRoundedIcon sx={{color: `${theme.palette.textColor.light}`, fontSize: "25px"}}/>
                           : <MenuRoundedIcon sx={{color: `${theme.palette.textColor.light}`, fontSize: "25px"}}/>
                       }
                   </IconButton>
                   <Sidebar isSidebarOpen={isOpen} />
               </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: "1.75rem", marginRight: 65, marginLeft: 65 }}>
                    <Typography
                        fontWeight="bold"
                        fontSize="clamp(1rem, 2rem, 2.25rem)"
                        color={`${theme.palette.textColor.light}`}
                        onClick={() => navigate("/dashboard/my-dashboard")}
                        sx={{
                            "&:hover": {
                                color: `${theme.palette.component.light}`,
                                cursor: "pointer",
                            },
                        }}>
                        PROJECT PLANNER
                    </Typography>
                </Box>

                {isNonMobileScreens && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <IconButton onClick={() => dispatch(setMode())}>
                            {theme.palette.mode === "dark" ? (
                                <DarkModeRoundedIcon sx={{ color: `${theme.palette.textColor.light}`, fontSize: "25px" }} />
                            ) : (
                                <LightModeRoundedIcon sx={{ color: `${theme.palette.textColor.light}`, fontSize: "25px" }} />
                            )}
                        </IconButton>
                    </Box>
                )}
            </Box>
        </>
    );
};

export default Navbar;