import React from 'react';

import {
    AppBar as MuiAppBar,
    Box,
    InputAdornment,
    OutlinedInput,
    Stack,
    Toolbar,
    Typography,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import { useMatches } from 'react-router';
import { AppearanceModeSwitch } from '~/Theme/AppearanceModeSwitch';
import LanguageIconDropdown from '~/i18n/LanguageIconDropdown';
import UserMenu from '~/components/Layout/Parts/UserMenu/UserMenu';
import { drawerWidth } from '~/Theme/Constants/layout';

export interface RouteCrumbHandle {
    crumb?: { section: string; title: string };
}

const useCrumb = () => {
    const matches = useMatches();
    for (let i = matches.length - 1; i >= 0; i -= 1) {
        const handle = matches[i]?.handle as RouteCrumbHandle | undefined;
        const crumb = handle?.crumb;
        if (crumb) {
            return crumb;
        }
    }
    return undefined;
};

const AppBar: React.FunctionComponent = () => {
    const { t } = useTranslation();
    const crumb = useCrumb();

    return (
        <MuiAppBar
            color="transparent"
            elevation={0}
            position="static"
            sx={{
                borderBottom: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'background.paper',
                paddingLeft: { xs: 0, md: drawerWidth },
                width: '100%',
            }}
        >
            <Toolbar
                sx={{
                    gap: 1.75,
                    flexWrap: 'wrap',
                    rowGap: 1,
                    minHeight: { xs: 56, sm: 64 },
                    paddingY: 1.25,
                    paddingX: { xs: 2, sm: 3.5 },
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                    <MenuIcon />
                    {/* TODO: Add click handler to toggle collapsible mobile navigation menu */}
                </Box>
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: 'center', minWidth: 0, flex: '1 1 auto', overflow: 'hidden' }}
                >
                    {crumb ? (
                        <React.Fragment>
                            <Typography
                                noWrap
                                sx={{
                                    display: { xs: 'none', sm: 'block' },
                                    fontSize: '12.5px',
                                    color: 'text.secondary',
                                }}
                            >
                                {t(crumb.section)}
                            </Typography>
                            <ChevronRightIcon
                                fontSize="small"
                                sx={{
                                    opacity: 0.35,
                                    display: { xs: 'none', sm: 'block' },
                                }}
                            />
                            <Typography
                                noWrap
                                sx={{ fontSize: '14px', fontWeight: 600 }}
                            >
                                {t(crumb.title)}
                            </Typography>
                        </React.Fragment>
                    ) : null}
                </Stack>
                <OutlinedInput
                    inputProps={{
                        'aria-label': t('components.header.search'),
                        sx: { fontSize: '13.5px' },
                    }}
                    placeholder={t('components.header.searchPlaceholder')}
                    size="small"
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon
                                fontSize="small"
                                sx={{ opacity: 0.6 }}
                            />
                        </InputAdornment>
                    }
                    sx={{
                        width: 250,
                        display: { xs: 'none', lg: 'flex' },
                        borderRadius: 2.5,
                        backgroundColor: 'background.default',
                    }}
                />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <AppearanceModeSwitch />
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <LanguageIconDropdown />
                    <UserMenu />
                </Box>
            </Toolbar>
        </MuiAppBar>
    );
};

export default AppBar;
