import { styled } from '@mui/material/styles';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import type React from 'react';
import OpenSource from '../OpenSource/OpenSource';
import {
    Chip,
    Link,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Stack,
    Typography,
} from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import GradientIcon from '@mui/icons-material/Gradient';
import ScienceIcon from '@mui/icons-material/Science';
import CameraRollIcon from '@mui/icons-material/CameraRoll';
import BiotechIcon from '@mui/icons-material/Biotech';
import FactoryIcon from '@mui/icons-material/Factory';
import TextureIcon from '@mui/icons-material/Texture';
import { Link as RouterLink, useLocation } from 'react-router';

import { AppLogo } from '~/components/Widgets/AppLogo/AppLogo';
import { drawerWidth, headerMt, headerPadding } from '~/Theme/Constants/layout';
import { useTranslation } from 'react-i18next';
import { useNavCounts } from './useNavCounts';
import { LabModeToggle } from './LabModeToggle';

const Drawer = styled(MuiDrawer)({
    width: drawerWidth,
    flexShrink: 0,
    boxSizing: 'border-box',
    [`& .${drawerClasses.paper}`]: {
        width: drawerWidth,
        boxSizing: 'border-box',
    },
});

interface NavItem {
    translation: string;
    icon: React.ReactNode;
    href?: string;
    family?: string[];
    count?: number;
    soon?: boolean;
}

const SideMenu: React.FunctionComponent = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const counts = useNavCounts();

    const isActive = (item: NavItem) => {
        if (!item.href) {
            return false;
        }
        const paths = [item.href, ...(item.family ?? [])];
        return paths.some((path) =>
            path === '/' ? location.pathname === '/' : location.pathname.startsWith(path),
        );
    };

    const groups: { label: string; items: NavItem[] }[] = [
        {
            label: 'components.sidemenu.group.logbook',
            items: [
                { translation: 'components.sidemenu.home', icon: <HomeRoundedIcon />, href: '/' },
                {
                    translation: 'components.sidemenu.sessions',
                    icon: <LocalPrintshopIcon />,
                    href: '/sessions',
                    count: counts.sessions,
                },
                {
                    translation: 'components.sidemenu.filmLogSheet',
                    icon: <GradientIcon />,
                    soon: true,
                },
                {
                    translation: 'components.sidemenu.developmentCharts',
                    icon: <ScienceIcon />,
                    soon: true,
                },
            ],
        },
        {
            label: 'components.sidemenu.group.reference',
            items: [
                {
                    translation: 'components.sidemenu.films',
                    icon: <CameraRollIcon />,
                    href: '/data/films',
                    count: counts.films,
                },
                {
                    translation: 'components.sidemenu.chemistries',
                    icon: <BiotechIcon />,
                    href: '/data/chemistries',
                    count: counts.chemistries,
                },
                {
                    translation: 'components.sidemenu.manufacturers',
                    icon: <FactoryIcon />,
                    href: '/data/manufacturers',
                    count: counts.manufacturers,
                },
                {
                    translation: 'components.sidemenu.photoPaper',
                    icon: <TextureIcon />,
                    soon: true,
                },
            ],
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
                        <Box>
                            {groups.map((group) => (
                                <List
                                    dense
                                    key={group.label}
                                    subheader={
                                        <ListSubheader
                                            component="div"
                                            disableSticky
                                            sx={{
                                                lineHeight: '28px',
                                                fontSize: '0.68rem',
                                                fontWeight: 700,
                                                letterSpacing: '0.08em',
                                                textTransform: 'uppercase',
                                            }}
                                        >
                                            {t(group.label)}
                                        </ListSubheader>
                                    }
                                >
                                    {group.items.map((item) => {
                                        const active = isActive(item);
                                        return (
                                            <ListItem
                                                disablePadding
                                                key={item.translation}
                                                sx={{ display: 'block', padding: 0.5 }}
                                            >
                                                <ListItemButton
                                                    aria-label={t(item.translation)}
                                                    disabled={item.soon}
                                                    selected={active}
                                                    sx={{
                                                        height: 44,
                                                        width: '100%',
                                                        borderRadius: 2,
                                                        '&::before': {
                                                            opacity: 0,
                                                        },
                                                    }}
                                                    {...(item.href
                                                        ? { LinkComponent: Link, href: item.href }
                                                        : {})}
                                                >
                                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                                    <ListItemText primary={t(item.translation)} />
                                                    {item.soon ? (
                                                        <Chip
                                                            label={t('components.sidemenu.soon')}
                                                            size="small"
                                                            variant="outlined"
                                                        />
                                                    ) : null}
                                                    {typeof item.count === 'number' ? (
                                                        <Typography
                                                            color="text.secondary"
                                                            variant="caption"
                                                        >
                                                            {item.count}
                                                        </Typography>
                                                    ) : null}
                                                </ListItemButton>
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            ))}
                        </Box>
                    </Stack>
                    <Box sx={{ p: 1 }}>
                        <LabModeToggle />
                    </Box>
                    <OpenSource />
                </Box>
            </Drawer>
        </Box>
    );
};

export default SideMenu;
