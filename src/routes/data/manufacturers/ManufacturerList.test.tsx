import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import ManufacturerList from './ManufacturerList';
import type { ChemistryRead, FilmRead, ManufacturerRead } from '~/api/client';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string, opts?: { count?: number }) =>
            `${key}${opts?.count !== undefined ? `:${String(opts.count)}` : ''}`,
    }),
}));

const kodak: ManufacturerRead = {
    '@id': '/manufacturers/1',
    '@type': 'manufacturer',
    id: '1',
    name: 'Kodak',
};
const ilford: ManufacturerRead = {
    '@id': '/manufacturers/2',
    '@type': 'manufacturer',
    id: '2',
    name: 'Ilford',
};

const film: FilmRead = {
    '@id': '/films/1',
    '@type': 'film',
    id: '1',
    name: 'Portra 400',
    description: '',
    process: 'C-41',
    sensibility: 400,
    manufacturer: { '@id': '/manufacturers/1', '@type': 'manufacturer', id: '1', name: 'Kodak' },
};

const chemistry: ChemistryRead = {
    '@id': '/chemistries/1',
    '@type': 'chemistry',
    id: '1',
    name: 'D-76',
    process: 'B&W',
    chemistryType: {
        '@id': '/chemistry_types/1',
        '@type': 'chemistryType',
        typeCode: 'DEV',
        typeLabel: 'Developer',
    },
    manufacturer: { '@id': '/manufacturers/1', '@type': 'manufacturer', name: 'Kodak' },
};

const mockApiManufacturersGetCollection = vi.fn();
const mockApiFilmsGetCollection = vi.fn();
const mockApiChemistriesGetCollection = vi.fn();
vi.mock('~/api/client', async () => {
    const actual = await vi.importActual('~/api/client');
    return {
        ...actual,
        useManufacturerApi: () => ({
            manufacturerApi: { apiManufacturersGetCollection: mockApiManufacturersGetCollection },
        }),
        useFilmApi: () => ({ filmApi: { apiFilmsGetCollection: mockApiFilmsGetCollection } }),
        useChemistryApi: () => ({
            chemistryApi: { apiChemistriesGetCollection: mockApiChemistriesGetCollection },
        }),
    };
});

const renderManufacturerList = () =>
    render(
        <MemoryRouter>
            <ManufacturerList />
        </MemoryRouter>,
    );

describe('ManufacturerList', () => {
    beforeEach(() => {
        mockApiManufacturersGetCollection.mockReset();
        mockApiFilmsGetCollection.mockReset();
        mockApiChemistriesGetCollection.mockReset();
    });

    it('shows a loading indicator while manufacturers are being fetched', () => {
        mockApiManufacturersGetCollection.mockReturnValue(new Promise(() => {}));
        mockApiFilmsGetCollection.mockReturnValue(new Promise(() => {}));
        mockApiChemistriesGetCollection.mockReturnValue(new Promise(() => {}));
        renderManufacturerList();
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('shows an error message when the request fails', async () => {
        mockApiManufacturersGetCollection.mockRejectedValue(new Error('boom'));
        mockApiFilmsGetCollection.mockResolvedValue({ data: { 'hydra:member': [] } });
        mockApiChemistriesGetCollection.mockResolvedValue({ data: { 'hydra:member': [] } });
        renderManufacturerList();
        expect(await screen.findByText('errors.api.loadingData')).toBeInTheDocument();
    });

    it('renders manufacturers with derived film and chemistry counts', async () => {
        mockApiManufacturersGetCollection.mockResolvedValue({
            data: { 'hydra:member': [kodak, ilford] },
        });
        mockApiFilmsGetCollection.mockResolvedValue({ data: { 'hydra:member': [film] } });
        mockApiChemistriesGetCollection.mockResolvedValue({
            data: { 'hydra:member': [chemistry] },
        });

        renderManufacturerList();

        expect(await screen.findByText('Kodak')).toBeInTheDocument();
        expect(screen.getByText('Ilford')).toBeInTheDocument();
        // 1 film + 1 chemistry, both attributed to Kodak
        expect(screen.getAllByText('1')).toHaveLength(2);
    });
});
