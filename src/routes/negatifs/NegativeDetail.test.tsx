import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import NegativeDetail from './NegativeDetail';
import type { ChemistryRead, DevelopmentLogDetailRead } from '~/api/client';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string, opts?: Record<string, unknown>) =>
            opts ? `${key}:${JSON.stringify(opts)}` : key,
        i18n: { language: 'en' },
    }),
}));

const developmentLog: DevelopmentLogDetailRead = {
    '@id': '/development_logs/1',
    '@type': 'DevelopmentLog',
    id: '1',
    film: {
        '@id': '/films/1',
        '@type': 'film',
        id: '1',
        name: 'HP5 Plus',
        description: '',
        process: 'B&W',
        sensibility: 400,
        emulsionType: 'panchromatic',
        manufacturer: {
            '@id': '/manufacturers/1',
            '@type': 'manufacturer',
            name: 'Ilford',
            status: 'official',
        },
        status: 'official',
    },
    camera: {
        '@id': '/cameras/1',
        '@type': 'camera',
        id: '1',
        name: 'Nikon FM2',
        manufacturer: {
            '@id': '/manufacturers/2',
            '@type': 'manufacturer',
            name: 'Nikon',
            status: 'official',
        },
        status: 'official',
    },
    shotAt: { year: 2026, month: 7, label: '2026-07' },
    isoShotAt: 800,
    process: 'B&W',
    developedAt: '2026-07-12',
    steps: [
        {
            chemistry: { '@id': '/chemistries/1', '@type': 'chemistry', status: 'official' },
            chemistryParts: 1,
            waterParts: 4,
            temperature: 20,
            durationSeconds: 570,
            agitationNote: '30s continuous then 4 inversions per minute',
        },
    ],
    developmentNotes: 'Developer near end of life.',
    rating: 4,
    tags: [
        {
            '@id': '/tags/1',
            '@type': 'tag',
            id: '1',
            name: 'Street',
            primaryColor: '#0B5B54',
            status: 'official',
        },
    ],
    binderId: '135',
    contactSheetNumber: 187,
    pushPullStops: 1,
};

const chemistry: ChemistryRead = {
    '@id': '/chemistries/1',
    '@type': 'chemistry',
    id: '1',
    name: 'Ilford DD-X',
    process: 'B&W',
    manufacturer: {
        '@id': '/manufacturers/1',
        '@type': 'manufacturer',
        name: 'Ilford',
        status: 'official',
    },
    chemistryType: {
        '@id': '/chemistry_types/1',
        '@type': 'chemistryType',
        typeCode: 'DEV',
        typeLabel: 'Developer',
        status: 'official',
    },
    status: 'official',
};

const mockApiDevelopmentLogsIdGet = vi.fn();
const mockApiChemistriesIdGet = vi.fn();
vi.mock('~/api/client', async () => {
    const actual = await vi.importActual('~/api/client');
    return {
        ...actual,
        useDevelopmentLogApi: () => ({
            developmentLogApi: { apiDevelopmentLogsIdGet: mockApiDevelopmentLogsIdGet },
        }),
        useChemistryApi: () => ({
            chemistryApi: { apiChemistriesIdGet: mockApiChemistriesIdGet },
        }),
    };
});

const renderNegativeDetail = () =>
    render(
        <MemoryRouter initialEntries={['/negatifs/1']}>
            <Routes>
                <Route
                    element={<NegativeDetail />}
                    path="/negatifs/:developmentLogId"
                />
            </Routes>
        </MemoryRouter>,
    );

describe('NegativeDetail', () => {
    beforeEach(() => {
        mockApiDevelopmentLogsIdGet.mockReset();
        mockApiChemistriesIdGet.mockReset();
        mockApiChemistriesIdGet.mockResolvedValue({ data: chemistry });
    });

    it('shows a loading indicator while the development log is being fetched', () => {
        mockApiDevelopmentLogsIdGet.mockReturnValue(new Promise(() => {}));
        renderNegativeDetail();
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('shows an error message when the request fails', async () => {
        mockApiDevelopmentLogsIdGet.mockRejectedValue(new Error('boom'));
        renderNegativeDetail();
        expect(await screen.findByText('errors.api.loadingData')).toBeInTheDocument();
    });

    it('renders the development log with its resolved chemistry step', async () => {
        mockApiDevelopmentLogsIdGet.mockResolvedValue({ data: developmentLog });
        renderNegativeDetail();
        expect(await screen.findByText('HP5 Plus')).toBeInTheDocument();
        expect(screen.getByText('Ilford DD-X')).toBeInTheDocument();
        expect(screen.getByText('1+4')).toBeInTheDocument();
        expect(screen.getByText('Nikon FM2')).toBeInTheDocument();
        expect(screen.getByText('Street')).toBeInTheDocument();
    });
});
