import * as React from 'react';
import IconButton, { type IconButtonOwnProps } from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';

import LanguageIcon from '@mui/icons-material/Language';

const LanguageIconDropdown: React.FunctionComponent<IconButtonOwnProps> = (props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);
    const handleClose = React.useCallback(() => {
        setAnchorEl(null);
    }, []);

    const { t, i18n } = useTranslation();

    const handleLanguage = React.useCallback(
        async (lng: string) => {
            await i18n.changeLanguage(lng).catch((err: unknown) => {
                console.error('Error changing language:', err);
            });
            handleClose();
        },
        [i18n, handleClose],
    );

    const currentLanguage = i18n.language;

    return (
        <React.Fragment>
            <IconButton
                aria-controls={open ? 'color-scheme-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                aria-label="language-select-toggle"
                data-screenshot="toggle-language"
                disableRipple
                onClick={handleClick}
                size="small"
                {...props}
            >
                <LanguageIcon />
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
                    onClick={() => {
                        handleLanguage('en').catch(console.error);
                    }}
                    selected={currentLanguage === 'en'}
                >
                    {t('app.language.en')}
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleLanguage('fr').catch(console.error);
                    }}
                    selected={currentLanguage === 'fr'}
                >
                    {t('app.language.fr')}
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
};

export default LanguageIconDropdown;
