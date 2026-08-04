import { Container } from '@mui/material';
import React from 'react';

import { Outlet } from 'react-router';

const BaseError: React.FunctionComponent = () => {
    return (
        <Container
            maxWidth="md"
            sx={{ py: 8 }}
        >
            <Outlet />
        </Container>
    );
};

export default BaseError;
