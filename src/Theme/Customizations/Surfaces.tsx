import { type Theme, type Components, darken, lighten } from '@mui/material/styles';
import { gray, primary, secondary } from '../themePrimitives';

export const surfacesCustomizations: Components<Theme> = {
    MuiAccordion: {
        defaultProps: {
            elevation: 0,
            disableGutters: true,
        },
        styleOverrides: {
            root: ({ theme }) => ({
                padding: 4,
                overflow: 'clip',
                backgroundColor: (theme.vars ?? theme).palette.background.default,
                border: '1px solid',
                borderColor: (theme.vars ?? theme).palette.divider,
                ':before': {
                    backgroundColor: 'transparent',
                },
                '&:not(:last-of-type)': {
                    borderBottom: 'none',
                },
                '&:first-of-type': {
                    borderTopLeftRadius: (theme.vars ?? theme).shape.borderRadius,
                    borderTopRightRadius: (theme.vars ?? theme).shape.borderRadius,
                },
                '&:last-of-type': {
                    borderBottomLeftRadius: (theme.vars ?? theme).shape.borderRadius,
                    borderBottomRightRadius: (theme.vars ?? theme).shape.borderRadius,
                },
            }),
        },
    },
    MuiAccordionSummary: {
        styleOverrides: {
            root: ({ theme }) => ({
                border: 'none',
                borderRadius: 8,
                '&:hover': { backgroundColor: gray[50] },
                '&:focus-visible': { backgroundColor: 'transparent' },
                ...theme.applyStyles('dark', {
                    '&:hover': { backgroundColor: gray[800] },
                }),
            }),
        },
    },
    MuiAccordionDetails: {
        styleOverrides: {
            root: { marginBottom: 20, border: 'none' },
        },
    },
    MuiPaper: {
        defaultProps: {
            elevation: 0,
        },
    },
    MuiCard: {
        styleOverrides: {
            root: ({ theme }) => {
                return {
                    padding: 16,
                    gap: 16,
                    transition: 'all 100ms ease',
                    backgroundColor: lighten(secondary[100], 0.4),
                    borderRadius: (theme.vars ?? theme).shape.borderRadius,
                    border: `1px solid ${(theme.vars ?? theme).palette.divider}`,
                    boxShadow: 'none',
                    ...theme.applyStyles('dark', {
                        backgroundColor: darken(primary[900], 0.3),
                    }),
                    variants: [
                        {
                            props: {
                                variant: 'outlined',
                            },
                            style: {
                                border: `1px solid ${(theme.vars ?? theme).palette.divider}`,
                                boxShadow: 'none',
                            },
                        },
                    ],
                };
            },
        },
    },
    MuiCardContent: {
        styleOverrides: {
            root: {
                padding: 0,
                '&:last-child': { paddingBottom: 0 },
            },
        },
    },
    MuiCardHeader: {
        styleOverrides: {
            root: {
                padding: 0,
            },
        },
    },
    MuiCardActions: {
        styleOverrides: {
            root: {
                padding: 0,
            },
        },
    },
};
