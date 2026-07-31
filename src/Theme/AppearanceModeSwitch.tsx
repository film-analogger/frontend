import { Box, IconButton, Stack } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightModeRounded';
import WbIncandescentIcon from '@mui/icons-material/WbIncandescentRounded';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppearanceMode, type AppearanceMode } from '~/Theme/useAppearanceMode';

const OPTIONS: { mode: Exclude<AppearanceMode, 'system'>; icon: React.ReactNode }[] = [
    { mode: 'light', icon: <LightModeIcon fontSize="small" /> },
    { mode: 'dark', icon: <DarkModeIcon fontSize="small" /> },
    { mode: 'lab', icon: <WbIncandescentIcon fontSize="small" /> },
];

export const AppearanceModeSwitch: React.FunctionComponent = () => {
    const { current, setAppearance } = useAppearanceMode();
    const { t } = useTranslation();

    if (!current) {
        return null;
    }

    return (
        <Box
            data-screenshot="appearance-mode-switch"
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.25,
                padding: 0.375,
                borderRadius: 2.5,
                border: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'background.paper',
            }}
        >
            <Stack direction="row">
                {OPTIONS.map((option) => (
                    <IconButton
                        aria-label={t(`app.theme.${option.mode}`)}
                        color={current === option.mode ? 'primary' : 'default'}
                        key={option.mode}
                        onClick={() => {
                            setAppearance(option.mode);
                        }}
                        size="small"
                        sx={{
                            borderRadius: 1.5,
                            backgroundColor:
                                current === option.mode ? 'primary.main' : 'transparent',
                            color:
                                current === option.mode ? 'primary.contrastText' : 'text.secondary',
                            '&:hover': {
                                backgroundColor:
                                    current === option.mode ? 'primary.dark' : 'action.hover',
                            },
                        }}
                        title={t(`app.theme.${option.mode}`)}
                    >
                        {option.icon}
                    </IconButton>
                ))}
            </Stack>
        </Box>
    );
};
