import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router';
import { usePrintSessionApi, type PrintSessionRead } from '~/api/client';
import type { RouteCrumbHandle } from '~/components/Layout/Parts/AppBar/AppBar';

export const handle: RouteCrumbHandle = {
    crumb: { section: 'components.sidemenu.group.logbook', title: 'sessions.list.title' },
};

const monthKey = (date: string) => date.slice(0, 7);

const SessionList: React.FunctionComponent = () => {
    const { t, i18n } = useTranslation();
    const { printSessionApi } = usePrintSessionApi();

    const [error, setError] = React.useState<unknown>(null);
    const [loaded, setLoaded] = React.useState(false);
    const [sessions, setSessions] = React.useState<PrintSessionRead[]>([]);

    React.useEffect(() => {
        printSessionApi
            .apiPrintSessionsGetCollection()
            .then((res) => {
                setSessions(res.data['hydra:member']);
                setLoaded(true);
            })
            .catch((err: unknown) => {
                console.error('Error fetching print sessions:', err);
                setError(err);
            });
    }, [printSessionApi]);

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

    const sorted = [...sessions].sort((a, b) => b.date.localeCompare(a.date));
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
                        {t('sessions.list.count', { count: sessions.length })}
                    </Typography>
                </Box>
            </Stack>

            {months.size === 0 ? (
                <Typography color="text.secondary">{t('home.noSessions')}</Typography>
            ) : (
                Array.from(months.entries()).map(([key, monthSessions]) => (
                    <Box
                        key={key}
                        sx={{ mb: 3 }}
                    >
                        <Stack
                            direction="row"
                            sx={{ alignItems: 'center', gap: 1.5, mb: 1 }}
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
                        </Stack>
                        <Stack spacing={1}>
                            {monthSessions.map((session) => (
                                <Box
                                    component={RouterLink}
                                    key={session['@id']}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        p: 2,
                                        borderRadius: 2,
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        textDecoration: 'none',
                                        color: 'inherit',
                                        '&:hover': { borderColor: 'primary.main' },
                                    }}
                                    to={`/sessions/${session.id ?? ''}`}
                                >
                                    <Box
                                        sx={{
                                            width: 52,
                                            height: 52,
                                            flex: '0 0 52px',
                                            borderRadius: 1.5,
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            backgroundColor: 'action.hover',
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
                                            sx={{ textTransform: 'uppercase', fontSize: '0.65rem' }}
                                        >
                                            {shortMonthFormatter.format(new Date(session.date))}
                                        </Typography>
                                    </Box>
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
                                            {session.lab} · {session.enlarger}
                                        </Typography>
                                    </Box>
                                    <Typography
                                        color="text.secondary"
                                        variant="body2"
                                    >
                                        {t('sessions.list.temperature', {
                                            temperature: session.temperatureCelsius,
                                        })}
                                    </Typography>
                                    <ChevronRightIcon sx={{ opacity: 0.4 }} />
                                </Box>
                            ))}
                        </Stack>
                    </Box>
                ))
            )}
        </Box>
    );
};

export default SessionList;
