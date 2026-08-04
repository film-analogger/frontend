import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ButtonBase from '@mui/material/ButtonBase';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router';
import { useCurrentAppUser } from '~/api/useCurrentAppUser';
import { useKeycloak } from '~/keycloak/useKeycloak';

const getInitials = (name: string): string => {
    const words = name.trim().split(/\s+/);
    const first = words.at(0) ?? '';
    const last = words.at(-1) ?? '';
    return words.length === 1
        ? first.charAt(0).toUpperCase()
        : `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
};

const UserMenu: React.FunctionComponent = () => {
    const { t } = useTranslation();
    const { keycloak } = useKeycloak();
    const { user } = useCurrentAppUser();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);
    const handleClose = React.useCallback(() => {
        setAnchorEl(null);
    }, []);

    const tokenParsed = keycloak.tokenParsed as
        { email?: string; name?: string; preferred_username?: string } | undefined;

    const displayName =
        user?.name ?? tokenParsed?.name ?? user?.username ?? tokenParsed?.preferred_username;
    const email = user?.email ?? tokenParsed?.email;
    const avatarUrl = user?.avatarUrl ?? undefined;

    return (
        <React.Fragment>
            <ButtonBase
                aria-controls={open ? 'user-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                aria-label="user-menu-toggle"
                data-screenshot="toggle-user-menu"
                onClick={handleClick}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    padding: '2px 10px 2px 2px',
                    borderRadius: 24,
                    border: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Avatar
                    src={avatarUrl}
                    sx={{
                        height: 28,
                        width: 28,
                        fontSize: '12px',
                        fontWeight: 700,
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                    }}
                >
                    {!avatarUrl && displayName ? getInitials(displayName) : null}
                </Avatar>
                {displayName ? (
                    <Typography
                        noWrap
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            maxWidth: 140,
                            fontSize: '13px',
                        }}
                    >
                        {displayName}
                    </Typography>
                ) : null}
            </ButtonBase>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                id="user-menu"
                onClick={handleClose}
                onClose={handleClose}
                open={open}
                slotProps={{
                    paper: {
                        variant: 'outlined',
                        elevation: 0,
                        sx: { my: '4px', minWidth: 200 },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
                {displayName || email ? (
                    <React.Fragment>
                        <Typography
                            noWrap
                            sx={{ px: 2, pt: 1, pb: email ? 0 : 1, fontWeight: 600 }}
                            variant="body2"
                        >
                            {displayName}
                        </Typography>
                        {email ? (
                            <Typography
                                color="text.secondary"
                                noWrap
                                sx={{ px: 2, pb: 1 }}
                                variant="caption"
                            >
                                {email}
                            </Typography>
                        ) : null}
                        <Divider />
                    </React.Fragment>
                ) : null}
                <MenuItem
                    component={RouterLink}
                    to="/profile"
                >
                    <ListItemIcon>
                        <AccountCircleIcon fontSize="small" />
                    </ListItemIcon>
                    {t('components.usermenu.profile')}
                </MenuItem>
                <MenuItem onClick={() => void keycloak.logout()}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    {t('auth.logout')}
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
};

export default UserMenu;
