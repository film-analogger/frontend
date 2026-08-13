import { render } from '@testing-library/react';
import { CardGridSkeleton } from './CardGridSkeleton';

describe('CardGridSkeleton', () => {
    it('is hidden from assistive tech', () => {
        const { container } = render(<CardGridSkeleton />);
        expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
    });

    it('renders the default number of cards', () => {
        const { container } = render(<CardGridSkeleton />);
        expect(container.querySelectorAll('.MuiSkeleton-root')).toHaveLength(6);
    });

    it('renders a custom number of cards', () => {
        const { container } = render(<CardGridSkeleton count={4} />);
        expect(container.querySelectorAll('.MuiSkeleton-root')).toHaveLength(12);
    });
});
