import { keyframes } from '@emotion/react';
import { alpha, Box, Stack, Typography, useTheme } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { PerforationRow } from './PerforationRow';

const breathe = keyframes`
    0%,
    100% {
        opacity: 0.55;
    }
    50% {
        opacity: 1;
    }
`;

const frames = keyframes`
    from {
        background-position-x: 0;
    }
    to {
        background-position-x: -114px;
    }
`;

const sweep = keyframes`
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(260%);
    }
`;

const logoVariant = (colorScheme: string | undefined): 'light' | 'dark' | 'lab' => {
    if (colorScheme === 'lab') {
        return 'lab';
    }
    return colorScheme === 'dark' ? 'dark' : 'light';
};

export interface PageLoaderStep {
    readonly title: string;
    readonly hint: string;
}

/**
 * Full-screen boot loader: once per session, on cold start. Named steps
 * rather than an abstract percentage, so the user knows what's loading.
 * Never shown on internal navigation — use a skeleton there instead.
 */
export const PageLoader: React.FunctionComponent<{
    readonly steps: readonly PageLoaderStep[];
    readonly activeStep: number;
}> = ({ steps, activeStep }) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const { colorScheme } = useColorScheme();
    const isLab = colorScheme === 'lab';
    const clampedStep = Math.min(Math.max(activeStep, 0), steps.length - 1);
    const step = steps[clampedStep] ?? { title: '', hint: '' };
    const pct = Math.round(((clampedStep + 1) / steps.length) * 100);
    const perfColor = alpha(theme.palette.text.primary, isLab ? 0.7 : 0.3);
    const sweepColor = alpha(theme.palette.text.primary, isLab ? 0.22 : 0.09);
    const variant = logoVariant(colorScheme);

    return (
        <Box
            aria-label={t('app.loading')}
            aria-live="polite"
            role="status"
            sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                minHeight: '50vh',
                p: 4,
                width: '100%',
            }}
        >
            <Stack sx={{ alignItems: 'center', gap: 3.25, width: '100%', maxWidth: 420 }}>
                <Stack
                    direction="row"
                    sx={{ alignItems: 'center', gap: 1.5 }}
                >
                    <Box
                        alt=""
                        component="img"
                        src={`/logo${variant}.svg`}
                        sx={{
                            width: 38,
                            height: 38,
                            display: 'block',
                            animation: `${breathe} 2000ms ease-in-out infinite`,
                        }}
                    />
                    <Stack sx={{ lineHeight: 1.2 }}>
                        <Typography
                            component="strong"
                            sx={{ fontSize: 17, fontWeight: 600 }}
                        >
                            {t('app.title')}
                        </Typography>
                        <Typography
                            color="text.secondary"
                            variant="caption"
                        >
                            {t('components.pageLoader.subtitle')}
                        </Typography>
                    </Stack>
                </Stack>

                <Box
                    sx={{
                        width: '100%',
                        borderRadius: 1.75,
                        border: '1px solid',
                        borderColor: 'divider',
                        backgroundColor: 'background.paper',
                        overflow: 'hidden',
                    }}
                >
                    <PerforationRow />
                    <Box
                        sx={{
                            height: 74,
                            position: 'relative',
                            overflow: 'hidden',
                            borderTop: '1px solid',
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                            backgroundColor: 'background.default',
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                opacity: 0.55,
                                backgroundImage: `repeating-linear-gradient(90deg, transparent 0 3px, ${perfColor} 3px 111px, transparent 111px 114px)`,
                                backgroundSize: '114px 66px',
                                animation: `${frames} 3017ms linear infinite`,
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                width: '46%',
                                background: `linear-gradient(90deg, transparent, ${sweepColor}, transparent)`,
                                animation: `${sweep} 1600ms ease-in-out infinite`,
                            }}
                        />
                    </Box>
                    <PerforationRow />
                </Box>

                <Stack sx={{ width: '100%', gap: 1.1 }}>
                    <Stack
                        direction="row"
                        sx={{ alignItems: 'baseline', gap: 1.25 }}
                    >
                        <Typography
                            sx={{ flex: 1, fontWeight: 600 }}
                            variant="body2"
                        >
                            {step.title}
                        </Typography>
                        <Typography
                            color="text.secondary"
                            sx={{ fontFamily: 'ui-monospace, monospace' }}
                            variant="caption"
                        >
                            {clampedStep + 1} / {steps.length}
                        </Typography>
                    </Stack>
                    <Box
                        sx={{
                            height: 4,
                            borderRadius: '4px',
                            border: '1px solid',
                            borderColor: 'divider',
                            backgroundColor: 'background.default',
                            overflow: 'hidden',
                        }}
                    >
                        <Box
                            sx={{
                                height: '100%',
                                width: `${String(pct)}%`,
                                backgroundColor: 'primary.main',
                                borderRadius: '4px',
                                transition: 'width 400ms ease',
                            }}
                        />
                    </Box>
                    <Typography
                        color="text.secondary"
                        variant="caption"
                    >
                        {step.hint}
                    </Typography>
                </Stack>
            </Stack>
        </Box>
    );
};
