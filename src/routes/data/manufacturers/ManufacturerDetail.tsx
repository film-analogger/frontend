import { Box, CircularProgress, Grid, Link, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useParams } from 'react-router';
import {
    useChemistryApi,
    useFilmApi,
    useManufacturerApi,
    type ChemistryRead,
    type FilmRead,
    type ManufacturerRead,
} from '~/api/client';
import { FilmName } from '~/components/Widgets/FilmName/FilmName';
import { ProcessChip } from '~/components/Widgets/ProcessChip/ProcessChip';
import type { RouteCrumbHandle } from '~/components/Layout/Parts/AppBar/AppBar';

export const handle: RouteCrumbHandle = {
    crumb: { section: 'manufacturers.list.title', title: 'manufacturers.detail.title' },
};

const ManufacturerDetail: React.FunctionComponent = () => {
    const { t } = useTranslation();
    const { manufacturerId } = useParams<{ manufacturerId: string }>();

    const { manufacturerApi } = useManufacturerApi();
    const { filmApi } = useFilmApi();
    const { chemistryApi } = useChemistryApi();

    const [error, setError] = React.useState<unknown>(null);
    const [loaded, setLoaded] = React.useState(false);
    const [manufacturer, setManufacturer] = React.useState<ManufacturerRead | null>(null);
    const [films, setFilms] = React.useState<FilmRead[]>([]);
    const [chemistries, setChemistries] = React.useState<ChemistryRead[]>([]);

    React.useEffect(() => {
        if (!manufacturerId) {
            return;
        }
        Promise.all([
            manufacturerApi.apiManufacturersIdGet({ id: manufacturerId }),
            filmApi.apiFilmsGetCollection(),
            chemistryApi.apiChemistriesGetCollection(),
        ])
            .then(([manufRes, filmRes, chemRes]) => {
                setManufacturer(manufRes.data);
                setFilms(filmRes.data['hydra:member']);
                setChemistries(chemRes.data['hydra:member']);
                setLoaded(true);
            })
            .catch((err: unknown) => {
                console.error('Error fetching manufacturer:', err);
                setError(err);
            });
    }, [manufacturerId, manufacturerApi, filmApi, chemistryApi]);

    if (error) {
        return <Typography color="error">{t('errors.api.loadingData')}</Typography>;
    }
    if (!loaded || !manufacturer) {
        return (
            <CircularProgress
                aria-label={t('app.loading')}
                enableTrackSlot
                size="3rem"
            />
        );
    }

    const manufFilms = films.filter((film) => film.manufacturer.id === manufacturer.id);
    // Chemistries don't expose the manufacturer id in this API response shape, only its name.
    const manufChemistries = chemistries.filter(
        (chemistry) => chemistry.manufacturer.name === manufacturer.name,
    );

    return (
        <Box>
            <Paper
                sx={{
                    p: 3,
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    flexWrap: 'wrap',
                    backgroundColor: manufacturer.primaryColor ?? undefined,
                    color: manufacturer.secondaryColor ?? undefined,
                }}
                variant="outlined"
            >
                <Typography
                    sx={{ flex: 1, fontWeight: 700 }}
                    variant="h4"
                >
                    {manufacturer.name}
                </Typography>
                {manufacturer.website ? (
                    <Link
                        color="inherit"
                        href={
                            manufacturer.website.startsWith('http')
                                ? manufacturer.website
                                : `https://${manufacturer.website}`
                        }
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        {manufacturer.website}
                    </Link>
                ) : null}
            </Paper>

            <Grid
                container
                spacing={2}
            >
                <Grid size={{ xs: 12, md: 7 }}>
                    <Paper
                        sx={{ p: 2.5 }}
                        variant="outlined"
                    >
                        <Typography
                            sx={{ mb: 1.5 }}
                            variant="subtitle2"
                        >
                            {t('manufacturers.detail.films', { count: manufFilms.length })}
                        </Typography>
                        {manufFilms.length === 0 ? (
                            <Typography color="text.secondary">
                                {t('manufacturers.detail.noFilms')}
                            </Typography>
                        ) : (
                            <Grid
                                container
                                spacing={1.5}
                            >
                                {manufFilms.map((film) => (
                                    <Grid
                                        key={film['@id']}
                                        size={{ xs: 12, sm: 6 }}
                                    >
                                        <Box
                                            component={RouterLink}
                                            sx={{ display: 'block', textDecoration: 'none' }}
                                            to={`/data/films/${film.id ?? ''}`}
                                        >
                                            <FilmName film={film} />
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 5 }}>
                    <Paper
                        sx={{ p: 2.5 }}
                        variant="outlined"
                    >
                        <Typography
                            sx={{ mb: 1.5 }}
                            variant="subtitle2"
                        >
                            {t('manufacturers.detail.chemistries', {
                                count: manufChemistries.length,
                            })}
                        </Typography>
                        {manufChemistries.length === 0 ? (
                            <Typography color="text.secondary">
                                {t('manufacturers.detail.noChemistries')}
                            </Typography>
                        ) : (
                            <Stack spacing={1}>
                                {manufChemistries.map((chemistry) => (
                                    <Paper
                                        component={RouterLink}
                                        key={chemistry['@id']}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1.5,
                                            p: 1.5,
                                            textDecoration: 'none',
                                            color: 'inherit',
                                        }}
                                        to={`/data/chemistries/${chemistry.id ?? ''}`}
                                        variant="outlined"
                                    >
                                        <Box sx={{ flex: 1 }}>
                                            <Typography sx={{ fontWeight: 600 }}>
                                                {chemistry.name}
                                            </Typography>
                                            <Typography
                                                color="text.secondary"
                                                variant="caption"
                                            >
                                                {chemistry.chemistryType.typeLabel}
                                            </Typography>
                                        </Box>
                                        <ProcessChip film={chemistry} />
                                    </Paper>
                                ))}
                            </Stack>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ManufacturerDetail;
