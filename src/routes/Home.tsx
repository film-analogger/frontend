import React from 'react';

import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Home: React.FunctionComponent = () => {
    const { t } = useTranslation();
    return <Typography variant="h1">{t('home.title')}</Typography>;
};

export default Home;
