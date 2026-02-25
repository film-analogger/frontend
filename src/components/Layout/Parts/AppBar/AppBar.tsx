import React from 'react';

import { AppBar as MuiAppBar, Box, Toolbar } from '@mui/material';
import ColorModeIconDropdown from '~/Theme/ColorModeIconDropdown';
import { drawerWidth, headerHeight, headerMt } from '~/Theme/Constants/layout';
import MenuIcon from '@mui/icons-material/Menu';

const AppBar: React.FunctionComponent = () => {
    return (
        <MuiAppBar
            color="transparent"
            elevation={0}
            position="static"
            sx={{
                borderBottom: '1px solid',
                borderColor: 'divider',
                paddingLeft: drawerWidth,
                width: '100%',
            }}
        >
            <Toolbar
                sx={{
                    gap: 1.5,
                    height: headerHeight,
                    // width: `calc(100% - ${drawerWidth})`,
                    mt: headerMt,
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Box>
                    <MenuIcon />
                </Box>
                <Box>
                    <ColorModeIconDropdown />
                </Box>
            </Toolbar>
        </MuiAppBar>
    );
};

export default AppBar;
