import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import OpenSource from './OpenSource';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('OpenSource Component', () => {
    it('should render the component', () => {
        render(<OpenSource />);
        expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('should render with correct card variant', () => {
        const { container } = render(<OpenSource />);
        const card = container.firstChild;
        expect(card).toHaveClass('MuiPaper-outlined');
    });

    it('should display title translation', () => {
        render(<OpenSource />);
        expect(screen.getByText('components.opensource.title')).toBeInTheDocument();
    });

    it('should display description translation', () => {
        render(<OpenSource />);
        expect(screen.getByText('components.opensource.description')).toBeInTheDocument();
    });

    it('should render GitHub link with correct href', () => {
        render(<OpenSource />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', 'https://github.com/film-analogger');
    });

    it('should open GitHub link in new tab', () => {
        render(<OpenSource />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('target', '_blank');
    });

    it('should have correct aria-label on GitHub link', () => {
        render(<OpenSource />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('aria-label', 'Github Organisation Page');
    });

    it('should render GitHub icon', () => {
        const { container } = render(<OpenSource />);
        const icons = container.querySelectorAll('svg');
        expect(icons.length).toBeGreaterThanOrEqual(2);
    });
});
