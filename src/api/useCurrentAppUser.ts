import React from 'react';
import { useAppUserApi, type AppUserRead } from './client';

export const useCurrentAppUser = () => {
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
                const res = await appUserApi.me();
                setUser(res.data);
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
    }, [appUserApi, loaded, loading]);

    return { error, loaded, loading, user };
};
