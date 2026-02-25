import {
    createTheme,
    alpha,
    type PaletteMode,
    type Shadows,
    darken,
    lighten,
} from '@mui/material/styles';

declare module '@mui/material/Paper' {
    interface PaperPropsVariantOverrides {
        highlighted: true;
    }
}
declare module '@mui/material/styles' {
    interface ColorRange {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
    }

    // interface PaletteColor extends ColorRange {}

    interface Palette {
        baseShadow: string;
    }
}

const defaultTheme = createTheme();

const customShadows: Shadows = [...defaultTheme.shadows];

export const primary = {
    50: 'rgb(224, 241, 242)',
    100: 'rgb(178, 222, 220)',
    200: 'rgb(129, 201, 198)',
    300: 'rgb(79, 179, 175)',
    400: 'rgb(44, 163, 157)',
    500: 'rgb(18, 147, 139)',
    600: 'rgb(16, 134, 126)',
    700: 'rgb(15, 118, 109)',
    800: 'rgb(15, 102, 94)',
    900: 'rgb(13, 74, 66)',
};

export const secondary = {
    50: 'rgb(250, 234, 228)',
    100: 'rgb(248, 208, 181)',
    200: 'rgb(248, 208, 181)',
    300: 'rgb(243, 179, 133)',
    400: 'rgb(233, 131, 36)',
    500: 'rgb(229, 115, 0)',
    600: 'rgb(219, 108, 0)',
    700: 'rgb(206, 101, 0)',
    800: 'rgb(193, 93, 0)',
    900: 'rgb(170, 79, 0)',
};

export const gray = {
    50: 'rgb(245, 246, 250)',
    100: 'rgb(235, 238, 244)',
    200: 'rgb(218, 222, 231)',
    300: 'rgb(194, 201, 214)',
    400: 'rgb(148, 160, 184)',
    500: 'rgb(86, 100, 129)',
    600: 'rgb(71, 83, 107)',
    700: 'rgb(51, 60, 77)',
    800: 'rgb(11, 14, 20)',
    900: 'rgb(5, 7, 10)',
};

export const green = {
    50: 'rgb(246, 254, 246)',
    100: 'rgb(228, 251, 228)',
    200: 'rgb(197, 247, 197)',
    300: 'rgb(161, 232, 161)',
    400: 'rgb(82, 188, 82)',
    500: 'rgb(31, 122, 31)',
    600: 'rgb(19, 108, 19)',
    700: 'rgb(10, 71, 10)',
    800: 'rgb(4, 47, 4)',
    900: 'rgb(2, 29, 2)',
};

export const orange = {
    50: 'rgb(255, 251, 240)',
    100: 'rgb(253, 241, 206)',
    200: 'rgb(252, 228, 156)',
    300: 'rgb(246, 206, 85)',
    400: 'rgb(194, 148, 10)',
    500: 'rgb(170, 129, 9)',
    600: 'rgb(122, 93, 6)',
    700: 'rgb(99, 75, 3)',
    800: 'rgb(80, 60, 2)',
    900: 'rgb(59, 45, 2)',
};

export const red = {
    50: 'rgb(255, 240, 240)',
    100: 'rgb(253, 206, 206)',
    200: 'rgb(252, 156, 156)',
    300: 'rgb(246, 85, 85)',
    400: 'rgb(194, 10, 10)',
    500: 'rgb(145, 8, 8)',
    600: 'rgb(122, 6, 6)',
    700: 'rgb(89, 3, 3)',
    800: 'rgb(60, 2, 2)',
    900: 'rgb(30, 1, 1)',
};

export const colorSchemes = {
    light: {
        palette: {
            primary: {
                light: primary[200],
                main: primary[400],
                dark: primary[700],
                contrastText: primary[50],
            },
            secondary: {
                light: primary[200],
                main: primary[400],
                dark: primary[700],
                contrastText: primary[50],
            },
            info: {
                light: primary[100],
                main: primary[300],
                dark: primary[600],
                contrastText: gray[50],
            },
            warning: {
                light: orange[300],
                main: orange[400],
                dark: orange[800],
            },
            error: {
                light: red[300],
                main: red[400],
                dark: red[800],
            },
            success: {
                light: green[300],
                main: green[400],
                dark: green[800],
            },
            grey: {
                ...gray,
            },
            divider: alpha(gray[300], 0.4),
            background: {
                default: secondary[50],
                paper: lighten(secondary[100], 0.5),
            },
            text: {
                primary: darken(primary[900], 0.3),
                secondary: darken(primary[800], 0.3),
                warning: orange[400],
            },
            action: {
                hover: alpha(gray[200], 0.2),
                selected: alpha(gray[200], 0.3),
            },
            baseShadow:
                'rgba(9, 11, 17, 0.07) 0px 4px 16px 0px, rgba(19, 23, 32, 0.07) 0px 8px 16px -5px',
        },
    },
    dark: {
        palette: {
            primary: {
                contrastText: primary[50],
                light: primary[300],
                main: primary[400],
                dark: primary[700],
            },
            info: {
                contrastText: primary[300],
                light: primary[500],
                main: primary[700],
                dark: primary[900],
            },
            warning: {
                light: orange[400],
                main: orange[500],
                dark: orange[700],
            },
            error: {
                light: red[400],
                main: red[500],
                dark: red[700],
            },
            success: {
                light: green[400],
                main: green[500],
                dark: green[700],
            },
            grey: {
                ...gray,
            },
            divider: alpha(secondary[700], 0.2),
            background: {
                default: darken(primary[900], 0.6),
                paper: darken(primary[900], 0.5),
            },
            text: {
                primary: secondary[50],
                secondary: secondary[300],
            },
            action: {
                hover: alpha(gray[600], 0.2),
                selected: alpha(gray[600], 0.3),
            },
            baseShadow:
                'rgba(9, 11, 17, 0.7) 0px 4px 16px 0px, rgba(19, 23, 32, 0.8) 0px 8px 16px -5px',
        },
    },
};

export const typography = {
    fontFamily: 'Inter, sans-serif',
    h1: {
        fontSize: defaultTheme.typography.pxToRem(96),
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: -0.5,
    },
    h2: {
        fontSize: defaultTheme.typography.pxToRem(48),
        fontWeight: 600,
        lineHeight: 1.2,
    },
    h3: {
        fontSize: defaultTheme.typography.pxToRem(36),
        lineHeight: 1.2,
    },
    h4: {
        fontSize: defaultTheme.typography.pxToRem(30),
        fontWeight: 600,
        lineHeight: 1.5,
    },
    h5: {
        fontSize: defaultTheme.typography.pxToRem(24),
        fontWeight: 600,
    },
    h6: {
        fontSize: defaultTheme.typography.pxToRem(22),
        fontWeight: 600,
    },
    subtitle1: {
        fontSize: defaultTheme.typography.pxToRem(22),
    },
    subtitle2: {
        fontSize: defaultTheme.typography.pxToRem(20),
        fontWeight: 500,
    },
    body1: {
        fontSize: defaultTheme.typography.pxToRem(18),
    },
    body2: {
        fontSize: defaultTheme.typography.pxToRem(18),
        fontWeight: 400,
    },
    caption: {
        fontSize: defaultTheme.typography.pxToRem(16),
        fontWeight: 400,
    },
};

export const shape = {
    borderRadius: 8,
};

const defaultShadows: Shadows = [
    'none',
    'var(--template-palette-baseShadow)',
    ...defaultTheme.shadows.slice(2),
] as Shadows;

export const shadows = defaultShadows;

export const getDesignTokens = (mode: PaletteMode) => {
    customShadows[1] =
        mode === 'dark'
            ? 'rgba(9, 11, 17, 0.7) 0px 4px 16px 0px, rgba(19, 23, 32, 0.8) 0px 8px 16px -5px'
            : 'rgba(9, 11, 17, 0.07) 0px 4px 16px 0px, rgba(19, 23, 32, 0.07) 0px 8px 16px -5px';

    return {
        palette: {
            mode,
            primary: {
                ...colorSchemes.light.palette.primary,
                ...(mode === 'dark' && {
                    ...colorSchemes.dark.palette.primary,
                }),
            },
            info: {
                ...colorSchemes.light.palette.info,
                ...(mode === 'dark' && {
                    ...colorSchemes.dark.palette.info,
                }),
            },
            warning: {
                ...colorSchemes.light.palette.warning,
                ...(mode === 'dark' && {
                    ...colorSchemes.dark.palette.warning,
                }),
            },
            error: {
                ...colorSchemes.light.palette.error,
                ...(mode === 'dark' && {
                    ...colorSchemes.dark.palette.error,
                }),
            },
            success: {
                ...colorSchemes.light.palette.success,
                ...(mode === 'dark' && {
                    ...colorSchemes.dark.palette.success,
                }),
            },
            grey: {
                ...gray,
            },
            divider:
                mode === 'dark'
                    ? colorSchemes.dark.palette.divider
                    : colorSchemes.light.palette.divider,
            background: {
                ...colorSchemes.light.palette.background,
                ...(mode === 'dark' && { ...colorSchemes.dark.palette.background }),
            },
            text: {
                ...colorSchemes.light.palette.text,
                ...(mode === 'dark' && { ...colorSchemes.dark.palette.text }),
            },
            action: {
                ...colorSchemes.light.palette.action,
                ...(mode === 'dark' && { ...colorSchemes.dark.palette.action }),
            },
        },
        typography,
        shape,
        shadows: customShadows,
    };
};
