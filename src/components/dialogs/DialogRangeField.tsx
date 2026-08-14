import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, IconButton, Stack, Typography, alpha } from '@mui/material';
import React from 'react';

// The dual-bound stepper + gradient track from the "Modales ajout" mockup's
// isRange field (used for the chemistry's reference temperature range).
export const DialogRangeField: React.FunctionComponent<{
    readonly unit: string;
    readonly scaleMin: number;
    readonly scaleMax: number;
    readonly valueMin: number;
    readonly valueMax: number;
    readonly onChangeMin: (value: number) => void;
    readonly onChangeMax: (value: number) => void;
    readonly minLabel: string;
    readonly maxLabel: string;
    readonly decreaseAriaLabel: string;
    readonly increaseAriaLabel: string;
}> = ({
    unit,
    scaleMin,
    scaleMax,
    valueMin,
    valueMax,
    onChangeMin,
    onChangeMax,
    minLabel,
    maxLabel,
    decreaseAriaLabel,
    increaseAriaLabel,
}) => {
    const clamp = (value: number) => Math.min(scaleMax, Math.max(scaleMin, value));
    const pos = (value: number) => ((value - scaleMin) / (scaleMax - scaleMin)) * 100;

    const bounds = [
        {
            label: minLabel,
            value: valueMin,
            dec: () => {
                onChangeMin(clamp(valueMin - 1));
            },
            inc: () => {
                onChangeMin(Math.min(valueMax, clamp(valueMin + 1)));
            },
        },
        {
            label: maxLabel,
            value: valueMax,
            dec: () => {
                onChangeMax(Math.max(valueMin, clamp(valueMax - 1)));
            },
            inc: () => {
                onChangeMax(clamp(valueMax + 1));
            },
        },
    ];

    return (
        <Box
            sx={{
                boxSizing: 'border-box',
                width: '100%',
                p: '11px 13px 13px',
                borderRadius: '11px',
                border: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'background.default',
            }}
        >
            <Stack
                direction="row"
                spacing={1.5}
            >
                {bounds.map((bound) => (
                    <Stack
                        direction="row"
                        key={bound.label}
                        spacing={1}
                        sx={{ flex: 1, alignItems: 'center' }}
                    >
                        <IconButton
                            aria-label={`${decreaseAriaLabel} ${bound.label}`}
                            onClick={bound.dec}
                            size="small"
                        >
                            <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Stack sx={{ flex: 1, alignItems: 'center' }}>
                            <Typography
                                color="text.secondary"
                                sx={{
                                    fontSize: '10.5px',
                                    fontWeight: 700,
                                    letterSpacing: '0.6px',
                                    textTransform: 'uppercase',
                                }}
                            >
                                {bound.label}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '19px',
                                    fontWeight: 600,
                                    fontVariantNumeric: 'tabular-nums',
                                }}
                            >
                                {bound.value} {unit}
                            </Typography>
                        </Stack>
                        <IconButton
                            aria-label={`${increaseAriaLabel} ${bound.label}`}
                            onClick={bound.inc}
                            size="small"
                        >
                            <AddIcon fontSize="small" />
                        </IconButton>
                    </Stack>
                ))}
            </Stack>
            <Box
                sx={{
                    position: 'relative',
                    height: 8,
                    mt: 2,
                    borderRadius: '20px',
                    backgroundColor: (theme) => alpha(theme.palette.text.primary, 0.1),
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: `${String(pos(valueMin))}%`,
                        right: `${String(100 - pos(valueMax))}%`,
                        borderRadius: '20px',
                        background: 'linear-gradient(90deg, #4B6E86 0%, #6F8C7A 45%, #C9642B 100%)',
                    }}
                />
            </Box>
            <Stack
                direction="row"
                sx={{
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    mt: 1.25,
                    fontSize: '12px',
                    fontVariantNumeric: 'tabular-nums',
                    opacity: 0.55,
                }}
            >
                <span>
                    {scaleMin} {unit}
                </span>
                <span>
                    {scaleMax} {unit}
                </span>
            </Stack>
        </Box>
    );
};
