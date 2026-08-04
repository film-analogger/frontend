import AddIcon from '@mui/icons-material/Add';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router';
import {
    useEnlargerApi,
    usePrintApi,
    usePrintSessionApi,
    type EnlargerRead,
    type PrintRead,
    type PrintSessionRead,
} from '~/api/client';
import { idFromIri } from '~/domain/iri';
import type { RouteCrumbHandle } from '~/components/Layout/Parts/AppBar/AppBar';

export const handle: RouteCrumbHandle = {
    crumb: { section: 'components.sidemenu.group.logbook', title: 'sessions.list.title' },
};

const monthKey = (date: string) => date.slice(0, 7);
const yearOf = (date: string) => date.slice(0, 4);

const SessionList: React.FunctionComponent = () => {
    const { t, i18n } = useTranslation();
    const { printSessionApi } = usePrintSessionApi();
    const { printApi } = usePrintApi();
    const { enlargerApi } = useEnlargerApi();

    const [error, setError] = React.useState<unknown>(null);
    const [loaded, setLoaded] = React.useState(false);
    const [sessions, setSessions] = React.useState<PrintSessionRead[]>([]);
    const [prints, setPrints] = React.useState<PrintRead[]>([]);
    const [enlargers, setEnlargers] = React.useState<EnlargerRead[]>([]);
    const [yearFilter, setYearFilter] = React.useState<string | null>(null);

    React.useEffect(() => {
        Promise.all([
            printSessionApi.apiPrintSessionsGetCollection(),
            printApi.apiPrintsGetCollection(),
        ])
            .then(([sessionsRes, printsRes]) => {
                const fetched = sessionsRes.data['hydra:member'];
                const enlargerIds = Array.from(
                    new Set(fetched.map((session) => idFromIri(session.enlarger['@id']))),
                );
                return Promise.all(
                    enlargerIds.map((id) => enlargerApi.apiEnlargersIdGet({ id })),
                ).then((enlargerResList) => {
                    setSessions(fetched);
                    setPrints(printsRes.data['hydra:member']);
                    setEnlargers(enlargerResList.map((res) => res.data));
                    setYearFilter(
                        (current) => current ?? (fetched[0] ? yearOf(fetched[0].date) : null),
                    );
                    setLoaded(true);
                });
            })
            .catch((err: unknown) => {
                console.error('Error fetching print sessions:', err);
                setError(err);
            });
    }, [printSessionApi, printApi, enlargerApi]);

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

    const enlargerById = new Map(enlargers.map((enlarger) => [enlarger['@id'], enlarger]));
    const printCountBySessionId = new Map<string, number>();
    prints.forEach((print) => {
        const key = print.session['@id'];
        printCountBySessionId.set(key, (printCountBySessionId.get(key) ?? 0) + 1);
    });

    const years = Array.from(new Set(sessions.map((session) => yearOf(session.date)))).sort(
        (a, b) => b.localeCompare(a),
    );

    const visibleSessions = yearFilter
        ? sessions.filter((session) => yearOf(session.date) === yearFilter)
        : sessions;
    const sorted = [...visibleSessions].sort((a, b) => b.date.localeCompare(a.date));
    const totalPrints = sorted.reduce(
        (count, session) => count + (printCountBySessionId.get(session['@id']) ?? 0),
        0,
    );

    const months = new Map<string, PrintSessionRead[]>();
    sorted.forEach((session) => {
        const key = monthKey(session.date);
        months.set(key, [...(months.get(key) ?? []), session]);
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
                        {t('sessions.list.title')}
                    </Typography>
                    <Typography color="text.secondary">
                        {t('sessions.list.count', { count: sorted.length })} ·{' '}
                        {t('sessions.list.printsCount', { count: totalPrints })} ·{' '}
                        {t('sessions.list.chronological')}
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
                                    {year ?? t('sessions.list.allYears')}
                                </Box>
                            ))}
                        </Stack>
                    ) : null}
                    <Button
                        component={RouterLink}
                        startIcon={<AddIcon />}
                        to="/sessions/new"
                        variant="contained"
                    >
                        {t('sessions.list.newSession')}
                    </Button>
                </Stack>
            </Stack>

            {months.size === 0 ? (
                <Typography color="text.secondary">{t('home.noSessions')}</Typography>
            ) : (
                Array.from(months.entries()).map(([key, monthSessions]) => {
                    const monthPrints = monthSessions.reduce(
                        (count, session) =>
                            count + (printCountBySessionId.get(session['@id']) ?? 0),
                        0,
                    );
                    return (
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
                                    {t('sessions.list.count', { count: monthSessions.length })} ·{' '}
                                    {t('sessions.list.printsCount', { count: monthPrints })}
                                </Typography>
                            </Stack>
                            <Stack spacing={1.25}>
                                {monthSessions.map((session) => {
                                    const bathLabels = (session.chemicalBaths ?? [])
                                        .map(
                                            (bath) =>
                                                bath.effectiveDilution ?? bath.dilutionOverride,
                                        )
                                        .filter((label): label is string => Boolean(label));
                                    return (
                                        <Box
                                            component={RouterLink}
                                            key={session['@id']}
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
                                            to={`/sessions/${session.id ?? ''}`}
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
                                                    {dayFormatter.format(new Date(session.date))}
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
                                                        new Date(session.date),
                                                    )}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                                <Stack
                                                    direction="row"
                                                    sx={{ alignItems: 'baseline', gap: 1.125 }}
                                                >
                                                    <Typography sx={{ fontWeight: 600 }}>
                                                        {t('sessions.list.numberLabel', {
                                                            number: session.number,
                                                        })}
                                                    </Typography>
                                                    <Typography
                                                        color="text.secondary"
                                                        variant="caption"
                                                    >
                                                        {session.lab}
                                                    </Typography>
                                                </Stack>
                                                {bathLabels.length > 0 ? (
                                                    <Stack
                                                        direction="row"
                                                        sx={{
                                                            flexWrap: 'wrap',
                                                            gap: 0.75,
                                                            mt: 0.5,
                                                        }}
                                                    >
                                                        {bathLabels.map((label, index) => (
                                                            <Box
                                                                key={`${label}-${String(index)}`}
                                                                sx={{
                                                                    px: '8px',
                                                                    py: '2px',
                                                                    borderRadius: '6px',
                                                                    border: '1px solid',
                                                                    borderColor: 'divider',
                                                                    backgroundColor:
                                                                        'background.default',
                                                                    fontFamily:
                                                                        'ui-monospace, monospace',
                                                                    fontSize: '11.5px',
                                                                    color: 'text.secondary',
                                                                }}
                                                            >
                                                                {label}
                                                            </Box>
                                                        ))}
                                                    </Stack>
                                                ) : null}
                                            </Box>
                                            <Box sx={{ textAlign: 'right', minWidth: 96 }}>
                                                <Typography
                                                    sx={{ fontWeight: 600, fontSize: '14px' }}
                                                >
                                                    {t('sessions.list.printsCount', {
                                                        count:
                                                            printCountBySessionId.get(
                                                                session['@id'],
                                                            ) ?? 0,
                                                    })}
                                                </Typography>
                                                <Typography
                                                    color="text.secondary"
                                                    sx={{ fontSize: '11.5px' }}
                                                >
                                                    {enlargerById.get(session.enlarger['@id'])
                                                        ?.name ?? '—'}
                                                </Typography>
                                            </Box>
                                            <ChevronRightIcon sx={{ opacity: 0.4 }} />
                                        </Box>
                                    );
                                })}
                            </Stack>
                        </Box>
                    );
                })
            )}
        </Box>
    );
};

export default SessionList;
