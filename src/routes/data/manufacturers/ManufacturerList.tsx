import { Box, CircularProgress, Grid, Paper, Stack, Typography } from '@mui/material';
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
import { getProcessStyle } from '~/domain/processColors';
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
                            <Paper
                                component={RouterLink}
                                sx={{
                                    display: 'block',
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    overflow: 'hidden',
                                }}
                                to={`/data/manufacturers/${manufacturer.id ?? ''}`}
                                variant="outlined"
                            >
                                <Box
                                    sx={{
                                        height: 56,
                                        display: 'flex',
                                        alignItems: 'center',
                                        px: 2,
                                        backgroundColor: manufacturer.primaryColor ?? undefined,
                                        color: manufacturer.secondaryColor ?? undefined,
                                        fontWeight: 700,
                                    }}
                                >
                                    {manufacturer.name}
                                </Box>
                                <Box sx={{ p: 2 }}>
                                    <Stack
                                        direction="row"
                                        spacing={3}
                                    >
                                        <Box>
                                            <Typography
                                                sx={{ fontWeight: 600 }}
                                                variant="h6"
                                            >
                                                {manufFilms.length}
                                            </Typography>
                                            <Typography
                                                color="text.secondary"
                                                variant="caption"
                                            >
                                                {t('manufacturers.list.films')}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography
                                                sx={{ fontWeight: 600 }}
                                                variant="h6"
                                            >
                                                {manufChemistries.length}
                                            </Typography>
                                            <Typography
                                                color="text.secondary"
                                                variant="caption"
                                            >
                                                {t('manufacturers.list.chemistries')}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                    {processes.length > 0 ? (
                                        <Stack
                                            direction="row"
                                            spacing={0.5}
                                            sx={{ flexWrap: 'wrap', gap: 0.5, mt: 1.5 }}
                                        >
                                            {processes.map((process) => (
                                                <Box
                                                    key={process}
                                                    sx={{
                                                        px: 0.75,
                                                        borderRadius: 0.75,
                                                        fontSize: '0.7rem',
                                                        fontWeight: 700,
                                                        backgroundColor:
                                                            getProcessStyle(process).color,
                                                        color: getProcessStyle(process).fg,
                                                    }}
                                                >
                                                    {process}
                                                </Box>
                                            ))}
                                        </Stack>
                                    ) : null}
                                </Box>
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default ManufacturerList;
