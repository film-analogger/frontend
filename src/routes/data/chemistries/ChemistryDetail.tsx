import { Box, Chip, CircularProgress, Grid, Link, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { useChemistryApi, type ChemistryRead, type DilutionRead } from '~/api/client';
import { getProcessStyle } from '~/domain/processColors';
import type { RouteCrumbHandle } from '~/components/Layout/Parts/AppBar/AppBar';

export const handle: RouteCrumbHandle = {
    crumb: { section: 'chemistries.list.title', title: 'chemistries.detail.title' },
};

const dilutionRatio = (dilution: DilutionRead) => {
    const total = dilution.chemistryParts + dilution.waterParts;
    if (total === 0) {
        return 100;
    }
    return Math.max(6, Math.round((dilution.chemistryParts / total) * 100));
};

const ChemistryDetail: React.FunctionComponent = () => {
    const { t } = useTranslation();
    const { chemistryId } = useParams<{ chemistryId: string }>();
    const { chemistryApi } = useChemistryApi();

    const [error, setError] = React.useState<unknown>(null);
    const [loaded, setLoaded] = React.useState(false);
    const [chemistry, setChemistry] = React.useState<ChemistryRead | null>(null);

    React.useEffect(() => {
        if (!chemistryId) {
            return;
        }
        chemistryApi
            .apiChemistriesIdGet({ id: chemistryId })
            .then((res) => {
                setChemistry(res.data);
                setLoaded(true);
            })
            .catch((err: unknown) => {
                console.error('Error fetching chemistry:', err);
                setError(err);
            });
    }, [chemistryId, chemistryApi]);

    if (error) {
        return <Typography color="error">{t('errors.api.loadingData')}</Typography>;
    }
    if (!loaded || !chemistry) {
        return (
            <CircularProgress
                aria-label={t('app.loading')}
                enableTrackSlot
                size="3rem"
            />
        );
    }

    const style = getProcessStyle(chemistry.process);

    return (
        <Box>
            <Paper
                sx={{ mb: 3, overflow: 'hidden' }}
                variant="outlined"
            >
                <Box
                    sx={{
                        height: 7,
                        background: style.gradient !== 'none' ? style.gradient : style.color,
                    }}
                />
                <Box sx={{ p: 3 }}>
                    <Typography
                        color="text.secondary"
                        sx={{ mb: 0.5 }}
                        variant="caption"
                    >
                        {chemistry.manufacturer.name} · {chemistry.chemistryType.typeLabel}
                    </Typography>
                    <Typography
                        sx={{ mb: 1.5, fontWeight: 600 }}
                        variant="h4"
                    >
                        {chemistry.name}
                    </Typography>
                    {chemistry.description ? (
                        <Typography
                            color="text.secondary"
                            sx={{ mb: 2, maxWidth: '64ch' }}
                        >
                            {chemistry.description}
                        </Typography>
                    ) : null}
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{ flexWrap: 'wrap', gap: 1 }}
                    >
                        <Chip
                            label={chemistry.process}
                            size="small"
                            sx={{ backgroundColor: style.color, color: style.fg }}
                        />
                        <Chip
                            label={chemistry.chemistryType.typeCode}
                            size="small"
                            variant="outlined"
                        />
                        {chemistry.officialDocumentationUrl ? (
                            <Link
                                href={chemistry.officialDocumentationUrl}
                                rel="noopener noreferrer"
                                target="_blank"
                                variant="body2"
                            >
                                {t('chemistries.detail.officialDoc')}
                            </Link>
                        ) : null}
                    </Stack>
                </Box>
            </Paper>

            <Paper
                sx={{ p: 3 }}
                variant="outlined"
            >
                <Typography
                    sx={{ mb: 2 }}
                    variant="subtitle1"
                >
                    {t('chemistries.detail.dilutions')}
                </Typography>
                {(chemistry.dilutions ?? []).length === 0 ? (
                    <Typography color="text.secondary">
                        {t('chemistries.detail.noDilutions')}
                    </Typography>
                ) : (
                    <Grid
                        container
                        spacing={2}
                    >
                        {(chemistry.dilutions ?? []).map((dilution) => (
                            <Grid
                                key={dilution.label}
                                size={{ xs: 12, sm: 6, md: 4 }}
                            >
                                <Paper
                                    sx={{
                                        p: 2,
                                        borderColor: dilution.official ? 'primary.main' : 'divider',
                                    }}
                                    variant="outlined"
                                >
                                    <Stack
                                        direction="row"
                                        sx={{ alignItems: 'center', mb: 1.5 }}
                                    >
                                        <Typography
                                            sx={{
                                                flex: 1,
                                                fontFamily: 'ui-monospace, monospace',
                                                fontWeight: 700,
                                                fontSize: '1.4rem',
                                            }}
                                        >
                                            {dilution.label}
                                        </Typography>
                                        {dilution.official ? (
                                            <Chip
                                                color="primary"
                                                label={t('chemistries.detail.official')}
                                                size="small"
                                            />
                                        ) : null}
                                    </Stack>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            height: 10,
                                            borderRadius: 1,
                                            overflow: 'hidden',
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            mb: 1,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: `${String(dilutionRatio(dilution))}%`,
                                                backgroundColor: 'secondary.main',
                                            }}
                                        />
                                        <Box sx={{ flex: 1, backgroundColor: 'action.hover' }} />
                                    </Box>
                                    <Stack
                                        direction="row"
                                        sx={{ justifyContent: 'space-between' }}
                                    >
                                        <Typography
                                            color="text.secondary"
                                            variant="caption"
                                        >
                                            {t('chemistries.detail.chemistryParts', {
                                                count: dilution.chemistryParts,
                                            })}
                                        </Typography>
                                        <Typography
                                            color="text.secondary"
                                            variant="caption"
                                        >
                                            {t('chemistries.detail.waterParts', {
                                                count: dilution.waterParts,
                                            })}
                                        </Typography>
                                    </Stack>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Paper>
        </Box>
    );
};

export default ChemistryDetail;
