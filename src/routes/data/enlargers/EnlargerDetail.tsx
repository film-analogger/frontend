import { Box, Chip, CircularProgress, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { useEnlargerApi, type EnlargerRead } from '~/api/client';
import type { RouteCrumbHandle } from '~/components/Layout/Parts/AppBar/AppBar';

export const handle: RouteCrumbHandle = {
    crumb: { section: 'enlargers.list.title', title: 'enlargers.detail.title' },
};

const EnlargerDetail: React.FunctionComponent = () => {
    const { t } = useTranslation();
    const { enlargerId } = useParams<{ enlargerId: string }>();
    const { enlargerApi } = useEnlargerApi();

    const [error, setError] = React.useState<unknown>(null);
    const [loaded, setLoaded] = React.useState(false);
    const [enlarger, setEnlarger] = React.useState<EnlargerRead | null>(null);

    React.useEffect(() => {
        if (!enlargerId) {
            return;
        }
        enlargerApi
            .apiEnlargersIdGet({ id: enlargerId })
            .then((res) => {
                setEnlarger(res.data);
                setLoaded(true);
            })
            .catch((err: unknown) => {
                console.error('Error fetching enlarger:', err);
                setError(err);
            });
    }, [enlargerId, enlargerApi]);

    if (error) {
        return <Typography color="error">{t('errors.api.loadingData')}</Typography>;
    }
    if (!loaded || !enlarger) {
        return (
            <CircularProgress
                aria-label={t('app.loading')}
                enableTrackSlot
                size="3rem"
            />
        );
    }

    const negativeFormats = enlarger.negativeFormats ?? [];

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
                    {enlarger.manufacturer.name}
                </Typography>
                <Typography
                    sx={{ mb: 1.5, fontWeight: 600 }}
                    variant="h4"
                >
                    {enlarger.name}
                </Typography>
                {enlarger.lightSource ? (
                    <Chip
                        label={t(`enlargers.add.fields.lightSourceOptions.${enlarger.lightSource}`)}
                        size="small"
                    />
                ) : null}
            </Paper>

            <Paper
                sx={{ mb: 3, p: 3 }}
                variant="outlined"
            >
                <Typography
                    sx={{ mb: 1.5 }}
                    variant="subtitle1"
                >
                    {t('enlargers.detail.formats')}
                </Typography>
                {negativeFormats.length === 0 ? (
                    <Typography color="text.secondary">
                        {t('enlargers.detail.noFormats')}
                    </Typography>
                ) : (
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{ flexWrap: 'wrap', gap: 1 }}
                    >
                        {negativeFormats.map((format) => (
                            <Chip
                                key={format}
                                label={format}
                                sx={{ fontFamily: 'ui-monospace, monospace' }}
                                variant="outlined"
                            />
                        ))}
                    </Stack>
                )}
            </Paper>

            <Paper
                sx={{ p: 3 }}
                variant="outlined"
            >
                <Typography color={enlarger.description ? 'text.primary' : 'text.secondary'}>
                    {enlarger.description || t('enlargers.detail.noDescription')}
                </Typography>
            </Paper>
        </Box>
    );
};

export default EnlargerDetail;
