import React from 'react';

import { Container, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Terms: React.FunctionComponent = () => {
    const { t } = useTranslation();

    return (
        <Container maxWidth="sm">
            <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography
                    component="h1"
                    variant="h2"
                >
                    {t('legal.terms.title')}
                </Typography>
            </Box>
            <Typography>{t('legal.terms.description')}</Typography>
            {/* TODO: Add terms and conditions information */}
        </Container>
    );
};

export default Terms;
