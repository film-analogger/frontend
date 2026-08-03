import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { type ParseKeys } from 'i18next';
import { Link as RouterLink } from 'react-router';
import { type ErrorLink } from './errorTypes';

const ErrorLinksSection: React.FunctionComponent<{
    readonly label?: ParseKeys;
    readonly links: readonly ErrorLink[];
}> = ({ label, links }) => {
    const { t } = useTranslation();

    return (
        <Box data-testid="error-links">
            {label ? (
                <Typography
                    sx={{
                        fontSize: '11.5px',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: 'text.secondary',
                        opacity: 0.85,
                        mb: 1.25,
                    }}
                >
                    {t(label)}
                </Typography>
            ) : null}
            <Stack
                direction="row"
                sx={{ flexWrap: 'wrap', gap: 1 }}
            >
                {links.map((link) => (
                    <Button
                        color="inherit"
                        component={RouterLink}
                        key={link.to}
                        startIcon={link.icon}
                        sx={{ color: 'text.primary', fontWeight: 600 }}
                        to={link.to}
                        variant="outlined"
                    >
                        {t(link.labelKey)}
                    </Button>
                ))}
            </Stack>
        </Box>
    );
};

export default ErrorLinksSection;
