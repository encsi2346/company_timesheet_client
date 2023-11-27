import {useEffect, useState} from 'react';
import {
    Box,
    IconButton,
    Typography,
    useTheme,
    useMediaQuery, FormControl, Select, MenuItem, SelectChangeEvent
} from "@mui/material";
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { useNavigate } from "react-router-dom";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Sidebar from "../sidebar/Sidebar.tsx";
import {useDispatch, useSelector} from "react-redux";
import {setMode, setLanguage} from "../../state.ts";
import {useTranslation} from "react-i18next";
import {Lan} from "@mui/icons-material";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const isBigScreen = useMediaQuery('(min-width: 1200px)');
    const isMediumScreen = useMediaQuery('(min-width: 501px)' && '(max-width: 1200px)');
    const isSmallScreen = useMediaQuery('(max-width: 500px)');
    const [t, i18n] = useTranslation();
    
    const theme = useTheme();
    
    const [languageValue, setLanguageValue] = useState(null);

    const handleChangeLanguage = (event: SelectChangeEvent) => {
        setLanguageValue(event.target.value as string);
    }

    useEffect(() => {
        if (languageValue === null) {
            const language = localStorage.getItem('language');
            if (language) {
                setLanguageValue(language);
            }
        }
    }, []);

    useEffect(() => {
        if (languageValue === null) return;
        localStorage.setItem('language', languageValue);
        i18n.changeLanguage(languageValue)
            .then(() => {
                console.log('Language changed');
            })
            .catch((error) => {
                console.log(error);
            });
    }, [languageValue]);

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 2, paddingBottom: 2, backgroundColor: `${theme.palette.component.darkMax}`, width: '100%'}} >
               <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
                   <IconButton onClick={() => setIsOpen(!isOpen)} data-testid='menu-button'>
                       {isOpen
                           ? <CloseRoundedIcon sx={{color: `${theme.palette.textColor.light}`, fontSize: "25px"}}/>
                           : <MenuRoundedIcon sx={{color: `${theme.palette.textColor.light}`, fontSize: "25px"}}/>
                       }
                   </IconButton>
                   <Sidebar isSidebarOpen={isOpen} />
               </Box>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: "1.75rem",
                    marginRight: isSmallScreen ? 10 : (isMediumScreen ? 40 : 60),
                    marginLeft: isSmallScreen ? 10 : (isMediumScreen ? 40 : 60)
                }}>
                    <Typography
                        fontWeight="regular"
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

                {isBigScreen && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <IconButton onClick={() => dispatch(setMode())} data-testid='mode-selector'>
                            {theme.palette.mode === "dark" ? (
                                <DarkModeRoundedIcon sx={{ color: `${theme.palette.textColor.light}`, fontSize: "25px" }} />
                            ) : (
                                <LightModeRoundedIcon sx={{ color: `${theme.palette.textColor.light}`, fontSize: "25px" }} />
                            )}
                        </IconButton>
                    </Box>
                )}

                {isBigScreen && (
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                data-testid='select-language-input'
                                value={languageValue}
                                onChange={handleChangeLanguage}
                                sx={{color: '#ffffff', borderColor: '#ffffff', backgroundColor: '#45277b'}}
                            >
                                <MenuItem value={'hu'}>Hu</MenuItem>
                                <MenuItem value={'en'}>En</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                )}
            </Box>
        </>
    );
};

export default Navbar;