import React from 'react';
import { useKeycloak } from '~/keycloak/useKeycloak';
import { useAppUserApi, type AppUserRead } from './client';

export const useCurrentAppUser = () => {
    const { keycloak } = useKeycloak();
    const { appUserApi } = useAppUserApi();

    const [error, setError] = React.useState<unknown>(null);
    const [loaded, setLoaded] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [user, setUser] = React.useState<AppUserRead | null>(null);

    React.useEffect(() => {
        const fetchCurrentUser = async () => {
            setLoaded(false);
            setLoading(true);
            try {
                const res = await appUserApi.apiAppUsersGetCollection();
                // The API has no `/me` endpoint, so the current user is resolved
                // by matching the Keycloak subject against the collection.
                const currentUser =
                    res.data['hydra:member'].find(
                        (member) => member.keycloakSub === keycloak.subject,
                    ) ?? null;
                setUser(currentUser);
            } catch (err: unknown) {
                console.error('Error fetching current user:', err);
                setError(err);
            } finally {
                setLoaded(true);
                setLoading(false);
            }
        };
        if (!loaded && !loading) {
            fetchCurrentUser().catch(console.error);
        }
    }, [appUserApi, keycloak.subject, loaded, loading]);

    return { error, loaded, loading, user };
};
