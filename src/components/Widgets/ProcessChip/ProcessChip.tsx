import { Chip } from '@mui/material';
import React from 'react';
import type { FilmRead } from '~/api/client';
import { getProcessStyle } from '~/domain/processColors';

export const ProcessChip: React.FunctionComponent<{
    readonly film: { process: FilmRead['process'] };
}> = ({ film }) => {
    const style = getProcessStyle(film.process);

    return (
        <Chip
            label={film.process}
            size="small"
            sx={{
                background: style.gradient !== 'none' ? style.gradient : style.color,
                color: style.fg,
            }}
            variant="outlined"
        />
    );
};
