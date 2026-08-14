import { Box, Chip, CircularProgress, Link, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { usePhotoPaperApi, type PhotoPaperRead } from '~/api/client';
import { getProcessStyle } from '~/domain/processColors';
import type { RouteCrumbHandle } from '~/components/Layout/Parts/AppBar/AppBar';

export const handle: RouteCrumbHandle = {
    crumb: { section: 'photoPapers.list.title', title: 'photoPapers.detail.title' },
};

const PhotoPaperDetail: React.FunctionComponent = () => {
    const { t } = useTranslation();
    const { photoPaperId } = useParams<{ photoPaperId: string }>();
    const { photoPaperApi } = usePhotoPaperApi();

    const [error, setError] = React.useState<unknown>(null);
    const [loaded, setLoaded] = React.useState(false);
    const [photoPaper, setPhotoPaper] = React.useState<PhotoPaperRead | null>(null);

    React.useEffect(() => {
        if (!photoPaperId) {
            return;
        }
        photoPaperApi
            .apiPhotoPapersIdGet({ id: photoPaperId })
            .then((res) => {
                setPhotoPaper(res.data);
                setLoaded(true);
            })
            .catch((err: unknown) => {
                console.error('Error fetching photo paper:', err);
                setError(err);
            });
    }, [photoPaperId, photoPaperApi]);

    if (error) {
        return <Typography color="error">{t('errors.api.loadingData')}</Typography>;
    }
    if (!loaded || !photoPaper) {
        return (
            <CircularProgress
                aria-label={t('app.loading')}
                enableTrackSlot
                size="3rem"
            />
        );
    }

    const style = getProcessStyle(photoPaper.process);
    const surfaceLabel =
        photoPaper.paperSurface === 'other' && photoPaper.paperSurfaceOther
            ? photoPaper.paperSurfaceOther
            : t(`photoPapers.add.fields.paperSurfaceOptions.${photoPaper.paperSurface}`);
    const formats = photoPaper.availableFormats ?? [];

    return (
        <Box>
            <Paper
                sx={{ mb: 3, overflow: 'hidden' }}
                variant="outlined"
            >
                <Box sx={{ height: 7, backgroundColor: style.color }} />
                <Box sx={{ p: 3 }}>
                    <Typography
                        color="text.secondary"
                        sx={{ mb: 0.5 }}
                        variant="caption"
                    >
                        {photoPaper.manufacturer.name}
                    </Typography>
                    <Typography
                        sx={{ mb: 1.5, fontWeight: 600 }}
                        variant="h4"
                    >
                        {photoPaper.name}
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{ flexWrap: 'wrap', gap: 1 }}
                    >
                        <Chip
                            label={photoPaper.process}
                            size="small"
                            sx={{ backgroundColor: style.color, color: style.fg }}
                        />
                        <Chip
                            label={t(
                                `photoPapers.add.fields.paperBaseOptions.${photoPaper.paperBase}`,
                            )}
                            size="small"
                            variant="outlined"
                        />
                        <Chip
                            label={surfaceLabel}
                            size="small"
                            variant="outlined"
                        />
                        <Chip
                            label={
                                photoPaper.variableContrast
                                    ? t('photoPapers.detail.variableContrastOn')
                                    : t('photoPapers.detail.variableContrastOff')
                            }
                            size="small"
                            variant="outlined"
                        />
                        {!photoPaper.variableContrast && photoPaper.grade ? (
                            <Chip
                                label={t('photoPapers.detail.gradeLabel', {
                                    grade: photoPaper.grade,
                                })}
                                size="small"
                                variant="outlined"
                            />
                        ) : null}
                        {photoPaper.officialDocumentationUrl ? (
                            <Link
                                href={photoPaper.officialDocumentationUrl}
                                rel="noopener noreferrer"
                                target="_blank"
                                variant="body2"
                            >
                                {t('photoPapers.detail.officialDoc')}
                            </Link>
                        ) : null}
                    </Stack>
                </Box>
            </Paper>

            <Paper
                sx={{ mb: 3, p: 3 }}
                variant="outlined"
            >
                <Typography
                    sx={{ mb: 1.5 }}
                    variant="subtitle1"
                >
                    {t('photoPapers.detail.formats')}
                </Typography>
                {formats.length === 0 ? (
                    <Typography color="text.secondary">
                        {t('photoPapers.detail.noFormats')}
                    </Typography>
                ) : (
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{ flexWrap: 'wrap', gap: 1 }}
                    >
                        {formats.map((format) => (
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
                <Typography color={photoPaper.description ? 'text.primary' : 'text.secondary'}>
                    {photoPaper.description || t('photoPapers.detail.noDescription')}
                </Typography>
            </Paper>
        </Box>
    );
};

export default PhotoPaperDetail;
