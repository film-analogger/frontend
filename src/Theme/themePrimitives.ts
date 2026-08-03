import { createTheme, type PaletteMode, type Shadows, darken, lighten } from '@mui/material/styles';

declare module '@mui/material/Paper' {
    interface PaperPropsVariantOverrides {
        highlighted: true;
    }
}
declare module '@mui/material/styles' {
    interface ColorSchemeOverrides {
        lab: true;
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
    200: 'rgb(243, 179, 133)',
    300: 'rgb(238, 151, 82)',
    400: 'rgb(233, 131, 36)',
    500: 'rgb(229, 115, 0)',
    600: 'rgb(219, 108, 0)',
    700: 'rgb(206, 101, 0)',
    800: 'rgb(193, 93, 0)',
    900: 'rgb(170, 79, 0)',
};

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

// Design system source of truth: the "TEAL" palette from the imported
// claude.ai/design mockup (Film Analogger.dc.html). Kept as flat tokens
// (rather than derived from the primary/secondary ramps above) so the app
// matches the mockup's exact hex/rgba values.
export const colorSchemes = {
    light: {
        palette: {
            primary: {
                light: lighten('#0F766D', 0.3),
                main: '#0F766D',
                dark: '#0B5B54',
                contrastText: '#FFFFFF',
            },
            secondary: {
                light: lighten('#B85C00', 0.3),
                main: '#B85C00',
                dark: darken('#B85C00', 0.25),
                contrastText: '#FFFFFF',
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
            divider: 'rgba(27, 25, 23, 0.13)',
            background: {
                default: '#F3F0EA',
                paper: '#FFFFFF',
            },
            text: {
                primary: '#1B1917',
                secondary: '#6B6459',
                warning: orange[400],
            },
            action: {
                hover: 'rgba(15, 118, 109, 0.08)',
                selected: 'rgba(15, 118, 109, 0.12)',
            },
            baseShadow: 'rgba(27, 25, 23, 0.10) 0px 6px 20px 0px',
        },
    },
    dark: {
        palette: {
            primary: {
                contrastText: '#04211E',
                light: '#81C9C6',
                main: '#2CA39D',
                dark: '#0F766D',
            },
            secondary: {
                light: lighten('#E98324', 0.25),
                main: '#E98324',
                dark: darken('#E98324', 0.25),
                contrastText: '#04211E',
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
                light: red[200],
                main: red[300],
                dark: red[500],
            },
            success: {
                light: green[400],
                main: green[500],
                dark: green[700],
            },
            grey: {
                ...gray,
            },
            divider: 'rgba(242, 237, 228, 0.13)',
            background: {
                default: '#14130F',
                paper: '#1B1A15',
            },
            text: {
                primary: '#F2EDE4',
                secondary: '#A79F93',
            },
            action: {
                hover: 'rgba(129, 201, 198, 0.10)',
                selected: 'rgba(129, 201, 198, 0.15)',
            },
            baseShadow: 'rgba(0, 0, 0, 0.5) 0px 8px 24px 0px',
        },
    },
    // Inactinic darkroom mode: red-on-black only, so it is safe under photographic safelights.
    lab: {
        palette: {
            primary: {
                light: '#FF4D33',
                main: '#FF0000',
                dark: '#B30000',
                contrastText: '#000000',
            },
            secondary: {
                light: '#FF8A4D',
                main: '#FF6A00',
                dark: '#B34A00',
                contrastText: '#000000',
            },
            info: { light: '#FF6A00', main: '#FF4D33', dark: '#B30000', contrastText: '#000000' },
            warning: {
                light: '#FF8A4D',
                main: '#FF6A00',
                dark: '#B34A00',
                contrastText: '#000000',
            },
            error: { light: '#FF4D33', main: '#FF0000', dark: '#B30000', contrastText: '#000000' },
            success: {
                light: '#FF6A00',
                main: '#FF4D33',
                dark: '#B30000',
                contrastText: '#000000',
            },
            grey: {
                ...gray,
            },
            divider: 'rgba(255, 26, 0, 0.45)',
            background: {
                default: '#000000',
                paper: '#0D0000',
            },
            text: {
                primary: '#FF1A00',
                secondary: '#E60F00',
                disabled: 'rgba(255, 26, 0, 0.5)',
                icon: 'rgba(255, 26, 0, 0.5)',
            },
            // A custom (non-'light'/'dark') MUI color scheme name gets none of the
            // usual mode-based defaults, so every field components rely on (e.g.
            // Button's hover state) must be provided explicitly here.
            action: {
                active: '#FF1A00',
                hover: 'rgba(255, 0, 0, 0.16)',
                hoverOpacity: 0.08,
                selected: 'rgba(255, 0, 0, 0.24)',
                selectedOpacity: 0.16,
                disabled: 'rgba(255, 26, 0, 0.3)',
                disabledBackground: 'rgba(255, 26, 0, 0.12)',
                disabledOpacity: 0.38,
                focus: 'rgba(255, 26, 0, 0.12)',
                focusOpacity: 0.12,
                activatedOpacity: 0.24,
            },
            baseShadow: 'rgba(255, 0, 0, 0.25) 0px 0px 0px 1px',
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
            secondary: {
                ...colorSchemes.light.palette.secondary,
                ...(mode === 'dark' && {
                    ...colorSchemes.dark.palette.secondary,
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
