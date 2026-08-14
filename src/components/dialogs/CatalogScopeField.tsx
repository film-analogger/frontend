import LockIcon from '@mui/icons-material/Lock';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Box, ButtonBase, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

export type CatalogScope = 'personal' | 'pending';

export const CatalogScopeField: React.FunctionComponent<{
    readonly value: CatalogScope;
    readonly onChange: (value: CatalogScope) => void;
}> = ({ value, onChange }) => {
    const { t } = useTranslation();

    const choices: { key: CatalogScope; icon: React.ReactNode; label: string; desc: string }[] = [
        {
            key: 'personal',
            icon: <LockIcon fontSize="small" />,
            label: t('dialogs.scope.private.label'),
            desc: t('dialogs.scope.private.desc'),
        },
        {
            key: 'pending',
            icon: <VerifiedIcon fontSize="small" />,
            label: t('dialogs.scope.submit.label'),
            desc: t('dialogs.scope.submit.desc'),
        },
    ];

    return (
        <Box>
            <Typography
                color="text.secondary"
                sx={{ mb: 0.75, fontSize: '11.5px', fontWeight: 600 }}
            >
                {t('dialogs.scope.label')}
            </Typography>
            <Stack
                direction="row"
                spacing={1.25}
            >
                {choices.map((choice) => {
                    const selected = choice.key === value;
                    return (
                        <ButtonBase
                            key={choice.key}
                            onClick={() => {
                                onChange(choice.key);
                            }}
                            sx={{
                                flex: 1,
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 1.25,
                                p: '12px 13px',
                                borderRadius: '11px',
                                border: '1px solid',
                                borderColor: selected ? 'primary.main' : 'divider',
                                backgroundColor: selected ? 'action.selected' : 'transparent',
                                textAlign: 'left',
                            }}
                        >
                            <Box
                                sx={{
                                    mt: '1px',
                                    color: selected ? 'primary.main' : 'text.secondary',
                                }}
                            >
                                {choice.icon}
                            </Box>
                            <Box>
                                <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>
                                    {choice.label}
                                </Typography>
                                <Typography
                                    color="text.secondary"
                                    sx={{ fontSize: '11.5px', lineHeight: 1.45 }}
                                >
                                    {choice.desc}
                                </Typography>
                            </Box>
                        </ButtonBase>
                    );
                })}
            </Stack>
        </Box>
    );
};
