import { Box, Chip, CircularProgress, Grid, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { useChemistryApi, useFilmApi, type ChemistryRead, type FilmRead } from '~/api/client';
import { FilmName } from '~/components/Widgets/FilmName/FilmName';
import { IsoChip } from '~/components/Widgets/IsoChip/IsoChip';
import { ProcessChip } from '~/components/Widgets/ProcessChip/ProcessChip';
import type { RouteCrumbHandle } from '~/components/Layout/Parts/AppBar/AppBar';

export const handle: RouteCrumbHandle = {
    crumb: { section: 'films.list.title', title: 'films.detail.title' },
};

const FilmDetail: React.FunctionComponent = () => {
    const { t } = useTranslation();
    const { filmId } = useParams<{ filmId: string }>();

    const { filmApi } = useFilmApi();
    const { chemistryApi } = useChemistryApi();

    const [error, setError] = React.useState<unknown>(null);
    const [loaded, setLoaded] = React.useState(false);
    const [film, setFilm] = React.useState<FilmRead | null>(null);
    const [chemistries, setChemistries] = React.useState<ChemistryRead[]>([]);

    React.useEffect(() => {
        if (!filmId) {
            return;
        }
        Promise.all([
            filmApi.apiFilmsIdGet({ id: filmId }),
            chemistryApi.apiChemistriesGetCollection(),
        ])
            .then(([filmRes, chemRes]) => {
                setFilm(filmRes.data);
                setChemistries(chemRes.data['hydra:member']);
                setLoaded(true);
            })
            .catch((err: unknown) => {
                console.error('Error fetching film:', err);
                setError(err);
            });
    }, [filmId, filmApi, chemistryApi]);

    if (error) {
        return <Typography color="error">{t('errors.api.loadingData')}</Typography>;
    }
    if (!loaded || !film) {
        return (
            <CircularProgress
                enableTrackSlot
                size="3rem"
            />
        );
    }

    const specs: { k: string; v: string }[] = [
        { k: t('films.detail.specs.process'), v: film.process },
        { k: t('films.detail.specs.emulsionType'), v: film.emulsionType ?? '—' },
        {
            k: t('films.detail.specs.sensibility'),
            v: t('components.filmCard.iso', { iso: film.sensibility }),
        },
        {
            k: t('films.detail.specs.inversible'),
            v: film.inversible ? t('films.detail.specs.yes') : t('films.detail.specs.no'),
        },
        { k: t('films.detail.specs.manufacturer'), v: film.manufacturer.name },
    ];

    const compatibleChemistries = chemistries
        .filter((chemistry) => chemistry.process === film.process)
        .slice(0, 4);

    return (
        <Box>
            <FilmName
                film={film}
                sx={{ maxWidth: 420, mb: 3 }}
            />
            <Stack
                direction="row"
                spacing={1}
                sx={{ mb: 3 }}
            >
                <ProcessChip film={film} />
                <IsoChip film={film} />
                {film.inversible ? (
                    <Chip
                        color="secondary"
                        label={t('components.filmCard.slide')}
                        size="small"
                        variant="outlined"
                    />
                ) : null}
            </Stack>

            <Grid
                container
                spacing={2}
            >
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper
                        sx={{ p: 2.5 }}
                        variant="outlined"
                    >
                        <Typography
                            sx={{ mb: 1.5 }}
                            variant="subtitle2"
                        >
                            {t('films.detail.specsTitle')}
                        </Typography>
                        <Stack spacing={1}>
                            {specs.map((s) => (
                                <Stack
                                    direction="row"
                                    key={s.k}
                                    sx={{ justifyContent: 'space-between' }}
                                >
                                    <Typography color="text.secondary">{s.k}</Typography>
                                    <Typography sx={{ fontWeight: 600 }}>{s.v}</Typography>
                                </Stack>
                            ))}
                        </Stack>
                        {film.description ? (
                            <Typography
                                color="text.secondary"
                                sx={{ mt: 2 }}
                                variant="body2"
                            >
                                {film.description}
                            </Typography>
                        ) : null}
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper
                        sx={{ p: 2.5 }}
                        variant="outlined"
                    >
                        <Typography
                            sx={{ mb: 0.5 }}
                            variant="subtitle2"
                        >
                            {t('films.detail.compatibleChemistries')}
                        </Typography>
                        <Typography
                            color="text.secondary"
                            sx={{ mb: 1.5 }}
                            variant="caption"
                        >
                            {t('films.detail.compatibleChemistriesHint', { process: film.process })}
                        </Typography>
                        {compatibleChemistries.length === 0 ? (
                            <Typography color="text.secondary">
                                {t('films.detail.noCompatibleChemistries')}
                            </Typography>
                        ) : (
                            <Stack spacing={1}>
                                {compatibleChemistries.map((chemistry) => (
                                    <Paper
                                        key={chemistry['@id']}
                                        sx={{ p: 1.5 }}
                                        variant="outlined"
                                    >
                                        <Typography sx={{ fontWeight: 600 }}>
                                            {chemistry.name}
                                        </Typography>
                                        <Typography
                                            color="text.secondary"
                                            variant="caption"
                                        >
                                            {chemistry.manufacturer.name} ·{' '}
                                            {chemistry.chemistryType.typeLabel}
                                        </Typography>
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

export default FilmDetail;
