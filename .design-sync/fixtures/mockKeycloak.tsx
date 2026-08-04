// Preview-only stand-in for the real KeycloakProvider (src/keycloak/KeycloakProvider.tsx),
// which calls keycloak.init({ onLoad: 'login-required' }) and never resolves outside a real
// Keycloak server. SideMenu's useNavCounts hook reads useKeycloak() unconditionally (via
// useApiConfiguration), so any preview rendering SideMenu needs SOME KeycloakContext value.
// The mock keycloak's updateToken() resolves with a fake token so the accessToken promise
// (created eagerly in useApiConfiguration's useMemo, before any request awaits it) never
// becomes an unhandled rejection. The actual network calls in useNavCounts still fail (no
// real backend in the preview environment) — but that failure surfaces inside each API
// call's own promise chain, where useNavCounts already `.catch(() => null)`s it, so badge
// counts just render blank instead of throwing a page error.
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
