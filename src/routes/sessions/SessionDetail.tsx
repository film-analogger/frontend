import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {
    Box,
    Chip,
    CircularProgress,
    Grid,
    Paper,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import {
    usePrintApi,
    usePrintSessionApi,
    type PrintRead,
    type PrintSessionRead,
} from '~/api/client';
import { formatStopOffset } from '~/domain/exposureMath';
import { getStopNotation } from '~/domain/preferences';
import type { RouteCrumbHandle } from '~/components/Layout/Parts/AppBar/AppBar';

export const handle: RouteCrumbHandle = {
    crumb: { section: 'sessions.list.title', title: 'sessions.detail.title' },
};

const SessionDetail: React.FunctionComponent = () => {
    const { t } = useTranslation();
    const { sessionId } = useParams<{ sessionId: string }>();
    const { printSessionApi } = usePrintSessionApi();
    const { printApi } = usePrintApi();

    const [error, setError] = React.useState<unknown>(null);
    const [loaded, setLoaded] = React.useState(false);
    const [session, setSession] = React.useState<PrintSessionRead | null>(null);
    const [prints, setPrints] = React.useState<PrintRead[]>([]);

    React.useEffect(() => {
        if (!sessionId) {
            return;
        }
        printSessionApi
            .apiPrintSessionsIdGet({ id: sessionId })
            .then((sessionRes) =>
                printApi
                    .apiPrintsGetCollection({ session: sessionRes.data['@id'] })
                    .then((printsRes) => {
                        setSession(sessionRes.data);
                        setPrints(printsRes.data['hydra:member']);
                        setLoaded(true);
                    }),
            )
            .catch((err: unknown) => {
                console.error('Error fetching print session:', err);
                setError(err);
            });
    }, [sessionId, printSessionApi, printApi]);

    if (error) {
        return <Typography color="error">{t('errors.api.loadingData')}</Typography>;
    }
    if (!loaded || !session) {
        return (
            <CircularProgress
                aria-label={t('app.loading')}
                enableTrackSlot
                size="3rem"
            />
        );
    }

    const notation = getStopNotation();

    return (
        <Box>
            <Stack
                direction="row"
                spacing={2}
                sx={{ alignItems: 'flex-start', flexWrap: 'wrap', mb: 3 }}
            >
                <Box sx={{ flex: 1, minWidth: 260 }}>
                    <Typography
                        sx={{ mb: 0.5 }}
                        variant="h1"
                    >
                        {t('sessions.list.numberLabel', { number: session.number })}
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ color: 'text.secondary', flexWrap: 'wrap' }}
                    >
                        <Typography variant="body2">{session.date}</Typography>
                        <Typography variant="body2">{session.lab}</Typography>
                        <Typography variant="body2">{session.enlarger}</Typography>
                        <Typography variant="body2">
                            {t('sessions.list.temperature', {
                                temperature: session.temperatureCelsius,
                            })}
                        </Typography>
                    </Stack>
                </Box>
            </Stack>

            <Paper
                sx={{ p: 2.5, mb: 3 }}
                variant="outlined"
            >
                <Stack
                    direction="row"
                    sx={{ alignItems: 'center', gap: 1, mb: 2 }}
                >
                    <Typography
                        sx={{ flex: 1, fontWeight: 600 }}
                        variant="subtitle1"
                    >
                        {t('sessions.detail.chemicalChain')}
                    </Typography>
                    <Tooltip title={t('sessions.detail.chemicalChainHint')}>
                        <InfoOutlinedIcon
                            color="disabled"
                            fontSize="small"
                        />
                    </Tooltip>
                </Stack>
                {(session.chemicalBaths ?? []).length === 0 ? (
                    <Typography color="text.secondary">
                        {t('sessions.detail.noChemicalBaths')}
                    </Typography>
                ) : (
                    <Grid
                        container
                        spacing={1.5}
                    >
                        {(session.chemicalBaths ?? []).map((bath, index) => (
                            <Grid
                                key={`${String(index)}-${bath.effectiveDilution ?? ''}`}
                                size={{ xs: 12, sm: 6, md: 4 }}
                            >
                                <Paper
                                    sx={{ p: 1.75 }}
                                    variant="outlined"
                                >
                                    <Typography
                                        color="text.secondary"
                                        variant="caption"
                                    >
                                        {t('sessions.detail.bathOrder', { order: index + 1 })}
                                    </Typography>
                                    <Stack
                                        direction="row"
                                        sx={{ alignItems: 'baseline', gap: 1, mt: 0.5 }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: 'ui-monospace, monospace',
                                                fontWeight: 700,
                                            }}
                                        >
                                            {bath.effectiveDilution ?? bath.dilutionOverride ?? '—'}
                                        </Typography>
                                        {bath.dilutionOverride ? (
                                            <Chip
                                                label={t('sessions.detail.overridden')}
                                                size="small"
                                                variant="outlined"
                                            />
                                        ) : null}
                                    </Stack>
                                    {bath.durationSeconds ? (
                                        <Typography
                                            color="text.secondary"
                                            variant="caption"
                                        >
                                            {t('sessions.detail.bathDuration', {
                                                seconds: bath.durationSeconds,
                                            })}
                                        </Typography>
                                    ) : null}
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Paper>

            <Typography
                sx={{ mb: 1.5, fontWeight: 600 }}
                variant="subtitle1"
            >
                {t('sessions.detail.prints', { count: prints.length })}
            </Typography>
            {prints.length === 0 ? (
                <Typography color="text.secondary">{t('sessions.detail.noPrints')}</Typography>
            ) : (
                <Stack spacing={1.5}>
                    {prints.map((print) => (
                        <Paper
                            key={print['@id']}
                            sx={{ p: 2 }}
                            variant="outlined"
                        >
                            <Stack
                                direction="row"
                                spacing={2}
                                sx={{ alignItems: 'baseline', flexWrap: 'wrap', mb: 1.5 }}
                            >
                                <Typography sx={{ fontWeight: 600 }}>
                                    {t('sessions.detail.printNumber', { number: print.number })}
                                </Typography>
                                {print.negativeNumber ? (
                                    <Typography
                                        color="text.secondary"
                                        variant="body2"
                                    >
                                        {t('sessions.detail.negative', {
                                            negative: print.negativeNumber,
                                        })}
                                    </Typography>
                                ) : null}
                                {print.paperModel ? (
                                    <Typography
                                        color="text.secondary"
                                        variant="body2"
                                    >
                                        {print.paperModel}
                                    </Typography>
                                ) : null}
                                {print.copies ? (
                                    <Chip
                                        label={t('sessions.detail.copies', {
                                            count: print.copies,
                                        })}
                                        size="small"
                                        variant="outlined"
                                    />
                                ) : null}
                            </Stack>

                            {(print.exposures ?? []).length === 0 ? (
                                <Typography color="text.secondary">
                                    {t('sessions.detail.noExposures')}
                                </Typography>
                            ) : (
                                <Stack spacing={0.75}>
                                    {(print.exposures ?? []).map((exposure) => (
                                        <Stack
                                            direction="row"
                                            key={`${String(exposure.order)}-${exposure.kind}`}
                                            spacing={2}
                                            sx={{
                                                alignItems: 'center',
                                                py: 0.75,
                                                borderTop: '1px solid',
                                                borderColor: 'divider',
                                            }}
                                        >
                                            <Typography
                                                sx={{ width: 90 }}
                                                variant="body2"
                                            >
                                                {t(`sessions.detail.exposureKind.${exposure.kind}`)}
                                            </Typography>
                                            <Typography
                                                color="text.secondary"
                                                sx={{
                                                    width: 70,
                                                    fontFamily: 'ui-monospace, monospace',
                                                }}
                                                variant="body2"
                                            >
                                                {t('sessions.detail.baseSecondsValue', {
                                                    seconds: exposure.baseSeconds,
                                                })}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    width: 60,
                                                    fontFamily: 'ui-monospace, monospace',
                                                }}
                                                variant="body2"
                                            >
                                                {formatStopOffset(
                                                    exposure.stopOffsetNumerator ?? 0,
                                                    exposure.stopOffsetDenominator ?? 1,
                                                    notation,
                                                )}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    width: 80,
                                                    fontFamily: 'ui-monospace, monospace',
                                                    fontWeight: 600,
                                                    color: 'secondary.main',
                                                }}
                                                variant="body2"
                                            >
                                                {exposure.effectiveSeconds !== undefined
                                                    ? `${exposure.effectiveSeconds.toFixed(1)}s`
                                                    : '—'}
                                            </Typography>
                                            <Typography
                                                color="text.secondary"
                                                sx={{ flex: 1 }}
                                                variant="body2"
                                            >
                                                {exposure.observation}
                                            </Typography>
                                        </Stack>
                                    ))}
                                </Stack>
                            )}
                        </Paper>
                    ))}
                </Stack>
            )}

            {session.notes ? (
                <Paper
                    sx={{ p: 2.5, mt: 3 }}
                    variant="outlined"
                >
                    <Typography
                        sx={{ mb: 1, fontWeight: 600 }}
                        variant="subtitle2"
                    >
                        {t('sessions.detail.notes')}
                    </Typography>
                    <Typography color="text.secondary">{session.notes}</Typography>
                </Paper>
            ) : null}
        </Box>
    );
};

export default SessionDetail;
