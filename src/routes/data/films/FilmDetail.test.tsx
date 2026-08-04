import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import FilmDetail from './FilmDetail';
import type { ChemistryRead, FilmRead } from '~/api/client';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string, opts?: Record<string, unknown>) =>
            opts ? `${key}:${JSON.stringify(opts)}` : key,
    }),
}));

const film: FilmRead = {
    '@id': '/films/1',
    '@type': 'film',
    id: '1',
    name: 'Portra 400',
    description: 'A fine grain color negative film.',
    process: 'C-41',
    sensibility: 400,
    emulsionType: 'Color negative',
    inversible: false,
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
    name: 'Flexicolor Developer',
    process: 'C-41',
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

const mockApiFilmsIdGet = vi.fn();
const mockApiChemistriesGetCollection = vi.fn();
vi.mock('~/api/client', async () => {
    const actual = await vi.importActual('~/api/client');
    return {
        ...actual,
        useFilmApi: () => ({ filmApi: { apiFilmsIdGet: mockApiFilmsIdGet } }),
        useChemistryApi: () => ({
            chemistryApi: { apiChemistriesGetCollection: mockApiChemistriesGetCollection },
        }),
    };
});

const renderFilmDetail = () =>
    render(
        <MemoryRouter initialEntries={['/data/films/1']}>
            <Routes>
                <Route
                    element={<FilmDetail />}
                    path="/data/films/:filmId"
                />
            </Routes>
        </MemoryRouter>,
    );

describe('FilmDetail', () => {
    beforeEach(() => {
        mockApiFilmsIdGet.mockReset();
        mockApiChemistriesGetCollection.mockReset();
    });

    it('shows a loading indicator while the film is being fetched', () => {
        mockApiFilmsIdGet.mockReturnValue(new Promise(() => {}));
        mockApiChemistriesGetCollection.mockReturnValue(new Promise(() => {}));
        renderFilmDetail();
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('shows an error message when the request fails', async () => {
        mockApiFilmsIdGet.mockRejectedValue(new Error('boom'));
        mockApiChemistriesGetCollection.mockResolvedValue({ data: { 'hydra:member': [] } });
        renderFilmDetail();
        expect(await screen.findByText('errors.api.loadingData')).toBeInTheDocument();
    });

    it('renders the film name and specs', async () => {
        mockApiFilmsIdGet.mockResolvedValue({ data: film });
        mockApiChemistriesGetCollection.mockResolvedValue({
            data: { 'hydra:member': [chemistry] },
        });
        renderFilmDetail();
        expect(await screen.findByText('Portra 400')).toBeInTheDocument();
        expect(screen.getAllByText('Kodak').length).toBeGreaterThan(0);
        expect(screen.getByText('A fine grain color negative film.')).toBeInTheDocument();
    });

    it('renders compatible chemistries sharing the same process', async () => {
        mockApiFilmsIdGet.mockResolvedValue({ data: film });
        mockApiChemistriesGetCollection.mockResolvedValue({
            data: { 'hydra:member': [chemistry] },
        });
        renderFilmDetail();
        expect(await screen.findByText('Flexicolor Developer')).toBeInTheDocument();
    });

    it('shows a message when no chemistry shares the process', async () => {
        mockApiFilmsIdGet.mockResolvedValue({ data: film });
        mockApiChemistriesGetCollection.mockResolvedValue({
            data: { 'hydra:member': [{ ...chemistry, process: 'E-6' }] },
        });
        renderFilmDetail();
        expect(await screen.findByText('films.detail.noCompatibleChemistries')).toBeInTheDocument();
    });
});
