import { useKeycloak } from '~/keycloak/useKeycloak';
import {
    AppUserApi,
    ChemistryApi,
    ChemistryTypeApi,
    Configuration,
    FilmApi,
    ManufacturerApi,
    PrintApi,
    PrintSessionApi,
    type AppUserJsonldReadAppUserTimestampableBlameableRead,
    type ChemicalBathJsonldReadPrintSessionTimestampableBlameableRead,
    type ChemistryJsonldReadChemistryTranslatableReadTimestampableBlameableRead,
    type ChemistryTypeJsonldReadChemistryTypeTranslatableReadTimestampableBlameableRead,
    type DilutionJsonldReadChemistryTranslatableReadTimestampableBlameableRead,
    type ExposureJsonldReadPrintTimestampableBlameableRead,
    type FilmJsonldReadFilmTranslatableReadTimestampableBlameableRead,
    type ManufacturerJsonldReadManufacturerTimestampableBlameableReadTranslatableRead,
    type PrintJsonldReadPrintTimestampableBlameableRead,
    type PrintSessionJsonldReadPrintSessionTimestampableBlameableRead,
} from './filmAnaloggerApi';
import { useTranslation } from 'react-i18next';

export type FilmRead = FilmJsonldReadFilmTranslatableReadTimestampableBlameableRead;
export type AppUserRead = AppUserJsonldReadAppUserTimestampableBlameableRead;
export type ManufacturerRead =
    ManufacturerJsonldReadManufacturerTimestampableBlameableReadTranslatableRead;
export type ChemistryRead = ChemistryJsonldReadChemistryTranslatableReadTimestampableBlameableRead;
export type ChemistryTypeRead =
    ChemistryTypeJsonldReadChemistryTypeTranslatableReadTimestampableBlameableRead;
export type DilutionRead = DilutionJsonldReadChemistryTranslatableReadTimestampableBlameableRead;
export type PrintSessionRead = PrintSessionJsonldReadPrintSessionTimestampableBlameableRead;
export type PrintRead = PrintJsonldReadPrintTimestampableBlameableRead;
export type ExposureRead = ExposureJsonldReadPrintTimestampableBlameableRead;
export type ChemicalBathRead = ChemicalBathJsonldReadPrintSessionTimestampableBlameableRead;

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

const useManufacturerApi = () => {
    const configuration = useApiConfiguration();
    const manufacturerApi = new ManufacturerApi(configuration);

    return { manufacturerApi };
};

const useChemistryApi = () => {
    const configuration = useApiConfiguration();
    const chemistryApi = new ChemistryApi(configuration);

    return { chemistryApi };
};

const useChemistryTypeApi = () => {
    const configuration = useApiConfiguration();
    const chemistryTypeApi = new ChemistryTypeApi(configuration);

    return { chemistryTypeApi };
};

const usePrintApi = () => {
    const configuration = useApiConfiguration();
    const printApi = new PrintApi(configuration);

    return { printApi };
};

const usePrintSessionApi = () => {
    const configuration = useApiConfiguration();
    const printSessionApi = new PrintSessionApi(configuration);

    return { printSessionApi };
};

export {
    useFilmApi,
    useAppUserApi,
    useManufacturerApi,
    useChemistryApi,
    useChemistryTypeApi,
    usePrintApi,
    usePrintSessionApi,
};
