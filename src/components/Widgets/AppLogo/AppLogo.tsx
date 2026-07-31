import { Box, useMediaQuery } from '@mui/material';
import React from 'react';
import { useColorScheme, useTheme } from '@mui/material/styles';
import { headerHeight } from '~/Theme/Constants/layout';
import { useTranslation } from 'react-i18next';

const variantForScheme = (colorScheme: string | undefined): 'light' | 'dark' | 'lab' => {
    if (colorScheme === 'lab') {
        return 'lab';
    }
    return colorScheme === 'dark' ? 'dark' : 'light';
};

export const AppLogo: React.FunctionComponent<{
    readonly width?: string;
    readonly height?: string;
}> = ({ width = headerHeight, height = headerHeight }) => {
    const { colorScheme } = useColorScheme();
    const variant = variantForScheme(colorScheme);
    const { t } = useTranslation();
    const theme = useTheme();
    const isBiggerThanMd = useMediaQuery(theme.breakpoints.up('md'));

    const altKey = {
        light: 'components.applogo.logoLight',
        dark: 'components.applogo.logoDark',
        lab: 'components.applogo.logoLab',
    }[variant];

    return isBiggerThanMd ? (
        <Box
            sx={{
                position: 'relative',
                height: height,
                width: 'auto',
                display: 'inline-flex',
            }}
        >
            <Box
                alt={t(altKey)}
                component="img"
                src={`/logo${variant}-inline.svg`}
                sx={{
                    position: 'absolute',
                    inset: 0,
                    height: height,
                    width: 'auto',
                    transition: 'opacity 400ms ease',
                }}
            />
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
            <Box
                alt={t(altKey)}
                component="img"
                src={`/logo${variant}.svg`}
                sx={{
                    position: 'absolute',
                    inset: 0,
                    width: width,
                    height: height,
                    transition: 'opacity 400ms ease',
                }}
            />
        </Box>
    );
};
