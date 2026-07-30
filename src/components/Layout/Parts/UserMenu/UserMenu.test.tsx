import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UserMenu from './UserMenu';

const mockLogout = vi.fn();
let mockUser: { avatarUrl?: string; email?: string; name?: string; username?: string } | null =
    null;
let mockTokenParsed: { email?: string; name?: string; preferred_username?: string } | undefined;

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('~/api/useCurrentAppUser', () => ({
    useCurrentAppUser: () => ({ error: null, loaded: true, loading: false, user: mockUser }),
}));

vi.mock('~/keycloak/useKeycloak', () => ({
    useKeycloak: () => ({
        keycloak: {
            logout: mockLogout,
            get tokenParsed() {
                return mockTokenParsed;
            },
        },
    }),
}));

const renderUserMenu = () =>
    render(
        <MemoryRouter>
            <UserMenu />
        </MemoryRouter>,
    );

describe('UserMenu', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockUser = null;
        mockTokenParsed = { email: 'jane@example.com', name: 'Jane Doe' };
    });

    it('renders the user menu toggle button', () => {
        renderUserMenu();
        expect(screen.getByLabelText('user-menu-toggle')).toBeInTheDocument();
    });

    it('does not show the menu initially', () => {
        renderUserMenu();
        expect(screen.queryByRole('menu')).toBeNull();
    });

    it('opens the menu when the toggle button is clicked', () => {
        renderUserMenu();
        fireEvent.click(screen.getByLabelText('user-menu-toggle'));
        expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    it('displays the display name and email from the Keycloak token when the API user is not loaded', () => {
        renderUserMenu();
        fireEvent.click(screen.getByLabelText('user-menu-toggle'));
        expect(screen.getByText('Jane Doe')).toBeInTheDocument();
        expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    });

    it('prefers the API user name and email over the Keycloak token', () => {
        mockUser = { email: 'api@example.com', name: 'API Jane', username: 'jane' };
        renderUserMenu();
        fireEvent.click(screen.getByLabelText('user-menu-toggle'));
        expect(screen.getByText('API Jane')).toBeInTheDocument();
        expect(screen.getByText('api@example.com')).toBeInTheDocument();
    });

    it('falls back to the username when no name is available', () => {
        mockUser = { email: 'jane@example.com', username: 'jane' };
        mockTokenParsed = undefined;
        renderUserMenu();
        fireEvent.click(screen.getByLabelText('user-menu-toggle'));
        expect(screen.getByText('jane')).toBeInTheDocument();
    });

    it('renders a link to the profile page', () => {
        renderUserMenu();
        fireEvent.click(screen.getByLabelText('user-menu-toggle'));
        expect(screen.getByText('components.usermenu.profile').closest('a')).toHaveAttribute(
            'href',
            '/profile',
        );
    });

    it('calls keycloak.logout when the logout item is clicked', () => {
        renderUserMenu();
        fireEvent.click(screen.getByLabelText('user-menu-toggle'));
        fireEvent.click(screen.getByText('auth.logout'));
        expect(mockLogout).toHaveBeenCalled();
    });

    it('closes the menu after clicking an item', () => {
        renderUserMenu();
        fireEvent.click(screen.getByLabelText('user-menu-toggle'));
        expect(screen.getByRole('menu')).toBeInTheDocument();
        fireEvent.click(screen.getByText('auth.logout'));
        expect(screen.queryByRole('menu')).toBeNull();
    });
});
