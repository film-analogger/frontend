import { createTheme, alpha, type PaletteMode, type Shadows } from '@mui/material/styles';

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

export const brand = {
    50: 'rgb(229, 242, 255)',
    100: 'rgb(214, 235, 255)',
    200: 'rgb(153, 204, 255)',
    300: 'rgb(77, 166, 255)',
    400: 'rgb(2, 122, 242)',
    500: 'rgb(2, 107, 212)',
    600: 'rgb(28, 140, 253)',
    700: 'rgb(0, 89, 179)',
    800: 'rgb(0, 41, 82)',
    900: 'rgb(0, 54, 107)',
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
                light: brand[200],
                main: brand[400],
                dark: brand[700],
                contrastText: brand[50],
            },
            info: {
                light: brand[100],
                main: brand[300],
                dark: brand[600],
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
                default: 'rgb(252, 252, 252)',
                paper: 'rgb(245, 246, 250)',
            },
            text: {
                primary: gray[800],
                secondary: gray[600],
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
                contrastText: brand[50],
                light: brand[300],
                main: brand[400],
                dark: brand[700],
            },
            info: {
                contrastText: brand[300],
                light: brand[500],
                main: brand[700],
                dark: brand[900],
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
            divider: alpha(gray[700], 0.6),
            background: {
                default: gray[900],
                paper: 'rgb(12, 16, 23)',
            },
            text: {
                primary: 'rgb(255, 255, 255)',
                secondary: gray[400],
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
                light: brand[200],
                main: brand[400],
                dark: brand[700],
                contrastText: brand[50],
                ...(mode === 'dark' && {
                    contrastText: brand[50],
                    light: brand[300],
                    main: brand[400],
                    dark: brand[700],
                }),
            },
            info: {
                light: brand[100],
                main: brand[300],
                dark: brand[600],
                contrastText: gray[50],
                ...(mode === 'dark' && {
                    contrastText: brand[300],
                    light: brand[500],
                    main: brand[700],
                    dark: brand[900],
                }),
            },
            warning: {
                light: orange[300],
                main: orange[400],
                dark: orange[800],
                ...(mode === 'dark' && {
                    light: orange[400],
                    main: orange[500],
                    dark: orange[700],
                }),
            },
            error: {
                light: red[300],
                main: red[400],
                dark: red[800],
                ...(mode === 'dark' && {
                    light: red[400],
                    main: red[500],
                    dark: red[700],
                }),
            },
            success: {
                light: green[300],
                main: green[400],
                dark: green[800],
                ...(mode === 'dark' && {
                    light: green[400],
                    main: green[500],
                    dark: green[700],
                }),
            },
            grey: {
                ...gray,
            },
            divider: mode === 'dark' ? alpha(gray[700], 0.6) : alpha(gray[300], 0.4),
            background: {
                default: 'rgb(252, 252, 252)',
                paper: 'rgb(245, 246, 250)',
                ...(mode === 'dark' && { default: gray[900], paper: 'rgb(12, 16, 23)' }),
            },
            text: {
                primary: gray[800],
                secondary: gray[600],
                warning: orange[400],
                ...(mode === 'dark' && { primary: 'rgb(255, 255, 255)', secondary: gray[400] }),
            },
            action: {
                hover: alpha(gray[200], 0.2),
                selected: alpha(gray[200], 0.3),
                ...(mode === 'dark' && {
                    hover: alpha(gray[600], 0.2),
                    selected: alpha(gray[600], 0.3),
                }),
            },
        },
        typography,
        shape,
        shadows: customShadows,
    };
};
