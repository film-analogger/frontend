import Keycloak from 'keycloak-js';

import { createE2eKeycloak } from './e2eKeycloak';

const config = {
    url: import.meta.env.VITE_KEYCLOAK_URL ?? 'http://localhost:8080',
    realm: import.meta.env.VITE_KEYCLOAK_REALM ?? 'film-analogger',
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID ?? 'film-analogger-frontend',
};

// `import.meta.env.DEV` is replaced by `false` at build time, so the stub is
// dropped from production bundles instead of being a reachable auth bypass.
const keycloak =
    import.meta.env.DEV && import.meta.env.VITE_E2E_AUTH === 'true'
        ? createE2eKeycloak(config)
        : new Keycloak(config);

export default keycloak;
