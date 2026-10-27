import AddIcon from '@mui/icons-material/Add';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SearchIcon from '@mui/icons-material/Search';
import {
    Box,
    Button,
    InputAdornment,
    MenuItem,
    OutlinedInput,
    Rating,
    Select,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router';
import {
    useCameraApi,
    useDevelopmentLogApi,
    useFilmApi,
    useTagApi,
    type CameraRead,
    type DevelopmentLogRead,
    type FilmRead,
    type TagRead,
} from '~/api/client';
import { fetchAllHydraPages } from '~/api/hydraPagination';
import { idFromIri } from '~/domain/iri';
import { developmentLogArchiveRef } from '~/domain/developmentLog';
import { getProcessStyle, type Process } from '~/domain/processColors';
import type { RouteCrumbHandle } from '~/components/Layout/Parts/AppBar/AppBar';
import { PageLoader } from '~/components/Widgets/Loaders/PageLoader';
import { useStepProgress } from '~/components/Widgets/Loaders/useStepProgress';

export const handle: RouteCrumbHandle = {
    crumb: { section: 'components.sidemenu.group.logbook', title: 'negatifs.list.title' },
};

const pageSize = 20;
const ALL = 'all';

const columnLabelSx = {
    fontSize: '10.5px',
    fontWeight: 700,
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
    color: 'text.secondary',
};

const filterLabelSx = {
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
    color: 'text.secondary',
};

// A label matching the known precision ("2026", "2026-07" or "2026-07-14") reverses
// cleanly into "2026", "07/2026" or "14/07/2026" — no need to branch on precision.
const toDMY = (label: string) => label.split('-').reverse().join('/');

type Exposition = 'normal' | 'push' | 'pull';

const expositionOf = (log: Pick<DevelopmentLogRead, 'pushPullStops'>): Exposition => {
    const stops = log.pushPullStops ?? 0;
    if (stops > 0) {
        return 'push';
    }
    if (stops < 0) {
        return 'pull';
    }
    return 'normal';
};

const NegativeList: React.FunctionComponent = () => {
    const { t, i18n } = useTranslation();
    const theme = useTheme();
    const { developmentLogApi } = useDevelopmentLogApi();
    const { filmApi } = useFilmApi();
    const { cameraApi } = useCameraApi();
    const { tagApi } = useTagApi();

    const [error, setError] = React.useState<unknown>(null);
    const [loaded, setLoaded] = React.useState(false);
    const { activeStep, trackStep, setActiveStep } = useStepProgress();
    const [logs, setLogs] = React.useState<DevelopmentLogRead[]>([]);
    const [films, setFilms] = React.useState<FilmRead[]>([]);
    const [cameras, setCameras] = React.useState<CameraRead[]>([]);
    const [tags, setTags] = React.useState<TagRead[]>([]);

    const [search, setSearch] = React.useState('');
    const [notesSearch, setNotesSearch] = React.useState('');
    const [processFilter, setProcessFilter] = React.useState<Process | typeof ALL>(ALL);
    const [expositionFilter, setExpositionFilter] = React.useState<Exposition | typeof ALL>(ALL);
    const [binderFilter, setBinderFilter] = React.useState<string>(ALL);
    const [filmFilter, setFilmFilter] = React.useState<string>(ALL);
    const [sortDir, setSortDir] = React.useState<'asc' | 'desc'>('desc');
    const [visibleCount, setVisibleCount] = React.useState(pageSize);

    // Reset pagination when the visible set changes, following React's
    // "adjust state during render" pattern instead of an effect (avoids an
    // extra commit + cascading render for what is just derived state).
    const filtersKey = [
        search,
        notesSearch,
        processFilter,
        expositionFilter,
        binderFilter,
        filmFilter,
        sortDir,
    ].join('|');
    const [appliedFiltersKey, setAppliedFiltersKey] = React.useState(filtersKey);
    if (filtersKey !== appliedFiltersKey) {
        setAppliedFiltersKey(filtersKey);
        setVisibleCount(pageSize);
    }

    const loaderSteps = [
        { title: t('loaders.developmentLog.title'), hint: t('loaders.developmentLog.hint') },
        { title: t('loaders.film.title'), hint: t('loaders.film.hint') },
        { title: t('loaders.camera.title'), hint: t('loaders.camera.hint') },
        { title: t('loaders.tag.title'), hint: t('loaders.tag.hint') },
    ];

    React.useEffect(() => {
        trackStep(
            fetchAllHydraPages((page) =>
                developmentLogApi.apiDevelopmentLogsGetCollection({ page }),
            ),
        )
            .then((fetched) => {
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
                const tagIds = Array.from(
                    new Set(
                        fetched.flatMap((log) =>
                            (log.tags ?? []).map((tag) => idFromIri(tag['@id'])),
                        ),
                    ),
                );
                return Promise.all([
                    trackStep(Promise.all(filmIds.map((id) => filmApi.apiFilmsIdGet({ id })))),
                    trackStep(
                        Promise.all(cameraIds.map((id) => cameraApi.apiCamerasIdGet({ id }))),
                    ),
                    trackStep(Promise.all(tagIds.map((id) => tagApi.apiTagsIdGet({ id })))),
                ]).then(([filmResList, cameraResList, tagResList]) => {
                    setActiveStep(4);
                    setLogs(fetched);
                    setFilms(filmResList.map((res2) => res2.data));
                    setCameras(cameraResList.map((res2) => res2.data));
                    setTags(tagResList.map((res2) => res2.data));
                    setLoaded(true);
                });
            })
            .catch((err: unknown) => {
                console.error('Error fetching development logs:', err);
                setError(err);
            });
    }, [developmentLogApi, filmApi, cameraApi, tagApi, trackStep, setActiveStep]);

    if (error) {
        return <Typography color="error">{t('errors.api.loadingData')}</Typography>;
    }
    if (!loaded) {
        return (
            <PageLoader
                activeStep={activeStep}
                steps={loaderSteps}
            />
        );
    }

    const filmById = new Map(films.map((film) => [film['@id'], film]));
    const cameraById = new Map(cameras.map((camera) => [camera['@id'], camera]));
    const tagById = new Map(tags.map((tag) => [tag['@id'], tag]));
    const primaryStrong = theme.palette.mode === 'light' ? 'primary.dark' : 'primary.light';
    // developedAt is a full date-time; shotAt.label is a hand-formatted
    // partial-precision string ("2026", "2026-07" or "2026-07-14") that toDMY
    // already handles correctly, so only developedAt needs a real formatter.
    const developedAtFormatter = new Intl.DateTimeFormat(i18n.language, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    const processCounts = new Map<Process, number>();
    const expositionCounts = new Map<Exposition, number>();
    logs.forEach((log) => {
        processCounts.set(log.process, (processCounts.get(log.process) ?? 0) + 1);
        const exposition = expositionOf(log);
        expositionCounts.set(exposition, (expositionCounts.get(exposition) ?? 0) + 1);
    });
    const binderIds = Array.from(
        new Set(
            logs
                .map((log) => log.binderId)
                .filter((binderId): binderId is NonNullable<typeof binderId> => Boolean(binderId)),
        ),
    ).sort();
    const filmOptions = [...films].sort((a, b) => a.name.localeCompare(b.name));

    const expositionLabels: Record<Exposition, string> = {
        normal: t('negatifs.list.filters.expositionNormal'),
        push: t('negatifs.list.filters.expositionPush'),
        pull: t('negatifs.list.filters.expositionPull'),
    };

    const searchNeedle = search.trim().toLowerCase();
    const notesNeedle = notesSearch.trim().toLowerCase();

    const filtered = logs.filter((log) => {
        if (processFilter !== ALL && log.process !== processFilter) {
            return false;
        }
        if (expositionFilter !== ALL && expositionOf(log) !== expositionFilter) {
            return false;
        }
        if (binderFilter !== ALL && log.binderId !== binderFilter) {
            return false;
        }
        if (filmFilter !== ALL && log.film['@id'] !== filmFilter) {
            return false;
        }
        const camera = log.camera ? cameraById.get(log.camera['@id']) : undefined;
        if (searchNeedle) {
            const film = filmById.get(log.film['@id']);
            const haystack = [film?.name, film?.manufacturer.name, camera?.name]
                .concat((log.tags ?? []).map((tag) => tagById.get(tag['@id'])?.name))
                .filter(Boolean)
                .join(' ')
                .toLowerCase();
            if (!haystack.includes(searchNeedle)) {
                return false;
            }
        }
        if (notesNeedle) {
            const notes = `${log.shootingNotes ?? ''} ${log.developmentNotes ?? ''}`.toLowerCase();
            if (!notes.includes(notesNeedle)) {
                return false;
            }
        }
        return true;
    });

    const sorted = [...filtered].sort((a, b) =>
        sortDir === 'desc'
            ? b.developedAt.localeCompare(a.developedAt)
            : a.developedAt.localeCompare(b.developedAt),
    );

    const visible = sorted.slice(0, visibleCount);

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
                        {t('negatifs.list.count', { count: logs.length })} ·{' '}
                        {t('negatifs.list.chronological')}
                    </Typography>
                </Box>
                <OutlinedInput
                    inputProps={{
                        'aria-label': t('negatifs.list.searchPlaceholder'),
                        sx: { fontSize: '13.5px' },
                    }}
                    onChange={(event) => {
                        setSearch(event.target.value);
                    }}
                    placeholder={t('negatifs.list.searchPlaceholder')}
                    size="small"
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon
                                fontSize="small"
                                sx={{ opacity: 0.6 }}
                            />
                        </InputAdornment>
                    }
                    sx={{ width: 250, borderRadius: 2.5, backgroundColor: 'background.default' }}
                    value={search}
                />
                <Button
                    component={RouterLink}
                    startIcon={<AddIcon />}
                    to="/negatifs/new"
                    variant="contained"
                >
                    {t('negatifs.list.newNegative')}
                </Button>
            </Stack>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1.5,
                    p: '14px 16px',
                    mb: 1.75,
                    borderRadius: '14px',
                    border: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: 'background.paper',
                }}
            >
                <Stack sx={{ flex: '1 1 160px', minWidth: 0, gap: 0.5 }}>
                    <Typography sx={filterLabelSx}>{t('negatifs.list.filters.process')}</Typography>
                    <Select
                        aria-label={t('negatifs.list.filters.process')}
                        onChange={(event) => {
                            setProcessFilter(event.target.value);
                        }}
                        size="small"
                        value={processFilter}
                    >
                        <MenuItem value={ALL}>{t('negatifs.list.filters.processAll')}</MenuItem>
                        {Array.from(processCounts.entries()).map(([process, count]) => (
                            <MenuItem
                                key={process}
                                value={process}
                            >
                                <Stack
                                    direction="row"
                                    sx={{ alignItems: 'center', gap: 1 }}
                                >
                                    <Box
                                        sx={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: '50%',
                                            backgroundColor: getProcessStyle(process).color,
                                            flex: '0 0 auto',
                                        }}
                                    />
                                    <span>
                                        {process} ({count})
                                    </span>
                                </Stack>
                            </MenuItem>
                        ))}
                    </Select>
                </Stack>
                <Stack sx={{ flex: '1 1 160px', minWidth: 0, gap: 0.5 }}>
                    <Typography sx={filterLabelSx}>
                        {t('negatifs.list.filters.exposition')}
                    </Typography>
                    <Select
                        aria-label={t('negatifs.list.filters.exposition')}
                        onChange={(event) => {
                            setExpositionFilter(event.target.value);
                        }}
                        size="small"
                        value={expositionFilter}
                    >
                        <MenuItem value={ALL}>{t('negatifs.list.filters.expositionAll')}</MenuItem>
                        {Array.from(expositionCounts.entries()).map(([exposition, count]) => (
                            <MenuItem
                                key={exposition}
                                value={exposition}
                            >
                                {expositionLabels[exposition]} ({count})
                            </MenuItem>
                        ))}
                    </Select>
                </Stack>
                <Stack sx={{ flex: '1 1 160px', minWidth: 0, gap: 0.5 }}>
                    <Typography sx={filterLabelSx}>{t('negatifs.list.filters.binder')}</Typography>
                    <Select
                        aria-label={t('negatifs.list.filters.binder')}
                        onChange={(event) => {
                            setBinderFilter(event.target.value);
                        }}
                        size="small"
                        value={binderFilter}
                    >
                        <MenuItem value={ALL}>{t('negatifs.list.filters.binderAll')}</MenuItem>
                        {binderIds.map((binderId) => (
                            <MenuItem
                                key={binderId}
                                value={binderId}
                            >
                                {binderId}
                            </MenuItem>
                        ))}
                    </Select>
                </Stack>
                <Stack sx={{ flex: '1 1 160px', minWidth: 0, gap: 0.5 }}>
                    <Typography sx={filterLabelSx}>{t('negatifs.list.filters.film')}</Typography>
                    <Select
                        aria-label={t('negatifs.list.filters.film')}
                        onChange={(event) => {
                            setFilmFilter(event.target.value);
                        }}
                        size="small"
                        value={filmFilter}
                    >
                        <MenuItem value={ALL}>{t('negatifs.list.filters.filmAll')}</MenuItem>
                        {filmOptions.map((film) => (
                            <MenuItem
                                key={film['@id']}
                                value={film['@id']}
                            >
                                {film.name}
                            </MenuItem>
                        ))}
                    </Select>
                </Stack>
                <Stack sx={{ flex: '1 1 100%', minWidth: 0, gap: 0.5 }}>
                    <Typography sx={filterLabelSx}>
                        {t('negatifs.list.notesSearchLabel')}
                    </Typography>
                    <OutlinedInput
                        multiline
                        onChange={(event) => {
                            setNotesSearch(event.target.value);
                        }}
                        placeholder={t('negatifs.list.notesSearchPlaceholder')}
                        rows={2}
                        sx={{ height: 'auto' }}
                        value={notesSearch}
                    />
                </Stack>
            </Box>

            {logs.length === 0 ? (
                <Typography color="text.secondary">{t('negatifs.list.empty')}</Typography>
            ) : (
                <Box
                    sx={{
                        minWidth: 0,
                        borderRadius: '14px',
                        border: '1px solid',
                        borderColor: 'divider',
                        backgroundColor: 'background.paper',
                        overflowX: 'auto',
                    }}
                >
                    <Stack
                        direction="row"
                        sx={{
                            alignItems: 'center',
                            px: '14px',
                            minWidth: 820,
                            backgroundColor: 'background.default',
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        <Typography sx={{ ...columnLabelSx, flex: '0 0 100px', py: '11px' }}>
                            {t('negatifs.list.columns.archive')}
                        </Typography>
                        <Typography sx={{ ...columnLabelSx, flex: '0 0 200px', py: '11px' }}>
                            {t('negatifs.list.columns.film')}
                        </Typography>
                        <Box
                            component="button"
                            onClick={() => {
                                setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'));
                            }}
                            sx={{
                                all: 'unset',
                                cursor: 'pointer',
                                flex: '0 0 120px',
                                py: '11px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                ...columnLabelSx,
                                color: primaryStrong,
                            }}
                            type="button"
                        >
                            {t('negatifs.list.columns.dates')}
                            {sortDir === 'desc' ? (
                                <ArrowDownwardIcon sx={{ fontSize: 14 }} />
                            ) : (
                                <ArrowUpwardIcon sx={{ fontSize: 14 }} />
                            )}
                        </Box>
                        <Typography sx={{ ...columnLabelSx, flex: 1, py: '11px' }}>
                            {t('negatifs.list.columns.notes')}
                        </Typography>
                        <Typography
                            sx={{
                                ...columnLabelSx,
                                flex: '0 0 90px',
                                py: '11px',
                                textAlign: 'right',
                            }}
                        >
                            {t('negatifs.list.columns.sensitivity')}
                        </Typography>
                        <Typography
                            sx={{
                                ...columnLabelSx,
                                flex: '0 0 120px',
                                py: '11px',
                                textAlign: 'right',
                            }}
                        >
                            {t('negatifs.list.columns.rating')}
                        </Typography>
                    </Stack>

                    {visible.length === 0 ? (
                        <Typography
                            color="text.secondary"
                            sx={{ p: 2.5 }}
                        >
                            {t('negatifs.list.noResults')}
                        </Typography>
                    ) : (
                        visible.map((log) => {
                            const film = filmById.get(log.film['@id']);
                            const camera = log.camera
                                ? cameraById.get(log.camera['@id'])
                                : undefined;
                            const ref = developmentLogArchiveRef(log);
                            const stops = log.pushPullStops ?? 0;
                            return (
                                <Box
                                    component={RouterLink}
                                    key={log['@id']}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        width: '100%',
                                        minWidth: 820,
                                        px: '14px',
                                        borderBottom: '1px solid',
                                        borderColor: 'divider',
                                        textDecoration: 'none',
                                        color: 'inherit',
                                        '&:hover': { backgroundColor: 'action.hover' },
                                    }}
                                    to={`/negatifs/${log.id ?? ''}`}
                                >
                                    <Typography
                                        sx={{
                                            flex: '0 0 100px',
                                            py: '9px',
                                            fontFamily: 'ui-monospace, monospace',
                                            fontSize: '12px',
                                            fontWeight: 700,
                                            color: primaryStrong,
                                        }}
                                    >
                                        {ref ?? t('negatifs.list.noArchive')}
                                    </Typography>
                                    <Stack
                                        direction="row"
                                        sx={{ flex: '0 0 200px', py: '9px', gap: '9px', pr: 1 }}
                                    >
                                        <Box
                                            sx={{
                                                flex: '0 0 4px',
                                                height: 26,
                                                borderRadius: '2px',
                                                backgroundColor: film?.primaryColor ?? 'divider',
                                            }}
                                        />
                                        <Stack sx={{ minWidth: 0, gap: '1px' }}>
                                            <Typography
                                                noWrap
                                                sx={{ fontSize: '13px', fontWeight: 600 }}
                                            >
                                                {film?.name ?? '—'}
                                            </Typography>
                                            <Typography
                                                color="text.secondary"
                                                noWrap
                                                sx={{ fontSize: '11px' }}
                                            >
                                                {film?.manufacturer.name ?? '—'} ·{' '}
                                                {camera?.filmFormat ?? '—'}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                    <Stack sx={{ flex: '0 0 120px', py: '9px', gap: '1px' }}>
                                        <Typography
                                            sx={{
                                                fontFamily: 'ui-monospace, monospace',
                                                fontSize: '12px',
                                            }}
                                        >
                                            {toDMY(log.shotAt.label ?? '')}
                                        </Typography>
                                        <Typography
                                            color="text.secondary"
                                            sx={{
                                                fontFamily: 'ui-monospace, monospace',
                                                fontSize: '11px',
                                            }}
                                        >
                                            {t('negatifs.list.developedOn', {
                                                date: developedAtFormatter.format(
                                                    new Date(log.developedAt),
                                                ),
                                            })}
                                        </Typography>
                                    </Stack>
                                    <Typography
                                        noWrap
                                        sx={{ flex: 1, py: '11px', fontSize: '12.5px', pr: 1 }}
                                    >
                                        {log.shootingNotes || t('negatifs.list.noArchive')}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            flex: '0 0 90px',
                                            py: '11px',
                                            textAlign: 'right',
                                            fontFamily: 'ui-monospace, monospace',
                                            fontSize: '12.5px',
                                            fontWeight: stops === 0 ? 400 : 700,
                                            color: stops === 0 ? 'text.secondary' : 'text.primary',
                                        }}
                                    >
                                        {t('components.filmCard.iso', { iso: log.isoShotAt })}
                                    </Typography>
                                    <Box
                                        sx={{
                                            flex: '0 0 120px',
                                            py: '11px',
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                        }}
                                    >
                                        <Rating
                                            precision={1}
                                            readOnly
                                            size="small"
                                            value={log.rating ?? 0}
                                        />
                                    </Box>
                                </Box>
                            );
                        })
                    )}

                    {visible.length > 0 ? (
                        <Stack
                            direction="row"
                            sx={{ alignItems: 'center', gap: 1.5, px: 2, py: 1.375 }}
                        >
                            <Typography
                                color="text.secondary"
                                sx={{ flex: 1, fontSize: '12px' }}
                            >
                                {t('negatifs.list.rowsOfTotal', {
                                    visible: visible.length,
                                    total: sorted.length,
                                })}
                            </Typography>
                            {visibleCount < sorted.length ? (
                                <Box
                                    component="button"
                                    onClick={() => {
                                        setVisibleCount((c) => c + pageSize);
                                    }}
                                    sx={{
                                        all: 'unset',
                                        cursor: 'pointer',
                                        fontSize: '12px',
                                        fontWeight: 600,
                                        color: primaryStrong,
                                    }}
                                    type="button"
                                >
                                    {t('negatifs.list.loadMore')}
                                </Box>
                            ) : null}
                        </Stack>
                    ) : null}
                </Box>
            )}
        </Box>
    );
};

export default NegativeList;
