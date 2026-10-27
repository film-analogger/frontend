import AddIcon from '@mui/icons-material/Add';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router';
import { usePhotoPaperApi, type PhotoPaperRead } from '~/api/client';
import { getProcessStyle } from '~/domain/processColors';
import type { RouteCrumbHandle } from '~/components/Layout/Parts/AppBar/AppBar';
import { AddPhotoPaperDialog } from '~/components/dialogs/AddPhotoPaperDialog';
import { PageLoader } from '~/components/Widgets/Loaders/PageLoader';
import { useStepProgress } from '~/components/Widgets/Loaders/useStepProgress';

export const handle: RouteCrumbHandle = {
    crumb: { section: 'components.sidemenu.group.reference', title: 'photoPapers.list.title' },
};

// 5 columns: name, manufacturer, base/surface, process, and a trailing
// 40px slot for the row's chevron affordance.
const columnTemplate = '2fr 1.3fr 1.5fr 1fr 40px';

const PhotoPaperList: React.FunctionComponent = () => {
    const { t } = useTranslation();
    const { photoPaperApi } = usePhotoPaperApi();

    const [error, setError] = React.useState<unknown>(null);
    const [loaded, setLoaded] = React.useState(false);
    const { activeStep, trackStep, setActiveStep } = useStepProgress();
    const [photoPapers, setPhotoPapers] = React.useState<PhotoPaperRead[]>([]);
    const [addOpen, setAddOpen] = React.useState(false);

    const loaderSteps = [
        { title: t('loaders.photoPapers.title'), hint: t('loaders.photoPapers.hint') },
    ];

    React.useEffect(() => {
        trackStep(photoPaperApi.apiPhotoPapersGetCollection())
            .then((res) => {
                setActiveStep(1);
                setPhotoPapers(res.data['hydra:member']);
                setLoaded(true);
            })
            .catch((err: unknown) => {
                console.error('Error fetching photo papers:', err);
                setError(err);
            });
    }, [photoPaperApi, trackStep, setActiveStep]);

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
                        {t('photoPapers.list.title')}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        sx={{ mb: 2 }}
                        variant="body2"
                    >
                        {t('photoPapers.list.count', { count: photoPapers.length })}
                    </Typography>
                </Box>
                <Button
                    onClick={() => {
                        setAddOpen(true);
                    }}
                    startIcon={<AddIcon />}
                    variant="contained"
                >
                    {t('photoPapers.add.trigger')}
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
                        {t('photoPapers.list.columns.name')}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        variant="overline"
                    >
                        {t('photoPapers.list.columns.manufacturer')}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        variant="overline"
                    >
                        {t('photoPapers.list.columns.paper')}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        variant="overline"
                    >
                        {t('photoPapers.list.columns.process')}
                    </Typography>
                    <Box />
                </Box>
                {photoPapers.map((photoPaper) => {
                    const style = getProcessStyle(photoPaper.process);
                    const surfaceLabel =
                        photoPaper.paperSurface === 'other' && photoPaper.paperSurfaceOther
                            ? photoPaper.paperSurfaceOther
                            : t(
                                  `photoPapers.add.fields.paperSurfaceOptions.${photoPaper.paperSurface}`,
                              );
                    return (
                        <Box
                            component={RouterLink}
                            key={photoPaper['@id']}
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
                            to={`/data/photo-papers/${photoPaper.id ?? ''}`}
                        >
                            <Typography sx={{ fontWeight: 600 }}>{photoPaper.name}</Typography>
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
                                            photoPaper.manufacturer.primaryColor ?? 'divider',
                                    }}
                                />
                                <Typography variant="body2">
                                    {photoPaper.manufacturer.name}
                                </Typography>
                            </Stack>
                            <Typography
                                color="text.secondary"
                                variant="body2"
                            >
                                {t(
                                    `photoPapers.add.fields.paperBaseOptions.${photoPaper.paperBase}`,
                                )}{' '}
                                · {surfaceLabel}
                            </Typography>
                            <Box>
                                <Chip
                                    label={photoPaper.process}
                                    size="small"
                                    sx={{ backgroundColor: style.color, color: style.fg }}
                                />
                            </Box>
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

            <AddPhotoPaperDialog
                onClose={() => {
                    setAddOpen(false);
                }}
                onCreated={(photoPaper) => {
                    setPhotoPapers((current) => [photoPaper, ...current]);
                }}
                open={addOpen}
            />
        </Box>
    );
};

export default PhotoPaperList;
