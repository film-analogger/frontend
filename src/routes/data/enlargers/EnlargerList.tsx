import AddIcon from '@mui/icons-material/Add';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router';
import { useEnlargerApi, type EnlargerRead } from '~/api/client';
import type { RouteCrumbHandle } from '~/components/Layout/Parts/AppBar/AppBar';
import { AddEnlargerDialog } from '~/components/dialogs/AddEnlargerDialog';
import { PageLoader } from '~/components/Widgets/Loaders/PageLoader';
import { useStepProgress } from '~/components/Widgets/Loaders/useStepProgress';

export const handle: RouteCrumbHandle = {
    crumb: { section: 'components.sidemenu.group.reference', title: 'enlargers.list.title' },
};

// 5 columns: model, manufacturer, light source, negative formats, and a
// trailing 40px slot for the row's chevron affordance.
const columnTemplate = '2fr 1.3fr 1.2fr 1.5fr 40px';

const EnlargerList: React.FunctionComponent = () => {
    const { t } = useTranslation();
    const { enlargerApi } = useEnlargerApi();

    const [error, setError] = React.useState<unknown>(null);
    const [loaded, setLoaded] = React.useState(false);
    const { activeStep, trackStep, setActiveStep } = useStepProgress();
    const [enlargers, setEnlargers] = React.useState<EnlargerRead[]>([]);
    const [addOpen, setAddOpen] = React.useState(false);

    const loaderSteps = [{ title: t('loaders.enlarger.title'), hint: t('loaders.enlarger.hint') }];

    React.useEffect(() => {
        trackStep(enlargerApi.apiEnlargersGetCollection())
            .then((res) => {
                setActiveStep(1);
                setEnlargers(res.data['hydra:member']);
                setLoaded(true);
            })
            .catch((err: unknown) => {
                console.error('Error fetching enlargers:', err);
                setError(err);
            });
    }, [enlargerApi, trackStep, setActiveStep]);

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

    return (
        <Box>
            <Stack
                direction="row"
                sx={{ alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}
            >
                <Box>
                    <Typography
                        sx={{ mb: 0.5 }}
                        variant="h1"
                    >
                        {t('enlargers.list.title')}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        sx={{ mb: 2 }}
                        variant="body2"
                    >
                        {t('enlargers.list.count', { count: enlargers.length })}
                    </Typography>
                </Box>
                <Button
                    onClick={() => {
                        setAddOpen(true);
                    }}
                    startIcon={<AddIcon />}
                    variant="contained"
                >
                    {t('enlargers.add.trigger')}
                </Button>
            </Stack>

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
                        backgroundColor: 'background.default',
                    }}
                >
                    <Typography
                        color="text.secondary"
                        variant="overline"
                    >
                        {t('enlargers.list.columns.model')}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        variant="overline"
                    >
                        {t('enlargers.list.columns.manufacturer')}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        variant="overline"
                    >
                        {t('enlargers.list.columns.lightSource')}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        variant="overline"
                    >
                        {t('enlargers.list.columns.formats')}
                    </Typography>
                    <Box />
                </Box>
                {enlargers.map((enlarger) => (
                    <Box
                        component={RouterLink}
                        key={enlarger['@id']}
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
                        to={`/data/enlargers/${enlarger.id ?? ''}`}
                    >
                        <Typography sx={{ fontWeight: 600 }}>{enlarger.name}</Typography>
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
                                        enlarger.manufacturer.primaryColor ?? 'divider',
                                }}
                            />
                            <Typography variant="body2">{enlarger.manufacturer.name}</Typography>
                        </Stack>
                        <Typography
                            color="text.secondary"
                            variant="body2"
                        >
                            {enlarger.lightSource
                                ? t(
                                      `enlargers.add.fields.lightSourceOptions.${enlarger.lightSource}`,
                                  )
                                : '—'}
                        </Typography>
                        <Stack
                            direction="row"
                            spacing={0.625}
                            sx={{ flexWrap: 'wrap', gap: 0.625 }}
                        >
                            {(enlarger.negativeFormats ?? []).map((format) => (
                                <Chip
                                    key={format}
                                    label={format}
                                    size="small"
                                    sx={{ fontFamily: 'ui-monospace, monospace' }}
                                    variant="outlined"
                                />
                            ))}
                        </Stack>
                        <ChevronRightIcon
                            aria-hidden
                            fontSize="small"
                            sx={{ opacity: 0.4, color: 'text.secondary', justifySelf: 'center' }}
                        />
                    </Box>
                ))}
            </Box>

            <AddEnlargerDialog
                onClose={() => {
                    setAddOpen(false);
                }}
                onCreated={(enlarger) => {
                    setEnlargers((current) => [enlarger, ...current]);
                }}
                open={addOpen}
            />
        </Box>
    );
};

export default EnlargerList;
