import { Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { WizardState } from './types';

export const ReviewStep: React.FunctionComponent<{
    readonly state: WizardState;
    readonly onChange: (patch: Partial<WizardState>) => void;
}> = ({ state, onChange }) => {
    const { t } = useTranslation();

    const totalExposures = state.prints.reduce((sum, p) => sum + p.exposures.length, 0);

    const rows: { k: string; v: string }[] = [
        { k: t('sessions.wizard.review.session'), v: `${state.date} · ${state.lab}` },
        { k: t('sessions.wizard.review.enlarger'), v: state.enlarger || '—' },
        {
            k: t('sessions.wizard.review.baths'),
            v: t('sessions.wizard.review.bathsCount', { count: state.baths.length }),
        },
        {
            k: t('sessions.wizard.review.prints'),
            v: t('sessions.wizard.review.printsCount', { count: state.prints.length }),
        },
        {
            k: t('sessions.wizard.review.exposures'),
            v: t('sessions.wizard.review.exposuresCount', { count: totalExposures }),
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
                    label={t('sessions.wizard.fields.sessionNotes')}
                    minRows={6}
                    multiline
                    onChange={(e) => {
                        onChange({ notes: e.target.value });
                    }}
                    value={state.notes}
                />
            </Grid>
        </Grid>
    );
};
