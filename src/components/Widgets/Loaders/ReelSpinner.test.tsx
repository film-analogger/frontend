import { render, screen } from '@testing-library/react';
import { ReelSpinner } from './ReelSpinner';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('ReelSpinner', () => {
    it('renders with an accessible status role', () => {
        render(<ReelSpinner />);
        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('falls back to the generic loading label', () => {
        render(<ReelSpinner />);
        expect(screen.getByRole('status')).toHaveAccessibleName('app.loading');
    });

    it('uses a custom label when provided', () => {
        render(<ReelSpinner label="Vérification…" />);
        expect(screen.getByRole('status')).toHaveAccessibleName('Vérification…');
    });

    it.each([
        ['small', 16],
        ['medium', 22],
        ['large', 34],
    ] as const)('sizes the ring for the %s variant', (size, px) => {
        render(<ReelSpinner size={size} />);
        expect(screen.getByRole('status')).toHaveStyle({ width: `${px}px`, height: `${px}px` });
    });
});
