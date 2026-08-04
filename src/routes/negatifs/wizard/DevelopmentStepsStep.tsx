import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Grid, IconButton, MenuItem, Paper, Stack, TextField } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { ChemistryRead } from '~/api/client';
import { createStep, type WizardStep } from './types';

export const DevelopmentStepsStep: React.FunctionComponent<{
    readonly steps: WizardStep[];
    readonly chemistries: ChemistryRead[];
    readonly onChange: (steps: WizardStep[]) => void;
}> = ({ steps, chemistries, onChange }) => {
    const { t } = useTranslation();

    const updateStep = (key: string, patch: Partial<WizardStep>) => {
        onChange(steps.map((step) => (step.key === key ? { ...step, ...patch } : step)));
    };

    return (
        <Stack spacing={1.5}>
            {steps.map((step, index) => (
                <Paper
                    key={step.key}
                    sx={{ p: 2 }}
                    variant="outlined"
                >
                    <Grid
                        container
                        spacing={1.5}
                        sx={{ alignItems: 'center' }}
                    >
                        <Grid size={{ xs: 12, sm: 1 }}>
                            <TextField
                                disabled
                                fullWidth
                                label={t('negatifs.wizard.fields.stepNumber')}
                                value={index + 1}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 3 }}>
                            <TextField
                                fullWidth
                                label={t('negatifs.wizard.fields.chemistry')}
                                onChange={(e) => {
                                    updateStep(step.key, { chemistryId: e.target.value });
                                }}
                                select
                                value={step.chemistryId}
                            >
                                <MenuItem value="">
                                    {t('negatifs.wizard.fields.noChemistry')}
                                </MenuItem>
                                {chemistries.map((chemistry) => (
                                    <MenuItem
                                        key={chemistry.id}
                                        value={chemistry.id}
                                    >
                                        {chemistry.name} · {chemistry.manufacturer.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 6, sm: 1.25 }}>
                            <TextField
                                fullWidth
                                label={t('negatifs.wizard.fields.chemistryParts')}
                                onChange={(e) => {
                                    updateStep(step.key, { chemistryParts: e.target.value });
                                }}
                                type="number"
                                value={step.chemistryParts}
                            />
                        </Grid>
                        <Grid size={{ xs: 6, sm: 1.25 }}>
                            <TextField
                                fullWidth
                                label={t('negatifs.wizard.fields.waterParts')}
                                onChange={(e) => {
                                    updateStep(step.key, { waterParts: e.target.value });
                                }}
                                type="number"
                                value={step.waterParts}
                            />
                        </Grid>
                        <Grid size={{ xs: 6, sm: 1.75 }}>
                            <TextField
                                fullWidth
                                label={t('negatifs.wizard.fields.temperature')}
                                onChange={(e) => {
                                    updateStep(step.key, { temperature: e.target.value });
                                }}
                                type="number"
                                value={step.temperature}
                            />
                        </Grid>
                        <Grid size={{ xs: 6, sm: 1.75 }}>
                            <TextField
                                fullWidth
                                label={t('negatifs.wizard.fields.durationSeconds')}
                                onChange={(e) => {
                                    updateStep(step.key, { durationSeconds: e.target.value });
                                }}
                                type="number"
                                value={step.durationSeconds}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 1 }}>
                            <IconButton
                                aria-label={t('negatifs.wizard.removeStep')}
                                disabled={steps.length <= 1}
                                onClick={() => {
                                    onChange(steps.filter((s) => s.key !== step.key));
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                fullWidth
                                label={t('negatifs.wizard.fields.agitationNote')}
                                onChange={(e) => {
                                    updateStep(step.key, { agitationNote: e.target.value });
                                }}
                                value={step.agitationNote}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            ))}
            <Button
                onClick={() => {
                    onChange([...steps, createStep()]);
                }}
                startIcon={<AddIcon />}
                sx={{ alignSelf: 'flex-start' }}
                variant="outlined"
            >
                {t('negatifs.wizard.addStep')}
            </Button>
        </Stack>
    );
};
