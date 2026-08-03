import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { type ErrorSafety } from './errorTypes';

const ErrorSafetyNotice: React.FunctionComponent<{
    readonly accentColor: string;
    readonly safety: ErrorSafety;
}> = ({ accentColor, safety }) => {
    const { t } = useTranslation();

    return (
        <Stack
            data-testid="error-safety"
            direction="row"
            sx={{
                gap: 1.5,
                alignItems: 'flex-start',
                borderRadius: '12px',
                border: '1px solid',
                borderColor: accentColor,
                backgroundColor: alpha(accentColor, 0.08),
                p: 1.75,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    color: accentColor,
                    fontSize: 19,
                    '& svg': { fontSize: 19 },
                }}
            >
                {safety.icon}
            </Box>
            <Typography sx={{ fontSize: '13px', lineHeight: 1.55 }}>
                {t(safety.messageKey)}
            </Typography>
        </Stack>
    );
};

export default ErrorSafetyNotice;
