import { LinearProgress, Stack, Typography } from '@mui/material';
import React from 'react';

/**
 * "Progression déterminée" — once a total is known (scan import, sync),
 * show the count, not a spinner: percentage in the header, an optional
 * caption for the raw count underneath.
 */
export const DeterminateProgress: React.FunctionComponent<{
    readonly label: string;
    readonly value: number;
    readonly caption?: string;
}> = ({ label, value, caption }) => {
    const pct = Math.round(value);

    return (
        <Stack sx={{ gap: 1.25 }}>
            <Stack
                direction="row"
                sx={{ alignItems: 'baseline', gap: 1.25 }}
            >
                <Typography
                    sx={{ flex: 1, fontWeight: 600 }}
                    variant="body2"
                >
                    {label}
                </Typography>
                <Typography
                    sx={{
                        color: 'secondary.main',
                        fontFamily: 'ui-monospace, monospace',
                        fontWeight: 700,
                    }}
                    variant="caption"
                >
                    {pct}%
                </Typography>
            </Stack>
            <LinearProgress
                color="secondary"
                sx={{ height: 6, borderRadius: 6 }}
                value={pct}
                variant="determinate"
            />
            {caption ? (
                <Typography
                    color="text.secondary"
                    sx={{ fontFamily: 'ui-monospace, monospace' }}
                    variant="caption"
                >
                    {caption}
                </Typography>
            ) : null}
        </Stack>
    );
};
