import { Box } from '@mui/material';
import { ReactNode } from 'react';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';

interface INavLink {
    icon?: ReactNode;
    label: string;
    route: string;
}

interface Props {
    link: INavLink;
    isSidebarOpen: boolean;
    removeSelectionStyles?: boolean;
}

const SidebarItem = ({ link, isSidebarOpen, removeSelectionStyles = false }: Props) => {
    const location = useLocation();
    const path = useResolvedPath(link.route);

    const locationPathname = location.pathname.toLowerCase();
    const toPathname = path.pathname.toLowerCase();

    const isActive =
        !removeSelectionStyles &&
        (locationPathname === toPathname ||
            (locationPathname.startsWith(toPathname) && locationPathname.charAt(toPathname.length) === '/'));

    return (
        <Box
            key={link.route}
            component={Link}
            to={link.route}
            display="flex"
            alignItems="center"
            justifyContent={isSidebarOpen ? 'flex-start' : 'center'}
            minHeight="40px"
            height="40px"
            pl={isSidebarOpen ? 3 : 0}
            bgcolor={isActive ? 'primary.100' : 'inherit'}
            boxShadow={isActive && isSidebarOpen ? 'inset -3px 0px 0px #7C9A2A' : 'none'}
            sx={{ textDecoration: 'none', cursor: 'pointer' }}
            data-testid={link.route}
            color='#ffffff'
        >
            {link.icon}

            {isSidebarOpen && (
                <Box ml={link.icon ? '10px' : '36px'} fontSize="14px">
                    {link.label}
                </Box>
            )}
        </Box>
    );
};

export default SidebarItem;