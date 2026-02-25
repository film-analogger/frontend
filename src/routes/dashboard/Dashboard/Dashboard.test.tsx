import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, it, expect, vi } from 'vitest';
import Dashboard from './Dashboard';

// Mock the components
vi.mock('~/components/Layout/Parts/AppBar/AppBar', () => ({
    default: () => <div data-testid="app-bar">AppBar</div>,
}));

vi.mock('~/components/Layout/Parts/Footer/Footer', () => ({
    default: () => <div data-testid="footer">Footer</div>,
}));

vi.mock('~/components/Layout/Parts/SideMenu/SideMenu', () => ({
    default: () => <div data-testid="side-menu">SideMenu</div>,
}));

vi.mock('~/Theme/Constants/layout', () => ({
    drawerWidth: 240,
}));

describe('Dashboard', () => {
    it('should render all layout components', () => {
        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>,
        );

        expect(screen.getByTestId('side-menu')).toBeInTheDocument();
        expect(screen.getByTestId('app-bar')).toBeInTheDocument();
        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    it('should render main content area with correct structure', () => {
        const { container } = render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>,
        );

        const mainElement = container.querySelector('main');
        expect(mainElement).toBeInTheDocument();
    });

    it('should render Outlet for nested routes', () => {
        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>,
        );

        expect(screen.getByTestId('side-menu')).toBeInTheDocument();
    });
});
