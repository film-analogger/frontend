import { Box } from '@mui/material';
import React from 'react';
import { Scrollbar } from 'react-scrollbars-custom';
import { Outlet } from 'react-router';
import AppBar from '~/components/Layout/Parts/AppBar/AppBar';
import Footer from '~/components/Layout/Parts/Footer/Footer';
import SideMenu from '~/components/Layout/Parts/SideMenu/SideMenu';
import { drawerWidth, footerHeight, headerHeight, headerPaddingPx } from '~/Theme/Constants/layout';

const Dashboard: React.FunctionComponent = () => {
    return (
        <React.Fragment>
            <SideMenu />
            <AppBar />
            <Box
                component="main"
                sx={{ overflow: 'auto', marginLeft: { xs: 0, md: drawerWidth } }}
            >
                <Scrollbar
                    style={{
                        width: '100%',
                        height: `calc(100vh - (${headerHeight} + ${footerHeight} + ${headerPaddingPx}))`, // 100vh - headerHeight - footerHeight - paddingY
                    }}
                >
                    <Box sx={{ padding: 2, height: '100%' }}>
                        <Outlet />
                    </Box>
                </Scrollbar>
            </Box>
            <Footer />
        </React.Fragment>
    );
};

export default Dashboard;
