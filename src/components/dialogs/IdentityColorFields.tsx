import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FieldLabel } from './FieldLabel';

export interface IdentityColors {
    primaryColor: string;
    secondaryColor: string;
    tertiaryColor: string;
}

export const IdentityColorFields: React.FunctionComponent<{
    readonly value: IdentityColors;
    readonly onChange: (patch: Partial<IdentityColors>) => void;
}> = ({ value, onChange }) => {
    const { t } = useTranslation();

    const swatches: { key: keyof IdentityColors; label: string }[] = [
        { key: 'primaryColor', label: t('dialogs.colors.primary') },
        { key: 'secondaryColor', label: t('dialogs.colors.secondary') },
        { key: 'tertiaryColor', label: t('dialogs.colors.tertiary') },
    ];

    return (
        <Box>
            <FieldLabel>{t('dialogs.colors.label')}</FieldLabel>
            <Stack
                direction="row"
                spacing={1.25}
            >
                {swatches.map((swatch) => (
                    <Stack
                        direction="row"
                        key={swatch.key}
                        spacing={1}
                        sx={{
                            flex: 1,
                            alignItems: 'center',
                            minWidth: 0,
                            p: '8px 11px',
                            borderRadius: '11px',
                            border: '1px solid',
                            borderColor: 'divider',
                            backgroundColor: 'background.default',
                        }}
                    >
                        <input
                            onChange={(e) => {
                                onChange({ [swatch.key]: e.target.value });
                            }}
                            style={{
                                width: 26,
                                height: 26,
                                padding: 0,
                                border: 'none',
                                borderRadius: 7,
                                cursor: 'pointer',
                                background: 'transparent',
                                flex: '0 0 auto',
                            }}
                            type="color"
                            value={value[swatch.key] || '#000000'}
                        />
                        <Stack sx={{ minWidth: 0 }}>
                            <Typography
                                color="text.secondary"
                                sx={{
                                    fontSize: '10.5px',
                                    fontWeight: 700,
                                    letterSpacing: '0.6px',
                                    textTransform: 'uppercase',
                                }}
                            >
                                {swatch.label}
                            </Typography>
                            <Typography
                                sx={{ fontSize: '12.5px', fontVariantNumeric: 'tabular-nums' }}
                            >
                                {value[swatch.key] || '—'}
                            </Typography>
                        </Stack>
                    </Stack>
                ))}
            </Stack>
        </Box>
    );
};
