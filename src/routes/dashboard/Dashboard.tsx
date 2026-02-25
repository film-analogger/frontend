import { Box } from '@mui/material';
import React from 'react';

import { Outlet } from 'react-router';
import AppBar from '~/components/Layout/Parts/AppBar/AppBar';
import Footer from '~/components/Layout/Parts/Footer/Footer';
import SideMenu from '~/components/Layout/Parts/SideMenu/SideMenu';
import { drawerWidth } from '~/Theme/Constants/layout';

const Dashboard: React.FunctionComponent = () => {
    return (
        <React.Fragment>
            <SideMenu />
            <AppBar />
            <Box
                component="main"
                sx={{ overflow: 'auto', marginLeft: drawerWidth, p: 3 }}
            >
                <Outlet />
            </Box>
            <Footer />
        </React.Fragment>
    );
};

export default Dashboard;
