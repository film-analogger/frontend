import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, IconButton, MenuItem, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type {
    ExposureWritePrintGradeEnum,
    ExposureWritePrintKindEnum,
} from '~/api/filmAnaloggerApi';
import { effectiveSeconds } from '~/domain/exposureMath';
import type { WizardExposure } from './types';

const kinds: ExposureWritePrintKindEnum[] = ['base', 'burn', 'dodge'];
const grades: ExposureWritePrintGradeEnum[] = [
    'no_filter',
    '00',
    '0',
    '0.5',
    '1',
    '1.5',
    '2',
    '2.5',
    '3',
    '3.5',
    '4',
    '4.5',
    '5',
];

export const ExposureRow: React.FunctionComponent<{
    readonly exposure: WizardExposure;
    readonly onChange: (patch: Partial<WizardExposure>) => void;
    readonly onRemove: () => void;
    readonly removable: boolean;
}> = ({ exposure, onChange, onRemove, removable }) => {
    const { t } = useTranslation();

    const preview = effectiveSeconds(
        Number(exposure.baseSeconds) || 0,
        Number(exposure.stopOffsetNumerator) || 0,
        Number(exposure.stopOffsetDenominator) || 1,
    );

    return (
        <Grid
            container
            spacing={1.5}
            sx={{ alignItems: 'center' }}
        >
            <Grid size={{ xs: 6, sm: 2 }}>
                <TextField
                    fullWidth
                    label={t('sessions.wizard.fields.exposureKind')}
                    onChange={(e) => {
                        onChange({ kind: e.target.value as ExposureWritePrintKindEnum });
                    }}
                    select
                    value={exposure.kind}
                >
                    {kinds.map((kind) => (
                        <MenuItem
                            key={kind}
                            value={kind}
                        >
                            {t(`sessions.detail.exposureKind.${kind}`)}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid size={{ xs: 6, sm: 2 }}>
                <TextField
                    fullWidth
                    label={t('sessions.wizard.fields.baseSeconds')}
                    onChange={(e) => {
                        onChange({ baseSeconds: e.target.value });
                    }}
                    type="number"
                    value={exposure.baseSeconds}
                />
            </Grid>
            <Grid size={{ xs: 6, sm: 1.5 }}>
                <TextField
                    fullWidth
                    label={t('sessions.wizard.fields.stopNumerator')}
                    onChange={(e) => {
                        onChange({ stopOffsetNumerator: e.target.value });
                    }}
                    type="number"
                    value={exposure.stopOffsetNumerator}
                />
            </Grid>
            <Grid size={{ xs: 6, sm: 1.5 }}>
                <TextField
                    fullWidth
                    label={t('sessions.wizard.fields.stopDenominator')}
                    onChange={(e) => {
                        onChange({ stopOffsetDenominator: e.target.value });
                    }}
                    type="number"
                    value={exposure.stopOffsetDenominator}
                />
            </Grid>
            <Grid size={{ xs: 6, sm: 1.5 }}>
                <TextField
                    fullWidth
                    label={t('sessions.wizard.fields.grade')}
                    onChange={(e) => {
                        onChange({ grade: e.target.value as ExposureWritePrintGradeEnum });
                    }}
                    select
                    value={exposure.grade}
                >
                    {grades.map((grade) => (
                        <MenuItem
                            key={grade}
                            value={grade}
                        >
                            {grade}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid size={{ xs: 6, sm: 2 }}>
                <TextField
                    fullWidth
                    label={t('sessions.wizard.fields.observation')}
                    onChange={(e) => {
                        onChange({ observation: e.target.value });
                    }}
                    value={exposure.observation}
                />
            </Grid>
            <Grid size={{ xs: 6, sm: 1.5 }}>
                <Stack
                    direction="row"
                    sx={{ alignItems: 'center', gap: 0.5 }}
                >
                    <Typography
                        color="secondary"
                        sx={{ fontFamily: 'ui-monospace, monospace', fontWeight: 600 }}
                        variant="body2"
                    >
                        {t('sessions.wizard.effectivePreview', {
                            seconds: preview.toFixed(1),
                        })}
                    </Typography>
                    <IconButton
                        aria-label={t('sessions.wizard.removeExposure')}
                        disabled={!removable}
                        onClick={onRemove}
                        size="small"
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Stack>
            </Grid>
        </Grid>
    );
};
