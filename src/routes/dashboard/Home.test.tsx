import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Home from './Home';
import type { EnlargerRead, FilmRead, PrintRead, PrintSessionRead } from '~/api/client';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string, opts?: Record<string, unknown>) =>
            opts ? `${key}:${JSON.stringify(opts)}` : key,
    }),
}));

const enlarger: EnlargerRead = {
    '@id': '/enlargers/1',
    '@type': 'enlarger',
    id: '1',
    name: 'Durst M670',
    manufacturer: {
        '@id': '/manufacturers/1',
        '@type': 'manufacturer',
        name: 'Durst',
        status: 'official',
    },
    status: 'official',
};

const session: PrintSessionRead = {
    '@id': '/print_sessions/1',
    '@type': 'PrintSession',
    id: '1',
    date: '2026-07-18',
    lab: 'Atelier Grenelle',
    number: 14,
    enlarger: { '@id': '/enlargers/1', '@type': 'enlarger', createdAt: null, updatedAt: null },
    temperatureCelsius: 20,
};

const print: PrintRead = {
    '@id': '/prints/1',
    '@type': 'Print',
    id: '1',
    session: {
        '@id': '/print_sessions/1',
        '@type': 'PrintSession',
        createdAt: null,
        updatedAt: null,
    },
    number: 1,
    photoPaper: {
        '@id': '/photo_papers/1',
        '@type': 'photoPaper',
        createdAt: null,
        updatedAt: null,
    },
    exposures: [
        {
            id: '1',
            order: 1,
            kind: 'base',
            baseSeconds: 12,
            grade: '2.5',
        },
    ],
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

const mockApiPrintSessionsGetCollection = vi.fn();
const mockApiPrintsGetCollection = vi.fn();
const mockApiFilmsGetCollection = vi.fn();
const mockApiEnlargersIdGet = vi.fn();
vi.mock('~/api/client', async () => {
    const actual = await vi.importActual('~/api/client');
    return {
        ...actual,
        usePrintSessionApi: () => ({
            printSessionApi: {
                apiPrintSessionsGetCollection: mockApiPrintSessionsGetCollection,
            },
        }),
        usePrintApi: () => ({ printApi: { apiPrintsGetCollection: mockApiPrintsGetCollection } }),
        useFilmApi: () => ({ filmApi: { apiFilmsGetCollection: mockApiFilmsGetCollection } }),
        useEnlargerApi: () => ({
            enlargerApi: { apiEnlargersIdGet: mockApiEnlargersIdGet },
        }),
    };
});

const renderHome = () =>
    render(
        <MemoryRouter>
            <Home />
        </MemoryRouter>,
    );

describe('Home', () => {
    beforeEach(() => {
        mockApiPrintSessionsGetCollection.mockReset();
        mockApiPrintsGetCollection.mockReset();
        mockApiFilmsGetCollection.mockReset();
        mockApiEnlargersIdGet.mockReset().mockResolvedValue({ data: enlarger });
    });

    it('shows a loading indicator while the dashboard data is being fetched', () => {
        mockApiPrintSessionsGetCollection.mockReturnValue(new Promise(() => {}));
        mockApiPrintsGetCollection.mockReturnValue(new Promise(() => {}));
        mockApiFilmsGetCollection.mockReturnValue(new Promise(() => {}));
        renderHome();
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('shows an error message when the request fails', async () => {
        mockApiPrintSessionsGetCollection.mockRejectedValue(new Error('boom'));
        mockApiPrintsGetCollection.mockResolvedValue({ data: { 'hydra:member': [] } });
        mockApiFilmsGetCollection.mockResolvedValue({ data: { 'hydra:member': [] } });
        renderHome();
        expect(await screen.findByText('errors.api.loadingData')).toBeInTheDocument();
    });

    it('renders stats, recent sessions and a films preview', async () => {
        mockApiPrintSessionsGetCollection.mockResolvedValue({
            data: { 'hydra:member': [session] },
        });
        mockApiPrintsGetCollection.mockResolvedValue({ data: { 'hydra:member': [print] } });
        mockApiFilmsGetCollection.mockResolvedValue({ data: { 'hydra:member': [film] } });

        renderHome();

        expect(
            await screen.findByText('sessions.list.numberLabel:{"number":14}'),
        ).toBeInTheDocument();
        expect(screen.getByText('Portra 400')).toBeInTheDocument();
        expect(
            screen.getByText('home.stats.medianBaseValue:{"seconds":"12.0"}'),
        ).toBeInTheDocument();
    });

    it('shows a placeholder when there is no session yet', async () => {
        mockApiPrintSessionsGetCollection.mockResolvedValue({ data: { 'hydra:member': [] } });
        mockApiPrintsGetCollection.mockResolvedValue({ data: { 'hydra:member': [] } });
        mockApiFilmsGetCollection.mockResolvedValue({ data: { 'hydra:member': [] } });

        renderHome();

        expect(await screen.findByText('home.noSessions')).toBeInTheDocument();
    });
});
