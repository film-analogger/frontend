import { render, screen } from '@testing-library/react';
import { DeterminateProgress } from './DeterminateProgress';

describe('DeterminateProgress', () => {
    it('renders the label, rounded percentage and progress value', () => {
        render(
            <DeterminateProgress
                label="Import des scans"
                value={42.6}
            />,
        );
        expect(screen.getByText('Import des scans')).toBeInTheDocument();
        expect(screen.getByText('43%')).toBeInTheDocument();
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '43');
    });

    it('renders the caption when provided', () => {
        render(
            <DeterminateProgress
                caption="13 / 36 vues"
                label="Import des scans"
                value={36}
            />,
        );
        expect(screen.getByText('13 / 36 vues')).toBeInTheDocument();
    });

    it('omits the caption when not provided', () => {
        render(
            <DeterminateProgress
                label="Import des scans"
                value={10}
            />,
        );
        expect(screen.queryByText(/vues/)).not.toBeInTheDocument();
    });
});
