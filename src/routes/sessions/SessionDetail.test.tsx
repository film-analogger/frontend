import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import SessionDetail from './SessionDetail';
import type { PrintSessionDetailRead } from '~/api/client';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string, opts?: Record<string, unknown>) =>
            opts ? `${key}:${JSON.stringify(opts)}` : key,
        i18n: { language: 'en' },
    }),
}));

vi.mock('~/domain/preferences', () => ({
    getStopNotation: () => 'fraction',
}));

const session: PrintSessionDetailRead = {
    '@id': '/print_sessions/1',
    '@type': 'PrintSession',
    id: '1',
    date: '2026-07-18',
    lab: 'Atelier Grenelle',
    number: 14,
    enlarger: {
        '@id': '/enlargers/1',
        '@type': 'enlarger',
        name: 'Durst M670',
        manufacturer: {
            '@id': '/manufacturers/1',
            '@type': 'manufacturer',
            name: 'Durst',
            status: 'official',
        },
        status: 'official',
    },
    temperatureCelsius: 20,
    notes: 'Paper a bit tired at the end of the session.',
    chemicalBaths: [
        {
            chemistry: {
                '@id': '/chemistries/1',
                '@type': 'chemistry',
                name: 'D-76',
                process: 'B&W',
                chemistryType: {
                    '@id': '/chemistry_types/1',
                    '@type': 'chemistry_type',
                    typeCode: 'DEV-FILM',
                    typeLabel: 'Révélateur film',
                    status: 'official',
                },
                manufacturer: {
                    '@id': '/manufacturers/2',
                    '@type': 'manufacturer',
                    name: 'Kodak',
                    status: 'official',
                },
                status: 'official',
            },
            dilutionOverride: null,
            durationSeconds: 90,
            effectiveDilution: '1+9',
        },
    ],
    prints: [
        {
            '@id': '/prints/1',
            '@type': 'Print',
            id: '1',
            session: {
                '@id': '/print_sessions/1',
                '@type': 'PrintSession',
                date: '2026-07-18',
                lab: 'Atelier Grenelle',
                number: 14,
                enlarger: {
                    '@id': '/enlargers/1',
                    '@type': 'enlarger',
                    name: 'Durst M670',
                    manufacturer: {
                        '@id': '/manufacturers/1',
                        '@type': 'manufacturer',
                        name: 'Durst',
                        status: 'official',
                    },
                    status: 'official',
                },
                temperatureCelsius: 20,
            },
            number: 1,
            negativeNumber: '12A',
            copies: 2,
            photoPaper: {
                '@id': '/photo_papers/1',
                '@type': 'photoPaper',
                name: 'Multigrade RC',
                manufacturer: {
                    '@id': '/manufacturers/3',
                    '@type': 'manufacturer',
                    name: 'Ilford',
                    status: 'official',
                },
                paperBase: 'rc',
                paperSurface: 'glossy',
                status: 'official',
            },
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
        },
    ],
};

const mockApiPrintSessionsIdGet = vi.fn();
vi.mock('~/api/client', async () => {
    const actual = await vi.importActual('~/api/client');
    return {
        ...actual,
        usePrintSessionApi: () => ({
            printSessionApi: { apiPrintSessionsIdGet: mockApiPrintSessionsIdGet },
        }),
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

    it('renders the enlarger, chemical bath and print exposures from the nested session payload', async () => {
        mockApiPrintSessionsIdGet.mockResolvedValue({ data: session });

        renderSessionDetail();

        expect(
            await screen.findByText('sessions.list.numberLabel:{"number":14}'),
        ).toBeInTheDocument();
        expect(screen.getByText('Durst M670')).toBeInTheDocument();
        expect(screen.getByText('D-76')).toBeInTheDocument();
        expect(screen.getByText('Révélateur film')).toBeInTheDocument();
        expect(screen.getByText('1+9')).toBeInTheDocument();
        expect(screen.getByText('sessions.detail.negative:{"negative":"12A"}')).toBeInTheDocument();
        expect(screen.getByText('Good overall density.')).toBeInTheDocument();
        expect(
            screen.getByText('Paper a bit tired at the end of the session.'),
        ).toBeInTheDocument();
    });

    it('fetches the session by id from the route param', async () => {
        mockApiPrintSessionsIdGet.mockResolvedValue({ data: session });

        renderSessionDetail();

        await screen.findByText('sessions.list.numberLabel:{"number":14}');
        expect(mockApiPrintSessionsIdGet).toHaveBeenCalledWith({ id: '1' });
    });
});
