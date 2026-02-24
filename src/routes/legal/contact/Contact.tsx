import React from 'react';

import { Box, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Contact: React.FunctionComponent = () => {
    const { t } = useTranslation();

    return (
        <Container maxWidth="sm">
            <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography
                    component="h1"
                    variant="h2"
                >
                    {t('legal.contact.title')}
                </Typography>
            </Box>
            <Typography>{t('legal.contact.description')}</Typography>
            {/* TODO: Add contact form */}
        </Container>
    );
};

export default Contact;
