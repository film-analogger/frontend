import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import type React from 'react';
import OpenSource from '../OpenSource/OpenSource';
import { Chip, Stack, Typography } from '@mui/material';
import { chipClasses } from '@mui/material/Chip';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import TheatersIcon from '@mui/icons-material/Theaters';
import TungstenIcon from '@mui/icons-material/Tungsten';
import CameraRollIcon from '@mui/icons-material/CameraRoll';
import BiotechIcon from '@mui/icons-material/Biotech';
import FactoryIcon from '@mui/icons-material/Factory';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SettingsInputCompositeIcon from '@mui/icons-material/SettingsInputComposite';
import ScienceIcon from '@mui/icons-material/Science';
import { Link as RouterLink, useLocation } from 'react-router';

import { AppLogo } from '~/components/Widgets/AppLogo/AppLogo';
import { drawerWidth } from '~/Theme/Constants/layout';
import { useTranslation } from 'react-i18next';
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
    const theme = useTheme();
    const activeColor = theme.palette.mode === 'light' ? 'primary.dark' : 'primary.light';

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
                    icon: <TungstenIcon />,
                    href: '/sessions',
                },
                {
                    translation: 'components.sidemenu.filmLogSheet',
                    icon: <TheatersIcon />,
                    href: '/negatifs',
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
                },
                {
                    translation: 'components.sidemenu.chemistries',
                    icon: <BiotechIcon />,
                    href: '/data/chemistries',
                },
                {
                    translation: 'components.sidemenu.manufacturers',
                    icon: <FactoryIcon />,
                    href: '/data/manufacturers',
                },
                {
                    translation: 'components.sidemenu.cameras',
                    icon: <PhotoCameraIcon />,
                    href: '/data/cameras',
                },
                {
                    translation: 'components.sidemenu.enlargers',
                    icon: <SettingsInputCompositeIcon />,
                    href: '/data/enlargers',
                },
                {
                    translation: 'components.sidemenu.photoPaper',
                    icon: <WallpaperIcon />,
                    href: '/data/photo-papers',
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
                        borderRight: '1px solid',
                        borderColor: 'divider',
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
                        px: 2,
                        py: 2.25,
                    }}
                    to="/"
                >
                    <AppLogo height="34px" />
                </Box>
                <Box
                    sx={{
                        overflow: 'auto',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Stack sx={{ flexGrow: 1, p: 1.5, gap: 2.25 }}>
                        {groups.map((group) => (
                            <Box key={group.label}>
                                <Stack
                                    direction="row"
                                    sx={{ alignItems: 'center', gap: 1, px: 1.25, pb: 0.75 }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: '10.5px',
                                            fontWeight: 700,
                                            letterSpacing: '0.05em',
                                            textTransform: 'uppercase',
                                            color: 'text.secondary',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {t(group.label)}
                                    </Typography>
                                    <Box
                                        sx={{ flex: 1, height: '1px', backgroundColor: 'divider' }}
                                    />
                                </Stack>
                                <Stack sx={{ gap: 0.25 }}>
                                    {group.items.map((item) => {
                                        const active = isActive(item);
                                        return (
                                            <ButtonBase
                                                aria-label={t(item.translation)}
                                                component={item.href ? RouterLink : 'div'}
                                                disabled={item.soon}
                                                key={item.translation}
                                                sx={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'flex-start',
                                                    gap: 1.25,
                                                    py: 1,
                                                    px: 1.25,
                                                    borderRadius: '9px',
                                                    textAlign: 'left',
                                                    color: active ? activeColor : 'text.primary',
                                                    backgroundColor: active
                                                        ? 'action.selected'
                                                        : 'transparent',
                                                    '&:hover': {
                                                        backgroundColor: item.soon
                                                            ? 'transparent'
                                                            : 'action.hover',
                                                    },
                                                }}
                                                {...(item.href ? { to: item.href } : {})}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        fontSize: '20px',
                                                        color: active
                                                            ? activeColor
                                                            : 'text.secondary',
                                                        opacity: item.soon ? 0.5 : 1,
                                                        '& svg': { fontSize: '20px' },
                                                    }}
                                                >
                                                    {item.icon}
                                                </Box>
                                                <Typography
                                                    noWrap
                                                    sx={{
                                                        flex: 1,
                                                        fontSize: '14px',
                                                        fontWeight: active ? 600 : 500,
                                                        color: 'inherit',
                                                    }}
                                                >
                                                    {t(item.translation)}
                                                </Typography>
                                                {item.soon ? (
                                                    <Chip
                                                        label={t('components.sidemenu.soon')}
                                                        size="small"
                                                        sx={{
                                                            height: 'auto',
                                                            opacity: 0.8,
                                                            [`& .${chipClasses.label}`]: {
                                                                padding: '2px 6px',
                                                                fontSize: '9.5px',
                                                                fontWeight: 700,
                                                                letterSpacing: '0.6px',
                                                                textTransform: 'uppercase',
                                                            },
                                                        }}
                                                        variant="outlined"
                                                    />
                                                ) : null}
                                                {typeof item.count === 'number' ? (
                                                    <Typography
                                                        sx={{
                                                            fontSize: '11px',
                                                            fontWeight: 600,
                                                            color: 'text.secondary',
                                                            opacity: 0.8,
                                                        }}
                                                    >
                                                        {item.count}
                                                    </Typography>
                                                ) : null}
                                            </ButtonBase>
                                        );
                                    })}
                                </Stack>
                            </Box>
                        ))}
                    </Stack>
                    <Box sx={{ p: 1.5, pt: 0 }}>
                        <LabModeToggle />
                    </Box>
                    <Box sx={{ px: 1.5, pb: 1.5 }}>
                        <OpenSource />
                    </Box>
                </Box>
            </Drawer>
        </Box>
    );
};

export default SideMenu;
