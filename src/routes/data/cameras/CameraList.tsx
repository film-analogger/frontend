import AddIcon from '@mui/icons-material/Add';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router';
import { useCameraApi, type CameraRead } from '~/api/client';
import type { RouteCrumbHandle } from '~/components/Layout/Parts/AppBar/AppBar';
import { AddCameraDialog } from '~/components/dialogs/AddCameraDialog';
import { PageLoader } from '~/components/Widgets/Loaders/PageLoader';
import { useStepProgress } from '~/components/Widgets/Loaders/useStepProgress';

export const handle: RouteCrumbHandle = {
    crumb: { section: 'components.sidemenu.group.reference', title: 'cameras.list.title' },
};

// 4 columns: model, manufacturer, format, and a trailing 40px slot for the
// row's chevron affordance.
const columnTemplate = '2.2fr 1.4fr 1fr 40px';

const CameraList: React.FunctionComponent = () => {
    const { t } = useTranslation();
    const { cameraApi } = useCameraApi();

    const [error, setError] = React.useState<unknown>(null);
    const [loaded, setLoaded] = React.useState(false);
    const { activeStep, trackStep, setActiveStep } = useStepProgress();
    const [cameras, setCameras] = React.useState<CameraRead[]>([]);
    const [addOpen, setAddOpen] = React.useState(false);

    const loaderSteps = [{ title: t('loaders.camera.title'), hint: t('loaders.camera.hint') }];

    React.useEffect(() => {
        trackStep(cameraApi.apiCamerasGetCollection())
            .then((res) => {
                setActiveStep(1);
                setCameras(res.data['hydra:member']);
                setLoaded(true);
            })
            .catch((err: unknown) => {
                console.error('Error fetching cameras:', err);
                setError(err);
            });
    }, [cameraApi, trackStep, setActiveStep]);

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
                        {t('cameras.list.title')}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        sx={{ mb: 2 }}
                        variant="body2"
                    >
                        {t('cameras.list.count', { count: cameras.length })}
                    </Typography>
                </Box>
                <Button
                    onClick={() => {
                        setAddOpen(true);
                    }}
                    startIcon={<AddIcon />}
                    variant="contained"
                >
                    {t('cameras.add.trigger')}
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
                        {t('cameras.list.columns.model')}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        variant="overline"
                    >
                        {t('cameras.list.columns.manufacturer')}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        variant="overline"
                    >
                        {t('cameras.list.columns.filmFormat')}
                    </Typography>
                    <Box />
                </Box>
                {cameras.map((camera) => (
                    <Box
                        component={RouterLink}
                        key={camera['@id']}
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
                        to={`/data/cameras/${camera.id ?? ''}`}
                    >
                        <Typography sx={{ fontWeight: 600 }}>{camera.name}</Typography>
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
                                    backgroundColor: camera.manufacturer.primaryColor ?? 'divider',
                                }}
                            />
                            <Typography variant="body2">{camera.manufacturer.name}</Typography>
                        </Stack>
                        {camera.filmFormat ? (
                            <Box>
                                <Chip
                                    label={camera.filmFormat}
                                    size="small"
                                    variant="outlined"
                                />
                            </Box>
                        ) : (
                            <Box />
                        )}
                        <ChevronRightIcon
                            aria-hidden
                            fontSize="small"
                            sx={{ opacity: 0.4, color: 'text.secondary', justifySelf: 'center' }}
                        />
                    </Box>
                ))}
            </Box>

            <AddCameraDialog
                onClose={() => {
                    setAddOpen(false);
                }}
                onCreated={(camera) => {
                    setCameras((current) => [camera, ...current]);
                }}
                open={addOpen}
            />
        </Box>
    );
};

export default CameraList;
