import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectProps } from '@mui/material/Select';
import { useTranslation } from 'react-i18next';
import { useAppearanceMode, type AppearanceMode } from '~/Theme/useAppearanceMode';

const ColorModeSelect: React.FunctionComponent<SelectProps> = (props) => {
    const { current, setAppearance } = useAppearanceMode();

    const { t } = useTranslation();

    const changeMode = React.useCallback<NonNullable<SelectProps['onChange']>>(
        (event) => {
            setAppearance(event.target.value as AppearanceMode);
        },
        [setAppearance],
    );

    if (!current) {
        return null;
    }

    return (
        <Select
            SelectDisplayProps={
                {
                    'data-screenshot': 'toggle-mode',
                } as React.HTMLAttributes<HTMLDivElement>
            }
            onChange={changeMode}
            value={current}
            {...props}
        >
            <MenuItem value="system"> {t('app.theme.system')}</MenuItem>
            <MenuItem value="light">{t('app.theme.light')}</MenuItem>
            <MenuItem value="dark">{t('app.theme.dark')}</MenuItem>
            <MenuItem value="lab">{t('app.theme.lab')}</MenuItem>
        </Select>
    );
};

export default ColorModeSelect;
