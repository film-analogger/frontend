import { keyframes } from '@emotion/react';
import { alpha, Box, Stack, useTheme } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import React from 'react';

const strip = keyframes`
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(-34px);
    }
`;

const perforationCount = 26;

/**
 * Full-screen boot loader: once per session, on cold start. Named steps
 * rather than an abstract percentage, so the user knows what's loading.
 * Never shown on internal navigation — use a skeleton there instead.
 */
export const PerforationRow: React.FunctionComponent = () => {
    const theme = useTheme();
    const { colorScheme } = useColorScheme();
    const isLab = colorScheme === 'lab';
    const perfColor = alpha(theme.palette.text.primary, isLab ? 0.7 : 0.3);

    return (
        <Box sx={{ height: 20, overflow: 'hidden', opacity: 0.75 }}>
            <Stack
                direction="row"
                sx={{
                    alignItems: 'center',
                    gap: '20px',
                    height: '100%',
                    pl: 1.25,
                    width: 'max-content',
                    animation: `${strip} 900ms linear infinite`,
                }}
            >
                {Array.from({ length: perforationCount }, (_, index) => (
                    <Box
                        key={index}
                        sx={{
                            flex: '0 0 14px',
                            height: 9,
                            borderRadius: '4px',
                            backgroundColor: perfColor,
                        }}
                    />
                ))}
            </Stack>
        </Box>
    );
};
