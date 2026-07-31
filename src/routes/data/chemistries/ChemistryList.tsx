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

const columnTemplate = '2.2fr 1.2fr 1fr 1.3fr 1.5fr';

const ChemistryList: React.FunctionComponent = () => {
    const { t } = useTranslation();
    const { chemistryApi } = useChemistryApi();

    const [error, setError] = React.useState<unknown>(null);
    const [loaded, setLoaded] = React.useState(false);
    const [chemistries, setChemistries] = React.useState<ChemistryRead[]>([]);
    const [processFilter, setProcessFilter] = React.useState<Process | null>(null);

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
                enableTrackSlot
                size="3rem"
            />
        );
    }

    const processCounts = new Map<Process, number>();
    chemistries.forEach((chemistry) => {
        processCounts.set(chemistry.process, (processCounts.get(chemistry.process) ?? 0) + 1);
    });

    const visibleChemistries = processFilter
        ? chemistries.filter((chemistry) => chemistry.process === processFilter)
        : chemistries;

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
                        backgroundColor: 'action.hover',
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
                </Box>
                {visibleChemistries.map((chemistry) => (
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
                            '&:hover': { backgroundColor: 'action.hover' },
                        }}
                        to={`/data/chemistries/${chemistry.id ?? ''}`}
                    >
                        <Box>
                            <Typography sx={{ fontWeight: 600 }}>{chemistry.name}</Typography>
                        </Box>
                        <Typography variant="body2">{chemistry.manufacturer.name}</Typography>
                        <Box>
                            <Chip
                                label={chemistry.process}
                                size="small"
                                sx={{
                                    backgroundColor: getProcessStyle(chemistry.process).color,
                                    color: getProcessStyle(chemistry.process).fg,
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
                            spacing={0.5}
                            sx={{ flexWrap: 'wrap', gap: 0.5 }}
                        >
                            {(chemistry.dilutions ?? []).map((dilution) => (
                                <Chip
                                    key={dilution.label}
                                    label={dilution.label}
                                    size="small"
                                    sx={{ fontFamily: 'ui-monospace, monospace' }}
                                    variant={dilution.official ? 'filled' : 'outlined'}
                                />
                            ))}
                        </Stack>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default ChemistryList;
