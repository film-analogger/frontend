import { Box, Typography } from '@mui/material';
import React from 'react';

import { Outlet } from 'react-router';

const Dashboard: React.FunctionComponent = () => {
    return (
        <Box>
            <Typography variant="h1">Dashboard</Typography>
            {/* will either be home.tsx or settings.tsx */}
            <Outlet />
        </Box>
    );
};

export default Dashboard;
