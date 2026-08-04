import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import SessionList from './SessionList';
import type { PrintRead, PrintSessionRead } from '~/api/client';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string, opts?: Record<string, unknown>) =>
            opts ? `${key}:${JSON.stringify(opts)}` : key,
        i18n: { language: 'en' },
    }),
}));

const session: PrintSessionRead = {
    '@id': '/print_sessions/1',
    '@type': 'PrintSession',
    id: '1',
    date: '2026-07-18',
    lab: 'Atelier Grenelle',
    number: 14,
    enlarger: 'Durst M670',
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
};

const mockApiPrintSessionsGetCollection = vi.fn();
const mockApiPrintsGetCollection = vi.fn();
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
    };
});

const renderSessionList = () =>
    render(
        <MemoryRouter>
            <SessionList />
        </MemoryRouter>,
    );

describe('SessionList', () => {
    beforeEach(() => {
        mockApiPrintSessionsGetCollection.mockReset();
        mockApiPrintsGetCollection.mockReset();
        mockApiPrintsGetCollection.mockResolvedValue({ data: { 'hydra:member': [] } });
    });

    it('shows a loading indicator while sessions are being fetched', () => {
        mockApiPrintSessionsGetCollection.mockReturnValue(new Promise(() => {}));
        renderSessionList();
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('shows an error message when the request fails', async () => {
        mockApiPrintSessionsGetCollection.mockRejectedValue(new Error('boom'));
        renderSessionList();
        expect(await screen.findByText('errors.api.loadingData')).toBeInTheDocument();
    });

    it('renders sessions grouped with their number and lab', async () => {
        mockApiPrintSessionsGetCollection.mockResolvedValue({
            data: { 'hydra:member': [session] },
        });
        renderSessionList();
        expect(
            await screen.findByText('sessions.list.numberLabel:{"number":14}'),
        ).toBeInTheDocument();
        expect(screen.getByText(/Atelier Grenelle/)).toBeInTheDocument();
    });

    it('counts prints for a session from the unfiltered prints collection', async () => {
        mockApiPrintSessionsGetCollection.mockResolvedValue({
            data: { 'hydra:member': [session] },
        });
        mockApiPrintsGetCollection.mockResolvedValue({ data: { 'hydra:member': [print] } });
        renderSessionList();
        const matches = await screen.findAllByText('sessions.list.printsCount:{"count":1}');
        expect(matches.length).toBeGreaterThan(0);
    });

    it('shows a placeholder when there is no session', async () => {
        mockApiPrintSessionsGetCollection.mockResolvedValue({ data: { 'hydra:member': [] } });
        renderSessionList();
        expect(await screen.findByText('home.noSessions')).toBeInTheDocument();
    });
});
