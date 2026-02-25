import { Box } from '@mui/material';
import React from 'react';
import { useColorScheme } from '@mui/material/styles';
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
    return (
        <React.Fragment>
            <Box
                sx={{
                    position: 'relative',
                    width: width,
                    height: height,
                    display: { xs: 'inline-flex', md: 'none' },
                }}
            >
                <Box
                    alt={t('components.applogo.logoLight')}
                    component="img"
                    src="/logolight.svg"
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        width: width,
                        height: height,
                        opacity: isDarkMode ? 0 : 1,
                        transition: 'opacity 400ms ease',
                    }}
                />
                <Box
                    alt={t('components.applogo.logoDark')}
                    component="img"
                    src="/logodark.svg"
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        width: width,
                        height: height,
                        opacity: isDarkMode ? 1 : 0,
                        transition: 'opacity 400ms ease',
                    }}
                />
            </Box>

            <Box
                sx={{
                    position: 'relative',
                    height: height,
                    width: 'auto',
                    display: { xs: 'none', md: 'inline-flex' },
                }}
            >
                <Box
                    alt={t('components.applogo.logoLight')}
                    component="img"
                    src="/logolight-inline.svg"
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        height: height,
                        width: 'auto',
                        opacity: isDarkMode ? 0 : 1,
                        transition: 'opacity 400ms ease',
                    }}
                />
                <Box
                    alt={t('components.applogo.logoDark')}
                    component="img"
                    src="/logodark-inline.svg"
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        height: height,
                        width: 'auto',
                        opacity: isDarkMode ? 1 : 0,
                        transition: 'opacity 400ms ease',
                    }}
                />
            </Box>
        </React.Fragment>
    );
};
