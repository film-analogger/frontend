import { useKeycloak } from '~/keycloak/useKeycloak';
import {
    Configuration,
    FilmApi,
    type FilmJsonldReadFilmTranslatableReadTimestampableBlameableRead,
} from './filmAnaloggerApi';
import { useTranslation } from 'react-i18next';

export type FilmRead = FilmJsonldReadFilmTranslatableReadTimestampableBlameableRead;

const useFilmApi = () => {
    const { keycloak } = useKeycloak();

    const { i18n } = useTranslation();

    const configuration = new Configuration({
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
    const filmApi = new FilmApi(configuration);

    return { filmApi };
};

export { useFilmApi };
