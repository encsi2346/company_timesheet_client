import { Outlet } from 'react-router-dom';
import {Box} from "@mui/material";
import Sidebar from "../sidebar/Sidebar.tsx";

const headerHeight = '0px';
const drawerOpenWidth = '272px';
const drawerClosedWidth = '80px';

const Layout = () => {
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Sidebar headerHeight={headerHeight} drawerOpenWidth={drawerOpenWidth} drawerClosedWidth={drawerClosedWidth} />
                <Box px={2} pt={2} mt={-2} width="100%" height="100%" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Outlet />
                </Box>
            </Box>
        </>
    );
};

export default Layout;