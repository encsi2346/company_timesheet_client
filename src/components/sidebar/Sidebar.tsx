import {useEffect} from "react";
import { useLocation } from "react-router-dom";
import {Drawer, useTheme} from '@mui/material';
import SidebarItem from "./SidebarItem.tsx";

interface Props {
    isSidebarOpen: boolean;
}

const Sidebar = ({ isSidebarOpen }: Props) => {
    const { palette } = useTheme();
    const location = useLocation();

    const navLinks = [
        {
            label: 'Alkalmazottak',
            route: '/users',
        },
        {
            label: 'Dashboard',
            route: '/dashboard/my-dashboard',
        },
        {
            label: 'Projektek',
            route: '/projects',
        },
        {
            label: 'Tervezők',
            route: '/planner',
        },
        {
            label: 'Logok',
            route: '/logs',
        },
        {
            label: 'Kijelentkezés',
            route: '/logout',
        },
    ];

    useEffect(() => {
        const locationPathname = location.pathname.toLowerCase();

        navLinks.some((navLink) => {
            return !!(locationPathname === navLink.route || locationPathname.startsWith(navLink.route));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Drawer
            id="sidebar"
            sx={{ width: 0 , transition: 'height 0.25s'}}
            PaperProps={{
                sx: {
                    width: isSidebarOpen ? 250 : 0,
                    transition: 'width 0.25s',
                    border: 'none',
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
                    position: 'fixed',
                    minHeight: 100,
                    height: 800,
                    backgroundColor: `${palette.component.darkMax}`,
                    marginTop: 10
            },
            }}
            variant="permanent"
        >

            {navLinks
                .map((group) => {
                    return <SidebarItem key={group.route} link={group} isSidebarOpen={isSidebarOpen} />;
                })}
        </Drawer>
    );
};

export default Sidebar;
