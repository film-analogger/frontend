import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import PhotoPaperDetail from './PhotoPaperDetail';
import type { PhotoPaperRead } from '~/api/client';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string, opts?: Record<string, unknown>) =>
            opts ? `${key}:${JSON.stringify(opts)}` : key,
    }),
}));

const photoPaper: PhotoPaperRead = {
    '@id': '/photo_papers/1',
    '@type': 'photoPaper',
    id: '1',
    name: 'Multigrade IV',
    paperBase: 'rc',
    paperSurface: 'pearl',
    variableContrast: true,
    process: 'B&W Print',
    availableFormats: ['13x18', '18x24'],
    officialDocumentationUrl: 'https://example.com/mgiv.pdf',
    description: 'A versatile variable-contrast paper.',
    manufacturer: {
        '@id': '/manufacturers/1',
        '@type': 'manufacturer',
        name: 'Ilford',
        status: 'official',
    },
    status: 'official',
};

const mockApiPhotoPapersIdGet = vi.fn();
vi.mock('~/api/client', async () => {
    const actual = await vi.importActual('~/api/client');
    return {
        ...actual,
        usePhotoPaperApi: () => ({
            photoPaperApi: { apiPhotoPapersIdGet: mockApiPhotoPapersIdGet },
        }),
    };
});

const renderPhotoPaperDetail = () =>
    render(
        <MemoryRouter initialEntries={['/data/photo-papers/1']}>
            <Routes>
                <Route
                    element={<PhotoPaperDetail />}
                    path="/data/photo-papers/:photoPaperId"
                />
            </Routes>
        </MemoryRouter>,
    );

describe('PhotoPaperDetail', () => {
    beforeEach(() => {
        mockApiPhotoPapersIdGet.mockReset();
    });

    it('shows a loading indicator while the photo paper is being fetched', () => {
        mockApiPhotoPapersIdGet.mockReturnValue(new Promise(() => {}));
        renderPhotoPaperDetail();
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('shows an error message when the request fails', async () => {
        mockApiPhotoPapersIdGet.mockRejectedValue(new Error('boom'));
        renderPhotoPaperDetail();
        expect(await screen.findByText('errors.api.loadingData')).toBeInTheDocument();
    });

    it('renders the photo paper name, manufacturer, formats and description', async () => {
        mockApiPhotoPapersIdGet.mockResolvedValue({ data: photoPaper });
        renderPhotoPaperDetail();
        expect(await screen.findByText('Multigrade IV')).toBeInTheDocument();
        expect(screen.getByText('Ilford')).toBeInTheDocument();
        expect(screen.getByText('13x18')).toBeInTheDocument();
        expect(screen.getByText('18x24')).toBeInTheDocument();
        expect(screen.getByText('A versatile variable-contrast paper.')).toBeInTheDocument();
    });

    it('links to the official documentation when available', async () => {
        mockApiPhotoPapersIdGet.mockResolvedValue({ data: photoPaper });
        renderPhotoPaperDetail();
        const link = await screen.findByText('photoPapers.detail.officialDoc');
        expect(link.closest('a')).toHaveAttribute('href', 'https://example.com/mgiv.pdf');
    });
});
