import InventoryIcon from '@mui/icons-material/Inventory';
import ScienceIcon from '@mui/icons-material/Science';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { Box, Chip, CircularProgress, Rating, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import {
    useChemistryApi,
    useDevelopmentLogApi,
    type ChemistryRead,
    type DevelopmentLogDetailRead,
} from '~/api/client';
import type { RouteCrumbHandle } from '~/components/Layout/Parts/AppBar/AppBar';
import { FilmName } from '~/components/Widgets/FilmName/FilmName';
import { IsoChip } from '~/components/Widgets/IsoChip/IsoChip';
import { ProcessChip } from '~/components/Widgets/ProcessChip/ProcessChip';
import {
    developmentLogArchiveRef,
    formatDilution,
    formatPushPullStops,
    formatStepsDuration,
    totalStepsSeconds,
} from '~/domain/developmentLog';
import { idFromIri } from '~/domain/iri';

export const handle: RouteCrumbHandle = {
    crumb: { section: 'negatifs.list.title', title: 'negatifs.detail.title' },
};

type Step = NonNullable<DevelopmentLogDetailRead['steps']>[number];

const NegativeDetail: React.FunctionComponent = () => {
    const { t, i18n } = useTranslation();
    const { developmentLogId } = useParams<{ developmentLogId: string }>();
    const { developmentLogApi } = useDevelopmentLogApi();
    const { chemistryApi } = useChemistryApi();

    const [error, setError] = React.useState<unknown>(null);
    const [loaded, setLoaded] = React.useState(false);
    const [log, setLog] = React.useState<DevelopmentLogDetailRead | null>(null);
    const [chemistries, setChemistries] = React.useState<ChemistryRead[]>([]);

    React.useEffect(() => {
        if (!developmentLogId) {
            return;
        }
        developmentLogApi
            .apiDevelopmentLogsIdGet({ id: developmentLogId })
            .then((logRes) => {
                const fetchedLog = logRes.data;
                const chemistryIds = Array.from(
                    new Set(
                        (fetchedLog.steps ?? [])
                            .map((step) => step.chemistry)
                            .filter((chemistry): chemistry is NonNullable<typeof chemistry> =>
                                Boolean(chemistry),
                            )
                            .map((chemistry) => idFromIri(chemistry['@id'])),
                    ),
                );
                return Promise.all(
                    chemistryIds.map((id) => chemistryApi.apiChemistriesIdGet({ id })),
                ).then((chemistryResList) => {
                    setLog(fetchedLog);
                    setChemistries(chemistryResList.map((res) => res.data));
                    setLoaded(true);
                });
            })
            .catch((err: unknown) => {
                console.error('Error fetching development log:', err);
                setError(err);
            });
    }, [developmentLogId, developmentLogApi, chemistryApi]);

    if (error) {
        return <Typography color="error">{t('errors.api.loadingData')}</Typography>;
    }
    if (!loaded || !log) {
        return (
            <CircularProgress
                aria-label={t('app.loading')}
                enableTrackSlot
                size="3rem"
            />
        );
    }

    const chemistryById = new Map(chemistries.map((chemistry) => [chemistry['@id'], chemistry]));
    const dateFormatter = new Intl.DateTimeFormat(i18n.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    const steps = log.steps ?? [];
    const totalSeconds = totalStepsSeconds(steps);
    const archiveRef = developmentLogArchiveRef(log);
    const pushLabel = formatPushPullStops(log.pushPullStops);

    const headStats: { k: string; v: string }[] = [
        { k: t('negatifs.detail.archiving'), v: archiveRef ?? t('negatifs.list.noArchive') },
        {
            k: t('negatifs.detail.developedOn'),
            v: dateFormatter.format(new Date(log.developedAt)),
        },
        {
            k: t('negatifs.detail.steps'),
            v: t('negatifs.list.stepsCount', { count: steps.length }),
        },
        { k: t('negatifs.detail.totalDuration'), v: formatStepsDuration(totalSeconds) },
        {
            k: t('negatifs.detail.rating'),
            v: t('negatifs.detail.ratingValue', { rating: log.rating ?? 0 }),
        },
    ];

    return (
        <Box>
            <Box
                sx={{
                    mb: '18px',
                    overflow: 'hidden',
                    borderRadius: '18px',
                    border: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        flexWrap: 'wrap',
                        gap: '20px',
                        p: '22px 24px',
                        backgroundColor: log.film.primaryColor ?? 'primary.main',
                        color: log.film.secondaryColor ?? 'primary.contrastText',
                    }}
                >
                    <Box sx={{ flex: 1, minWidth: 240 }}>
                        <Typography
                            sx={{
                                fontFamily: 'ui-monospace, monospace',
                                fontSize: '12px',
                                fontWeight: 700,
                                letterSpacing: '0.6px',
                                opacity: 0.85,
                            }}
                        >
                            {archiveRef ?? t('negatifs.list.noArchive')}
                        </Typography>
                        <Box sx={{ my: '8px', maxWidth: 320 }}>
                            <FilmName film={log.film} />
                        </Box>
                        <Typography sx={{ fontSize: '13.5px', opacity: 0.9 }}>
                            {log.film.emulsionType ?? '—'} ·{' '}
                            {t('negatifs.detail.nominal', {
                                iso: t('components.filmCard.iso', { iso: log.film.sensibility }),
                            })}
                        </Typography>
                    </Box>
                    <Stack
                        direction="row"
                        sx={{ alignItems: 'center', gap: '9px', flexWrap: 'wrap' }}
                    >
                        <ProcessChip film={{ process: log.process }} />
                        <IsoChip film={{ sensibility: log.isoShotAt }} />
                        {pushLabel ? (
                            <Chip
                                label={pushLabel}
                                size="small"
                                sx={{
                                    borderColor: log.film.secondaryColor ?? 'inherit',
                                    color: 'inherit',
                                }}
                                variant="outlined"
                            />
                        ) : null}
                    </Stack>
                </Box>
                <Stack
                    direction="row"
                    sx={{ flexWrap: 'wrap', backgroundColor: 'background.paper' }}
                >
                    {headStats.map((stat) => (
                        <Box
                            key={stat.k}
                            sx={{
                                flex: '1 1 160px',
                                p: '13px 16px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '3px',
                                borderRight: '1px solid',
                                borderColor: 'divider',
                            }}
                        >
                            <Typography
                                color="text.secondary"
                                sx={{
                                    fontSize: '10px',
                                    fontWeight: 700,
                                    letterSpacing: '0.05em',
                                    textTransform: 'uppercase',
                                }}
                            >
                                {stat.k}
                            </Typography>
                            <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>
                                {stat.v}
                            </Typography>
                        </Box>
                    ))}
                </Stack>
            </Box>

            <Box
                sx={{
                    display: 'grid',
                    gap: 2.25,
                    gridTemplateColumns: { xs: '1fr', md: '1fr 340px' },
                    alignItems: 'start',
                }}
            >
                <Box
                    sx={{
                        backgroundColor: 'background.paper',
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: '14px',
                        p: 2.5,
                    }}
                >
                    <Stack
                        direction="row"
                        sx={{ alignItems: 'baseline', gap: 1.25, mb: 2.25 }}
                    >
                        <Typography sx={{ flex: 1, fontWeight: 600 }}>
                            {t('negatifs.detail.timeline')}
                        </Typography>
                        <Typography
                            color="secondary.main"
                            sx={{
                                fontFamily: 'ui-monospace, monospace',
                                fontSize: '12.5px',
                                fontWeight: 600,
                            }}
                        >
                            {t('negatifs.detail.totalLabel', {
                                duration: formatStepsDuration(totalSeconds),
                            })}
                        </Typography>
                    </Stack>
                    {steps.length === 0 ? (
                        <Typography color="text.secondary">
                            {t('negatifs.detail.noSteps')}
                        </Typography>
                    ) : (
                        <Stack spacing={0}>
                            {steps.map((step: Step, index) => {
                                const chemistry = step.chemistry
                                    ? chemistryById.get(step.chemistry['@id'])
                                    : undefined;
                                const dilution = formatDilution(
                                    step.chemistryParts,
                                    step.waterParts,
                                );
                                return (
                                    <Stack
                                        direction="row"
                                        key={`${String(index)}-${chemistry?.['@id'] ?? 'step'}`}
                                        sx={{ gap: 2, alignItems: 'stretch' }}
                                    >
                                        <Stack
                                            sx={{
                                                flex: '0 0 76px',
                                                alignItems: 'flex-end',
                                                pt: 0.25,
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontFamily: 'ui-monospace, monospace',
                                                    fontSize: '13px',
                                                    fontWeight: 700,
                                                }}
                                            >
                                                {formatStepsDuration(step.durationSeconds)}
                                            </Typography>
                                            <Stack
                                                direction="row"
                                                sx={{ alignItems: 'center', gap: 0.375 }}
                                            >
                                                <ThermostatIcon
                                                    sx={{ fontSize: 13, color: 'secondary.main' }}
                                                />
                                                <Typography
                                                    color="secondary.main"
                                                    sx={{ fontSize: '11.5px' }}
                                                >
                                                    {t('negatifs.detail.temperatureValue', {
                                                        temperature: step.temperature,
                                                    })}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                        <Stack sx={{ flex: '0 0 22px', alignItems: 'center' }}>
                                            <Box
                                                sx={{
                                                    width: 11,
                                                    height: 11,
                                                    borderRadius: '50%',
                                                    backgroundColor: 'primary.main',
                                                    mt: 0.5,
                                                    flex: '0 0 auto',
                                                }}
                                            />
                                            {index < steps.length - 1 ? (
                                                <Box
                                                    sx={{
                                                        flex: 1,
                                                        width: '2px',
                                                        backgroundColor: 'divider',
                                                        minHeight: 26,
                                                    }}
                                                />
                                            ) : null}
                                        </Stack>
                                        <Box sx={{ flex: 1, minWidth: 0, pb: 2.25 }}>
                                            <Stack
                                                direction="row"
                                                sx={{
                                                    alignItems: 'baseline',
                                                    gap: 1.125,
                                                    flexWrap: 'wrap',
                                                }}
                                            >
                                                <Typography sx={{ fontWeight: 600 }}>
                                                    {chemistry?.name ??
                                                        t('negatifs.detail.unknownChemistry')}
                                                </Typography>
                                                {dilution ? (
                                                    <Typography
                                                        sx={{
                                                            fontFamily: 'ui-monospace, monospace',
                                                            fontSize: '11.5px',
                                                            fontWeight: 700,
                                                            px: '7px',
                                                            py: '1px',
                                                            borderRadius: '5px',
                                                            backgroundColor: 'action.hover',
                                                            color: 'primary.dark',
                                                        }}
                                                    >
                                                        {dilution}
                                                    </Typography>
                                                ) : null}
                                            </Stack>
                                            {step.agitationNote ? (
                                                <Typography
                                                    color="text.secondary"
                                                    sx={{ mt: 0.5, fontSize: '12.5px' }}
                                                >
                                                    {step.agitationNote}
                                                </Typography>
                                            ) : null}
                                        </Box>
                                    </Stack>
                                );
                            })}
                        </Stack>
                    )}
                    {log.developmentNotes ? (
                        <Box
                            sx={{
                                mt: 0.5,
                                p: '14px 16px',
                                borderRadius: '11px',
                                backgroundColor: 'background.default',
                                border: '1px solid',
                                borderColor: 'divider',
                            }}
                        >
                            <Typography
                                color="text.secondary"
                                sx={{
                                    fontSize: '10px',
                                    fontWeight: 700,
                                    letterSpacing: '0.05em',
                                    textTransform: 'uppercase',
                                }}
                            >
                                {t('negatifs.detail.developmentNotes')}
                            </Typography>
                            <Typography sx={{ mt: 0.75, fontSize: '13px', lineHeight: 1.6 }}>
                                {log.developmentNotes}
                            </Typography>
                        </Box>
                    ) : null}
                </Box>

                <Stack spacing={2.25}>
                    <Box
                        sx={{
                            backgroundColor: 'background.paper',
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: '14px',
                            p: 2.25,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1.125,
                        }}
                    >
                        <Typography sx={{ fontWeight: 600 }}>
                            {t('negatifs.detail.shooting')}
                        </Typography>
                        <Stack
                            direction="row"
                            sx={{ alignItems: 'baseline', gap: 1.25 }}
                        >
                            <Typography
                                color="text.secondary"
                                sx={{ flex: '0 0 100px', fontSize: '13px' }}
                            >
                                {t('negatifs.detail.camera')}
                            </Typography>
                            <Typography sx={{ fontWeight: 500 }}>
                                {log.camera?.name ?? '—'}
                            </Typography>
                        </Stack>
                        <Stack
                            direction="row"
                            sx={{ alignItems: 'baseline', gap: 1.25 }}
                        >
                            <Typography
                                color="text.secondary"
                                sx={{ flex: '0 0 100px', fontSize: '13px' }}
                            >
                                {t('negatifs.detail.shotAt')}
                            </Typography>
                            <Typography sx={{ fontWeight: 500 }}>{log.shotAt.label}</Typography>
                        </Stack>
                        <Stack
                            direction="row"
                            sx={{ alignItems: 'baseline', gap: 1.25 }}
                        >
                            <Typography
                                color="text.secondary"
                                sx={{ flex: '0 0 100px', fontSize: '13px' }}
                            >
                                {t('negatifs.detail.isoShotAt')}
                            </Typography>
                            <Typography sx={{ fontWeight: 500 }}>
                                {t('components.filmCard.iso', { iso: log.isoShotAt })}
                            </Typography>
                        </Stack>
                        {log.shootingNotes ? (
                            <Typography
                                color="text.secondary"
                                sx={{ fontSize: '12.5px', lineHeight: 1.55 }}
                            >
                                {log.shootingNotes}
                            </Typography>
                        ) : null}
                    </Box>

                    <Box
                        sx={{
                            backgroundColor: 'background.paper',
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: '14px',
                            p: 2.25,
                        }}
                    >
                        <Stack
                            direction="row"
                            sx={{ alignItems: 'center', gap: 1, mb: 1.5 }}
                        >
                            <InventoryIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                            <Typography sx={{ fontWeight: 600 }}>
                                {t('negatifs.detail.archiving')}
                            </Typography>
                        </Stack>
                        {archiveRef ? (
                            <Stack spacing={1.125}>
                                <Stack
                                    direction="row"
                                    sx={{ alignItems: 'baseline', gap: 1.25 }}
                                >
                                    <Typography
                                        color="text.secondary"
                                        sx={{ flex: '0 0 90px', fontSize: '13px' }}
                                    >
                                        {t('negatifs.detail.binder')}
                                    </Typography>
                                    <Typography sx={{ fontWeight: 500 }}>{log.binderId}</Typography>
                                </Stack>
                                <Stack
                                    direction="row"
                                    sx={{ alignItems: 'baseline', gap: 1.25 }}
                                >
                                    <Typography
                                        color="text.secondary"
                                        sx={{ flex: '0 0 90px', fontSize: '13px' }}
                                    >
                                        {t('negatifs.detail.sheet')}
                                    </Typography>
                                    <Typography sx={{ fontWeight: 500 }}>
                                        {log.contactSheetNumber}
                                    </Typography>
                                </Stack>
                            </Stack>
                        ) : (
                            <Typography color="text.secondary">
                                {t('negatifs.detail.noArchiving')}
                            </Typography>
                        )}
                    </Box>

                    <Box
                        sx={{
                            backgroundColor: 'background.paper',
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: '14px',
                            p: 2.25,
                        }}
                    >
                        <Stack
                            direction="row"
                            sx={{ alignItems: 'center', gap: 1, mb: 1.25 }}
                        >
                            <ScienceIcon sx={{ fontSize: 18, color: 'secondary.main' }} />
                            <Typography sx={{ flex: 1, fontWeight: 600 }}>
                                {t('negatifs.detail.rating')}
                            </Typography>
                            <Rating
                                readOnly
                                size="small"
                                value={log.rating ?? 0}
                            />
                        </Stack>
                        {(log.tags ?? []).length > 0 ? (
                            <Stack
                                direction="row"
                                sx={{ flexWrap: 'wrap', gap: 0.75 }}
                            >
                                {(log.tags ?? []).map((tag) => (
                                    <Chip
                                        key={tag['@id']}
                                        label={tag.name}
                                        size="small"
                                        sx={{
                                            borderColor: tag.primaryColor ?? 'divider',
                                            color: tag.primaryColor ?? 'text.primary',
                                        }}
                                        variant="outlined"
                                    />
                                ))}
                            </Stack>
                        ) : null}
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
};

export default NegativeDetail;
