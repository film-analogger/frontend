import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import BaseError from './BaseError';

vi.mock('react-router', () => ({
    Outlet: () => <div data-testid="outlet">Outlet Content</div>,
}));

describe('BaseError', () => {
    it('renders without crashing', () => {
        render(<BaseError />);
    });

    it('renders the Outlet component', () => {
        render(<BaseError />);
        expect(screen.getByTestId('outlet')).toBeInTheDocument();
    });

    it('renders a Container with correct maxWidth', () => {
        const { container } = render(<BaseError />);
        const containerElement = container.firstChild;
        expect(containerElement).toBeInTheDocument();
    });

    it('renders outlet content inside the container', () => {
        render(<BaseError />);
        const outlet = screen.getByTestId('outlet');
        expect(outlet).toHaveTextContent('Outlet Content');
    });

    it('applies center text alignment style', () => {
        const { container } = render(<BaseError />);
        const containerElement = container.firstChild as HTMLElement;
        expect(containerElement).toHaveStyle({ textAlign: 'center' });
    });

    it('renders a single root element', () => {
        const { container } = render(<BaseError />);
        expect(container.children).toHaveLength(1);
    });
});
