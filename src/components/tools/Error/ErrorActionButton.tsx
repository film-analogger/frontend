import React from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router';
import { type ErrorAction } from './errorTypes';

const ErrorActionButton: React.FunctionComponent<{
    readonly action: ErrorAction;
    readonly color: 'primary' | 'secondary' | 'inherit';
    readonly testId: string;
    readonly variant: 'contained' | 'outlined';
}> = ({ action, color, testId, variant }) => {
    const { t } = useTranslation();

    return action.to ? (
        <Button
            color={color}
            component={RouterLink}
            data-testid={testId}
            startIcon={action.icon}
            to={action.to}
            variant={variant}
        >
            {t(action.labelKey)}
        </Button>
    ) : (
        <Button
            color={color}
            data-testid={testId}
            onClick={action.onClick}
            startIcon={action.icon}
            variant={variant}
        >
            {t(action.labelKey)}
        </Button>
    );
};

export default ErrorActionButton;
