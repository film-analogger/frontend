import { Typography } from '@mui/material';
import React from 'react';

import { Outlet } from 'react-router';

const BaseError: React.FunctionComponent = () => {
    return (
        <>
            <title>Error</title>
            <meta
                content="An error occurred"
                name="description"
            />
            <Typography variant="h1">Error</Typography>
            <Outlet />
        </>
    );
};

export default BaseError;
