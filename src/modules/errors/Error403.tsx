import { Typography } from '@mui/material';
import React from 'react';

const Error403: React.FunctionComponent = () => {
    return (
        <>
            <title>Forbidden</title>
            <Typography variant="h2">403 - Forbidden</Typography>
            <Typography variant="body1">
                You don&apos;t have permission to access this page.
            </Typography>
        </>
    );
};

export default Error403;
