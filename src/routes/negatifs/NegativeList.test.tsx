import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import NegativeList from './NegativeList';
import type { DevelopmentLogRead, FilmRead } from '~/api/client';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string, opts?: Record<string, unknown>) =>
            opts ? `${key}:${JSON.stringify(opts)}` : key,
        i18n: { language: 'en' },
    }),
}));

const film: FilmRead = {
    '@id': '/films/1',
    '@type': 'film',
    id: '1',
    name: 'HP5 Plus',
    description: '',
    process: 'B&W',
    sensibility: 400,
    manufacturer: {
        '@id': '/manufacturers/1',
        '@type': 'manufacturer',
        id: '1',
        name: 'Ilford',
        status: 'official',
    },
    status: 'official',
};

const makeLog = (overrides: Partial<DevelopmentLogRead>): DevelopmentLogRead => ({
    '@id': '/development_logs/1',
    '@type': 'DevelopmentLog',
    id: '1',
    film: { '@id': '/films/1', '@type': 'film', createdAt: null, updatedAt: null },
    shotAt: { year: 2026, month: 7, label: '2026-07' },
    isoShotAt: 800,
    process: 'B&W',
    developedAt: '2026-07-12',
    steps: [],
    ...overrides,
});

const mockApiDevelopmentLogsGetCollection = vi.fn();
const mockApiFilmsIdGet = vi.fn();
const mockApiCamerasIdGet = vi.fn();
vi.mock('~/api/client', async () => {
    const actual = await vi.importActual('~/api/client');
    return {
        ...actual,
        useDevelopmentLogApi: () => ({
            developmentLogApi: {
                apiDevelopmentLogsGetCollection: mockApiDevelopmentLogsGetCollection,
            },
        }),
        useFilmApi: () => ({ filmApi: { apiFilmsIdGet: mockApiFilmsIdGet } }),
        useCameraApi: () => ({ cameraApi: { apiCamerasIdGet: mockApiCamerasIdGet } }),
    };
});

const renderNegativeList = () =>
    render(
        <MemoryRouter>
            <NegativeList />
        </MemoryRouter>,
    );

describe('NegativeList', () => {
    beforeEach(() => {
        mockApiDevelopmentLogsGetCollection.mockReset();
        mockApiFilmsIdGet.mockReset();
        mockApiCamerasIdGet.mockReset();
        mockApiFilmsIdGet.mockResolvedValue({ data: film });
        mockApiCamerasIdGet.mockResolvedValue({ data: {} });
    });

    it('shows a loading indicator while development logs are being fetched', () => {
        mockApiDevelopmentLogsGetCollection.mockReturnValue(new Promise(() => {}));
        renderNegativeList();
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('shows an error message when the request fails', async () => {
        mockApiDevelopmentLogsGetCollection.mockRejectedValue(new Error('boom'));
        renderNegativeList();
        expect(await screen.findByText('errors.api.loadingData')).toBeInTheDocument();
    });

    it('renders the fetched development logs grouped by month', async () => {
        mockApiDevelopmentLogsGetCollection.mockResolvedValue({
            data: { 'hydra:member': [makeLog({})] },
        });
        renderNegativeList();
        expect(await screen.findByText('Ilford')).toBeInTheDocument();
        expect(screen.getByText('HP5 Plus')).toBeInTheDocument();
    });

    it('filters development logs by process when a filter chip is clicked', async () => {
        mockApiDevelopmentLogsGetCollection.mockResolvedValue({
            data: {
                'hydra:member': [
                    makeLog({ id: '1', '@id': '/development_logs/1', process: 'B&W' }),
                    makeLog({ id: '2', '@id': '/development_logs/2', process: 'C-41' }),
                ],
            },
        });
        renderNegativeList();
        await waitFor(() => {
            expect(screen.getByText('B&W · 1')).toBeInTheDocument();
        });
        expect(screen.getAllByText('HP5 Plus')).toHaveLength(2);

        fireEvent.click(screen.getByText('C-41 · 1'));

        expect(screen.getAllByText('HP5 Plus')).toHaveLength(1);
    });
});
