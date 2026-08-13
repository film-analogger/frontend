import { Box, Skeleton, Stack } from '@mui/material';
import React from 'react';

/**
 * "Squelette de fiche" — for a grid of cards (e.g. films): the accent stays
 * neutral until the real data arrives, rather than guessing a color.
 */
export const CardGridSkeleton: React.FunctionComponent<{
    readonly count?: number;
}> = ({ count = 2 }) => {
    return (
        <Box
            aria-hidden
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                gap: 1.25,
            }}
        >
            {Array.from({ length: count }, (_, index) => (
                <Stack
                    key={index}
                    sx={{
                        gap: 1,
                        p: 1.375,
                        borderRadius: 1.5,
                        border: '1px solid',
                        borderColor: 'divider',
                        backgroundColor: 'background.default',
                    }}
                >
                    <Skeleton
                        height={44}
                        variant="rounded"
                    />
                    <Skeleton
                        height={10}
                        sx={{ borderRadius: '6px' }}
                        variant="rounded"
                        width="70%"
                    />
                    <Skeleton
                        height={9}
                        sx={{ borderRadius: '6px', opacity: 0.7 }}
                        variant="rounded"
                        width="45%"
                    />
                </Stack>
            ))}
        </Box>
    );
};
