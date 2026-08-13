import { render, screen } from '@testing-library/react';
import { PerforationDots } from './PerforationDots';

describe('PerforationDots', () => {
    it('exposes no status role when no label is given (purely decorative)', () => {
        render(<PerforationDots />);
        expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    it('exposes the label as an accessible name and renders it visually', () => {
        render(<PerforationDots label="Enregistrement du bain 2" />);
        expect(screen.getByRole('status')).toHaveAccessibleName('Enregistrement du bain 2');
        expect(screen.getByText('Enregistrement du bain 2')).toBeInTheDocument();
    });
});
