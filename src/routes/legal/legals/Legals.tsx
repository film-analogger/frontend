import React from 'react';

import { Container, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Legals: React.FunctionComponent = () => {
    const { t } = useTranslation();

    return (
        <Container maxWidth="sm">
            <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography
                    component="h1"
                    variant="h2"
                >
                    {t('legal.legals.title')}
                </Typography>
            </Box>
            <Typography>{t('legal.legals.description')}</Typography>
            {/* TODO: Add legal information */}
        </Container>
    );
};

export default Legals;
