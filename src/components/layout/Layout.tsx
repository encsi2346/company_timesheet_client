import { Outlet } from 'react-router-dom';
import {Box} from "@mui/material";
import Navbar from "../navbar/Navbar.tsx";

const Layout = () => {
    return (
        <>
            <Box>
                <Navbar />
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Box px={2} pt={2} mt={-2} width="100%" height="100%" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Outlet />
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Layout;