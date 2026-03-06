import type Keycloak from 'keycloak-js';
import { createContext, useContext } from 'react';

export interface KeycloakContextValue {
    authenticated: boolean;
    keycloak: Keycloak;
}

export const KeycloakContext = createContext<KeycloakContextValue | null>(null);

export const useKeycloak = (): KeycloakContextValue => {
    const context = useContext(KeycloakContext);
    if (!context) {
        throw new Error('useKeycloak must be used within KeycloakProvider');
    }
    return context;
};
