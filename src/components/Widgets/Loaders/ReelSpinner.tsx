import { keyframes } from '@emotion/react';
import { Box, useTheme } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

const spin = keyframes`
    to {
        transform: rotate(360deg);
    }
`;

const sizePx = { small: 16, medium: 22, large: 34 } as const;
const borderPx = { small: 2, medium: 2.5, large: 3 } as const;
const durationMs = { small: 780, medium: 900, large: 1100 } as const;

export type ReelSpinnerSize = keyof typeof sizePx;

/**
 * "Bobine" — indeterminate ring spinner, for waits under ~1s inline with
 * content (a form field, a button, a card). Use PageLoader instead for
 * full-screen cold-start waits.
 */
export const ReelSpinner: React.FunctionComponent<{
    readonly size?: ReelSpinnerSize;
    readonly color?: string;
    readonly trackColor?: string;
    readonly label?: string;
}> = ({ size = 'medium', color, trackColor, label }) => {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <Box
            aria-label={label ?? t('app.loading')}
            role="status"
            sx={{
                width: sizePx[size],
                height: sizePx[size],
                flex: '0 0 auto',
                borderRadius: '50%',
                border: `${String(borderPx[size])}px solid ${trackColor ?? theme.palette.divider}`,
                borderTopColor: color ?? theme.palette.primary.main,
                animation: `${spin} ${String(durationMs[size])}ms linear infinite`,
                display: 'block',
            }}
        />
    );
};
