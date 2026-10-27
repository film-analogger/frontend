import AddIcon from '@mui/icons-material/Add';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Button, Chip, CircularProgress, Rating, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router';
import {
    useCameraApi,
    useDevelopmentLogApi,
    useFilmApi,
    type CameraRead,
    type DevelopmentLogRead,
    type FilmRead,
} from '~/api/client';
import { idFromIri } from '~/domain/iri';
import {
    developmentLogArchiveRef,
    formatPushPullStops,
    formatStepsDuration,
    totalStepsSeconds,
} from '~/domain/developmentLog';
import { getProcessStyle, type Process } from '~/domain/processColors';
import type { RouteCrumbHandle } from '~/components/Layout/Parts/AppBar/AppBar';
import { FilmName } from '~/components/Widgets/FilmName/FilmName';

export const handle: RouteCrumbHandle = {
    crumb: { section: 'components.sidemenu.group.logbook', title: 'negatifs.list.title' },
};

const monthKey = (date: string) => date.slice(0, 7);
const yearOf = (date: string) => date.slice(0, 4);

const NegativeList: React.FunctionComponent = () => {
    const { t, i18n } = useTranslation();
    const { developmentLogApi } = useDevelopmentLogApi();
    const { filmApi } = useFilmApi();
    const { cameraApi } = useCameraApi();

    const [error, setError] = React.useState<unknown>(null);
    const [loaded, setLoaded] = React.useState(false);
    const [logs, setLogs] = React.useState<DevelopmentLogRead[]>([]);
    const [films, setFilms] = React.useState<FilmRead[]>([]);
    const [cameras, setCameras] = React.useState<CameraRead[]>([]);
    const [yearFilter, setYearFilter] = React.useState<string | null>(null);
    const [processFilter, setProcessFilter] = React.useState<Process | null>(null);

    React.useEffect(() => {
        developmentLogApi
            .apiDevelopmentLogsGetCollection()
            .then((res) => {
                const fetched = res.data['hydra:member'];
                const filmIds = Array.from(
                    new Set(fetched.map((log) => idFromIri(log.film['@id']))),
                );
                const cameraIds = Array.from(
                    new Set(
                        fetched
                            .map((log) => log.camera)
                            .filter((camera): camera is NonNullable<typeof camera> =>
                                Boolean(camera),
                            )
                            .map((camera) => idFromIri(camera['@id'])),
                    ),
                );
                return Promise.all([
                    Promise.all(filmIds.map((id) => filmApi.apiFilmsIdGet({ id }))),
                    Promise.all(cameraIds.map((id) => cameraApi.apiCamerasIdGet({ id }))),
                ]).then(([filmResList, cameraResList]) => {
                    setLogs(fetched);
                    setFilms(filmResList.map((res2) => res2.data));
                    setCameras(cameraResList.map((res2) => res2.data));
                    setYearFilter(
                        (current) =>
                            current ?? (fetched[0] ? yearOf(fetched[0].developedAt) : null),
                    );
                    setLoaded(true);
                });
            })
            .catch((err: unknown) => {
                console.error('Error fetching development logs:', err);
                setError(err);
            });
    }, [developmentLogApi, filmApi, cameraApi]);

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

    const filmById = new Map(films.map((film) => [film['@id'], film]));
    const cameraById = new Map(cameras.map((camera) => [camera['@id'], camera]));

    const processCounts = new Map<Process, number>();
    logs.forEach((log) => {
        processCounts.set(log.process, (processCounts.get(log.process) ?? 0) + 1);
    });

    const years = Array.from(new Set(logs.map((log) => yearOf(log.developedAt)))).sort((a, b) =>
        b.localeCompare(a),
    );

    const visibleLogs = logs
        .filter((log) => !yearFilter || yearOf(log.developedAt) === yearFilter)
        .filter((log) => !processFilter || log.process === processFilter);
    const sorted = [...visibleLogs].sort((a, b) => b.developedAt.localeCompare(a.developedAt));

    const months = new Map<string, DevelopmentLogRead[]>();
    sorted.forEach((log) => {
        const key = monthKey(log.developedAt);
        months.set(key, [...(months.get(key) ?? []), log]);
    });

    const monthFormatter = new Intl.DateTimeFormat(i18n.language, {
        year: 'numeric',
        month: 'long',
    });
    const dayFormatter = new Intl.DateTimeFormat(i18n.language, { day: '2-digit' });
    const shortMonthFormatter = new Intl.DateTimeFormat(i18n.language, { month: 'short' });

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
                        {t('negatifs.list.title')}
                    </Typography>
                    <Typography color="text.secondary">
                        {t('negatifs.list.count', { count: sorted.length })} ·{' '}
                        {t('negatifs.list.chronological')}
                    </Typography>
                </Box>
                <Stack
                    direction="row"
                    sx={{ alignItems: 'center', gap: 1 }}
                >
                    {years.length > 0 ? (
                        <Stack
                            direction="row"
                            sx={{
                                alignItems: 'center',
                                borderRadius: '10px',
                                border: '1px solid',
                                borderColor: 'divider',
                                backgroundColor: 'background.paper',
                                p: '3px',
                            }}
                        >
                            {[...years, null].map((year) => (
                                <Box
                                    component="button"
                                    key={year ?? 'all'}
                                    onClick={() => {
                                        setYearFilter(year);
                                    }}
                                    sx={{
                                        all: 'unset',
                                        cursor: 'pointer',
                                        px: '12px',
                                        py: '6px',
                                        borderRadius: '8px',
                                        fontSize: '12.5px',
                                        fontWeight: 600,
                                        backgroundColor:
                                            yearFilter === year ? 'primary.main' : 'transparent',
                                        color:
                                            yearFilter === year
                                                ? 'primary.contrastText'
                                                : 'text.secondary',
                                    }}
                                    type="button"
                                >
                                    {year ?? t('negatifs.list.allYears')}
                                </Box>
                            ))}
                        </Stack>
                    ) : null}
                    <Button
                        component={RouterLink}
                        startIcon={<AddIcon />}
                        to="/negatifs/new"
                        variant="contained"
                    >
                        {t('negatifs.list.newNegative')}
                    </Button>
                </Stack>
            </Stack>

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

            {months.size === 0 ? (
                <Typography color="text.secondary">{t('negatifs.list.empty')}</Typography>
            ) : (
                Array.from(months.entries()).map(([key, monthLogs]) => (
                    <Box
                        key={key}
                        sx={{ mb: 3 }}
                    >
                        <Stack
                            direction="row"
                            sx={{ alignItems: 'center', gap: 1.5, mb: 1.25 }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    letterSpacing: '0.06em',
                                    textTransform: 'uppercase',
                                }}
                                variant="caption"
                            >
                                {monthFormatter.format(new Date(`${key}-01`))}
                            </Typography>
                            <Box sx={{ flex: 1, height: '1px', backgroundColor: 'divider' }} />
                            <Typography
                                color="text.secondary"
                                variant="caption"
                            >
                                {t('negatifs.list.count', { count: monthLogs.length })}
                            </Typography>
                        </Stack>
                        <Stack spacing={1.25}>
                            {monthLogs.map((log) => {
                                const film = filmById.get(log.film['@id']);
                                const camera = log.camera
                                    ? cameraById.get(log.camera['@id'])
                                    : undefined;
                                const totalSeconds = totalStepsSeconds(log.steps);
                                const ref = developmentLogArchiveRef(log);
                                const pushLabel = formatPushPullStops(log.pushPullStops);
                                return (
                                    <Box
                                        component={RouterLink}
                                        key={log['@id']}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                            p: 2,
                                            borderRadius: '14px',
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            backgroundColor: 'background.paper',
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            transition:
                                                'transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease',
                                            '&:hover': {
                                                borderColor: 'primary.main',
                                                boxShadow: (theme) => theme.shadows[4],
                                                transform: 'translateX(3px)',
                                            },
                                        }}
                                        to={`/negatifs/${log.id ?? ''}`}
                                    >
                                        <Box
                                            sx={{
                                                width: 52,
                                                height: 52,
                                                flex: '0 0 52px',
                                                borderRadius: '13px',
                                                border: '1px solid',
                                                borderColor: 'divider',
                                                backgroundColor: 'background.default',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Typography sx={{ fontWeight: 600, lineHeight: 1 }}>
                                                {dayFormatter.format(new Date(log.developedAt))}
                                            </Typography>
                                            <Typography
                                                color="text.secondary"
                                                sx={{
                                                    textTransform: 'uppercase',
                                                    fontSize: '9.5px',
                                                    letterSpacing: '0.05em',
                                                }}
                                            >
                                                {shortMonthFormatter.format(
                                                    new Date(log.developedAt),
                                                )}
                                            </Typography>
                                        </Box>
                                        {film ? (
                                            <FilmName
                                                film={film}
                                                sx={{ flex: '0 0 auto' }}
                                            />
                                        ) : null}
                                        <Box sx={{ flex: 1, minWidth: 0 }}>
                                            <Stack
                                                direction="row"
                                                sx={{ alignItems: 'baseline', gap: 1.125 }}
                                            >
                                                <Typography
                                                    color="text.secondary"
                                                    sx={{
                                                        fontFamily: 'ui-monospace, monospace',
                                                        fontSize: '12px',
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    {ref ?? t('negatifs.list.noArchive')}
                                                </Typography>
                                                <Typography
                                                    color="text.secondary"
                                                    variant="caption"
                                                >
                                                    {log.shotAt.label} ·{' '}
                                                    {t('components.filmCard.iso', {
                                                        iso: log.isoShotAt,
                                                    })}
                                                    {pushLabel ? ` · ${pushLabel}` : ''}
                                                </Typography>
                                            </Stack>
                                            <Typography
                                                color="text.secondary"
                                                sx={{ fontSize: '11.5px', mt: 0.5 }}
                                            >
                                                {camera?.name ?? '—'} ·{' '}
                                                {t('negatifs.list.stepsCount', {
                                                    count: (log.steps ?? []).length,
                                                })}{' '}
                                                · {formatStepsDuration(totalSeconds)}
                                            </Typography>
                                        </Box>
                                        <Rating
                                            precision={1}
                                            readOnly
                                            size="small"
                                            value={log.rating ?? 0}
                                        />
                                        <ChevronRightIcon sx={{ opacity: 0.4 }} />
                                    </Box>
                                );
                            })}
                        </Stack>
                    </Box>
                ))
            )}
        </Box>
    );
};

export default NegativeList;
