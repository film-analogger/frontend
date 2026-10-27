import { Grid, MenuItem, TextField } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { EnlargerRead } from '~/api/client';
import type { WizardState } from './types';

export const SessionContextStep: React.FunctionComponent<{
    readonly state: WizardState;
    readonly enlargers: EnlargerRead[];
    readonly onChange: (patch: Partial<WizardState>) => void;
}> = ({ state, enlargers, onChange }) => {
    const { t } = useTranslation();

    return (
        <Grid
            container
            spacing={2}
        >
            <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                    fullWidth
                    label={t('sessions.wizard.fields.date')}
                    onChange={(e) => {
                        onChange({ date: e.target.value });
                    }}
                    slotProps={{ inputLabel: { shrink: true } }}
                    type="date"
                    value={state.date}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                    fullWidth
                    label={t('sessions.wizard.fields.number')}
                    onChange={(e) => {
                        onChange({ number: e.target.value });
                    }}
                    type="number"
                    value={state.number}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                    fullWidth
                    label={t('sessions.wizard.fields.lab')}
                    onChange={(e) => {
                        onChange({ lab: e.target.value });
                    }}
                    value={state.lab}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                    fullWidth
                    label={t('sessions.wizard.fields.enlarger')}
                    onChange={(e) => {
                        onChange({ enlargerId: e.target.value });
                    }}
                    select
                    value={state.enlargerId}
                >
                    {enlargers.map((enlarger) => (
                        <MenuItem
                            key={enlarger.id}
                            value={enlarger.id}
                        >
                            {enlarger.name} · {enlarger.manufacturer.name}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                    fullWidth
                    label={t('sessions.wizard.fields.temperature')}
                    onChange={(e) => {
                        onChange({ temperatureCelsius: e.target.value });
                    }}
                    type="number"
                    value={state.temperatureCelsius}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                    fullWidth
                    label={t('sessions.wizard.fields.wash')}
                    onChange={(e) => {
                        onChange({ wash: e.target.value });
                    }}
                    value={state.wash}
                />
            </Grid>
        </Grid>
    );
};
