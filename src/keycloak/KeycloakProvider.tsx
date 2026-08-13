import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PageLoader } from '~/components/Widgets/Loaders/PageLoader';
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

    return initialized && authenticated ? (
        <KeycloakContext.Provider value={{ authenticated, keycloak }}>
            {children}
        </KeycloakContext.Provider>
    ) : (
        <PageLoader
            activeStep={0}
            steps={[{ title: t('auth.loading'), hint: t('components.pageLoader.authHint') }]}
        />
    );
};

export default KeycloakProvider;
