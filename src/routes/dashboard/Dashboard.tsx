import { Box, Typography } from '@mui/material';
import React from 'react';

import { Outlet } from 'react-router';
import { useTranslation } from 'react-i18next';

const Dashboard: React.FunctionComponent = () => {
    const { t } = useTranslation();
    return (
        <Box>
            <Typography variant="h1">{t('dashboard.title')}</Typography>
            {/* will either be home.tsx or settings.tsx */}
            <Outlet />
        </Box>
    );
};

export default Dashboard;
