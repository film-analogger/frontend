import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router';
import {
    useChemistryApi,
    useFilmApi,
    useManufacturerApi,
    type ChemistryRead,
    type FilmRead,
    type ManufacturerRead,
} from '~/api/client';
import { ManufacturerCard } from '~/components/Widgets/ManufacturerCard/ManufacturerCard';
import type { RouteCrumbHandle } from '~/components/Layout/Parts/AppBar/AppBar';

export const handle: RouteCrumbHandle = {
    crumb: {
        section: 'components.sidemenu.group.reference',
        title: 'manufacturers.list.title',
    },
};

const ManufacturerList: React.FunctionComponent = () => {
    const { t } = useTranslation();
    const { manufacturerApi } = useManufacturerApi();
    const { filmApi } = useFilmApi();
    const { chemistryApi } = useChemistryApi();

    const [error, setError] = React.useState<unknown>(null);
    const [loaded, setLoaded] = React.useState(false);
    const [manufacturers, setManufacturers] = React.useState<ManufacturerRead[]>([]);
    const [films, setFilms] = React.useState<FilmRead[]>([]);
    const [chemistries, setChemistries] = React.useState<ChemistryRead[]>([]);

    React.useEffect(() => {
        Promise.all([
            manufacturerApi.apiManufacturersGetCollection(),
            filmApi.apiFilmsGetCollection(),
            chemistryApi.apiChemistriesGetCollection(),
        ])
            .then(([manufRes, filmRes, chemRes]) => {
                setManufacturers(manufRes.data['hydra:member']);
                setFilms(filmRes.data['hydra:member']);
                setChemistries(chemRes.data['hydra:member']);
                setLoaded(true);
            })
            .catch((err: unknown) => {
                console.error('Error fetching manufacturers:', err);
                setError(err);
            });
    }, [manufacturerApi, filmApi, chemistryApi]);

    if (error) {
        return <Typography color="error">{t('errors.api.loadingData')}</Typography>;
    }
    if (!loaded) {
        return (
            <CircularProgress
                aria-label={t('app.loading')}
                enableTrackSlot
                size="3rem"
            />
        );
    }

    return (
        <Box>
            <Typography
                sx={{ mb: 0.5 }}
                variant="h1"
            >
                {t('manufacturers.list.title')}
            </Typography>
            <Typography
                color="text.secondary"
                sx={{ mb: 3 }}
                variant="body2"
            >
                {t('manufacturers.list.count', { count: manufacturers.length })}
            </Typography>

            <Grid
                container
                spacing={2}
            >
                {manufacturers.map((manufacturer) => {
                    const manufFilms = films.filter(
                        (film) => film.manufacturer.id === manufacturer.id,
                    );
                    const manufChemistries = chemistries.filter(
                        (chemistry) => chemistry.manufacturer.name === manufacturer.name,
                    );
                    const processes = Array.from(
                        new Set([
                            ...manufFilms.map((f) => f.process),
                            ...manufChemistries.map((c) => c.process),
                        ]),
                    );

                    return (
                        <Grid
                            key={manufacturer['@id']}
                            size={{ xs: 12, sm: 6, md: 4 }}
                        >
                            <Box
                                component={RouterLink}
                                sx={{ display: 'block', height: '100%', textDecoration: 'none' }}
                                to={`/data/manufacturers/${manufacturer.id ?? ''}`}
                            >
                                <ManufacturerCard
                                    chemistriesCount={manufChemistries.length}
                                    filmsCount={manufFilms.length}
                                    manufacturer={manufacturer}
                                    processes={processes}
                                />
                            </Box>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default ManufacturerList;
