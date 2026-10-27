import { fetchAllHydraPages } from './hydraPagination';

describe('fetchAllHydraPages', () => {
    it('returns every member when the collection fits on a single page', async () => {
        const fetchPage = vi.fn().mockResolvedValue({
            data: { 'hydra:member': [1, 2, 3] },
        });

        const items = await fetchAllHydraPages(fetchPage);

        expect(items).toEqual([1, 2, 3]);
        expect(fetchPage).toHaveBeenCalledTimes(1);
        expect(fetchPage).toHaveBeenCalledWith(1);
    });

    it('walks every page until hydra:view.hydra:next is absent', async () => {
        const fetchPage = vi
            .fn()
            .mockResolvedValueOnce({
                data: { 'hydra:member': [1, 2], 'hydra:view': { 'hydra:next': '/items?page=2' } },
            })
            .mockResolvedValueOnce({
                data: { 'hydra:member': [3, 4], 'hydra:view': { 'hydra:next': '/items?page=3' } },
            })
            .mockResolvedValueOnce({
                data: { 'hydra:member': [5] },
            });

        const items = await fetchAllHydraPages(fetchPage);

        expect(items).toEqual([1, 2, 3, 4, 5]);
        expect(fetchPage).toHaveBeenCalledTimes(3);
        expect(fetchPage).toHaveBeenNthCalledWith(1, 1);
        expect(fetchPage).toHaveBeenNthCalledWith(2, 2);
        expect(fetchPage).toHaveBeenNthCalledWith(3, 3);
    });

    it('returns an empty array for an empty collection', async () => {
        const fetchPage = vi.fn().mockResolvedValue({ data: { 'hydra:member': [] } });

        const items = await fetchAllHydraPages(fetchPage);

        expect(items).toEqual([]);
    });
});
