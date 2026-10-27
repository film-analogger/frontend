import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Grid, IconButton, MenuItem, Paper, Stack, TextField } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { ChemistryRead } from '~/api/client';
import { AddChemistryDialog } from '~/components/dialogs/AddChemistryDialog';
import { InlineAddButton } from '~/components/dialogs/InlineAddButton';
import { createBath, type WizardBath } from './types';

export const ChemicalChainStep: React.FunctionComponent<{
    readonly baths: WizardBath[];
    readonly chemistries: ChemistryRead[];
    readonly onChange: (baths: WizardBath[]) => void;
    readonly onChemistryCreated: (chemistry: ChemistryRead) => void;
}> = ({ baths, chemistries, onChange, onChemistryCreated }) => {
    const { t } = useTranslation();
    const [addChemistryFor, setAddChemistryFor] = React.useState<string | null>(null);

    const updateBath = (key: string, patch: Partial<WizardBath>) => {
        onChange(baths.map((bath) => (bath.key === key ? { ...bath, ...patch } : bath)));
    };

    return (
        <React.Fragment>
            <Stack spacing={1.5}>
                {baths.map((bath) => (
                    <Paper
                        key={bath.key}
                        sx={{ p: 2 }}
                        variant="outlined"
                    >
                        <Grid
                            container
                            spacing={1.5}
                            sx={{ alignItems: 'center' }}
                        >
                            <Grid size={{ xs: 12, sm: 5 }}>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                >
                                    <TextField
                                        fullWidth
                                        label={t('sessions.wizard.fields.chemistry')}
                                        onChange={(e) => {
                                            updateBath(bath.key, { chemistryId: e.target.value });
                                        }}
                                        select
                                        value={bath.chemistryId}
                                    >
                                        {chemistries.map((chemistry) => (
                                            <MenuItem
                                                key={chemistry.id}
                                                value={chemistry.id}
                                            >
                                                {chemistry.name} · {chemistry.manufacturer.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <InlineAddButton
                                        ariaLabel={t('chemistries.add.trigger')}
                                        onClick={() => {
                                            setAddChemistryFor(bath.key);
                                        }}
                                    />
                                </Stack>
                            </Grid>
                            <Grid size={{ xs: 6, sm: 3 }}>
                                <TextField
                                    fullWidth
                                    label={t('sessions.wizard.fields.dilutionOverride')}
                                    onChange={(e) => {
                                        updateBath(bath.key, { dilutionOverride: e.target.value });
                                    }}
                                    placeholder="1+9"
                                    value={bath.dilutionOverride}
                                />
                            </Grid>
                            <Grid size={{ xs: 6, sm: 3 }}>
                                <TextField
                                    fullWidth
                                    label={t('sessions.wizard.fields.durationSeconds')}
                                    onChange={(e) => {
                                        updateBath(bath.key, { durationSeconds: e.target.value });
                                    }}
                                    type="number"
                                    value={bath.durationSeconds}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 1 }}>
                                <IconButton
                                    aria-label={t('sessions.wizard.removeBath')}
                                    disabled={baths.length <= 1}
                                    onClick={() => {
                                        onChange(baths.filter((b) => b.key !== bath.key));
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
                <Button
                    onClick={() => {
                        onChange([...baths, createBath()]);
                    }}
                    startIcon={<AddIcon />}
                    sx={{ alignSelf: 'flex-start' }}
                    variant="outlined"
                >
                    {t('sessions.wizard.addBath')}
                </Button>
            </Stack>
            <AddChemistryDialog
                onClose={() => {
                    setAddChemistryFor(null);
                }}
                onCreated={(chemistry) => {
                    onChemistryCreated(chemistry);
                    if (addChemistryFor) {
                        updateBath(addChemistryFor, { chemistryId: chemistry.id ?? '' });
                    }
                }}
                open={addChemistryFor !== null}
            />
        </React.Fragment>
    );
};
