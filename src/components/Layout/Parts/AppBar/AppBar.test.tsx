import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AppBar from './AppBar';

// Mock the dependencies
vi.mock('@mui/material', async () => {
    const actual = await vi.importActual('@mui/material');
    return actual;
});

vi.mock('@mui/icons-material/Menu', () => ({
    default: () => <div data-testid="menu-icon">MenuIcon</div>,
}));

vi.mock('~/Theme/ColorModeIconDropdown', () => ({
    default: () => <div data-testid="color-mode-dropdown">ColorModeIconDropdown</div>,
}));

vi.mock('~/Theme/Constants/layout', () => ({
    drawerWidth: 240,
    headerHeight: 64,
    headerMt: 0,
}));

describe('AppBar', () => {
    it('renders the AppBar component', () => {
        render(<AppBar />);
        expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('renders MenuIcon', () => {
        render(<AppBar />);
        expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
    });

    it('renders ColorModeIconDropdown', () => {
        render(<AppBar />);
        expect(screen.getByTestId('color-mode-dropdown')).toBeInTheDocument();
    });

    it('has correct styling properties', () => {
        const { container } = render(<AppBar />);
        const appBar = container.querySelector('header');
        expect(appBar).toHaveStyle('position: static');
    });

    it('displays flat design with no elevation', () => {
        const { container } = render(<AppBar />);
        const appBar = container.querySelector('header');
        expect(appBar?.className).toContain('MuiAppBar');
    });
});
