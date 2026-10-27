import { Box, Button, CircularProgress, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import keycloak from './keycloak';
import { KeycloakContext } from './keycloakContext';

interface KeycloakProviderProps {
    readonly children: React.ReactNode;
}

const KeycloakProvider: React.FunctionComponent<KeycloakProviderProps> = ({ children }) => {
    const { t } = useTranslation();
    const [initialized, setInitialized] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [initError, setInitError] = useState(false);

    useEffect(() => {
        keycloak
            .init({ onLoad: 'login-required', checkLoginIframe: false })
            .then((auth) => {
                setAuthenticated(auth);
                setInitialized(true);

                keycloak.onTokenExpired = () => {
                    keycloak.updateToken(30).catch(() => {
                        void keycloak.login();
                    });
                };
            })
            .catch(() => {
                setInitError(true);
                setInitialized(true);
            });
    }, []);

    if (initialized && authenticated) {
        return (
            <KeycloakContext.Provider value={{ authenticated, keycloak }}>
                {children}
            </KeycloakContext.Provider>
        );
    }

    return (
        <Box
            aria-label={t('app.loading')}
            aria-live="polite"
            role="status"
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'background.default',
                p: 4,
            }}
        >
            {initError ? (
                <React.Fragment>
                    <Typography
                        color="error"
                        variant="body2"
                    >
                        {t('auth.error')}
                    </Typography>
                    <Button
                        onClick={() => {
                            window.location.reload();
                        }}
                        startIcon={<RefreshIcon />}
                    >
                        {t('errors.actions.reload')}
                    </Button>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <CircularProgress aria-label={t('app.loading')} />
                    <Typography variant="body2">{t('auth.loading')}</Typography>
                </React.Fragment>
            )}
        </Box>
    );
};

export default KeycloakProvider;
