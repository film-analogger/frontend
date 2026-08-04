import { useMemo } from 'react';
import { useKeycloak } from '~/keycloak/useKeycloak';
import {
    AppUserApi,
    CameraApi,
    ChemistryApi,
    ChemistryTypeApi,
    Configuration,
    DevelopmentLogApi,
    EnlargerApi,
    FilmApi,
    ManufacturerApi,
    PhotoPaperApi,
    PrintApi,
    PrintSessionApi,
    TagApi,
    type AppUserJsonldReadAppUserTimestampableBlameableRead,
    type CameraJsonldReadCameraTranslatableReadTimestampableBlameableReadCatalogStatusRead,
    type ChemicalBathJsonldReadPrintSessionTimestampableBlameableRead,
    type ChemistryJsonldReadChemistryTranslatableReadTimestampableBlameableReadCatalogStatusRead,
    type ChemistryTypeJsonldReadChemistryTypeTranslatableReadTimestampableBlameableReadCatalogStatusRead,
    type DevelopmentLogJsonldReadDevelopmentLogTimestampableBlameableRead,
    type DevelopmentLogJsonldReadDevelopmentLogTimestampableBlameableReadReadFilmReadCameraReadTagTranslatableReadCatalogStatusRead,
    type DilutionJsonldReadChemistryTranslatableReadTimestampableBlameableReadCatalogStatusRead,
    type EnlargerJsonldReadEnlargerTranslatableReadTimestampableBlameableReadCatalogStatusRead,
    type ExposureJsonldReadPrintTimestampableBlameableRead,
    type FilmJsonldReadFilmTranslatableReadTimestampableBlameableReadCatalogStatusRead,
    type ManufacturerJsonldReadManufacturerTimestampableBlameableReadTranslatableReadCatalogStatusRead,
    type PhotoPaperJsonldReadPhotoPaperTranslatableReadTimestampableBlameableReadCatalogStatusRead,
    type PrintJsonldReadPrintTimestampableBlameableRead,
    type PrintSessionJsonldReadPrintSessionReadPrintSessionItemTimestampableBlameableReadReadEnlargerReadChemistryReadPhotoPaperReadPrintTranslatableReadCatalogStatusRead,
    type PrintSessionJsonldReadPrintSessionTimestampableBlameableRead,
    type TagJsonldReadTagTranslatableReadTimestampableBlameableReadCatalogStatusRead,
} from './filmAnaloggerApi';
import { createCachedAxios } from './requestCache';
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
// Returned by apiPrintSessionsIdGet: the chemical baths, prints and their
// exposures come fully nested, so a session detail page needs this single call.
export type PrintSessionDetailRead =
    PrintSessionJsonldReadPrintSessionReadPrintSessionItemTimestampableBlameableReadReadEnlargerReadChemistryReadPhotoPaperReadPrintTranslatableReadCatalogStatusRead;
export type PrintRead = PrintJsonldReadPrintTimestampableBlameableRead;
export type ExposureRead = ExposureJsonldReadPrintTimestampableBlameableRead;
export type ChemicalBathRead = ChemicalBathJsonldReadPrintSessionTimestampableBlameableRead;
export type PhotoPaperRead =
    PhotoPaperJsonldReadPhotoPaperTranslatableReadTimestampableBlameableReadCatalogStatusRead;
export type EnlargerRead =
    EnlargerJsonldReadEnlargerTranslatableReadTimestampableBlameableReadCatalogStatusRead;
export type DevelopmentLogRead = DevelopmentLogJsonldReadDevelopmentLogTimestampableBlameableRead;
// Returned by apiDevelopmentLogsIdGet: film, camera, steps' chemistry and tags
// come fully nested, so a negative detail page needs this single call.
export type DevelopmentLogDetailRead =
    DevelopmentLogJsonldReadDevelopmentLogTimestampableBlameableReadReadFilmReadCameraReadTagTranslatableReadCatalogStatusRead;
export type CameraRead =
    CameraJsonldReadCameraTranslatableReadTimestampableBlameableReadCatalogStatusRead;
export type TagRead = TagJsonldReadTagTranslatableReadTimestampableBlameableReadCatalogStatusRead;

// Shared across every API instance so identical concurrent/rapid GET requests
// (StrictMode's double-effect-invocation, or independent components fetching
// the same collection on mount) are deduplicated and briefly cached.
const cachedAxios = createCachedAxios();

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
    const filmApi = useMemo(
        () => new FilmApi(configuration, undefined, cachedAxios),
        [configuration],
    );

    return { filmApi };
};

const useAppUserApi = () => {
    const configuration = useApiConfiguration();
    const appUserApi = useMemo(
        () => new AppUserApi(configuration, undefined, cachedAxios),
        [configuration],
    );

    return { appUserApi };
};

const useManufacturerApi = () => {
    const configuration = useApiConfiguration();
    const manufacturerApi = useMemo(
        () => new ManufacturerApi(configuration, undefined, cachedAxios),
        [configuration],
    );

    return { manufacturerApi };
};

const useChemistryApi = () => {
    const configuration = useApiConfiguration();
    const chemistryApi = useMemo(
        () => new ChemistryApi(configuration, undefined, cachedAxios),
        [configuration],
    );

    return { chemistryApi };
};

const useChemistryTypeApi = () => {
    const configuration = useApiConfiguration();
    const chemistryTypeApi = useMemo(
        () => new ChemistryTypeApi(configuration, undefined, cachedAxios),
        [configuration],
    );

    return { chemistryTypeApi };
};

const usePrintApi = () => {
    const configuration = useApiConfiguration();
    const printApi = useMemo(
        () => new PrintApi(configuration, undefined, cachedAxios),
        [configuration],
    );

    return { printApi };
};

const usePrintSessionApi = () => {
    const configuration = useApiConfiguration();
    const printSessionApi = useMemo(
        () => new PrintSessionApi(configuration, undefined, cachedAxios),
        [configuration],
    );

    return { printSessionApi };
};

const usePhotoPaperApi = () => {
    const configuration = useApiConfiguration();
    const photoPaperApi = useMemo(
        () => new PhotoPaperApi(configuration, undefined, cachedAxios),
        [configuration],
    );

    return { photoPaperApi };
};

const useEnlargerApi = () => {
    const configuration = useApiConfiguration();
    const enlargerApi = useMemo(
        () => new EnlargerApi(configuration, undefined, cachedAxios),
        [configuration],
    );

    return { enlargerApi };
};

const useDevelopmentLogApi = () => {
    const configuration = useApiConfiguration();
    const developmentLogApi = useMemo(
        () => new DevelopmentLogApi(configuration, undefined, cachedAxios),
        [configuration],
    );

    return { developmentLogApi };
};

const useCameraApi = () => {
    const configuration = useApiConfiguration();
    const cameraApi = useMemo(
        () => new CameraApi(configuration, undefined, cachedAxios),
        [configuration],
    );

    return { cameraApi };
};

const useTagApi = () => {
    const configuration = useApiConfiguration();
    const tagApi = useMemo(
        () => new TagApi(configuration, undefined, cachedAxios),
        [configuration],
    );

    return { tagApi };
};

export {
    useFilmApi,
    useAppUserApi,
    useManufacturerApi,
    useChemistryApi,
    useChemistryTypeApi,
    usePrintApi,
    usePrintSessionApi,
    usePhotoPaperApi,
    useEnlargerApi,
    useDevelopmentLogApi,
    useCameraApi,
    useTagApi,
};
