import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import ChemistryDetail from './ChemistryDetail';
import type { ChemistryRead } from '~/api/client';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string, opts?: Record<string, unknown>) =>
            opts ? `${key}:${JSON.stringify(opts)}` : key,
    }),
}));

const chemistry: ChemistryRead = {
    '@id': '/chemistries/1',
    '@type': 'chemistry',
    id: '1',
    name: 'D-76',
    process: 'B&W',
    description: 'A classic fine-grain developer.',
    officialDocumentationUrl: 'https://example.com/d76.pdf',
    chemistryType: {
        '@id': '/chemistry_types/1',
        '@type': 'chemistryType',
        typeCode: 'DEV-FILM',
        typeLabel: 'Film developer',
        status: 'official',
    },
    manufacturer: {
        '@id': '/manufacturers/1',
        '@type': 'manufacturer',
        name: 'Kodak',
        status: 'official',
    },
    dilutions: [
        { chemistryParts: 1, waterParts: 0, official: true, label: 'stock' },
        { chemistryParts: 1, waterParts: 1, official: false, label: '1+1' },
    ],
    status: 'official',
};

const mockApiChemistriesIdGet = vi.fn();
vi.mock('~/api/client', async () => {
    const actual = await vi.importActual('~/api/client');
    return {
        ...actual,
        useChemistryApi: () => ({
            chemistryApi: { apiChemistriesIdGet: mockApiChemistriesIdGet },
        }),
    };
});

const renderChemistryDetail = () =>
    render(
        <MemoryRouter initialEntries={['/data/chemistries/1']}>
            <Routes>
                <Route
                    element={<ChemistryDetail />}
                    path="/data/chemistries/:chemistryId"
                />
            </Routes>
        </MemoryRouter>,
    );

describe('ChemistryDetail', () => {
    beforeEach(() => {
        mockApiChemistriesIdGet.mockReset();
    });

    it('shows a loading indicator while the chemistry is being fetched', () => {
        mockApiChemistriesIdGet.mockReturnValue(new Promise(() => {}));
        renderChemistryDetail();
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('shows an error message when the request fails', async () => {
        mockApiChemistriesIdGet.mockRejectedValue(new Error('boom'));
        renderChemistryDetail();
        expect(await screen.findByText('errors.api.loadingData')).toBeInTheDocument();
    });

    it('renders the chemistry name, description and dilutions', async () => {
        mockApiChemistriesIdGet.mockResolvedValue({ data: chemistry });
        renderChemistryDetail();
        expect(await screen.findByText('D-76')).toBeInTheDocument();
        expect(screen.getByText('A classic fine-grain developer.')).toBeInTheDocument();
        expect(screen.getByText('stock')).toBeInTheDocument();
        expect(screen.getByText('1+1')).toBeInTheDocument();
        expect(screen.getByText('chemistries.detail.official')).toBeInTheDocument();
    });

    it('links to the official documentation when available', async () => {
        mockApiChemistriesIdGet.mockResolvedValue({ data: chemistry });
        renderChemistryDetail();
        const link = await screen.findByText('chemistries.detail.officialDoc');
        expect(link.closest('a')).toHaveAttribute('href', 'https://example.com/d76.pdf');
    });
});
