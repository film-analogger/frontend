import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import ManufacturerDetail from './ManufacturerDetail';
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
    website: 'kodak.com',
    status: 'official',
};

const film: FilmRead = {
    '@id': '/films/1',
    '@type': 'film',
    id: '1',
    name: 'Portra 400',
    description: '',
    process: 'C-41',
    sensibility: 400,
    manufacturer: {
        '@id': '/manufacturers/1',
        '@type': 'manufacturer',
        id: '1',
        name: 'Kodak',
        status: 'official',
    },
    status: 'official',
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
        status: 'official',
    },
    manufacturer: {
        '@id': '/manufacturers/1',
        '@type': 'manufacturer',
        name: 'Kodak',
        status: 'official',
    },
    status: 'official',
};

const mockApiManufacturersIdGet = vi.fn();
const mockApiFilmsGetCollection = vi.fn();
const mockApiChemistriesGetCollection = vi.fn();
vi.mock('~/api/client', async () => {
    const actual = await vi.importActual('~/api/client');
    return {
        ...actual,
        useManufacturerApi: () => ({
            manufacturerApi: { apiManufacturersIdGet: mockApiManufacturersIdGet },
        }),
        useFilmApi: () => ({ filmApi: { apiFilmsGetCollection: mockApiFilmsGetCollection } }),
        useChemistryApi: () => ({
            chemistryApi: { apiChemistriesGetCollection: mockApiChemistriesGetCollection },
        }),
    };
});

const renderManufacturerDetail = () =>
    render(
        <MemoryRouter initialEntries={['/data/manufacturers/1']}>
            <Routes>
                <Route
                    element={<ManufacturerDetail />}
                    path="/data/manufacturers/:manufacturerId"
                />
            </Routes>
        </MemoryRouter>,
    );

describe('ManufacturerDetail', () => {
    beforeEach(() => {
        mockApiManufacturersIdGet.mockReset();
        mockApiFilmsGetCollection.mockReset();
        mockApiChemistriesGetCollection.mockReset();
    });

    it('shows a loading indicator while the manufacturer is being fetched', () => {
        mockApiManufacturersIdGet.mockReturnValue(new Promise(() => {}));
        mockApiFilmsGetCollection.mockReturnValue(new Promise(() => {}));
        mockApiChemistriesGetCollection.mockReturnValue(new Promise(() => {}));
        renderManufacturerDetail();
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders the manufacturer name, website, films and chemistries', async () => {
        mockApiManufacturersIdGet.mockResolvedValue({ data: kodak });
        mockApiFilmsGetCollection.mockResolvedValue({ data: { 'hydra:member': [film] } });
        mockApiChemistriesGetCollection.mockResolvedValue({
            data: { 'hydra:member': [chemistry] },
        });

        renderManufacturerDetail();

        expect((await screen.findAllByText('Kodak')).length).toBeGreaterThan(0);
        expect(screen.getByText('kodak.com')).toBeInTheDocument();
        expect(screen.getByText('D-76')).toBeInTheDocument();
    });

    it('shows placeholder messages when there is no film or chemistry', async () => {
        mockApiManufacturersIdGet.mockResolvedValue({ data: kodak });
        mockApiFilmsGetCollection.mockResolvedValue({ data: { 'hydra:member': [] } });
        mockApiChemistriesGetCollection.mockResolvedValue({ data: { 'hydra:member': [] } });

        renderManufacturerDetail();

        expect(await screen.findByText('manufacturers.detail.noFilms')).toBeInTheDocument();
        expect(screen.getByText('manufacturers.detail.noChemistries')).toBeInTheDocument();
    });
});
