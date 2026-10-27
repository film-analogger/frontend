import { Box, Chip, CircularProgress, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { useCameraApi, type CameraRead } from '~/api/client';
import type { RouteCrumbHandle } from '~/components/Layout/Parts/AppBar/AppBar';

export const handle: RouteCrumbHandle = {
    crumb: { section: 'cameras.list.title', title: 'cameras.detail.title' },
};

const CameraDetail: React.FunctionComponent = () => {
    const { t } = useTranslation();
    const { cameraId } = useParams<{ cameraId: string }>();
    const { cameraApi } = useCameraApi();

    const [error, setError] = React.useState<unknown>(null);
    const [loaded, setLoaded] = React.useState(false);
    const [camera, setCamera] = React.useState<CameraRead | null>(null);

    React.useEffect(() => {
        if (!cameraId) {
            return;
        }
        cameraApi
            .apiCamerasIdGet({ id: cameraId })
            .then((res) => {
                setCamera(res.data);
                setLoaded(true);
            })
            .catch((err: unknown) => {
                console.error('Error fetching camera:', err);
                setError(err);
            });
    }, [cameraId, cameraApi]);

    if (error) {
        return <Typography color="error">{t('errors.api.loadingData')}</Typography>;
    }
    if (!loaded || !camera) {
        return (
            <CircularProgress
                aria-label={t('app.loading')}
                enableTrackSlot
                size="3rem"
            />
        );
    }

    return (
        <Box>
            <Paper
                sx={{ mb: 3, p: 3 }}
                variant="outlined"
            >
                <Typography
                    color="text.secondary"
                    sx={{ mb: 0.5 }}
                    variant="caption"
                >
                    {camera.manufacturer.name}
                </Typography>
                <Typography
                    sx={{ mb: 1.5, fontWeight: 600 }}
                    variant="h4"
                >
                    {camera.name}
                </Typography>
                {camera.filmFormat ? (
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{ flexWrap: 'wrap', gap: 1 }}
                    >
                        <Chip
                            label={t('cameras.detail.filmFormatLabel', {
                                format: camera.filmFormat,
                            })}
                            size="small"
                        />
                    </Stack>
                ) : null}
            </Paper>

            <Paper
                sx={{ p: 3 }}
                variant="outlined"
            >
                <Typography color={camera.description ? 'text.primary' : 'text.secondary'}>
                    {camera.description || t('cameras.detail.noDescription')}
                </Typography>
            </Paper>
        </Box>
    );
};

export default CameraDetail;
