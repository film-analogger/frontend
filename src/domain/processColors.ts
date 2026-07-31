import type { FilmRead } from '~/api/client';

export type Process = FilmRead['process'];

interface ProcessStyle {
    color: string;
    gradient: string;
    fg: string;
}

const processStyles: Record<Process, ProcessStyle> = {
    'C-41': {
        color: '#C9642B',
        gradient: 'linear-gradient(90deg, Red, Orange, Yellow, Green, Blue, Indigo, Violet)',
        fg: '#ffffff',
    },
    'E-6': { color: '#1565C0', gradient: 'none', fg: '#ffffff' },
    'B&W': { color: '#1a1a1a', gradient: 'none', fg: '#ffffff' },
    'ECN-2': { color: '#F9A825', gradient: 'none', fg: '#1a1a1a' },
    RA4: { color: '#E65100', gradient: 'none', fg: '#ffffff' },
    'B&W Print': { color: '#4E342E', gradient: 'none', fg: '#ffffff' },
};

export const getProcessStyle = (process: Process): ProcessStyle => processStyles[process];
