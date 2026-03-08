import { render, screen } from '@testing-library/react';
import { type FilmRead } from '~/api/client';
import { FilmCard } from './FilmCard';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

vi.mock('../FilmName/FilmName', () => ({
    FilmName: ({ film }: { readonly film: FilmRead }) => (
        <div data-testid="film-name">{film.name}</div>
    ),
}));

vi.mock('../IsoChip/IsoChip', () => ({
    IsoChip: () => <div data-testid="iso-chip" />,
}));

vi.mock('../ProcessChip/ProcessChip', () => ({
    ProcessChip: () => <div data-testid="process-chip" />,
}));

const baseFilm: FilmRead = {
    '@id': '/films/1',
    '@type': 'film',
    id: '1',
    name: 'Kodak Portra 400',
    inversible: false,
    description: '',
    process: 'C-41',
    sensibility: 400,
    manufacturer: {
        '@id': '/manufacturers/1',
        '@type': 'manufacturer',
        id: '1',
        name: 'Kodak',
    },
};

describe('FilmCard', () => {
    it('renders without crashing', () => {
        render(<FilmCard film={baseFilm} />);
        expect(screen.getByTestId('film-name')).toBeInTheDocument();
    });

    it('renders FilmName component with the film', () => {
        render(<FilmCard film={baseFilm} />);
        expect(screen.getByTestId('film-name')).toHaveTextContent('Kodak Portra 400');
    });

    it('renders ProcessChip component', () => {
        render(<FilmCard film={baseFilm} />);
        expect(screen.getByTestId('process-chip')).toBeInTheDocument();
    });

    it('renders IsoChip component', () => {
        render(<FilmCard film={baseFilm} />);
        expect(screen.getByTestId('iso-chip')).toBeInTheDocument();
    });

    it('does not render slide chip when film is not inversible', () => {
        render(<FilmCard film={baseFilm} />);
        expect(screen.queryByText('components.filmCard.slide')).not.toBeInTheDocument();
    });

    it('renders slide chip when film is inversible', () => {
        const inversibleFilm: FilmRead = { ...baseFilm, inversible: true };
        render(<FilmCard film={inversibleFilm} />);
        expect(screen.getByText('components.filmCard.slide')).toBeInTheDocument();
    });

    it('does not render description when film has no description', () => {
        render(<FilmCard film={baseFilm} />);
        expect(screen.queryByText(/description/i)).not.toBeInTheDocument();
    });

    it('renders description when film has a description', () => {
        const filmWithDescription: FilmRead = {
            ...baseFilm,
            description: 'A classic color negative film.',
        };
        render(<FilmCard film={filmWithDescription} />);
        expect(screen.getByText('A classic color negative film.')).toBeInTheDocument();
    });

    it('renders description inside a Tooltip', () => {
        const filmWithDescription: FilmRead = {
            ...baseFilm,
            description: 'Fine grain portrait film.',
        };
        render(<FilmCard film={filmWithDescription} />);
        const description = screen.getByText('Fine grain portrait film.');
        expect(description.tagName.toLowerCase()).toBe('p');
    });

    it('renders all chips when film is inversible', () => {
        const fullFilm: FilmRead = {
            ...baseFilm,
            inversible: true,
            description: 'Slide film description.',
        };
        render(<FilmCard film={fullFilm} />);
        expect(screen.getByTestId('process-chip')).toBeInTheDocument();
        expect(screen.getByTestId('iso-chip')).toBeInTheDocument();
        expect(screen.getByText('components.filmCard.slide')).toBeInTheDocument();
    });
});
