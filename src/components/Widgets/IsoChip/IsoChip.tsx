import { Chip, type SxProps } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

const getIsoBackgroundColor = (iso: number): SxProps => {
    // Color spectrum: cool blue (slow/fine grain) → warm red/purple (fast/grainy)
    if (iso <= 32) {
        // Ultra-slow: deep blue
        return { backgroundColor: '#1565C0', color: '#ffffff' };
    }
    if (iso <= 160) {
        // Slow: teal
        return { backgroundColor: '#00796B', color: '#ffffff' };
    }
    if (iso <= 320) {
        // Medium-slow: green
        return { backgroundColor: '#388E3C', color: '#ffffff' };
    }
    if (iso <= 400) {
        // Standard: amber
        return { backgroundColor: '#F9A825', color: '#1a1a1a' };
    }
    if (iso <= 800) {
        // Fast: deep orange
        return { backgroundColor: '#E65100', color: '#ffffff' };
    }
    if (iso <= 1600) {
        // Pretty Fast: red
        return { backgroundColor: '#C62828', color: '#ffffff' };
    }
    if (iso <= 3200) {
        // Very fast: purple
        return { backgroundColor: '#6A1B9A', color: '#ffffff' };
    }
    // Ultra-fast (6400+): purple
    return { backgroundColor: '#4A148C', color: '#ffffff' };
};

export const IsoChip: React.FunctionComponent<{
    readonly film: { sensibility: number };
}> = ({ film }) => {
    const { t } = useTranslation();

    return (
        <Chip
            label={t('components.filmCard.iso', { iso: film.sensibility })}
            size="small"
            sx={{
                ...getIsoBackgroundColor(film.sensibility),
            }}
            variant="outlined"
        />
    );
};
