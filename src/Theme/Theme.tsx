import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { colorSchemes, typography, shadows, shape } from './themePrimitives';
import { inputsCustomizations } from './Customizations/Inputs';
import { dataDisplayCustomizations } from './Customizations/DataDisplay';
import { feedbackCustomizations } from './Customizations/Feedback';
import { navigationCustomizations } from './Customizations/Navigation';
import { surfacesCustomizations } from './Customizations/Surfaces';

const theme = createTheme({
    components: {
        ...inputsCustomizations,
        ...dataDisplayCustomizations,
        ...feedbackCustomizations,
        ...navigationCustomizations,
        ...surfacesCustomizations,
    },
    colorSchemes,
    typography,
    shadows,
    shape,
});

interface AppThemeProps {
    readonly children: React.ReactNode;
}

const AppTheme: React.FunctionComponent<AppThemeProps> = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <GlobalStyles
                styles={{
                    '*, *::before, *::after': {
                        transition:
                            'background-color 400ms ease, color 200ms ease, border-color 200ms ease',
                    },
                    body: {
                        transition:
                            'background-color 400ms ease, color 200ms ease, border-color 200ms ease',
                    },
                    '@media (prefers-reduced-motion: reduce)': {
                        '*, *::before, *::after': { transition: 'none' },
                        body: { transition: 'none' },
                    },
                }}
            />
            {children}
        </ThemeProvider>
    );
};

export default AppTheme;
