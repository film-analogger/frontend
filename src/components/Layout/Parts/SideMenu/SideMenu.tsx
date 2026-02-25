import { styled } from '@mui/material/styles';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import type React from 'react';
import OpenSource from '../OpenSource/OpenSource';
import {
    Link,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
} from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import TheatersIcon from '@mui/icons-material/Theaters';
import CameraRollIcon from '@mui/icons-material/CameraRoll';
import ScienceIcon from '@mui/icons-material/Science';
import PhotoSizeSelectLargeIcon from '@mui/icons-material/PhotoSizeSelectLarge';
import NoteIcon from '@mui/icons-material/Note';
import { Link as RouterLink } from 'react-router';

import { AppLogo } from '~/components/Widgets/AppLogo/AppLogo';
import { drawerWidth, headerMt, headerPadding } from '~/Theme/Constants/layout';
import { useTranslation } from 'react-i18next';

const Drawer = styled(MuiDrawer)({
    width: drawerWidth,
    flexShrink: 0,
    boxSizing: 'border-box',
    marginTop: 10,
    [`& .${drawerClasses.paper}`]: {
        width: drawerWidth,
        boxSizing: 'border-box',
    },
});

const SideMenu: React.FunctionComponent = () => {
    const { t } = useTranslation();

    const mainListItems = [
        { translation: 'components.sidemenu.home', icon: <HomeRoundedIcon />, href: '/' },
        {
            translation: 'components.sidemenu.filmLogSheet',
            icon: <TheatersIcon />,
            href: '/film-log-sheet',
        },
        {
            translation: 'components.sidemenu.developmentCharts',
            icon: <ScienceIcon />,
            href: '/development-charts',
        },
        {
            translation: 'components.sidemenu.printLogSheet',
            icon: <PhotoSizeSelectLargeIcon />,
            href: '/print-log-sheet',
        },
    ];

    const secondaryListItems = [
        { translation: 'components.sidemenu.films', icon: <CameraRollIcon />, href: '/film-list' },
        {
            translation: 'components.sidemenu.photoPaper',
            icon: <NoteIcon />,
            href: '/photo-paper-list',
        },
    ];

    return (
        <Box component="nav">
            <Drawer
                sx={{
                    display: { xs: 'none', md: 'block' },
                    [`& .${drawerClasses.paper}`]: {
                        backgroundColor: 'background.paper',
                    },
                }}
                variant="permanent"
            >
                <Box
                    component={RouterLink}
                    sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        color: 'text.primary',
                        flexGrow: 1,
                        marginTop: headerMt,
                        p: headerPadding,
                    }}
                    to="/"
                >
                    <AppLogo />
                </Box>
                <Divider />
                <Box
                    sx={{
                        overflow: 'auto',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
                        <List dense>
                            {mainListItems.map((item) => (
                                <ListItem
                                    disablePadding
                                    key={item.href}
                                    sx={{ display: 'block', padding: 0.5 }}
                                >
                                    <ListItemButton
                                        LinkComponent={Link}
                                        aria-label={t(item.translation)}
                                        href={item.href}
                                        sx={{
                                            height: 50,
                                            width: '100%',
                                            '&::before': {
                                                opacity: 0,
                                            },
                                        }}
                                    >
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={t(item.translation)} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                        <List dense>
                            {secondaryListItems.map((item) => (
                                <ListItem
                                    disablePadding
                                    key={item.href}
                                    sx={{ display: 'block', padding: 0.5 }}
                                >
                                    <ListItemButton
                                        LinkComponent={Link}
                                        aria-label={t(item.translation)}
                                        href={item.href}
                                        sx={{
                                            height: 50,
                                            width: '100%',
                                            '&::before': {
                                                opacity: 0,
                                            },
                                        }}
                                    >
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={t(item.translation)} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Stack>
                    <OpenSource />
                </Box>
            </Drawer>
        </Box>
    );
};

export default SideMenu;
