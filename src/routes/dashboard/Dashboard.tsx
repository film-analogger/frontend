import { Box, Typography } from '@mui/material';
import React from 'react';

import { Outlet } from 'react-router';
import { useTranslation } from 'react-i18next';
import Footer from '~/components/Layout/Parts/Footer/Footer';

const Dashboard: React.FunctionComponent = () => {
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <Box component="main">
                <Typography variant="h1">{t('dashboard.title')}</Typography>
                {/* will either be home.tsx or settings.tsx */}
                <Outlet />
            </Box>
            <Footer />
        </React.Fragment>
    );
};

export default Dashboard;
