import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
    cssVariables: true,
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
