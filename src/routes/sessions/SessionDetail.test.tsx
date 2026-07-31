import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import SessionDetail from './SessionDetail';
import type { PrintRead, PrintSessionRead } from '~/api/client';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string, opts?: Record<string, unknown>) =>
            opts ? `${key}:${JSON.stringify(opts)}` : key,
    }),
}));

vi.mock('~/domain/preferences', () => ({
    getStopNotation: () => 'fraction',
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
    notes: 'Paper a bit tired at the end of the session.',
    chemicalBaths: [
        {
            chemistry: {
                '@id': '/chemistries/1',
                '@type': 'chemistry',
                createdAt: null,
                updatedAt: null,
            },
            dilutionOverride: null,
            durationSeconds: 90,
            effectiveDilution: '1+9',
        },
    ],
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
    negativeNumber: '12A',
    copies: 2,
    exposures: [
        {
            id: '1',
            order: 1,
            kind: 'base',
            baseSeconds: 12,
            grade: '2.5',
            stopOffsetNumerator: 0,
            stopOffsetDenominator: 1,
            effectiveSeconds: 12,
            observation: 'Good overall density.',
        },
    ],
};

const mockApiPrintSessionsIdGet = vi.fn();
const mockApiPrintsGetCollection = vi.fn();
vi.mock('~/api/client', async () => {
    const actual = await vi.importActual('~/api/client');
    return {
        ...actual,
        usePrintSessionApi: () => ({
            printSessionApi: { apiPrintSessionsIdGet: mockApiPrintSessionsIdGet },
        }),
        usePrintApi: () => ({ printApi: { apiPrintsGetCollection: mockApiPrintsGetCollection } }),
    };
});

const renderSessionDetail = () =>
    render(
        <MemoryRouter initialEntries={['/sessions/1']}>
            <Routes>
                <Route
                    element={<SessionDetail />}
                    path="/sessions/:sessionId"
                />
            </Routes>
        </MemoryRouter>,
    );

describe('SessionDetail', () => {
    beforeEach(() => {
        mockApiPrintSessionsIdGet.mockReset();
        mockApiPrintsGetCollection.mockReset();
    });

    it('shows a loading indicator while the session is being fetched', () => {
        mockApiPrintSessionsIdGet.mockReturnValue(new Promise(() => {}));
        renderSessionDetail();
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('shows an error message when the request fails', async () => {
        mockApiPrintSessionsIdGet.mockRejectedValue(new Error('boom'));
        renderSessionDetail();
        expect(await screen.findByText('errors.api.loadingData')).toBeInTheDocument();
    });

    it('renders the chemical bath dilution and print exposures', async () => {
        mockApiPrintSessionsIdGet.mockResolvedValue({ data: session });
        mockApiPrintsGetCollection.mockResolvedValue({ data: { 'hydra:member': [print] } });

        renderSessionDetail();

        expect(
            await screen.findByText('sessions.list.numberLabel:{"number":14}'),
        ).toBeInTheDocument();
        expect(screen.getByText('1+9')).toBeInTheDocument();
        expect(screen.getByText('sessions.detail.negative:{"negative":"12A"}')).toBeInTheDocument();
        expect(screen.getByText('Good overall density.')).toBeInTheDocument();
        expect(
            screen.getByText('Paper a bit tired at the end of the session.'),
        ).toBeInTheDocument();
    });

    it('calls the prints collection filtered by the session IRI', async () => {
        mockApiPrintSessionsIdGet.mockResolvedValue({ data: session });
        mockApiPrintsGetCollection.mockResolvedValue({ data: { 'hydra:member': [] } });

        renderSessionDetail();

        await screen.findByText('sessions.list.numberLabel:{"number":14}');
        expect(mockApiPrintsGetCollection).toHaveBeenCalledWith({
            session: '/print_sessions/1',
        });
    });
});
