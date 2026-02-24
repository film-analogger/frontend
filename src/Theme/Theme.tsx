import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LinkBehavior from './Overides/Link';
import type { LinkProps } from '@mui/material';

const theme = createTheme({
    cssVariables: true,
    components: {
        MuiLink: {
            defaultProps: {
                component: LinkBehavior as LinkProps['component'],
            } as LinkProps,
        },
        MuiButtonBase: {
            defaultProps: {
                LinkComponent: LinkBehavior as React.ElementType,
            },
        },
    },
    colorSchemes: {
        light: true,
        dark: true,
    },
});

interface AppThemeProps {
    readonly children: React.ReactNode;
}

const AppTheme: React.FunctionComponent<AppThemeProps> = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

export default AppTheme;
