import React from 'react';

import { AppBar as MuiAppBar, Box, IconButton, Toolbar, Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { useTranslation } from 'react-i18next';
import ColorModeIconDropdown from '~/Theme/ColorModeIconDropdown';
import { drawerWidth, headerHeight, headerMt } from '~/Theme/Constants/layout';
import LanguageIconDropdown from '~/i18n/LanguageIconDropdown';
import { useKeycloak } from '~/keycloak/useKeycloak';

const AppBar: React.FunctionComponent = () => {
    const { t } = useTranslation();
    const { keycloak } = useKeycloak();

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
                    height: headerHeight,
                    marginTop: headerMt,
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Box>
                    <MenuIcon />
                    {/* TODO: Add click handler to toggle collapsible mobile navigation menu */}
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <ColorModeIconDropdown />
                    <LanguageIconDropdown />
                    <Tooltip title={t('auth.logout')}>
                        <IconButton onClick={() => void keycloak.logout()}>
                            <LogoutIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Toolbar>
        </MuiAppBar>
    );
};

export default AppBar;
