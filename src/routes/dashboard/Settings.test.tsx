import { render, screen, fireEvent } from '@testing-library/react';
import Settings from './Settings';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: string) => key }),
}));

describe('Settings', () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it('renders the lab defaults form with empty defaults', () => {
        render(<Settings />);
        expect(screen.getByLabelText('settings.labDefaults.defaultLab')).toHaveValue('');
        expect(screen.getByLabelText('settings.labDefaults.defaultEnlarger')).toHaveValue('');
    });

    it('persists the default lab to localStorage', () => {
        render(<Settings />);
        fireEvent.change(screen.getByLabelText('settings.labDefaults.defaultLab'), {
            target: { value: 'Atelier Grenelle' },
        });
        expect(window.localStorage.getItem('film-analogger:default-lab')).toBe('Atelier Grenelle');
    });

    it('persists the default enlarger to localStorage', () => {
        render(<Settings />);
        fireEvent.change(screen.getByLabelText('settings.labDefaults.defaultEnlarger'), {
            target: { value: 'Durst M670' },
        });
        expect(window.localStorage.getItem('film-analogger:default-enlarger')).toBe('Durst M670');
    });

    it('loads existing preferences from localStorage on mount', () => {
        window.localStorage.setItem('film-analogger:default-lab', 'Labo associatif Bastille');
        render(<Settings />);
        expect(screen.getByLabelText('settings.labDefaults.defaultLab')).toHaveValue(
            'Labo associatif Bastille',
        );
    });
});
