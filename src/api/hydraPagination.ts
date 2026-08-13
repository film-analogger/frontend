interface HydraCollectionResponse<T> {
    'hydra:member': T[];
    'hydra:view'?: {
        'hydra:next'?: string | null;
    };
}

// Every list screen in this app fetches a whole collection up front and
// filters/sorts client-side. Hydra collections are paginated server-side, so
// a single unpaginated call silently truncates to the first page once a
// resource has more rows than the API's page size — this walks every page
// until `hydra:view.hydra:next` is absent.
export const fetchAllHydraPages = async <T>(
    fetchPage: (page: number) => Promise<{ data: HydraCollectionResponse<T> }>,
): Promise<T[]> => {
    const items: T[] = [];
    let page = 1;
    for (;;) {
        const res = await fetchPage(page);
        items.push(...res.data['hydra:member']);
        if (!res.data['hydra:view']?.['hydra:next']) {
            return items;
        }
        page += 1;
    }
};
