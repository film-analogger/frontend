import Keycloak, { type KeycloakConfig } from 'keycloak-js';

/**
 * Keycloak instance that reports an authenticated user without talking to a
 * Keycloak server, so the Playwright suite can exercise the app itself.
 *
 * Only ever built from a dev server started with `VITE_E2E_AUTH=true`, and the
 * call site in `keycloak.ts` is additionally guarded by `import.meta.env.DEV`
 * so a production build cannot reach this code.
 */
export const createE2eKeycloak = (config: KeycloakConfig): Keycloak => {
    const keycloak = new Keycloak(config);

    keycloak.authenticated = true;
    keycloak.token = 'e2e-access-token';
    keycloak.init = () => Promise.resolve(true);
    keycloak.updateToken = () => Promise.resolve(false);
    keycloak.login = () => Promise.resolve();
    keycloak.logout = () => Promise.resolve();

    return keycloak;
};
