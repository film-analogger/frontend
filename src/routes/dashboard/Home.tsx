import AddIcon from '@mui/icons-material/Add';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import TimerIcon from '@mui/icons-material/Timer';
import { Box, Button, CircularProgress, Grid, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router';
import {
    useFilmApi,
    usePrintApi,
    usePrintSessionApi,
    type FilmRead,
    type PrintRead,
    type PrintSessionRead,
} from '~/api/client';
import { FilmName } from '~/components/Widgets/FilmName/FilmName';
import { ProcessChip } from '~/components/Widgets/ProcessChip/ProcessChip';
import type { RouteCrumbHandle } from '~/components/Layout/Parts/AppBar/AppBar';

export const handle: RouteCrumbHandle = {
    crumb: { section: 'components.sidemenu.group.logbook', title: 'home.title' },
};

const median = (values: number[]): number | null => {
    if (values.length === 0) {
        return null;
    }
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
        ? ((sorted[mid - 1] ?? 0) + (sorted[mid] ?? 0)) / 2
        : (sorted[mid] ?? 0);
};

const Home: React.FunctionComponent = () => {
    const { t } = useTranslation();
    const { printSessionApi } = usePrintSessionApi();
    const { printApi } = usePrintApi();
    const { filmApi } = useFilmApi();

    const [error, setError] = React.useState<unknown>(null);
    const [loaded, setLoaded] = React.useState(false);
    const [sessions, setSessions] = React.useState<PrintSessionRead[]>([]);
    const [prints, setPrints] = React.useState<PrintRead[]>([]);
    const [films, setFilms] = React.useState<FilmRead[]>([]);

    React.useEffect(() => {
        Promise.all([
            printSessionApi.apiPrintSessionsGetCollection(),
            printApi.apiPrintsGetCollection(),
            filmApi.apiFilmsGetCollection(),
        ])
            .then(([sessionRes, printRes, filmRes]) => {
                setSessions(sessionRes.data['hydra:member']);
                setPrints(printRes.data['hydra:member']);
                setFilms(filmRes.data['hydra:member']);
                setLoaded(true);
            })
            .catch((err: unknown) => {
                console.error('Error fetching dashboard data:', err);
                setError(err);
            });
    }, [printSessionApi, printApi, filmApi]);

    const recentSessions = [...sessions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);

    const baseSeconds = prints.flatMap((print) =>
        (print.exposures ?? [])
            .filter((exposure) => exposure.kind === 'base')
            .map((exposure) => exposure.baseSeconds),
    );
    const medianBase = median(baseSeconds);

    return (
        <Box>
            <Stack
                direction="row"
                spacing={2}
                sx={{ alignItems: 'flex-end', flexWrap: 'wrap', mb: 3 }}
            >
                <Box sx={{ flex: 1, minWidth: 260 }}>
                    <Typography
                        sx={{ mb: 0.5 }}
                        variant="h1"
                    >
                        {t('home.title')}
                    </Typography>
                    <Typography color="text.secondary">{t('home.welcome')}</Typography>
                </Box>
                <Button
                    component={RouterLink}
                    startIcon={<AddIcon />}
                    to="/sessions/new"
                    variant="contained"
                >
                    {t('home.newSession')}
                </Button>
            </Stack>

            {error ? (
                <Typography color="error">{t('errors.api.loadingData')}</Typography>
            ) : !loaded ? (
                <CircularProgress
                    aria-label={t('app.loading')}
                    enableTrackSlot
                    size="3rem"
                />
            ) : (
                <React.Fragment>
                    <Grid
                        container
                        spacing={2}
                        sx={{ mb: 3 }}
                    >
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <Paper
                                sx={{ p: 2 }}
                                variant="outlined"
                            >
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    sx={{ alignItems: 'center', color: 'text.secondary', mb: 1 }}
                                >
                                    <LocalPrintshopIcon fontSize="small" />
                                    <Typography variant="overline">
                                        {t('home.stats.sessions')}
                                    </Typography>
                                </Stack>
                                <Typography variant="h4">{sessions.length}</Typography>
                            </Paper>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <Paper
                                sx={{ p: 2 }}
                                variant="outlined"
                            >
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    sx={{ alignItems: 'center', color: 'text.secondary', mb: 1 }}
                                >
                                    <PhotoLibraryIcon fontSize="small" />
                                    <Typography variant="overline">
                                        {t('home.stats.prints')}
                                    </Typography>
                                </Stack>
                                <Typography variant="h4">{prints.length}</Typography>
                            </Paper>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <Paper
                                sx={{ p: 2 }}
                                variant="outlined"
                            >
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    sx={{ alignItems: 'center', color: 'text.secondary', mb: 1 }}
                                >
                                    <TimerIcon fontSize="small" />
                                    <Typography variant="overline">
                                        {t('home.stats.medianBase')}
                                    </Typography>
                                </Stack>
                                <Typography variant="h4">
                                    {medianBase === null
                                        ? '—'
                                        : t('home.stats.medianBaseValue', {
                                              seconds: medianBase.toFixed(1),
                                          })}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        spacing={2}
                    >
                        <Grid size={{ xs: 12, md: 7 }}>
                            <Paper
                                sx={{ overflow: 'hidden' }}
                                variant="outlined"
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        px: 2,
                                        py: 1.5,
                                        borderBottom: '1px solid',
                                        borderColor: 'divider',
                                    }}
                                >
                                    <Typography
                                        sx={{ flex: 1, fontWeight: 600 }}
                                        variant="subtitle1"
                                    >
                                        {t('home.recentSessions')}
                                    </Typography>
                                    <Button
                                        component={RouterLink}
                                        size="small"
                                        to="/sessions"
                                    >
                                        {t('home.viewAllSessions')}
                                    </Button>
                                </Box>
                                {recentSessions.length === 0 ? (
                                    <Typography
                                        color="text.secondary"
                                        sx={{ p: 2 }}
                                    >
                                        {t('home.noSessions')}
                                    </Typography>
                                ) : (
                                    recentSessions.map((session) => (
                                        <Box
                                            component={RouterLink}
                                            key={session['@id']}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 2,
                                                px: 2,
                                                py: 1.5,
                                                borderTop: '1px solid',
                                                borderColor: 'divider',
                                                textDecoration: 'none',
                                                color: 'inherit',
                                                '&:hover': { backgroundColor: 'action.hover' },
                                            }}
                                            to={`/sessions/${session.id ?? ''}`}
                                        >
                                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                                <Typography sx={{ fontWeight: 600 }}>
                                                    {t('sessions.list.numberLabel', {
                                                        number: session.number,
                                                    })}
                                                </Typography>
                                                <Typography
                                                    color="text.secondary"
                                                    variant="caption"
                                                >
                                                    {session.date} · {session.lab} ·{' '}
                                                    {session.enlarger}
                                                </Typography>
                                            </Box>
                                            <ChevronRightIcon sx={{ opacity: 0.4 }} />
                                        </Box>
                                    ))
                                )}
                            </Paper>
                        </Grid>

                        <Grid size={{ xs: 12, md: 5 }}>
                            <Paper
                                sx={{ p: 2 }}
                                variant="outlined"
                            >
                                <Box
                                    sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}
                                >
                                    <Typography
                                        sx={{ flex: 1, fontWeight: 600 }}
                                        variant="subtitle1"
                                    >
                                        {t('home.filmsPreview')}
                                    </Typography>
                                    <Button
                                        component={RouterLink}
                                        size="small"
                                        to="/data/films"
                                    >
                                        {t('home.viewAllFilms')}
                                    </Button>
                                </Box>
                                <Stack spacing={1.25}>
                                    {films.slice(0, 4).map((film) => (
                                        <Box
                                            component={RouterLink}
                                            key={film['@id']}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1.5,
                                                p: 1,
                                                borderRadius: 1.5,
                                                border: '1px solid',
                                                borderColor: 'divider',
                                                textDecoration: 'none',
                                                color: 'inherit',
                                            }}
                                            to={`/data/films/${film.id ?? ''}`}
                                        >
                                            <FilmName
                                                film={film}
                                                sx={{ flex: 1, minWidth: 0 }}
                                            />
                                            <ProcessChip film={film} />
                                        </Box>
                                    ))}
                                </Stack>
                            </Paper>
                        </Grid>
                    </Grid>
                </React.Fragment>
            )}
        </Box>
    );
};

export default Home;
