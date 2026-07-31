import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import WbIncandescentIcon from '@mui/icons-material/WbIncandescentRounded';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppearanceMode } from '~/Theme/useAppearanceMode';

export const LabModeToggle: React.FunctionComponent = () => {
    const { t } = useTranslation();
    const { current, setAppearance } = useAppearanceMode();
    const isLab = current === 'lab';

    return (
        <ListItemButton
            aria-pressed={isLab}
            onClick={() => {
                setAppearance(isLab ? 'dark' : 'lab');
            }}
            sx={{
                borderRadius: 2,
                border: '1px dashed',
                borderColor: isLab ? 'primary.main' : 'divider',
            }}
        >
            <ListItemIcon>
                <WbIncandescentIcon color={isLab ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText
                primary={t('components.sidemenu.labMode')}
                secondary={
                    isLab ? t('components.sidemenu.labModeOn') : t('components.sidemenu.labModeOff')
                }
            />
        </ListItemButton>
    );
};
