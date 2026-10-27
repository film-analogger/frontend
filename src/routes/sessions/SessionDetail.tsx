import EventIcon from '@mui/icons-material/Event';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FunctionsIcon from '@mui/icons-material/Functions';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ScienceIcon from '@mui/icons-material/Science';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import TimerIcon from '@mui/icons-material/Timer';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import { Box, Button, Chip, CircularProgress, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { usePrintSessionApi, type PrintSessionDetailRead } from '~/api/client';
import { formatStopOffset, printTotalSeconds } from '~/domain/exposureMath';
import { getProcessStyle } from '~/domain/processColors';
import { getStopNotation } from '~/domain/preferences';
import type { RouteCrumbHandle } from '~/components/Layout/Parts/AppBar/AppBar';

export const handle: RouteCrumbHandle = {
    crumb: { section: 'sessions.list.title', title: 'sessions.detail.title' },
};

type SessionExposure = NonNullable<
    NonNullable<PrintSessionDetailRead['prints']>[number]['exposures']
>[number];

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

const SessionDetail: React.FunctionComponent = () => {
    const { t, i18n } = useTranslation();
    const { sessionId } = useParams<{ sessionId: string }>();
    const { printSessionApi } = usePrintSessionApi();

    const [error, setError] = React.useState<unknown>(null);
    const [loaded, setLoaded] = React.useState(false);
    const [session, setSession] = React.useState<PrintSessionDetailRead | null>(null);
    const [collapsedPrints, setCollapsedPrints] = React.useState<Set<string>>(new Set());

    React.useEffect(() => {
        if (!sessionId) {
            return;
        }
        printSessionApi
            .apiPrintSessionsIdGet({ id: sessionId })
            .then((sessionRes) => {
                setSession(sessionRes.data);
                setLoaded(true);
            })
            .catch((err: unknown) => {
                console.error('Error fetching print session:', err);
                setError(err);
            });
    }, [sessionId, printSessionApi]);

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
    const prints = session.prints ?? [];
    const dateFormatter = new Intl.DateTimeFormat(i18n.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const formatGrade = (grade?: string | null): string | null => {
        if (!grade) {
            return null;
        }
        return grade === 'no_filter'
            ? t('sessions.detail.gradeNoFilter')
            : t('sessions.detail.gradeLabel', { grade });
    };

    const togglePrint = (printId: string) => {
        setCollapsedPrints((current) => {
            const next = new Set(current);
            if (next.has(printId)) {
                next.delete(printId);
            } else {
                next.add(printId);
            }
            return next;
        });
    };

    return (
        <Box>
            <Stack
                direction="row"
                spacing={2}
                sx={{ alignItems: 'flex-start', flexWrap: 'wrap', mb: 3 }}
            >
                <Box sx={{ flex: 1, minWidth: 300 }}>
                    <Typography
                        sx={{ mb: 0.75 }}
                        variant="h1"
                    >
                        {t('sessions.list.numberLabel', { number: session.number })}
                    </Typography>
                    <Stack
                        direction="row"
                        sx={{ color: 'text.secondary', flexWrap: 'wrap', gap: 2 }}
                    >
                        <Stack
                            direction="row"
                            sx={{ alignItems: 'center', gap: 0.75 }}
                        >
                            <EventIcon sx={{ fontSize: 16 }} />
                            <Typography variant="body2">
                                {dateFormatter.format(new Date(session.date))}
                            </Typography>
                        </Stack>
                        <Stack
                            direction="row"
                            sx={{ alignItems: 'center', gap: 0.75 }}
                        >
                            <HomeWorkIcon sx={{ fontSize: 16 }} />
                            <Typography variant="body2">{session.lab}</Typography>
                        </Stack>
                        <Stack
                            direction="row"
                            sx={{ alignItems: 'center', gap: 0.75 }}
                        >
                            <SettingsInputComponentIcon sx={{ fontSize: 16 }} />
                            <Typography variant="body2">{session.enlarger.name}</Typography>
                        </Stack>
                        <Stack
                            direction="row"
                            sx={{ alignItems: 'center', gap: 0.75 }}
                        >
                            <ThermostatIcon sx={{ fontSize: 16 }} />
                            <Typography variant="body2">
                                {t('sessions.list.temperature', {
                                    temperature: session.temperatureCelsius,
                                })}
                            </Typography>
                        </Stack>
                    </Stack>
                </Box>
                <Button
                    onClick={() => {
                        window.print();
                    }}
                    startIcon={<PictureAsPdfIcon />}
                    variant="outlined"
                >
                    {t('sessions.detail.export')}
                </Button>
            </Stack>

            <Box
                sx={{
                    borderRadius: '16px',
                    border: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: 'background.paper',
                    p: 2.25,
                    mb: 3,
                }}
            >
                <Stack
                    direction="row"
                    sx={{ alignItems: 'center', gap: 1.25, mb: 1.75 }}
                >
                    <ScienceIcon sx={{ color: 'secondary.main', fontSize: 19 }} />
                    <Typography sx={{ flex: 1, fontWeight: 600 }}>
                        {t('sessions.detail.chemicalChain')}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        variant="caption"
                    >
                        {t('sessions.detail.chemicalChainHint')}
                    </Typography>
                </Stack>
                {(session.chemicalBaths ?? []).length === 0 && !session.wash ? (
                    <Typography color="text.secondary">
                        {t('sessions.detail.noChemicalBaths')}
                    </Typography>
                ) : (
                    <Stack
                        direction="row"
                        sx={{ alignItems: 'stretch', flexWrap: 'wrap', gap: 1.25 }}
                    >
                        {(session.chemicalBaths ?? []).map((bath, index) => {
                            const chemistry = bath.chemistry;
                            const processColor = getProcessStyle(chemistry.process).color;
                            return (
                                <Box
                                    key={`${String(index)}-${bath.effectiveDilution ?? ''}`}
                                    sx={{
                                        flex: '1 1 190px',
                                        minWidth: 190,
                                        p: 1.75,
                                        borderRadius: '13px',
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        backgroundColor: 'background.default',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 1.125,
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        sx={{ alignItems: 'center', gap: 1 }}
                                    >
                                        <Box
                                            sx={{
                                                width: 22,
                                                height: 22,
                                                borderRadius: '7px',
                                                backgroundColor: processColor,
                                                color: '#fff',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: 11,
                                                fontWeight: 700,
                                            }}
                                        >
                                            {index + 1}
                                        </Box>
                                        <Typography
                                            color="text.secondary"
                                            sx={{
                                                fontSize: '10.5px',
                                                fontWeight: 700,
                                                letterSpacing: '0.05em',
                                                textTransform: 'uppercase',
                                            }}
                                        >
                                            {chemistry.chemistryType.typeLabel}
                                        </Typography>
                                    </Stack>
                                    <Typography sx={{ fontSize: '13.5px', fontWeight: 600 }}>
                                        {chemistry.name}
                                    </Typography>
                                    <Stack
                                        direction="row"
                                        sx={{ alignItems: 'baseline', gap: 1.25 }}
                                    >
                                        <Typography
                                            sx={{
                                                color: 'secondary.main',
                                                fontFamily: 'ui-monospace, monospace',
                                                fontSize: '18px',
                                                fontWeight: 700,
                                            }}
                                        >
                                            {bath.effectiveDilution ?? bath.dilutionOverride ?? '—'}
                                        </Typography>
                                        {bath.dilutionOverride ? (
                                            <Chip
                                                color="secondary"
                                                label={t('sessions.detail.overridden')}
                                                size="small"
                                                variant="outlined"
                                            />
                                        ) : null}
                                    </Stack>
                                    {bath.durationSeconds ? (
                                        <Stack
                                            direction="row"
                                            sx={{ alignItems: 'center', gap: 0.625 }}
                                        >
                                            <TimerIcon
                                                color="disabled"
                                                sx={{ fontSize: 15 }}
                                            />
                                            <Typography
                                                color="text.secondary"
                                                variant="caption"
                                            >
                                                {t('sessions.detail.bathDuration', {
                                                    seconds: bath.durationSeconds,
                                                })}
                                            </Typography>
                                        </Stack>
                                    ) : null}
                                </Box>
                            );
                        })}
                        {session.wash ? (
                            <Box
                                sx={{
                                    flex: '0 0 176px',
                                    p: 1.75,
                                    borderRadius: '13px',
                                    border: '1px dashed',
                                    borderColor: 'divider',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1,
                                    justifyContent: 'center',
                                }}
                            >
                                <Stack
                                    direction="row"
                                    sx={{ alignItems: 'center', color: 'primary.main', gap: 1 }}
                                >
                                    <WaterDropIcon sx={{ fontSize: 19 }} />
                                    <Typography
                                        color="text.primary"
                                        sx={{ fontSize: '13px', fontWeight: 700 }}
                                    >
                                        {t('sessions.detail.wash')}
                                    </Typography>
                                </Stack>
                                <Typography
                                    color="text.secondary"
                                    sx={{ fontSize: '12.5px', lineHeight: 1.4 }}
                                >
                                    {session.wash}
                                </Typography>
                            </Box>
                        ) : null}
                    </Stack>
                )}
            </Box>

            <Stack
                direction="row"
                sx={{ alignItems: 'center', gap: 1.25, mb: 1.5 }}
            >
                <Typography sx={{ flex: 1, fontWeight: 600 }}>
                    {t('sessions.detail.prints', { count: prints.length })}
                </Typography>
                <Typography
                    color="text.secondary"
                    variant="caption"
                >
                    {t('sessions.detail.printsHint')}
                </Typography>
            </Stack>

            {prints.length === 0 ? (
                <Typography color="text.secondary">{t('sessions.detail.noPrints')}</Typography>
            ) : (
                <Stack spacing={1.25}>
                    {prints.map((print) => {
                        const printId = print['@id'];
                        const expanded = !collapsedPrints.has(printId);
                        const exposures = [...(print.exposures ?? [])].sort(
                            (a, b) => a.order - b.order,
                        );
                        const baseExposure = exposures.find((exposure) => exposure.kind === 'base');
                        const baseGrade = formatGrade(baseExposure?.grade);
                        const totalSeconds = printTotalSeconds(exposures);
                        const maxEffective = Math.max(
                            1,
                            ...exposures.map((exposure) => exposure.effectiveSeconds ?? 0),
                        );
                        const photoPaper = print.photoPaper;
                        const paperLabel = [
                            photoPaper.manufacturer.name,
                            photoPaper.name,
                            photoPaper.paperBase.toUpperCase(),
                            capitalize(photoPaper.paperSurface),
                        ]
                            .filter(Boolean)
                            .join(' · ');
                        const specs: { k: string; v: string }[] = [];
                        if (print.filmFormat) {
                            specs.push({
                                k: t('sessions.detail.specs.filmFormat'),
                                v: print.filmFormat,
                            });
                        }
                        if (print.negativeFormat) {
                            specs.push({
                                k: t('sessions.wizard.fields.negativeFormat'),
                                v: print.negativeFormat,
                            });
                        }
                        if (print.focalLength) {
                            specs.push({
                                k: t('sessions.wizard.fields.focalLength'),
                                v: t('sessions.wizard.focalLengthOption', {
                                    focal: print.focalLength,
                                }),
                            });
                        }
                        if (print.condensers && print.condensers.length > 0) {
                            specs.push({
                                k: t('sessions.detail.specs.condensers'),
                                v: print.condensers.join(', '),
                            });
                        }
                        if (print.columnHeightCm) {
                            specs.push({
                                k: t('sessions.wizard.fields.columnHeightCm'),
                                v: `${String(print.columnHeightCm)} cm`,
                            });
                        }
                        if (print.borderCm) {
                            specs.push({
                                k: t('sessions.wizard.fields.borderCm'),
                                v: `${String(print.borderCm)} cm`,
                            });
                        }
                        if (print.contactSheetRef) {
                            specs.push({
                                k: t('sessions.detail.specs.contactSheetRef'),
                                v: print.contactSheetRef,
                            });
                        }

                        return (
                            <Box
                                key={printId}
                                sx={{
                                    borderRadius: '14px',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    backgroundColor: 'background.paper',
                                    overflow: 'hidden',
                                }}
                            >
                                <Box
                                    component="button"
                                    onClick={() => {
                                        togglePrint(printId);
                                    }}
                                    sx={{
                                        all: 'unset',
                                        boxSizing: 'border-box',
                                        width: '100%',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1.75,
                                        p: '14px 16px',
                                        '&:hover': { backgroundColor: 'action.hover' },
                                    }}
                                    type="button"
                                >
                                    <Box
                                        sx={{
                                            width: 36,
                                            height: 36,
                                            flex: '0 0 36px',
                                            borderRadius: '10px',
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            backgroundColor: 'background.default',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: 14,
                                            fontWeight: 700,
                                        }}
                                    >
                                        {print.number}
                                    </Box>
                                    <Box sx={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                                        <Stack
                                            direction="row"
                                            sx={{
                                                alignItems: 'baseline',
                                                flexWrap: 'wrap',
                                                gap: 1.25,
                                            }}
                                        >
                                            {print.negativeNumber ? (
                                                <Typography
                                                    sx={{ fontSize: '14.5px', fontWeight: 600 }}
                                                >
                                                    {t('sessions.detail.negative', {
                                                        negative: print.negativeNumber,
                                                    })}
                                                </Typography>
                                            ) : null}
                                            {print.filmFormat ? (
                                                <Typography
                                                    color="text.secondary"
                                                    variant="caption"
                                                >
                                                    {print.filmFormat}
                                                </Typography>
                                            ) : null}
                                        </Stack>
                                        {paperLabel ? (
                                            <Typography
                                                color="text.secondary"
                                                sx={{ fontSize: '11.5px' }}
                                            >
                                                {paperLabel}
                                            </Typography>
                                        ) : null}
                                    </Box>
                                    <Stack
                                        direction="row"
                                        sx={{
                                            flexWrap: 'wrap',
                                            gap: 0.75,
                                            justifyContent: 'flex-end',
                                        }}
                                    >
                                        {print.paperWidthCm && print.paperHeightCm ? (
                                            <Box
                                                sx={{
                                                    px: '9px',
                                                    py: '3px',
                                                    borderRadius: '7px',
                                                    border: '1px solid',
                                                    borderColor: 'divider',
                                                    backgroundColor: 'background.default',
                                                    fontSize: '11.5px',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {t('sessions.detail.sizeLabel', {
                                                    width: print.paperWidthCm,
                                                    height: print.paperHeightCm,
                                                })}
                                            </Box>
                                        ) : null}
                                        {baseGrade ? (
                                            <Box
                                                sx={{
                                                    px: '9px',
                                                    py: '3px',
                                                    borderRadius: '7px',
                                                    border: '1px solid',
                                                    borderColor: 'divider',
                                                    backgroundColor: 'background.default',
                                                    fontSize: '11.5px',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {baseGrade}
                                            </Box>
                                        ) : null}
                                        {totalSeconds > 0 ? (
                                            <Box
                                                sx={{
                                                    px: '9px',
                                                    py: '3px',
                                                    borderRadius: '7px',
                                                    backgroundColor: 'secondary.main',
                                                    color: '#fff',
                                                    fontFamily: 'ui-monospace, monospace',
                                                    fontSize: '11.5px',
                                                    fontWeight: 700,
                                                }}
                                            >
                                                {t('sessions.detail.baseSecondsValue', {
                                                    seconds: totalSeconds.toFixed(1),
                                                })}
                                            </Box>
                                        ) : null}
                                        {print.copies ? (
                                            <Box
                                                sx={{
                                                    px: '9px',
                                                    py: '3px',
                                                    borderRadius: '7px',
                                                    border: '1px solid',
                                                    borderColor: 'divider',
                                                    backgroundColor: 'background.default',
                                                    fontSize: '11.5px',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {t('sessions.detail.copies', {
                                                    count: print.copies,
                                                })}
                                            </Box>
                                        ) : null}
                                    </Stack>
                                    <ExpandMoreIcon
                                        sx={{
                                            opacity: 0.5,
                                            transform: expanded ? 'rotate(180deg)' : 'none',
                                            transition: 'transform 200ms ease',
                                        }}
                                    />
                                </Box>
                                {expanded ? (
                                    <Box
                                        sx={{
                                            display: 'grid',
                                            gridTemplateColumns: { xs: '1fr', md: '0.85fr 1.35fr' },
                                            gap: 2.25,
                                            alignItems: 'start',
                                            p: '0 16px 18px',
                                        }}
                                    >
                                        <Stack spacing={1.75}>
                                            {specs.length > 0 ? (
                                                <Box
                                                    sx={{
                                                        p: 1.75,
                                                        borderRadius: '12px',
                                                        backgroundColor: 'background.default',
                                                        border: '1px solid',
                                                        borderColor: 'divider',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: 1.125,
                                                    }}
                                                >
                                                    <Typography
                                                        color="text.secondary"
                                                        sx={{
                                                            fontSize: '10.5px',
                                                            fontWeight: 700,
                                                            letterSpacing: '0.05em',
                                                            textTransform: 'uppercase',
                                                        }}
                                                    >
                                                        {t('sessions.detail.negativeFraming')}
                                                    </Typography>
                                                    {specs.map((spec) => (
                                                        <Stack
                                                            direction="row"
                                                            key={spec.k}
                                                            sx={{
                                                                alignItems: 'baseline',
                                                                gap: 1.25,
                                                            }}
                                                        >
                                                            <Typography
                                                                color="text.secondary"
                                                                sx={{ flex: 1, fontSize: '12.5px' }}
                                                            >
                                                                {spec.k}
                                                            </Typography>
                                                            <Typography
                                                                sx={{
                                                                    fontSize: '12.5px',
                                                                    fontWeight: 600,
                                                                }}
                                                            >
                                                                {spec.v}
                                                            </Typography>
                                                        </Stack>
                                                    ))}
                                                </Box>
                                            ) : null}
                                            {print.notes ? (
                                                <Typography
                                                    color="text.secondary"
                                                    sx={{ fontSize: '12.5px', lineHeight: 1.5 }}
                                                >
                                                    <Typography
                                                        color="text.primary"
                                                        component="span"
                                                        sx={{ fontWeight: 600 }}
                                                    >
                                                        {t('sessions.detail.notes')} ·{' '}
                                                    </Typography>
                                                    {print.notes}
                                                </Typography>
                                            ) : null}
                                        </Stack>

                                        <Stack spacing={1.5}>
                                            <Typography
                                                color="text.secondary"
                                                sx={{
                                                    fontSize: '10.5px',
                                                    fontWeight: 700,
                                                    letterSpacing: '0.05em',
                                                    textTransform: 'uppercase',
                                                }}
                                            >
                                                {t('sessions.wizard.exposures')}
                                            </Typography>
                                            {exposures.length === 0 ? (
                                                <Typography color="text.secondary">
                                                    {t('sessions.detail.noExposures')}
                                                </Typography>
                                            ) : (
                                                <React.Fragment>
                                                    <Box
                                                        sx={{
                                                            display: 'grid',
                                                            gridTemplateColumns:
                                                                '1.5fr 0.8fr 1fr 1.1fr 1.6fr',
                                                            gap: 1.25,
                                                            px: 0.5,
                                                        }}
                                                    >
                                                        {(
                                                            [
                                                                'step',
                                                                'base',
                                                                'offset',
                                                                'effective',
                                                                'observation',
                                                            ] as const
                                                        ).map((column) => (
                                                            <Typography
                                                                color="text.secondary"
                                                                key={column}
                                                                sx={{
                                                                    fontSize: '10.5px',
                                                                    fontWeight: 700,
                                                                    letterSpacing: '0.04em',
                                                                    textTransform: 'uppercase',
                                                                }}
                                                            >
                                                                {t(
                                                                    `sessions.detail.columns.${column}`,
                                                                )}
                                                            </Typography>
                                                        ))}
                                                    </Box>
                                                    {exposures.map((exposure: SessionExposure) => (
                                                        <Box
                                                            key={`${String(exposure.order)}-${exposure.kind}`}
                                                            sx={{
                                                                display: 'grid',
                                                                gridTemplateColumns:
                                                                    '1.5fr 0.8fr 1fr 1.1fr 1.6fr',
                                                                gap: 1.25,
                                                                alignItems: 'center',
                                                                p: '9px 4px',
                                                                borderTop: '1px solid',
                                                                borderColor: 'divider',
                                                            }}
                                                        >
                                                            <Stack
                                                                direction="row"
                                                                sx={{
                                                                    alignItems: 'center',
                                                                    gap: 1,
                                                                    minWidth: 0,
                                                                }}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        width: 20,
                                                                        height: 20,
                                                                        borderRadius: '6px',
                                                                        border: '1px solid',
                                                                        borderColor: 'divider',
                                                                        backgroundColor:
                                                                            'background.default',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        fontSize: '10.5px',
                                                                        fontWeight: 700,
                                                                        flex: '0 0 20px',
                                                                    }}
                                                                >
                                                                    {exposure.order}
                                                                </Box>
                                                                <Box sx={{ minWidth: 0 }}>
                                                                    <Typography
                                                                        noWrap
                                                                        sx={{
                                                                            fontSize: '12.5px',
                                                                            fontWeight: 600,
                                                                        }}
                                                                    >
                                                                        {t(
                                                                            `sessions.detail.exposureKind.${exposure.kind}`,
                                                                        )}
                                                                    </Typography>
                                                                    <Typography
                                                                        color="text.secondary"
                                                                        sx={{ fontSize: '10.5px' }}
                                                                    >
                                                                        {[
                                                                            formatGrade(
                                                                                exposure.grade,
                                                                            ),
                                                                            exposure.aperture,
                                                                        ]
                                                                            .filter(Boolean)
                                                                            .join(' · ')}
                                                                    </Typography>
                                                                </Box>
                                                            </Stack>
                                                            <Typography
                                                                sx={{
                                                                    fontFamily:
                                                                        'ui-monospace, monospace',
                                                                    fontSize: '13px',
                                                                }}
                                                            >
                                                                {t(
                                                                    'sessions.detail.baseSecondsValue',
                                                                    {
                                                                        seconds:
                                                                            exposure.baseSeconds,
                                                                    },
                                                                )}
                                                            </Typography>
                                                            <Typography
                                                                sx={{
                                                                    fontFamily:
                                                                        'ui-monospace, monospace',
                                                                    fontSize: '12.5px',
                                                                    fontWeight: 700,
                                                                }}
                                                            >
                                                                {formatStopOffset(
                                                                    exposure.stopOffsetNumerator ??
                                                                        0,
                                                                    exposure.stopOffsetDenominator ??
                                                                        1,
                                                                    notation,
                                                                )}
                                                            </Typography>
                                                            <Box>
                                                                <Typography
                                                                    sx={{
                                                                        color: 'secondary.main',
                                                                        fontFamily:
                                                                            'ui-monospace, monospace',
                                                                        fontSize: '14px',
                                                                        fontWeight: 700,
                                                                    }}
                                                                >
                                                                    {exposure.effectiveSeconds !==
                                                                    undefined
                                                                        ? `${exposure.effectiveSeconds.toFixed(1)}s`
                                                                        : '—'}
                                                                </Typography>
                                                                <Box
                                                                    sx={{
                                                                        mt: 0.5,
                                                                        height: 5,
                                                                        borderRadius: '4px',
                                                                        backgroundColor:
                                                                            'background.default',
                                                                        overflow: 'hidden',
                                                                    }}
                                                                >
                                                                    <Box
                                                                        sx={{
                                                                            height: '100%',
                                                                            borderRadius: '4px',
                                                                            backgroundColor:
                                                                                'secondary.main',
                                                                            width: `${String(
                                                                                Math.min(
                                                                                    100,
                                                                                    ((exposure.effectiveSeconds ??
                                                                                        0) /
                                                                                        maxEffective) *
                                                                                        100,
                                                                                ),
                                                                            )}%`,
                                                                        }}
                                                                    />
                                                                </Box>
                                                            </Box>
                                                            <Typography
                                                                color="text.secondary"
                                                                sx={{
                                                                    fontSize: '12px',
                                                                    lineHeight: 1.35,
                                                                }}
                                                            >
                                                                {exposure.observation}
                                                            </Typography>
                                                        </Box>
                                                    ))}
                                                </React.Fragment>
                                            )}
                                            {totalSeconds > 0 ? (
                                                <Stack
                                                    direction="row"
                                                    sx={{
                                                        alignItems: 'center',
                                                        gap: 1.5,
                                                        p: '11px 13px',
                                                        borderRadius: '11px',
                                                        backgroundColor: 'background.default',
                                                        border: '1px solid',
                                                        borderColor: 'divider',
                                                    }}
                                                >
                                                    <FunctionsIcon
                                                        sx={{
                                                            color: 'secondary.main',
                                                            fontSize: 18,
                                                        }}
                                                    />
                                                    <Typography
                                                        color="text.secondary"
                                                        sx={{ flex: 1, fontSize: '12.5px' }}
                                                    >
                                                        {t('sessions.detail.recipe', {
                                                            count: exposures.length,
                                                        })}
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            fontFamily: 'ui-monospace, monospace',
                                                            fontSize: '15px',
                                                            fontWeight: 700,
                                                        }}
                                                    >
                                                        {t('sessions.detail.baseSecondsValue', {
                                                            seconds: totalSeconds.toFixed(1),
                                                        })}
                                                    </Typography>
                                                </Stack>
                                            ) : null}
                                        </Stack>
                                    </Box>
                                ) : null}
                            </Box>
                        );
                    })}
                </Stack>
            )}

            {session.notes ? (
                <Box
                    sx={{
                        mt: 2.25,
                        p: '16px 18px',
                        borderRadius: '14px',
                        border: '1px solid',
                        borderColor: 'divider',
                        backgroundColor: 'background.paper',
                    }}
                >
                    <Typography sx={{ mb: 0.875, fontSize: '13.5px', fontWeight: 600 }}>
                        {t('sessions.detail.notes')}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        sx={{ fontSize: '13px', lineHeight: 1.6, maxWidth: '80ch' }}
                    >
                        {session.notes}
                    </Typography>
                </Box>
            ) : null}
        </Box>
    );
};

export default SessionDetail;
