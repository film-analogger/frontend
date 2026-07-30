import { FilmCard } from '@film-analogger/frontend';

const kodak = { name: 'Kodak', primaryColor: '#FFCC00', secondaryColor: '#1a1a1a', tertiaryColor: '#ED1C24' };
const fujifilm = { name: 'Fujifilm', primaryColor: '#00A651', secondaryColor: '#ffffff', tertiaryColor: undefined };
const cinestill = { name: 'CineStill', primaryColor: '#111111', secondaryColor: '#ff3b3b', tertiaryColor: '#ff3b3b' };

export const ColorNegative = () => (
    <FilmCard
        film={{
            id: '1',
            name: 'Portra 400',
            process: 'C-41',
            sensibility: 400,
            manufacturer: kodak,
        }}
    />
);

export const BlackAndWhite = () => (
    <FilmCard
        film={{
            id: '2',
            name: 'Tri-X 400',
            process: 'B&W',
            sensibility: 400,
            description:
                'A classic high-contrast panchromatic film with a distinctive, fine grain for its speed.',
            manufacturer: kodak,
        }}
    />
);

export const SlideFilm = () => (
    <FilmCard
        film={{
            id: '3',
            name: 'Velvia 50',
            process: 'E-6',
            sensibility: 50,
            inversible: true,
            manufacturer: fujifilm,
        }}
    />
);

export const MotionPictureStock = () => (
    <FilmCard
        film={{
            id: '4',
            name: '800T',
            process: 'ECN-2',
            sensibility: 800,
            description: 'Tungsten-balanced motion picture film stock, popular for its halation glow.',
            manufacturer: cinestill,
        }}
    />
);
