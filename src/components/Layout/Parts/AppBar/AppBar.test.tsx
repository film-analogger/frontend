import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router';
import AppBar from './AppBar';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('~/Theme/AppearanceModeSwitch', () => ({
    AppearanceModeSwitch: () => (
        <div data-testid="appearance-mode-switch">AppearanceModeSwitch</div>
    ),
}));

vi.mock('~/i18n/LanguageIconDropdown', () => ({
    default: () => <div data-testid="language-dropdown">LanguageIconDropdown</div>,
}));

vi.mock('~/components/Layout/Parts/UserMenu/UserMenu', () => ({
    default: () => <div data-testid="user-menu">UserMenu</div>,
}));

const renderAppBar = (handle?: unknown) => {
    const router = createMemoryRouter([{ path: '/current', element: <AppBar />, handle }], {
        initialEntries: ['/current'],
    });
    return render(<RouterProvider router={router} />);
};

describe('AppBar', () => {
    it('renders the AppBar component', () => {
        renderAppBar();
        expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('renders the appearance mode switch', () => {
        renderAppBar();
        expect(screen.getByTestId('appearance-mode-switch')).toBeInTheDocument();
    });

    it('renders the language dropdown', () => {
        renderAppBar();
        expect(screen.getByTestId('language-dropdown')).toBeInTheDocument();
    });

    it('renders UserMenu', () => {
        renderAppBar();
        expect(screen.getByTestId('user-menu')).toBeInTheDocument();
    });

    it('renders no breadcrumb when the route has no crumb handle', () => {
        renderAppBar();
        expect(screen.queryByText('films.list.title')).toBeNull();
    });

    it('renders the breadcrumb from the route handle', () => {
        renderAppBar({
            crumb: { section: 'components.sidemenu.group.reference', title: 'films.list.title' },
        });
        expect(screen.getByText('components.sidemenu.group.reference')).toBeInTheDocument();
        expect(screen.getByText('films.list.title')).toBeInTheDocument();
        expect(screen.queryByLabelText('back')).toBeNull();
    });

    it('has correct styling properties', () => {
        const { container } = renderAppBar();
        const appBar = container.querySelector('header');
        expect(appBar).toHaveStyle('position: static');
    });
});
