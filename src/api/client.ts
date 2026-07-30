import { useKeycloak } from '~/keycloak/useKeycloak';
import {
    AppUserApi,
    Configuration,
    FilmApi,
    type AppUserJsonldReadAppUserTimestampableBlameableRead,
    type FilmJsonldReadFilmTranslatableReadTimestampableBlameableRead,
} from './filmAnaloggerApi';
import { useTranslation } from 'react-i18next';

export type FilmRead = FilmJsonldReadFilmTranslatableReadTimestampableBlameableRead;
export type AppUserRead = AppUserJsonldReadAppUserTimestampableBlameableRead;

const useApiConfiguration = () => {
    const { keycloak } = useKeycloak();

    const { i18n } = useTranslation();

    return new Configuration({
        accessToken: keycloak.updateToken(5).then(() => {
            if (!keycloak.token) {
                throw new Error('No token available');
            }
            return keycloak.token;
        }),
        baseOptions: {
            headers: {
                'X-LOCALE': i18n.language,
            },
        },
    });
};

const useFilmApi = () => {
    const configuration = useApiConfiguration();
    const filmApi = new FilmApi(configuration);

    return { filmApi };
};

const useAppUserApi = () => {
    const configuration = useApiConfiguration();
    const appUserApi = new AppUserApi(configuration);

    return { appUserApi };
};

export { useFilmApi, useAppUserApi };
