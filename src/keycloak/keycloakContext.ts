import type Keycloak from 'keycloak-js';
import { createContext } from 'react';

export interface KeycloakContextValue {
    authenticated: boolean;
    keycloak: Keycloak;
}

export const KeycloakContext = createContext<KeycloakContextValue | null>(null);
