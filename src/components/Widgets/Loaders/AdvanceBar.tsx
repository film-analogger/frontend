import { keyframes } from '@emotion/react';
import { Box } from '@mui/material';
import React from 'react';

const indeterminate = keyframes`
    0% {
        left: -38%;
        width: 38%;
    }
    60% {
        left: 62%;
        width: 38%;
    }
    100% {
        left: 100%;
        width: 12%;
    }
`;

/**
 * "Bande d'avance" — thin 2px indeterminate strip for refreshing a card or
 * table that already has content on screen: the content stays visible and
 * readable, this just marks that it's being replaced.
 */
export const AdvanceBar: React.FunctionComponent<{
    readonly label: string;
}> = ({ label }) => {
    return (
        <Box
            aria-label={label}
            role="progressbar"
            sx={{
                position: 'relative',
                height: 2,
                backgroundColor: 'divider',
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    backgroundColor: 'primary.main',
                    animation: `${indeterminate} 1500ms cubic-bezier(0.4, 0, 0.2, 1) infinite`,
                }}
            />
        </Box>
    );
};
