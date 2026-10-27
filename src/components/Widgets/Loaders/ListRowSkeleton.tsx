import { Skeleton, Stack } from '@mui/material';
import React from 'react';

const rowWidths = [
    { primary: '58%', secondary: '34%' },
    { primary: '44%', secondary: '48%' },
    { primary: '66%', secondary: '28%' },
] as const;

/**
 * "Squelette de liste" — past ~1s on a first load, the real shape of the
 * rows rather than a generic grey block. Widths cycle through a fixed set
 * so rows don't all read as identical placeholders.
 */
export const ListRowSkeleton: React.FunctionComponent<{
    readonly rows?: number;
}> = ({ rows = 3 }) => {
    return (
        <Stack
            aria-hidden
            sx={{
                borderRadius: 1.5,
                border: '1px solid',
                borderColor: 'divider',
                overflow: 'hidden',
            }}
        >
            {Array.from(
                { length: rows },
                (_, index) => rowWidths[index % rowWidths.length] ?? rowWidths[0],
            ).map((widths, index) => (
                <Stack
                    direction="row"
                    key={`${widths.primary}-${widths.secondary}-${String(index)}`}
                    sx={{
                        alignItems: 'center',
                        gap: 1.75,
                        px: 1.75,
                        py: 1.5,
                        borderBottom: index < rows - 1 ? '1px solid' : 'none',
                        borderColor: 'divider',
                    }}
                >
                    <Skeleton
                        height={42}
                        sx={{ flex: '0 0 42px' }}
                        variant="rounded"
                        width={42}
                    />
                    <Stack sx={{ flex: 1, gap: 0.875, minWidth: 0 }}>
                        <Skeleton
                            height={11}
                            sx={{ borderRadius: '6px' }}
                            variant="rounded"
                            width={widths.primary}
                        />
                        <Skeleton
                            height={9}
                            sx={{ borderRadius: '6px', opacity: 0.7 }}
                            variant="rounded"
                            width={widths.secondary}
                        />
                    </Stack>
                    <Skeleton
                        height={22}
                        sx={{ borderRadius: '20px', opacity: 0.7, flex: '0 0 52px' }}
                        variant="rounded"
                        width={52}
                    />
                </Stack>
            ))}
        </Stack>
    );
};
