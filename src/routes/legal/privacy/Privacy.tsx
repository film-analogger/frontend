import React from 'react';

import { Box, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Privacy: React.FunctionComponent = () => {
    const { t } = useTranslation();

    return (
        <Container maxWidth="sm">
            <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography
                    component="h1"
                    variant="h2"
                >
                    {t('legal.privacy.title')}
                </Typography>
            </Box>
            <Typography>{t('legal.privacy.description')}</Typography>
            {/* TODO: Add privacy policy information */}
        </Container>
    );
};

export default Privacy;
