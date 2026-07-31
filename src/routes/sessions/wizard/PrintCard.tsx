import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Box,
    Button,
    Divider,
    Grid,
    IconButton,
    MenuItem,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type {
    PrintWritePrintFocalLengthEnum,
    PrintWritePrintNegativeFormatEnum,
    PrintWritePrintPaperBaseEnum,
    PrintWritePrintPaperBrandEnum,
    PrintWritePrintPaperSurfaceEnum,
} from '~/api/filmAnaloggerApi';
import { ExposureRow } from './ExposureRow';
import { createExposure, type WizardPrint } from './types';

const negativeFormats: PrintWritePrintNegativeFormatEnum[] = ['24x36', '6x45', '6x6', '6x7', '6x9'];
const focalLengths: PrintWritePrintFocalLengthEnum[] = [50, 75, 80, 90, 100, 105];
const paperBrands: PrintWritePrintPaperBrandEnum[] = ['ilford', 'foma', 'bergger', 'other'];
const paperBases: PrintWritePrintPaperBaseEnum[] = ['rc', 'fb'];
const paperSurfaces: PrintWritePrintPaperSurfaceEnum[] = [
    'glossy',
    'satin',
    'pearl',
    'matt',
    'other',
];

export const PrintCard: React.FunctionComponent<{
    readonly index: number;
    readonly print: WizardPrint;
    readonly onChange: (patch: Partial<WizardPrint>) => void;
    readonly onRemove: () => void;
    readonly removable: boolean;
}> = ({ index, print, onChange, onRemove, removable }) => {
    const { t } = useTranslation();

    const updateExposure = (key: string, patch: Partial<WizardPrint['exposures'][number]>) => {
        onChange({
            exposures: print.exposures.map((exposure) =>
                exposure.key === key ? { ...exposure, ...patch } : exposure,
            ),
        });
    };

    return (
        <Paper
            sx={{ p: 2.5 }}
            variant="outlined"
        >
            <Stack
                direction="row"
                sx={{ alignItems: 'center', mb: 2 }}
            >
                <Typography
                    sx={{ flex: 1, fontWeight: 600 }}
                    variant="subtitle1"
                >
                    {t('sessions.wizard.printTitle', { number: index + 1 })}
                </Typography>
                <IconButton
                    aria-label={t('sessions.wizard.removePrint')}
                    disabled={!removable}
                    onClick={onRemove}
                >
                    <DeleteIcon />
                </IconButton>
            </Stack>

            <Grid
                container
                spacing={1.5}
                sx={{ mb: 2 }}
            >
                <Grid size={{ xs: 6, sm: 3 }}>
                    <TextField
                        fullWidth
                        label={t('sessions.wizard.fields.negativeNumber')}
                        onChange={(e) => {
                            onChange({ negativeNumber: e.target.value });
                        }}
                        value={print.negativeNumber}
                    />
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                    <TextField
                        fullWidth
                        label={t('sessions.wizard.fields.negativeFormat')}
                        onChange={(e) => {
                            onChange({
                                negativeFormat: e.target.value as PrintWritePrintNegativeFormatEnum,
                            });
                        }}
                        select
                        value={print.negativeFormat}
                    >
                        {negativeFormats.map((format) => (
                            <MenuItem
                                key={format}
                                value={format}
                            >
                                {format}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                    <TextField
                        fullWidth
                        label={t('sessions.wizard.fields.focalLength')}
                        onChange={(e) => {
                            onChange({
                                focalLength: Number(
                                    e.target.value,
                                ) as PrintWritePrintFocalLengthEnum,
                            });
                        }}
                        select
                        value={print.focalLength}
                    >
                        {focalLengths.map((focal) => (
                            <MenuItem
                                key={focal}
                                value={focal}
                            >
                                {t('sessions.wizard.focalLengthOption', { focal })}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                    <TextField
                        fullWidth
                        label={t('sessions.wizard.fields.copies')}
                        onChange={(e) => {
                            onChange({ copies: e.target.value });
                        }}
                        type="number"
                        value={print.copies}
                    />
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                    <TextField
                        fullWidth
                        label={t('sessions.wizard.fields.paperBrand')}
                        onChange={(e) => {
                            onChange({
                                paperBrand: e.target.value as PrintWritePrintPaperBrandEnum,
                            });
                        }}
                        select
                        value={print.paperBrand}
                    >
                        {paperBrands.map((brand) => (
                            <MenuItem
                                key={brand}
                                value={brand}
                            >
                                {brand}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                    <TextField
                        fullWidth
                        label={t('sessions.wizard.fields.paperModel')}
                        onChange={(e) => {
                            onChange({ paperModel: e.target.value });
                        }}
                        value={print.paperModel}
                    />
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                    <TextField
                        fullWidth
                        label={t('sessions.wizard.fields.paperBase')}
                        onChange={(e) => {
                            onChange({ paperBase: e.target.value as PrintWritePrintPaperBaseEnum });
                        }}
                        select
                        value={print.paperBase}
                    >
                        {paperBases.map((base) => (
                            <MenuItem
                                key={base}
                                value={base}
                            >
                                {base}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                    <TextField
                        fullWidth
                        label={t('sessions.wizard.fields.paperSurface')}
                        onChange={(e) => {
                            onChange({
                                paperSurface: e.target.value as PrintWritePrintPaperSurfaceEnum,
                            });
                        }}
                        select
                        value={print.paperSurface}
                    >
                        {paperSurfaces.map((surface) => (
                            <MenuItem
                                key={surface}
                                value={surface}
                            >
                                {surface}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                    <TextField
                        fullWidth
                        label={t('sessions.wizard.fields.columnHeightCm')}
                        onChange={(e) => {
                            onChange({ columnHeightCm: e.target.value });
                        }}
                        type="number"
                        value={print.columnHeightCm}
                    />
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                    <TextField
                        fullWidth
                        label={t('sessions.wizard.fields.borderCm')}
                        onChange={(e) => {
                            onChange({ borderCm: e.target.value });
                        }}
                        type="number"
                        value={print.borderCm}
                    />
                </Grid>
                <Grid size={12}>
                    <TextField
                        fullWidth
                        label={t('sessions.wizard.fields.printNotes')}
                        multiline
                        onChange={(e) => {
                            onChange({ notes: e.target.value });
                        }}
                        value={print.notes}
                    />
                </Grid>
            </Grid>

            <Divider sx={{ mb: 2 }} />

            <Typography
                sx={{ mb: 1, fontWeight: 600 }}
                variant="subtitle2"
            >
                {t('sessions.wizard.exposures')}
            </Typography>
            <Stack spacing={1.5}>
                {print.exposures.map((exposure) => (
                    <ExposureRow
                        exposure={exposure}
                        key={exposure.key}
                        onChange={(patch) => {
                            updateExposure(exposure.key, patch);
                        }}
                        onRemove={() => {
                            onChange({
                                exposures: print.exposures.filter((e) => e.key !== exposure.key),
                            });
                        }}
                        removable={print.exposures.length > 1}
                    />
                ))}
            </Stack>
            <Box sx={{ mt: 1.5 }}>
                <Button
                    onClick={() => {
                        onChange({
                            exposures: [
                                ...print.exposures,
                                createExposure(print.exposures.length + 1),
                            ],
                        });
                    }}
                    size="small"
                    startIcon={<AddIcon />}
                    variant="outlined"
                >
                    {t('sessions.wizard.addExposure')}
                </Button>
            </Box>
        </Paper>
    );
};
