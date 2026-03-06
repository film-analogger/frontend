import { Box, CircularProgress, Typography } from '@mui/material';
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
                setInitialized(true);
            });
    }, []);

    if (!initialized) {
        return (
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    height: '100vh',
                    justifyContent: 'center',
                }}
            >
                <CircularProgress />
                <Typography variant="body2">{t('auth.loading')}</Typography>
            </Box>
        );
    }

    return (
        <KeycloakContext.Provider value={{ authenticated, keycloak }}>
            {children}
        </KeycloakContext.Provider>
    );
};

export default KeycloakProvider;
