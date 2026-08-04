import React from 'react';
import {
    useChemistryApi,
    useDevelopmentLogApi,
    useFilmApi,
    useManufacturerApi,
    usePrintSessionApi,
} from '~/api/client';

interface NavCounts {
    films?: number;
    chemistries?: number;
    manufacturers?: number;
    sessions?: number;
    negatives?: number;
}

export const useNavCounts = (): NavCounts => {
    const { filmApi } = useFilmApi();
    const { chemistryApi } = useChemistryApi();
    const { manufacturerApi } = useManufacturerApi();
    const { printSessionApi } = usePrintSessionApi();
    const { developmentLogApi } = useDevelopmentLogApi();

    const [counts, setCounts] = React.useState<NavCounts>({});

    React.useEffect(() => {
        let cancelled = false;

        const load = async () => {
            const [films, chemistries, manufacturers, sessions, negatives] = await Promise.all([
                filmApi.apiFilmsGetCollection().catch(() => null),
                chemistryApi.apiChemistriesGetCollection().catch(() => null),
                manufacturerApi.apiManufacturersGetCollection().catch(() => null),
                printSessionApi.apiPrintSessionsGetCollection().catch(() => null),
                developmentLogApi.apiDevelopmentLogsGetCollection().catch(() => null),
            ]);
            if (cancelled) {
                return;
            }
            setCounts({
                films: films?.data['hydra:totalItems'] ?? films?.data['hydra:member'].length,
                chemistries:
                    chemistries?.data['hydra:totalItems'] ??
                    chemistries?.data['hydra:member'].length,
                manufacturers:
                    manufacturers?.data['hydra:totalItems'] ??
                    manufacturers?.data['hydra:member'].length,
                sessions:
                    sessions?.data['hydra:totalItems'] ?? sessions?.data['hydra:member'].length,
                negatives:
                    negatives?.data['hydra:totalItems'] ?? negatives?.data['hydra:member'].length,
            });
        };

        load().catch(() => {
            // Badges are a non-critical enhancement: fetch failures leave them blank.
        });

        return () => {
            cancelled = true;
        };
    }, [filmApi, chemistryApi, manufacturerApi, printSessionApi, developmentLogApi]);

    return counts;
};
