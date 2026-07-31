import React from 'react';
import { useChemistryApi, useFilmApi, useManufacturerApi, usePrintSessionApi } from '~/api/client';

interface NavCounts {
    films?: number;
    chemistries?: number;
    manufacturers?: number;
    sessions?: number;
}

export const useNavCounts = (): NavCounts => {
    const { filmApi } = useFilmApi();
    const { chemistryApi } = useChemistryApi();
    const { manufacturerApi } = useManufacturerApi();
    const { printSessionApi } = usePrintSessionApi();

    const [counts, setCounts] = React.useState<NavCounts>({});

    React.useEffect(() => {
        let cancelled = false;

        const load = async () => {
            const [films, chemistries, manufacturers, sessions] = await Promise.all([
                filmApi.apiFilmsGetCollection().catch(() => null),
                chemistryApi.apiChemistriesGetCollection().catch(() => null),
                manufacturerApi.apiManufacturersGetCollection().catch(() => null),
                printSessionApi.apiPrintSessionsGetCollection().catch(() => null),
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
            });
        };

        load().catch(() => {
            // Badges are a non-critical enhancement: fetch failures leave them blank.
        });

        return () => {
            cancelled = true;
        };
    }, [filmApi, chemistryApi, manufacturerApi, printSessionApi]);

    return counts;
};
