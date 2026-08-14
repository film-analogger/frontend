import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import PhotoPaperList from './PhotoPaperList';
import type { PhotoPaperRead } from '~/api/client';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string, opts?: { count?: number }) =>
            `${key}${opts?.count !== undefined ? `:${String(opts.count)}` : ''}`,
    }),
}));

const makePhotoPaper = (overrides: Partial<PhotoPaperRead>): PhotoPaperRead => ({
    '@id': `/photo_papers/${overrides.id ?? '1'}`,
    '@type': 'photoPaper',
    id: '1',
    name: 'Multigrade IV',
    paperBase: 'rc',
    paperSurface: 'pearl',
    variableContrast: true,
    process: 'B&W Print',
    description: '',
    manufacturer: {
        '@id': '/manufacturers/1',
        '@type': 'manufacturer',
        name: 'Ilford',
        status: 'official',
    },
    status: 'official',
    ...overrides,
});

const mockApiPhotoPapersGetCollection = vi.fn();
vi.mock('~/api/client', async () => {
    const actual = await vi.importActual('~/api/client');
    return {
        ...actual,
        usePhotoPaperApi: () => ({
            photoPaperApi: { apiPhotoPapersGetCollection: mockApiPhotoPapersGetCollection },
        }),
        useManufacturerApi: () => ({
            manufacturerApi: {
                apiManufacturersGetCollection: vi
                    .fn()
                    .mockResolvedValue({ data: { 'hydra:member': [] } }),
            },
        }),
    };
});

const renderPhotoPaperList = () =>
    render(
        <MemoryRouter>
            <PhotoPaperList />
        </MemoryRouter>,
    );

describe('PhotoPaperList', () => {
    beforeEach(() => {
        mockApiPhotoPapersGetCollection.mockReset();
    });

    it('shows a loading indicator while photo papers are being fetched', () => {
        mockApiPhotoPapersGetCollection.mockReturnValue(new Promise(() => {}));
        renderPhotoPaperList();
        expect(screen.getByText('loaders.photoPapers.title')).toBeInTheDocument();
    });

    it('shows an error message when the request fails', async () => {
        mockApiPhotoPapersGetCollection.mockRejectedValue(new Error('boom'));
        renderPhotoPaperList();
        expect(await screen.findByText('errors.api.loadingData')).toBeInTheDocument();
    });

    it('renders the fetched photo papers', async () => {
        mockApiPhotoPapersGetCollection.mockResolvedValue({
            data: { 'hydra:member': [makePhotoPaper({ id: '1', name: 'Multigrade IV' })] },
        });
        renderPhotoPaperList();
        expect(await screen.findByText('Multigrade IV')).toBeInTheDocument();
        expect(screen.getByText('Ilford')).toBeInTheDocument();
        expect(screen.getByText('B&W Print')).toBeInTheDocument();
        expect(
            screen.getByText(
                'photoPapers.add.fields.paperBaseOptions.rc · photoPapers.add.fields.paperSurfaceOptions.pearl',
            ),
        ).toBeInTheDocument();
    });
});
