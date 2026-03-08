import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFilmApi } from '~/api/client';

const FilmList: React.FunctionComponent = () => {
    const { t } = useTranslation();

    const { getFilms } = useFilmApi();

    React.useEffect(() => {
        const fetchFilms = async () => {
            const data = await getFilms();
            console.log('Fetched films:', data['hydra:member']);
        };
        fetchFilms().catch(console.error);
    }, [getFilms]);

    return (
        <Box>
            <Typography variant="h1">{t('home.title')}</Typography>
        </Box>
    );
};

export default FilmList;
