import { Chip, type SxProps } from '@mui/material';
import React from 'react';
import type { FilmRead } from '~/api/client';

const getProcessBackgroundColor = (process: FilmRead['process']): SxProps => {
    // Color spectrum: cool blue (slow/fine grain) → warm red/purple (fast/grainy)

    switch (process) {
        case 'C-41':
            return {
                background:
                    'linear-gradient(90deg, Red, Orange, Yellow, Green, Blue, Indigo, Violet)',
                color: '#ffffff',
            };
        case 'E-6':
            return { backgroundColor: '#1565C0', color: '#ffffff' };
        case 'B&W':
            return { backgroundColor: '#1a1a1a', color: '#ffffff' };
        case 'ECN-2':
            return { backgroundColor: '#F9A825', color: '#1a1a1a' };
        case 'RA4':
            return { backgroundColor: '#E65100', color: '#ffffff' };
        default:
            return { backgroundColor: '#C62828', color: '#ffffff' };
    }
};

export const ProcessChip: React.FunctionComponent<{
    readonly film: { process: FilmRead['process'] };
}> = ({ film }) => {
    return (
        <Chip
            label={film.process}
            size="small"
            sx={{
                ...getProcessBackgroundColor(film.process),
            }}
            variant="outlined"
        />
    );
};
