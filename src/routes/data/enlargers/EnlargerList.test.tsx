import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import EnlargerList from './EnlargerList';
import type { EnlargerRead } from '~/api/client';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string, opts?: { count?: number }) =>
            `${key}${opts?.count !== undefined ? `:${String(opts.count)}` : ''}`,
    }),
}));

const makeEnlarger = (overrides: Partial<EnlargerRead>): EnlargerRead => ({
    '@id': `/enlargers/${overrides.id ?? '1'}`,
    '@type': 'enlarger',
    id: '1',
    name: 'Durst M605',
    lightSource: 'condenser',
    negativeFormats: ['24x36', '6x6'],
    description: '',
    manufacturer: {
        '@id': '/manufacturers/1',
        '@type': 'manufacturer',
        name: 'Durst',
        status: 'official',
    },
    status: 'official',
    ...overrides,
});

const mockApiEnlargersGetCollection = vi.fn();
vi.mock('~/api/client', async () => {
    const actual = await vi.importActual('~/api/client');
    return {
        ...actual,
        useEnlargerApi: () => ({
            enlargerApi: { apiEnlargersGetCollection: mockApiEnlargersGetCollection },
        }),
        useManufacturerApi: () => ({
            manufacturerApi: {
                apiManufacturersGetCollection: vi
                    .fn()
                    .mockResolvedValue({ data: { 'hydra:member': [] } }),
            },
        }),
    };
});

const renderEnlargerList = () =>
    render(
        <MemoryRouter>
            <EnlargerList />
        </MemoryRouter>,
    );

describe('EnlargerList', () => {
    beforeEach(() => {
        mockApiEnlargersGetCollection.mockReset();
    });

    it('shows a loading indicator while enlargers are being fetched', () => {
        mockApiEnlargersGetCollection.mockReturnValue(new Promise(() => {}));
        renderEnlargerList();
        expect(screen.getByText('loaders.enlarger.title')).toBeInTheDocument();
    });

    it('shows an error message when the request fails', async () => {
        mockApiEnlargersGetCollection.mockRejectedValue(new Error('boom'));
        renderEnlargerList();
        expect(await screen.findByText('errors.api.loadingData')).toBeInTheDocument();
    });

    it('renders the fetched enlargers', async () => {
        mockApiEnlargersGetCollection.mockResolvedValue({
            data: { 'hydra:member': [makeEnlarger({ id: '1', name: 'Durst M605' })] },
        });
        renderEnlargerList();
        expect(await screen.findByText('Durst M605')).toBeInTheDocument();
        expect(screen.getByText('Durst')).toBeInTheDocument();
        expect(screen.getByText('24x36')).toBeInTheDocument();
        expect(screen.getByText('6x6')).toBeInTheDocument();
        expect(
            screen.getByText('enlargers.add.fields.lightSourceOptions.condenser'),
        ).toBeInTheDocument();
    });
});
