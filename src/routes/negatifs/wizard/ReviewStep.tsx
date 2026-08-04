import { Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { CameraRead, FilmRead } from '~/api/client';
import type { WizardState } from './types';

export const ReviewStep: React.FunctionComponent<{
    readonly state: WizardState;
    readonly films: FilmRead[];
    readonly cameras: CameraRead[];
    readonly onChange: (patch: Partial<WizardState>) => void;
}> = ({ state, films, cameras, onChange }) => {
    const { t } = useTranslation();

    const filmName = films.find((film) => film.id === state.filmId)?.name ?? '—';
    const cameraName = cameras.find((camera) => camera.id === state.cameraId)?.name ?? '—';
    const totalDurationSeconds = state.steps.reduce(
        (sum, step) => sum + (Number(step.durationSeconds) || 0),
        0,
    );

    const rows: { k: string; v: string }[] = [
        { k: t('negatifs.wizard.review.film'), v: `${filmName} · ${cameraName}` },
        { k: t('negatifs.wizard.review.developedAt'), v: state.developedAt },
        { k: t('negatifs.wizard.review.process'), v: state.process || '—' },
        {
            k: t('negatifs.wizard.review.steps'),
            v: t('negatifs.wizard.review.stepsCount', { count: state.steps.length }),
        },
        {
            k: t('negatifs.wizard.review.totalDuration'),
            v: t('negatifs.wizard.review.totalDurationValue', { seconds: totalDurationSeconds }),
        },
        {
            k: t('negatifs.wizard.review.rating'),
            v: t('negatifs.wizard.review.ratingValue', { rating: state.rating }),
        },
    ];

    return (
        <Grid
            container
            spacing={2}
        >
            <Grid size={{ xs: 12, sm: 6 }}>
                <Paper
                    sx={{ p: 2.5 }}
                    variant="outlined"
                >
                    <Stack spacing={1.25}>
                        {rows.map((row) => (
                            <Stack
                                direction="row"
                                key={row.k}
                                sx={{ justifyContent: 'space-between' }}
                            >
                                <Typography color="text.secondary">{row.k}</Typography>
                                <Typography sx={{ fontWeight: 600 }}>{row.v}</Typography>
                            </Stack>
                        ))}
                    </Stack>
                </Paper>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                    fullWidth
                    label={t('negatifs.wizard.fields.developmentNotes')}
                    minRows={6}
                    multiline
                    onChange={(e) => {
                        onChange({ developmentNotes: e.target.value });
                    }}
                    value={state.developmentNotes}
                />
            </Grid>
        </Grid>
    );
};
