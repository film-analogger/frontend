import { useMemo } from 'react';
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
    type ChemistryJsonldReadChemistryTranslatableReadTimestampableBlameableReadCatalogStatusRead,
    type ChemistryTypeJsonldReadChemistryTypeTranslatableReadTimestampableBlameableReadCatalogStatusRead,
    type DilutionJsonldReadChemistryTranslatableReadTimestampableBlameableReadCatalogStatusRead,
    type ExposureJsonldReadPrintTimestampableBlameableRead,
    type FilmJsonldReadFilmTranslatableReadTimestampableBlameableReadCatalogStatusRead,
    type ManufacturerJsonldReadManufacturerTimestampableBlameableReadTranslatableReadCatalogStatusRead,
    type PrintJsonldReadPrintTimestampableBlameableRead,
    type PrintSessionJsonldReadPrintSessionTimestampableBlameableRead,
} from './filmAnaloggerApi';
import { useTranslation } from 'react-i18next';

export type FilmRead =
    FilmJsonldReadFilmTranslatableReadTimestampableBlameableReadCatalogStatusRead;
export type AppUserRead = AppUserJsonldReadAppUserTimestampableBlameableRead;
export type ManufacturerRead =
    ManufacturerJsonldReadManufacturerTimestampableBlameableReadTranslatableReadCatalogStatusRead;
export type ChemistryRead =
    ChemistryJsonldReadChemistryTranslatableReadTimestampableBlameableReadCatalogStatusRead;
export type ChemistryTypeRead =
    ChemistryTypeJsonldReadChemistryTypeTranslatableReadTimestampableBlameableReadCatalogStatusRead;
export type DilutionRead =
    DilutionJsonldReadChemistryTranslatableReadTimestampableBlameableReadCatalogStatusRead;
export type PrintSessionRead = PrintSessionJsonldReadPrintSessionTimestampableBlameableRead;
export type PrintRead = PrintJsonldReadPrintTimestampableBlameableRead;
export type ExposureRead = ExposureJsonldReadPrintTimestampableBlameableRead;
export type ChemicalBathRead = ChemicalBathJsonldReadPrintSessionTimestampableBlameableRead;

const useApiConfiguration = () => {
    const { keycloak } = useKeycloak();

    const { i18n } = useTranslation();

    return useMemo(
        () =>
            new Configuration({
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
            }),
        [keycloak, i18n.language],
    );
};

const useFilmApi = () => {
    const configuration = useApiConfiguration();
    const filmApi = useMemo(() => new FilmApi(configuration), [configuration]);

    return { filmApi };
};

const useAppUserApi = () => {
    const configuration = useApiConfiguration();
    const appUserApi = useMemo(() => new AppUserApi(configuration), [configuration]);

    return { appUserApi };
};

const useManufacturerApi = () => {
    const configuration = useApiConfiguration();
    const manufacturerApi = useMemo(() => new ManufacturerApi(configuration), [configuration]);

    return { manufacturerApi };
};

const useChemistryApi = () => {
    const configuration = useApiConfiguration();
    const chemistryApi = useMemo(() => new ChemistryApi(configuration), [configuration]);

    return { chemistryApi };
};

const useChemistryTypeApi = () => {
    const configuration = useApiConfiguration();
    const chemistryTypeApi = useMemo(() => new ChemistryTypeApi(configuration), [configuration]);

    return { chemistryTypeApi };
};

const usePrintApi = () => {
    const configuration = useApiConfiguration();
    const printApi = useMemo(() => new PrintApi(configuration), [configuration]);

    return { printApi };
};

const usePrintSessionApi = () => {
    const configuration = useApiConfiguration();
    const printSessionApi = useMemo(() => new PrintSessionApi(configuration), [configuration]);

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
