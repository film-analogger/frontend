import * as React from 'react';
import DarkModeIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightModeRounded';
import Box from '@mui/material/Box';
import IconButton, { type IconButtonOwnProps } from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useColorScheme, type SxProps } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const ColorModeIconDropdown: React.FunctionComponent<IconButtonOwnProps> = (props) => {
    const { mode, systemMode, setMode } = useColorScheme();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);
    const handleClose = React.useCallback(() => {
        setAnchorEl(null);
    }, []);
    const handleMode = React.useCallback(
        (targetMode: 'system' | 'light' | 'dark') => () => {
            setMode(targetMode);
            handleClose();
        },
        [handleClose, setMode],
    );

    const { t } = useTranslation();

    const buildSx: SxProps<Theme> = React.useCallback(
        (theme: Theme) => ({
            verticalAlign: 'bottom',
            display: 'inline-flex',
            width: '2.25rem',
            height: '2.25rem',
            borderRadius: (theme.vars ?? theme).shape.borderRadius,
            border: '1px solid',
            borderColor: (theme.vars ?? theme).palette.divider,
        }),
        [],
    );

    if (!mode) {
        return (
            <Box
                data-screenshot="toggle-mode"
                sx={buildSx}
            />
        );
    }
    const resolvedMode = (systemMode || mode) as 'light' | 'dark';
    const icon = {
        light: <LightModeIcon />,
        dark: <DarkModeIcon />,
    }[resolvedMode];
    return (
        <React.Fragment>
            <IconButton
                aria-controls={open ? 'color-scheme-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                data-screenshot="toggle-mode"
                disableRipple
                onClick={handleClick}
                size="small"
                {...props}
            >
                {icon}
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                id="account-menu"
                onClick={handleClose}
                onClose={handleClose}
                open={open}
                slotProps={{
                    paper: {
                        variant: 'outlined',
                        elevation: 0,
                        sx: {
                            my: '4px',
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
                <MenuItem
                    onClick={handleMode('system')}
                    selected={mode === 'system'}
                >
                    {t('app.theme.system')}
                </MenuItem>
                <MenuItem
                    onClick={handleMode('light')}
                    selected={mode === 'light'}
                >
                    {t('app.theme.light')}
                </MenuItem>
                <MenuItem
                    onClick={handleMode('dark')}
                    selected={mode === 'dark'}
                >
                    {t('app.theme.dark')}
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
};

export default ColorModeIconDropdown;
