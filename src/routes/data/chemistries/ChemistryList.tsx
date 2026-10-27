import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TuneIcon from '@mui/icons-material/Tune';
import { Box, Chip, CircularProgress, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router';
import { useChemistryApi, type ChemistryRead } from '~/api/client';
import { getProcessStyle, type Process } from '~/domain/processColors';
import type { RouteCrumbHandle } from '~/components/Layout/Parts/AppBar/AppBar';

export const handle: RouteCrumbHandle = {
    crumb: { section: 'components.sidemenu.group.reference', title: 'chemistries.list.title' },
};

// 6 columns: product, manufacturer, process, type, dilutions, and a trailing
// 40px slot for the row's chevron affordance.
const columnTemplate = '2.2fr 1.2fr 1fr 1.3fr 1.5fr 40px';

const ChemistryList: React.FunctionComponent = () => {
    const { t } = useTranslation();
    const { chemistryApi } = useChemistryApi();

    const [error, setError] = React.useState<unknown>(null);
    const [loaded, setLoaded] = React.useState(false);
    const [chemistries, setChemistries] = React.useState<ChemistryRead[]>([]);
    const [processFilter, setProcessFilter] = React.useState<Process | null>(null);
    const [typeFilter, setTypeFilter] = React.useState<string | null>(null);

    React.useEffect(() => {
        chemistryApi
            .apiChemistriesGetCollection()
            .then((res) => {
                setChemistries(res.data['hydra:member']);
                setLoaded(true);
            })
            .catch((err: unknown) => {
                console.error('Error fetching chemistries:', err);
                setError(err);
            });
    }, [chemistryApi]);

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

    const processes = Array.from(new Set(chemistries.map((chemistry) => chemistry.process)));

    const types = new Map<string, string>();
    chemistries.forEach((chemistry) => {
        types.set(chemistry.chemistryType.typeCode, chemistry.chemistryType.typeLabel);
    });

    const visibleChemistries = chemistries.filter(
        (chemistry) =>
            (!processFilter || chemistry.process === processFilter) &&
            (!typeFilter || chemistry.chemistryType.typeCode === typeFilter),
    );

    return (
        <Box>
            <Typography
                sx={{ mb: 0.5 }}
                variant="h1"
            >
                {t('chemistries.list.title')}
            </Typography>
            <Typography
                color="text.secondary"
                sx={{ mb: 2 }}
                variant="body2"
            >
                {t('chemistries.list.count', { count: chemistries.length })}
            </Typography>

            {processes.length > 0 || types.size > 0 ? (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '9px',
                        p: '12px 14px',
                        borderRadius: '13px',
                        border: '1px solid',
                        borderColor: 'divider',
                        backgroundColor: 'background.paper',
                        mb: 2,
                    }}
                >
                    <Stack
                        direction="row"
                        spacing={0.5}
                        sx={{ alignItems: 'center' }}
                    >
                        <TuneIcon
                            aria-hidden
                            fontSize="small"
                            sx={{ color: 'text.secondary' }}
                        />
                        <Typography
                            color="text.secondary"
                            sx={{
                                fontSize: '11.5px',
                                fontWeight: 700,
                                letterSpacing: '0.9px',
                                textTransform: 'uppercase',
                            }}
                        >
                            {t('chemistries.list.filters.title')}
                        </Typography>
                    </Stack>

                    {processes.map((process) => {
                        const style = getProcessStyle(process);
                        const active = processFilter === process;
                        return (
                            <Chip
                                clickable
                                icon={
                                    <Box
                                        sx={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: '3px',
                                            backgroundColor: active ? style.fg : style.color,
                                        }}
                                    />
                                }
                                key={process}
                                label={process}
                                onClick={() => {
                                    setProcessFilter((current) =>
                                        current === process ? null : process,
                                    );
                                }}
                                sx={{
                                    borderColor: style.color,
                                    ...(active
                                        ? { backgroundColor: style.color, color: style.fg }
                                        : {}),
                                }}
                                variant={active ? 'filled' : 'outlined'}
                            />
                        );
                    })}

                    {processes.length > 0 && types.size > 0 ? (
                        <Box
                            sx={{ width: '1px', height: 24, backgroundColor: 'divider', mx: 0.5 }}
                        />
                    ) : null}

                    {Array.from(types.entries()).map(([typeCode, typeLabel]) => {
                        const active = typeFilter === typeCode;
                        return (
                            <Chip
                                clickable
                                key={typeCode}
                                label={typeLabel}
                                onClick={() => {
                                    setTypeFilter((current) =>
                                        current === typeCode ? null : typeCode,
                                    );
                                }}
                                sx={
                                    active
                                        ? {
                                              backgroundColor: 'primary.main',
                                              color: 'primary.contrastText',
                                              borderColor: 'primary.main',
                                          }
                                        : {
                                              color: 'text.secondary',
                                              borderColor: 'divider',
                                              '&:hover': {
                                                  borderColor: 'primary.main',
                                                  color: 'text.primary',
                                              },
                                          }
                                }
                                variant={active ? 'filled' : 'outlined'}
                            />
                        );
                    })}
                </Box>
            ) : null}

            <Box
                sx={{
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: columnTemplate,
                        gap: 1.5,
                        px: 2,
                        py: 1,
                        // No dedicated "paper2" token exists in this theme (see
                        // src/Theme/themePrimitives.ts): only `background.paper`
                        // and `background.default` are defined. `action.hover` is
                        // semantically reserved for interactive states, so it is
                        // not appropriate for a static header. `background.default`
                        // gives a stable tone distinct from the paper rows below,
                        // closest to the maquette's `--paper2`.
                        backgroundColor: 'background.default',
                    }}
                >
                    <Typography
                        color="text.secondary"
                        variant="overline"
                    >
                        {t('chemistries.list.columns.product')}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        variant="overline"
                    >
                        {t('chemistries.list.columns.manufacturer')}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        variant="overline"
                    >
                        {t('chemistries.list.columns.process')}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        variant="overline"
                    >
                        {t('chemistries.list.columns.type')}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        variant="overline"
                    >
                        {t('chemistries.list.columns.dilutions')}
                    </Typography>
                    <Box />
                </Box>
                {visibleChemistries.map((chemistry) => {
                    const style = getProcessStyle(chemistry.process);
                    return (
                        <Box
                            component={RouterLink}
                            key={chemistry['@id']}
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: columnTemplate,
                                gap: 1.5,
                                alignItems: 'center',
                                px: 2,
                                py: 1.25,
                                borderTop: '1px solid',
                                borderColor: 'divider',
                                textDecoration: 'none',
                                color: 'inherit',
                                // `action.hover` is already a light primary tint
                                // (rgba(15, 118, 109, .08) in light mode, see
                                // themePrimitives.ts), matching the maquette's
                                // `--tint` — no override needed here.
                                '&:hover': { backgroundColor: 'action.hover' },
                            }}
                            to={`/data/chemistries/${chemistry.id ?? ''}`}
                        >
                            <Stack
                                direction="row"
                                spacing={1.25}
                                sx={{ alignItems: 'center' }}
                            >
                                <Box
                                    sx={{
                                        width: 4,
                                        height: 26,
                                        borderRadius: '3px',
                                        flexShrink: 0,
                                        background:
                                            style.gradient !== 'none'
                                                ? style.gradient
                                                : style.color,
                                    }}
                                />
                                {/* The API doesn't expose a short description field on
                                    Chemistry (only `name` and a long-form `description`),
                                    so only the name is shown next to the process bar. */}
                                <Typography sx={{ fontWeight: 600 }}>{chemistry.name}</Typography>
                            </Stack>
                            <Stack
                                direction="row"
                                spacing={0.875}
                                sx={{ alignItems: 'center' }}
                            >
                                <Box
                                    sx={{
                                        width: 12,
                                        height: 12,
                                        borderRadius: '4px',
                                        flexShrink: 0,
                                        backgroundColor:
                                            chemistry.manufacturer.primaryColor ?? 'divider',
                                    }}
                                />
                                <Typography variant="body2">
                                    {chemistry.manufacturer.name}
                                </Typography>
                            </Stack>
                            <Box>
                                <Chip
                                    label={chemistry.process}
                                    size="small"
                                    sx={{
                                        backgroundColor: style.color,
                                        color: style.fg,
                                    }}
                                />
                            </Box>
                            <Typography
                                color="text.secondary"
                                variant="body2"
                            >
                                {chemistry.chemistryType.typeLabel}
                            </Typography>
                            <Stack
                                direction="row"
                                spacing={0.625}
                                sx={{ flexWrap: 'wrap', gap: 0.625 }}
                            >
                                {(chemistry.dilutions ?? []).map((dilution) => (
                                    <Chip
                                        color={dilution.official ? 'primary' : 'default'}
                                        key={dilution.label}
                                        label={dilution.label}
                                        size="small"
                                        sx={{ fontFamily: 'ui-monospace, monospace' }}
                                        variant={dilution.official ? 'filled' : 'outlined'}
                                    />
                                ))}
                            </Stack>
                            <ChevronRightIcon
                                aria-hidden
                                fontSize="small"
                                sx={{
                                    opacity: 0.4,
                                    color: 'text.secondary',
                                    justifySelf: 'center',
                                }}
                            />
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default ChemistryList;
