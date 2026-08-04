import { render, screen } from '@testing-library/react';
import { FilmName } from './FilmName';

const baseFilm = {
    name: 'Portra 400',
    manufacturer: {
        name: 'Kodak',
    },
};

describe('FilmName', () => {
    it('renders manufacturer name', () => {
        render(<FilmName film={baseFilm} />);
        expect(screen.getByText('Kodak')).toBeInTheDocument();
    });

    it('renders film name', () => {
        render(<FilmName film={baseFilm} />);
        expect(screen.getByText('Portra 400')).toBeInTheDocument();
    });

    it('applies manufacturer primaryColor as backgroundColor', () => {
        const film = {
            ...baseFilm,
            manufacturer: {
                ...baseFilm.manufacturer,
                primaryColor: '#FFD700',
                secondaryColor: '#000000',
            },
        };
        render(<FilmName film={film} />);
        const manufacturerEl = screen.getByText('Kodak');
        expect(manufacturerEl).toHaveStyle({ backgroundColor: '#FFD700', color: '#000000' });
    });

    it('does not render a tertiary strip on the manufacturer band even when manufacturer tertiaryColor is set', () => {
        const film = {
            ...baseFilm,
            manufacturer: {
                ...baseFilm.manufacturer,
                tertiaryColor: 'rgb(255, 0, 0)',
            },
        };
        render(<FilmName film={film} />);
        expect(screen.getByText('Kodak')).not.toHaveStyle({
            borderLeftStyle: 'solid',
        });
    });

    it('applies film primaryColor as backgroundColor', () => {
        const film = {
            ...baseFilm,
            primaryColor: '#0000FF',
            secondaryColor: '#FFFFFF',
        };
        render(<FilmName film={film} />);
        const filmEl = screen.getByText('Portra 400');
        expect(filmEl).toHaveStyle({ backgroundColor: '#0000FF', color: '#FFFFFF' });
    });

    it('renders a tertiary strip with film tertiaryColor next to the film name', () => {
        const film = {
            ...baseFilm,
            tertiaryColor: '#00FF00',
        };
        render(<FilmName film={film} />);
        expect(screen.getByTestId('film-name-tertiary-strip')).toHaveStyle({
            backgroundColor: 'rgb(0, 255, 0)',
        });
    });

    it('falls back to manufacturer tertiaryColor for the strip when film tertiaryColor is not set', () => {
        const film = {
            ...baseFilm,
            manufacturer: {
                ...baseFilm.manufacturer,
                tertiaryColor: '#FF0000',
            },
        };
        render(<FilmName film={film} />);
        expect(screen.getByTestId('film-name-tertiary-strip')).toHaveStyle({
            backgroundColor: 'rgb(255, 0, 0)',
        });
    });

    it('does not render a tertiary strip when neither film nor manufacturer tertiaryColor is set', () => {
        render(<FilmName film={baseFilm} />);
        expect(screen.queryByTestId('film-name-tertiary-strip')).not.toBeInTheDocument();
    });

    it('prefers film tertiaryColor over manufacturer tertiaryColor for the strip', () => {
        const film = {
            ...baseFilm,
            tertiaryColor: '#00FF00',
            manufacturer: {
                ...baseFilm.manufacturer,
                tertiaryColor: '#FF0000',
            },
        };
        render(<FilmName film={film} />);
        expect(screen.getByTestId('film-name-tertiary-strip')).toHaveStyle({
            backgroundColor: 'rgb(0, 255, 0)',
        });
    });

    it('renders with null colors without crashing', () => {
        const film = {
            ...baseFilm,
            primaryColor: null,
            secondaryColor: null,
            tertiaryColor: null,
            manufacturer: {
                ...baseFilm.manufacturer,
                primaryColor: null,
                secondaryColor: null,
                tertiaryColor: null,
            },
        };
        render(<FilmName film={film} />);
        expect(screen.getByText('Kodak')).toBeInTheDocument();
        expect(screen.getByText('Portra 400')).toBeInTheDocument();
    });

    it('applies sx prop to the wrapper Box', () => {
        const { container } = render(
            <FilmName
                film={baseFilm}
                sx={{ margin: '10px' }}
            />,
        );
        expect(container.firstChild).toBeInTheDocument();
    });
});
