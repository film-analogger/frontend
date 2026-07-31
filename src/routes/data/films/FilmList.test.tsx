import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import FilmList from './FilmList';
import type { FilmRead } from '~/api/client';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string, opts?: { count?: number }) =>
            `${key}${opts?.count !== undefined ? `:${String(opts.count)}` : ''}`,
    }),
}));

vi.mock('~/components/Widgets/FilmCard/FilmCard', () => ({
    FilmCard: ({ film }: { readonly film: FilmRead }) => <div>{film.name}</div>,
}));

const makeFilm = (overrides: Partial<FilmRead>): FilmRead => ({
    '@id': `/films/${overrides.id ?? '1'}`,
    '@type': 'film',
    id: '1',
    name: 'Portra 400',
    description: '',
    process: 'C-41',
    sensibility: 400,
    manufacturer: { '@id': '/manufacturers/1', '@type': 'manufacturer', id: '1', name: 'Kodak' },
    ...overrides,
});

const mockApiFilmsGetCollection = vi.fn();
vi.mock('~/api/client', async () => {
    const actual = await vi.importActual('~/api/client');
    return {
        ...actual,
        useFilmApi: () => ({ filmApi: { apiFilmsGetCollection: mockApiFilmsGetCollection } }),
    };
});

const renderFilmList = () =>
    render(
        <MemoryRouter>
            <FilmList />
        </MemoryRouter>,
    );

describe('FilmList', () => {
    beforeEach(() => {
        mockApiFilmsGetCollection.mockReset();
    });

    it('shows a loading indicator while films are being fetched', () => {
        mockApiFilmsGetCollection.mockReturnValue(new Promise(() => {}));
        renderFilmList();
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('shows an error message when the request fails', async () => {
        mockApiFilmsGetCollection.mockRejectedValue(new Error('boom'));
        renderFilmList();
        expect(await screen.findByText('errors.api.loadingData')).toBeInTheDocument();
    });

    it('renders the fetched films', async () => {
        mockApiFilmsGetCollection.mockResolvedValue({
            data: { 'hydra:member': [makeFilm({ id: '1', name: 'Portra 400' })] },
        });
        renderFilmList();
        expect(await screen.findByText('Portra 400')).toBeInTheDocument();
    });

    it('filters films by process when a filter chip is clicked', async () => {
        mockApiFilmsGetCollection.mockResolvedValue({
            data: {
                'hydra:member': [
                    makeFilm({ id: '1', name: 'Portra 400', process: 'C-41' }),
                    makeFilm({ id: '2', name: 'HP5 Plus', process: 'B&W' }),
                ],
            },
        });
        renderFilmList();
        await waitFor(() => {
            expect(screen.getByText('Portra 400')).toBeInTheDocument();
        });
        expect(screen.getByText('HP5 Plus')).toBeInTheDocument();

        fireEvent.click(screen.getByText('B&W · 1'));

        expect(screen.queryByText('Portra 400')).not.toBeInTheDocument();
        expect(screen.getByText('HP5 Plus')).toBeInTheDocument();

        fireEvent.click(screen.getByText('B&W · 1'));
        expect(screen.getByText('Portra 400')).toBeInTheDocument();
    });
});
