import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PageLoader } from '~/components/Widgets/Loaders/PageLoader';
import keycloak from './keycloak';
import { KeycloakContext } from './keycloakContext';
import { Box } from '@mui/material';

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

    return initialized && authenticated ? (
        <KeycloakContext.Provider value={{ authenticated, keycloak }}>
            {children}
        </KeycloakContext.Provider>
    ) : (
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
            <PageLoader
                activeStep={0}
                steps={[{ title: t('auth.loading'), hint: t('components.pageLoader.authHint') }]}
            />
        </Box>
    );
};

export default KeycloakProvider;
