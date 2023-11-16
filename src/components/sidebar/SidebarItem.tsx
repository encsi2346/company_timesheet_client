import {Box, useTheme} from '@mui/material';
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
    const { palette } = useTheme();
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
            bgcolor={isActive ? `${palette.component.lightMax}` : `${palette.component.darkMax}`}
            sx={{ textDecoration: 'none', cursor: 'pointer' }}
            data-testid={link.route}
            color={isActive ? `${palette.component.darkMax}` : `${palette.textColor.light}`}
        >
            {isSidebarOpen && (
                <Box ml={link.icon ? '10px' : '36px'} fontSize="14px">
                    {link.label}
                </Box>
            )}
        </Box>
    );
};

export default SidebarItem;