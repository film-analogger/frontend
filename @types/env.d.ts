interface ImportMetaEnv {
    readonly VITE_KEYCLOAK_URL?: string;
    readonly VITE_KEYCLOAK_REALM?: string;
    readonly VITE_KEYCLOAK_CLIENT_ID?: string;
    /** Only set by the dev server Playwright starts. See src/keycloak/e2eKeycloak.ts */
    readonly VITE_E2E_AUTH?: string;
}
