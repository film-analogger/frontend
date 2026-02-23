import { Container } from '@mui/material';
import React from 'react';

import { Outlet } from 'react-router';
import Footer from '~/components/Layout/Parts/Footer/Footer';

const BaseError: React.FunctionComponent = () => {
    return (
        <React.Fragment>
            <Container
                component="main"
                maxWidth="sm"
                sx={{ textAlign: 'center', py: 8 }}
            >
                <Outlet />
            </Container>
            <Footer />
        </React.Fragment>
    );
};

export default BaseError;
