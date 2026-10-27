import { render } from '@testing-library/react';
import { ListRowSkeleton } from './ListRowSkeleton';

describe('ListRowSkeleton', () => {
    it('is hidden from assistive tech', () => {
        const { container } = render(<ListRowSkeleton />);
        expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
    });

    it('renders the default number of rows', () => {
        const { container } = render(<ListRowSkeleton />);
        expect(container.querySelectorAll('.MuiSkeleton-root')).toHaveLength(12);
    });

    it('renders a custom number of rows', () => {
        const { container } = render(<ListRowSkeleton rows={1} />);
        expect(container.querySelectorAll('.MuiSkeleton-root')).toHaveLength(4);
    });
});
