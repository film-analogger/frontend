import { useContext } from 'react';
import { KeycloakContext, type KeycloakContextValue } from './keycloakContext';

export const useKeycloak = (): KeycloakContextValue => {
    const context = useContext(KeycloakContext);
    if (!context) {
        throw new Error('useKeycloak must be used within KeycloakProvider');
    }
    return context;
};
