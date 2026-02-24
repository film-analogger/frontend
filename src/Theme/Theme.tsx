import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { colorSchemes, typography, shadows, shape } from './themePrimitives';
import { inputsCustomizations } from './Customizations/Inputs';
import { dataDisplayCustomizations } from './Customizations/DataDisplay';
import { feedbackCustomizations } from './Customizations/Feedback';
import { navigationCustomizations } from './Customizations/Navigation';
import { surfacesCustomizations } from './Customizations/Surfaces';

const theme = createTheme({
    cssVariables: true,
    components: {
        ...inputsCustomizations,
        ...dataDisplayCustomizations,
        ...feedbackCustomizations,
        ...navigationCustomizations,
        ...surfacesCustomizations,
    },
    colorSchemes, // Recently added in v6 for building light & dark mode app, see https://mui.com/material-ui/customization/palette/#color-schemes
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
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

export default AppTheme;
