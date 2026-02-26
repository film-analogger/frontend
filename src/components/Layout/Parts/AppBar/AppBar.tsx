import React from 'react';

import { AppBar as MuiAppBar, Box, Toolbar } from '@mui/material';
import ColorModeIconDropdown from '~/Theme/ColorModeIconDropdown';
import { drawerWidth, headerHeight, headerMt } from '~/Theme/Constants/layout';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIconDropdown from '~/i18n/LanguageIconDropdown';

const AppBar: React.FunctionComponent = () => {
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
                </Box>
            </Toolbar>
        </MuiAppBar>
    );
};

export default AppBar;
