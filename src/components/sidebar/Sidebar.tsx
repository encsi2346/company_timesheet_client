import {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import { Drawer, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SidebarItem from "./SidebarItem.tsx";

interface Props {
    drawerOpenWidth: string;
    drawerClosedWidth: string;
    headerHeight: string;
}

const Sidebar = ({ drawerOpenWidth, drawerClosedWidth, headerHeight }: Props) => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(true);

    const navLinks = [
        {
            label: 'USERS',
            route: '/users',
        },
        {
            label: 'DASHBOARD',
            route: '/dashboard',
        },
        {
            label: 'PROJECTS',
            route: '/projects',
        },
        {
            label: 'PLANNER',
            route: '/planner',
        },
        {
            label: 'LOGS',
            route: '/logs',
        },
    ];

    useEffect(() => {
        const locationPathname = location.pathname.toLowerCase();

        navLinks.some((navLink) => {
            if (locationPathname === navLink.route || locationPathname.startsWith(navLink.route)) {
                //setOpenGroups([navLink.route]);
                return true;
            }
            return false;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Drawer
            id="sidebar"
            sx={{ width: isOpen ? drawerOpenWidth : drawerClosedWidth, transition: 'width 0.25s' }}
            PaperProps={{
                sx: {
                    width: isOpen ? drawerOpenWidth : drawerClosedWidth,
                    transition: 'width 0.25s',
                    border: 'none',
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
                    position: 'fixed',
                    minHeight: `calc(100vh - ${headerHeight})`,
                    height: `calc(100vh - ${headerHeight})`,
                    backgroundColor: '#29005C',
                },
            }}
            variant="permanent"
        >
            <IconButton
                sx={{ ml: isOpen ? 2 : 3, color: 'text.primary', width: 'fit-content' }}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <HomeIcon width="14px" height="14px" sx={{ color: '#ffffff '}}/> : <HomeIcon width="14px" height="14px" sx={{ color: '#ffffff '}}/>}
            </IconButton>

            {navLinks
                .map((group) => {
                    return <SidebarItem key={group.route} link={group} isSidebarOpen={isOpen} />;
                })}
        </Drawer>
    );
};

export default Sidebar;
