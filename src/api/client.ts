import createClient from 'openapi-fetch';

import type { components, paths } from './schema';
import { useKeycloak } from '~/keycloak/useKeycloak';

export type Film =
    components['schemas']['Film-read-film_translatable-read_timestampable-blameable-read'];

const useClientApi = () => {
    const { keycloak } = useKeycloak();

    const client = createClient<paths>({ baseUrl: 'http://localhost:1080' });

    client.use({
        async onRequest({ request }) {
            if (!keycloak.authenticated) {
                throw new Error('User is not authenticated');
            }
            await keycloak.updateToken(5).catch((err: unknown) => {
                console.error('Failed to refresh token', err);
                throw new Error('Fail to refresh token');
            });
            if (!keycloak.token) {
                throw new Error('No token available');
            }
            request.headers.set('Authorization', `Bearer ${keycloak.token}`);
            return request;
        },
    });

    return { client };
};

const useFilmApi = () => {
    const { client } = useClientApi();

    const getFilms = async () => {
        const { data, error } = await client.GET('/films');

        if (error) {
            console.log('error', error);
            // switch (error.status) {
            //     case 401:
            //         throw new Error('Unauthorized: Please log in to access this resource.');
            //     case 403:
            //         throw new Error('Forbidden: You do not have permission to access this resource.');
            //     default:
            //         throw new Error(`Failed to fetch films: ${error.message}`);
            // }
            throw new Error(`Failed to fetch films`);
        }
        console.log('data', data);

        const content = data as { 'hydra:member'?: Film[] };
        return content['hydra:member'] ?? [];
    };

    return { getFilms };
};

export { useClientApi, useFilmApi };
