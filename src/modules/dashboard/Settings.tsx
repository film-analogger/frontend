import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Settings: React.FunctionComponent = () => {
    const { t } = useTranslation();
    return (
        <Box>
            <Typography variant="h1">{t('settings.title')}</Typography>
        </Box>
    );
};

export default Settings;
