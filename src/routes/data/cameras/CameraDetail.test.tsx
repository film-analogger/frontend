import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import CameraDetail from './CameraDetail';
import type { CameraRead } from '~/api/client';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string, opts?: Record<string, unknown>) =>
            opts ? `${key}:${JSON.stringify(opts)}` : key,
    }),
}));

const camera: CameraRead = {
    '@id': '/cameras/1',
    '@type': 'camera',
    id: '1',
    name: 'Nikon FM2',
    filmFormat: '135',
    description: 'A reliable mechanical SLR.',
    manufacturer: {
        '@id': '/manufacturers/1',
        '@type': 'manufacturer',
        name: 'Nikon',
        status: 'official',
    },
    status: 'official',
};

const mockApiCamerasIdGet = vi.fn();
vi.mock('~/api/client', async () => {
    const actual = await vi.importActual('~/api/client');
    return {
        ...actual,
        useCameraApi: () => ({ cameraApi: { apiCamerasIdGet: mockApiCamerasIdGet } }),
    };
});

const renderCameraDetail = () =>
    render(
        <MemoryRouter initialEntries={['/data/cameras/1']}>
            <Routes>
                <Route
                    element={<CameraDetail />}
                    path="/data/cameras/:cameraId"
                />
            </Routes>
        </MemoryRouter>,
    );

describe('CameraDetail', () => {
    beforeEach(() => {
        mockApiCamerasIdGet.mockReset();
    });

    it('shows a loading indicator while the camera is being fetched', () => {
        mockApiCamerasIdGet.mockReturnValue(new Promise(() => {}));
        renderCameraDetail();
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('shows an error message when the request fails', async () => {
        mockApiCamerasIdGet.mockRejectedValue(new Error('boom'));
        renderCameraDetail();
        expect(await screen.findByText('errors.api.loadingData')).toBeInTheDocument();
    });

    it('renders the camera name, manufacturer, format and description', async () => {
        mockApiCamerasIdGet.mockResolvedValue({ data: camera });
        renderCameraDetail();
        expect(await screen.findByText('Nikon FM2')).toBeInTheDocument();
        expect(screen.getByText('Nikon')).toBeInTheDocument();
        expect(screen.getByText('A reliable mechanical SLR.')).toBeInTheDocument();
        expect(
            screen.getByText('cameras.detail.filmFormatLabel:{"format":"135"}'),
        ).toBeInTheDocument();
    });
});
