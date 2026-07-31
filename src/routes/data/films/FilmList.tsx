import { Box, Chip, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router';
import { FilmCard } from '~/components/Widgets/FilmCard/FilmCard';
import { useFilmApi, type FilmRead } from '~/api/client';
import { getProcessStyle, type Process } from '~/domain/processColors';
import type { RouteCrumbHandle } from '~/components/Layout/Parts/AppBar/AppBar';

export const handle: RouteCrumbHandle = {
    crumb: { section: 'components.sidemenu.group.reference', title: 'films.list.title' },
};

const FilmList: React.FunctionComponent = () => {
    const { t } = useTranslation();

    const { filmApi } = useFilmApi();

    const [error, setError] = React.useState<unknown>(null);
    const [loaded, setLoaded] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);

    const [films, setFilms] = React.useState<FilmRead[]>([]);
    const [processFilter, setProcessFilter] = React.useState<Process | null>(null);

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

    const processCounts = React.useMemo(() => {
        const counts = new Map<Process, number>();
        films.forEach((film) => {
            counts.set(film.process, (counts.get(film.process) ?? 0) + 1);
        });
        return counts;
    }, [films]);

    const visibleFilms = processFilter
        ? films.filter((film) => film.process === processFilter)
        : films;

    return (
        <Box>
            <Typography
                sx={{ mb: 0.5 }}
                variant="h1"
            >
                {t('films.list.title')}
            </Typography>
            <Typography
                color="text.secondary"
                sx={{ mb: 2 }}
                variant="body2"
            >
                {t('films.list.count', { count: films.length })}
            </Typography>

            {error ? (
                <Typography color="error">{t('errors.api.loadingData')}</Typography>
            ) : !loaded ? (
                <CircularProgress
                    enableTrackSlot
                    size="3rem"
                />
            ) : (
                <React.Fragment>
                    {processCounts.size > 0 ? (
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ flexWrap: 'wrap', gap: 1, mb: 3 }}
                        >
                            {Array.from(processCounts.entries()).map(([process, count]) => (
                                <Chip
                                    key={process}
                                    label={`${process} · ${String(count)}`}
                                    onClick={() => {
                                        setProcessFilter((current) =>
                                            current === process ? null : process,
                                        );
                                    }}
                                    sx={{
                                        borderColor: getProcessStyle(process).color,
                                        ...(processFilter === process
                                            ? {
                                                  backgroundColor: getProcessStyle(process).color,
                                                  color: getProcessStyle(process).fg,
                                              }
                                            : {}),
                                    }}
                                    variant={processFilter === process ? 'filled' : 'outlined'}
                                />
                            ))}
                        </Stack>
                    ) : null}

                    <Grid
                        container
                        spacing={2}
                    >
                        {visibleFilms.map((film) => (
                            <Grid
                                key={film['@id']}
                                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                            >
                                <Box
                                    component={RouterLink}
                                    sx={{ display: 'block', textDecoration: 'none' }}
                                    to={`/data/films/${film.id ?? ''}`}
                                >
                                    <FilmCard film={film} />
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </React.Fragment>
            )}
        </Box>
    );
};

export default FilmList;
