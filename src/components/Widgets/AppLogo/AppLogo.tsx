import { Box, useMediaQuery } from '@mui/material';
import React from 'react';
import { useColorScheme, useTheme } from '@mui/material/styles';
import { headerHeight } from '~/Theme/Constants/layout';
import { useTranslation } from 'react-i18next';

export const AppLogo: React.FunctionComponent<{
    readonly width?: string;
    readonly height?: string;
}> = ({ width = headerHeight, height = headerHeight }) => {
    const { mode, systemMode } = useColorScheme();
    const resolvedMode = mode === 'system' ? systemMode : mode;
    const isDarkMode = resolvedMode === 'dark';
    const { t } = useTranslation();
    const theme = useTheme();
    const isBiggerThanMd = useMediaQuery(theme.breakpoints.up('md'));

    return isBiggerThanMd ? (
        <Box
            sx={{
                position: 'relative',
                height: height,
                width: 'auto',
                display: 'inline-flex',
            }}
        >
            {isDarkMode ? (
                <Box
                    alt={t('components.applogo.logoDark')}
                    component="img"
                    src="/logodark-inline.svg"
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        height: height,
                        width: 'auto',
                        transition: 'opacity 400ms ease',
                    }}
                />
            ) : (
                <Box
                    alt={t('components.applogo.logoLight')}
                    component="img"
                    src="/logolight-inline.svg"
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        height: height,
                        width: 'auto',
                        transition: 'opacity 400ms ease',
                    }}
                />
            )}
        </Box>
    ) : (
        <Box
            sx={{
                position: 'relative',
                width: width,
                height: height,
                display: 'inline-flex',
            }}
        >
            {isDarkMode ? (
                <Box
                    alt={`${t('components.applogo.logoDark') as string}-small`}
                    component="img"
                    src="/logodark.svg"
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        width: width,
                        height: height,
                        transition: 'opacity 400ms ease',
                    }}
                />
            ) : (
                <Box
                    alt={`${t('components.applogo.logoLight') as string}-small`}
                    component="img"
                    src="/logolight.svg"
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        width: width,
                        height: height,
                        transition: 'opacity 400ms ease',
                    }}
                />
            )}
        </Box>
    );
};
