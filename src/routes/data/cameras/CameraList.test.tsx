import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import CameraList from './CameraList';
import type { CameraRead } from '~/api/client';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string, opts?: { count?: number }) =>
            `${key}${opts?.count !== undefined ? `:${String(opts.count)}` : ''}`,
    }),
}));

const makeCamera = (overrides: Partial<CameraRead>): CameraRead => ({
    '@id': `/cameras/${overrides.id ?? '1'}`,
    '@type': 'camera',
    id: '1',
    name: 'Nikon FM2',
    filmFormat: '135',
    description: '',
    manufacturer: {
        '@id': '/manufacturers/1',
        '@type': 'manufacturer',
        name: 'Nikon',
        status: 'official',
    },
    status: 'official',
    ...overrides,
});

const mockApiCamerasGetCollection = vi.fn();
vi.mock('~/api/client', async () => {
    const actual = await vi.importActual('~/api/client');
    return {
        ...actual,
        useCameraApi: () => ({
            cameraApi: { apiCamerasGetCollection: mockApiCamerasGetCollection },
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

const renderCameraList = () =>
    render(
        <MemoryRouter>
            <CameraList />
        </MemoryRouter>,
    );

describe('CameraList', () => {
    beforeEach(() => {
        mockApiCamerasGetCollection.mockReset();
    });

    it('shows a loading indicator while cameras are being fetched', () => {
        mockApiCamerasGetCollection.mockReturnValue(new Promise(() => {}));
        renderCameraList();
        expect(screen.getByText('loaders.camera.title')).toBeInTheDocument();
    });

    it('shows an error message when the request fails', async () => {
        mockApiCamerasGetCollection.mockRejectedValue(new Error('boom'));
        renderCameraList();
        expect(await screen.findByText('errors.api.loadingData')).toBeInTheDocument();
    });

    it('renders the fetched cameras', async () => {
        mockApiCamerasGetCollection.mockResolvedValue({
            data: { 'hydra:member': [makeCamera({ id: '1', name: 'Nikon FM2' })] },
        });
        renderCameraList();
        expect(await screen.findByText('Nikon FM2')).toBeInTheDocument();
        expect(screen.getByText('Nikon')).toBeInTheDocument();
        expect(screen.getByText('135')).toBeInTheDocument();
    });
});
