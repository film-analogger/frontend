// Preview-only stand-in for the real KeycloakProvider (src/keycloak/KeycloakProvider.tsx),
// which calls keycloak.init({ onLoad: 'login-required' }) and never resolves outside a real
// Keycloak server. 
import React from 'react';
import type Keycloak from 'keycloak-js';
import { KeycloakContext } from '~/keycloak/keycloakContext';

const mockKeycloak = {
    token: 'design-sync-preview-token',
    updateToken: () => Promise.resolve(true),
} as unknown as Keycloak;

export const MockKeycloakProvider: React.FunctionComponent<{
    readonly children: React.ReactNode;
}> = ({ children }) => (
    <KeycloakContext.Provider value={{ authenticated: true, keycloak: mockKeycloak }}>
        {children}
    </KeycloakContext.Provider>
);
