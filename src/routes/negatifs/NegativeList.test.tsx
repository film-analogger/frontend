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
const mockApiTagsIdGet = vi.fn();
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
        useTagApi: () => ({ tagApi: { apiTagsIdGet: mockApiTagsIdGet } }),
    };
});

const renderNegativeList = () =>
    render(
        <MemoryRouter>
            <NegativeList />
        </MemoryRouter>,
    );

const selectFilter = async (name: string, optionName: string) => {
    fireEvent.mouseDown(screen.getByRole('combobox', { name }));
    fireEvent.click(await screen.findByRole('option', { name: optionName }));
};

describe('NegativeList', () => {
    beforeEach(() => {
        mockApiDevelopmentLogsGetCollection.mockReset();
        mockApiFilmsIdGet.mockReset();
        mockApiCamerasIdGet.mockReset();
        mockApiTagsIdGet.mockReset();
        mockApiFilmsIdGet.mockResolvedValue({ data: film });
        mockApiCamerasIdGet.mockResolvedValue({ data: {} });
        mockApiTagsIdGet.mockResolvedValue({ data: {} });
    });

    it('shows a loading indicator while development logs are being fetched', () => {
        mockApiDevelopmentLogsGetCollection.mockReturnValue(new Promise(() => {}));
        renderNegativeList();
        expect(screen.getByText('loaders.developmentLog.title')).toBeInTheDocument();
    });

    it('shows an error message when the request fails', async () => {
        mockApiDevelopmentLogsGetCollection.mockRejectedValue(new Error('boom'));
        renderNegativeList();
        expect(await screen.findByText('errors.api.loadingData')).toBeInTheDocument();
    });

    it('renders the fetched development logs as a table', async () => {
        mockApiDevelopmentLogsGetCollection.mockResolvedValue({
            data: { 'hydra:member': [makeLog({})] },
        });
        renderNegativeList();
        expect(await screen.findByText('HP5 Plus')).toBeInTheDocument();
        expect(screen.getByText('Ilford · —')).toBeInTheDocument();
    });

    it('filters development logs by process', async () => {
        mockApiDevelopmentLogsGetCollection.mockResolvedValue({
            data: {
                'hydra:member': [
                    makeLog({ id: '1', '@id': '/development_logs/1', process: 'B&W' }),
                    makeLog({ id: '2', '@id': '/development_logs/2', process: 'C-41' }),
                ],
            },
        });
        renderNegativeList();
        await screen.findAllByText('HP5 Plus');
        expect(screen.getAllByText('HP5 Plus')).toHaveLength(2);

        await selectFilter('negatifs.list.filters.process', 'C-41 (1)');

        await waitFor(() => {
            expect(screen.getAllByText('HP5 Plus')).toHaveLength(1);
        });
    }, 15000);

    it('filters development logs by search text across film and manufacturer', async () => {
        mockApiDevelopmentLogsGetCollection.mockResolvedValue({
            data: { 'hydra:member': [makeLog({})] },
        });
        renderNegativeList();
        await screen.findByText('HP5 Plus');

        fireEvent.change(screen.getByPlaceholderText('negatifs.list.searchPlaceholder'), {
            target: { value: 'nonexistent film name' },
        });

        expect(screen.queryByText('HP5 Plus')).not.toBeInTheDocument();
        expect(screen.getByText('negatifs.list.noResults')).toBeInTheDocument();
    });
});
