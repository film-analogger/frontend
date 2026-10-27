import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';
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
            {children}
        </ThemeProvider>
    );
};

export default AppTheme;
