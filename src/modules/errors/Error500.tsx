import { Typography } from '@mui/material';
import React from 'react';

const Error500: React.FunctionComponent = () => {
    return (
        <>
            <title>Error</title>
            <Typography variant="h2">500 - Internal Server Error</Typography>
            <Typography variant="body1">
                Something went wrong on our end. Please try again later.
            </Typography>
        </>
    );
};

export default Error500;
