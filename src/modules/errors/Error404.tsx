import { Typography } from '@mui/material';
import React from 'react';

const Error404: React.FunctionComponent = () => {
    return (
        <>
            <title>Not found</title>
            <Typography variant="h2">404 - Not Found</Typography>
            <Typography variant="body1">The page you are looking for does not exist.</Typography>
        </>
    );
};

export default Error404;
