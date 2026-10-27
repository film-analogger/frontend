import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import EnlargerDetail from './EnlargerDetail';
import type { EnlargerRead } from '~/api/client';

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
    name: 'Durst M605',
    lightSource: 'diffusor',
    negativeFormats: ['24x36', '6x6'],
    description: 'Well maintained, colour head included.',
    manufacturer: {
        '@id': '/manufacturers/1',
        '@type': 'manufacturer',
        name: 'Durst',
        status: 'official',
    },
    status: 'official',
};

const mockApiEnlargersIdGet = vi.fn();
vi.mock('~/api/client', async () => {
    const actual = await vi.importActual('~/api/client');
    return {
        ...actual,
        useEnlargerApi: () => ({ enlargerApi: { apiEnlargersIdGet: mockApiEnlargersIdGet } }),
    };
});

const renderEnlargerDetail = () =>
    render(
        <MemoryRouter initialEntries={['/data/enlargers/1']}>
            <Routes>
                <Route
                    element={<EnlargerDetail />}
                    path="/data/enlargers/:enlargerId"
                />
            </Routes>
        </MemoryRouter>,
    );

describe('EnlargerDetail', () => {
    beforeEach(() => {
        mockApiEnlargersIdGet.mockReset();
    });

    it('shows a loading indicator while the enlarger is being fetched', () => {
        mockApiEnlargersIdGet.mockReturnValue(new Promise(() => {}));
        renderEnlargerDetail();
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('shows an error message when the request fails', async () => {
        mockApiEnlargersIdGet.mockRejectedValue(new Error('boom'));
        renderEnlargerDetail();
        expect(await screen.findByText('errors.api.loadingData')).toBeInTheDocument();
    });

    it('renders the enlarger name, manufacturer, formats and description', async () => {
        mockApiEnlargersIdGet.mockResolvedValue({ data: enlarger });
        renderEnlargerDetail();
        expect(await screen.findByText('Durst M605')).toBeInTheDocument();
        expect(screen.getByText('Durst')).toBeInTheDocument();
        expect(screen.getByText('24x36')).toBeInTheDocument();
        expect(screen.getByText('6x6')).toBeInTheDocument();
        expect(screen.getByText('Well maintained, colour head included.')).toBeInTheDocument();
        expect(
            screen.getByText('enlargers.add.fields.lightSourceOptions.diffusor'),
        ).toBeInTheDocument();
    });
});
