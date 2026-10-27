import { Box, ButtonBase, Typography } from '@mui/material';
import WbIncandescentIcon from '@mui/icons-material/WbIncandescentRounded';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppearanceMode } from '~/Theme/useAppearanceMode';

export const LabModeToggle: React.FunctionComponent = () => {
    const { t } = useTranslation();
    const { current, setAppearance } = useAppearanceMode();
    const isLab = current === 'lab';

    return (
        <ButtonBase
            aria-pressed={isLab}
            onClick={() => {
                setAppearance(isLab ? 'dark' : 'lab');
            }}
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: 1.25,
                py: 1.25,
                px: 1.5,
                borderRadius: 2,
                border: '1px dashed',
                borderColor: isLab ? 'primary.main' : 'divider',
                textAlign: 'left',
                backgroundColor: isLab ? 'action.selected' : 'transparent',
                '&:hover': { borderColor: 'primary.main' },
            }}
        >
            <WbIncandescentIcon
                color={isLab ? 'primary' : 'inherit'}
                sx={{ fontSize: '20px' }}
            />
            <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: 'text.primary' }}>
                    {t('components.sidemenu.labMode')}
                </Typography>
                <Typography sx={{ fontSize: '11px', color: 'text.secondary' }}>
                    {isLab
                        ? t('components.sidemenu.labModeOn')
                        : t('components.sidemenu.labModeOff')}
                </Typography>
            </Box>
        </ButtonBase>
    );
};
