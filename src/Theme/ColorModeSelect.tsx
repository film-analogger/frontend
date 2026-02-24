import React from 'react';
import { useColorScheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectProps } from '@mui/material/Select';
import { useTranslation } from 'react-i18next';

const ColorModeSelect: React.FunctionComponent<SelectProps> = (props) => {
    const { mode, setMode } = useColorScheme();

    const { t } = useTranslation();

    const changeMode = React.useCallback<NonNullable<SelectProps['onChange']>>(
        (event) => {
            setMode(event.target.value as 'light' | 'dark' | 'system');
        },
        [setMode],
    );

    if (!mode) {
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
            value={mode}
            {...props}
        >
            <MenuItem value="system"> {t('app.theme.system')}</MenuItem>
            <MenuItem value="light">{t('app.theme.light')}</MenuItem>
            <MenuItem value="dark">{t('app.theme.dark')}</MenuItem>
        </Select>
    );
};

export default ColorModeSelect;
