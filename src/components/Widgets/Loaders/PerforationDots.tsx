import { keyframes } from '@emotion/react';
import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

const perf = keyframes`
    0%,
    100% {
        opacity: 0.2;
    }
    45% {
        opacity: 1;
    }
`;

const delaysMs = [0, 180, 360] as const;

/**
 * "Perforations" — three dots pulsing along a sentence, for a discreet
 * inline wait shorter than a skeleton (e.g. "Saving bath 2…").
 */
export const PerforationDots: React.FunctionComponent<{
    readonly label?: string;
}> = ({ label }) => {
    return (
        <Stack
            direction="row"
            sx={{ alignItems: 'center', gap: 1.5 }}
            {...(label ? { role: 'status', 'aria-label': label } : {})}
        >
            <Stack
                direction="row"
                sx={{ alignItems: 'center', gap: 0.75 }}
            >
                {delaysMs.map((delay) => (
                    <Box
                        key={delay}
                        sx={{
                            width: 7,
                            height: 7,
                            borderRadius: '50%',
                            backgroundColor: 'primary.main',
                            animation: `${perf} 1100ms ease-in-out ${String(delay)}ms infinite`,
                        }}
                    />
                ))}
            </Stack>
            {label ? (
                <Typography
                    color="text.secondary"
                    variant="body2"
                >
                    {label}
                </Typography>
            ) : null}
        </Stack>
    );
};
