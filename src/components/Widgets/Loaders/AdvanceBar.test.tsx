import { render, screen } from '@testing-library/react';
import { AdvanceBar } from './AdvanceBar';

describe('AdvanceBar', () => {
    it('renders as an accessible progressbar with the given label', () => {
        render(<AdvanceBar label="Mise à jour des chimies" />);
        expect(screen.getByRole('progressbar')).toHaveAccessibleName('Mise à jour des chimies');
    });
});
