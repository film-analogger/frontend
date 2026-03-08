import { CircularProgress, Grid, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FilmCard } from '~/components/Widgets/FilmCard/FilmCard';
import { useFilmApi, type FilmRead } from '~/api/client';

const FilmList: React.FunctionComponent = () => {
    const { t } = useTranslation();

    const { filmApi } = useFilmApi();

    const [error, setError] = React.useState<unknown>(null);
    const [loaded, setLoaded] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);

    const [films, setFilms] = React.useState<FilmRead[]>([]);

    React.useEffect(() => {
        const fetchFilms = async () => {
            setLoaded(false);
            setLoading(true);
            const res = await filmApi.apiFilmsGetCollection().catch((err: unknown) => {
                console.error('Error fetching films:', err);
                setError(err);
            });
            if (res) {
                setFilms(res.data['hydra:member']);
                setLoaded(true);
                setLoading(false);
            } else {
                setError(new Error('No response from API'));
            }
        };
        if (!loaded && !loading) {
            fetchFilms().catch(console.error);
        }
    }, [filmApi, loaded, loading]);

    return error ? (
        <Typography color="error">{t('errors.api.loadingData')}</Typography>
    ) : !loaded ? (
        <CircularProgress
            enableTrackSlot
            size="3rem"
        />
    ) : (
        <Grid
            container
            spacing={2}
        >
            {films.map((film) => (
                <Grid
                    key={film['@id']}
                    size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                >
                    <FilmCard film={film} />
                </Grid>
            ))}
        </Grid>
    );
};

export default FilmList;
