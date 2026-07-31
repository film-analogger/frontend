import React from 'react';

import {
    AppBar as MuiAppBar,
    Box,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Stack,
    Toolbar,
    Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import { useMatches, useNavigate } from 'react-router';
import { AppearanceModeSwitch } from '~/Theme/AppearanceModeSwitch';
import LanguageIconDropdown from '~/i18n/LanguageIconDropdown';
import UserMenu from '~/components/Layout/Parts/UserMenu/UserMenu';
import { drawerWidth, headerHeight, headerMt } from '~/Theme/Constants/layout';

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
    const navigate = useNavigate();
    const crumb = useCrumb();

    return (
        <MuiAppBar
            color="transparent"
            elevation={0}
            position="static"
            sx={{
                borderBottom: '1px solid',
                borderColor: 'divider',
                paddingLeft: { xs: 2, md: drawerWidth },
                width: '100%',
            }}
        >
            <Toolbar
                sx={{
                    gap: 1.5,
                    flexWrap: 'wrap',
                    rowGap: 1,
                    height: headerHeight,
                    minHeight: { xs: 'auto', md: headerHeight },
                    marginTop: headerMt,
                    paddingY: 1,
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
                            <IconButton
                                aria-label="back"
                                onClick={() => {
                                    void navigate(-1);
                                }}
                                size="small"
                                sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
                            >
                                <ArrowBackIcon fontSize="small" />
                            </IconButton>
                            <Typography
                                color="text.secondary"
                                noWrap
                                sx={{ display: { xs: 'none', sm: 'block' } }}
                                variant="caption"
                            >
                                {t(crumb.section)}
                            </Typography>
                            <ChevronRightIcon
                                fontSize="small"
                                sx={{
                                    opacity: 0.4,
                                    display: { xs: 'none', sm: 'block' },
                                }}
                            />
                            <Typography
                                noWrap
                                sx={{ fontWeight: 600 }}
                                variant="body2"
                            >
                                {t(crumb.title)}
                            </Typography>
                        </React.Fragment>
                    ) : null}
                </Stack>
                <OutlinedInput
                    inputProps={{ 'aria-label': t('components.header.search') }}
                    placeholder={t('components.header.searchPlaceholder')}
                    size="small"
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon fontSize="small" />
                        </InputAdornment>
                    }
                    sx={{ width: 250, display: { xs: 'none', lg: 'flex' } }}
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
