import { FilmName } from '@film-analogger/frontend';

export const Default = () => (
    <FilmName
        film={{
            name: 'Portra 400',
            primaryColor: '#FFCC00',
            secondaryColor: '#1a1a1a',
            manufacturer: { name: 'Kodak', primaryColor: '#1a1a1a', secondaryColor: '#FFCC00' },
        }}
    />
);

export const WithBorderAccent = () => (
    <FilmName
        film={{
            name: '800T',
            primaryColor: '#111111',
            secondaryColor: '#ff3b3b',
            tertiaryColor: '#ff3b3b',
            manufacturer: { name: 'CineStill', primaryColor: '#111111', secondaryColor: '#ff3b3b' },
        }}
    />
);
