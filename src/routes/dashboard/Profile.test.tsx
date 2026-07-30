import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Profile from './Profile';
import { type AppUserRead } from '~/api/client';

let mockState: {
    error: unknown;
    loaded: boolean;
    loading: boolean;
    user: AppUserRead | null;
};

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ i18n: { language: 'en' }, t: (key: string) => key }),
}));

vi.mock('~/api/useCurrentAppUser', () => ({
    useCurrentAppUser: () => mockState,
}));

const baseUser: AppUserRead = {
    '@id': '/app_users/1',
    '@type': 'AppUser',
    id: '1',
    username: 'jane',
    email: 'jane@example.com',
    name: 'Jane Doe',
};

describe('Profile', () => {
    it('shows a loading indicator while the user is being fetched', () => {
        mockState = { error: null, loaded: false, loading: true, user: null };
        render(<Profile />);
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('shows an error message when the fetch fails', () => {
        mockState = { error: new Error('boom'), loaded: true, loading: false, user: null };
        render(<Profile />);
        expect(screen.getByText('errors.api.loadingData')).toBeInTheDocument();
    });

    it('renders the user name, username and email once loaded', () => {
        mockState = { error: null, loaded: true, loading: false, user: baseUser };
        render(<Profile />);
        expect(screen.getByText('Jane Doe')).toBeInTheDocument();
        expect(screen.getByText('@jane')).toBeInTheDocument();
        expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    });

    it('falls back to given/family name when name is not set', () => {
        mockState = {
            error: null,
            loaded: true,
            loading: false,
            user: { ...baseUser, name: undefined, givenName: 'Jane', familyName: 'Doe' },
        };
        render(<Profile />);
        expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    });

    it('falls back to the username when no name is available at all', () => {
        mockState = {
            error: null,
            loaded: true,
            loading: false,
            user: { ...baseUser, name: undefined },
        };
        render(<Profile />);
        expect(screen.getByText('jane')).toBeInTheDocument();
    });

    it('does not render the website link when not set', () => {
        mockState = { error: null, loaded: true, loading: false, user: baseUser };
        render(<Profile />);
        expect(screen.queryByText('profile.website')).not.toBeInTheDocument();
    });

    it('renders the website link when set', () => {
        mockState = {
            error: null,
            loaded: true,
            loading: false,
            user: { ...baseUser, website: 'https://example.com' },
        };
        render(<Profile />);
        expect(screen.getByText('https://example.com').closest('a')).toHaveAttribute(
            'href',
            'https://example.com',
        );
    });

    it('renders the description when set', () => {
        mockState = {
            error: null,
            loaded: true,
            loading: false,
            user: { ...baseUser, description: 'Film photography enthusiast.' },
        };
        render(<Profile />);
        expect(screen.getByText('Film photography enthusiast.')).toBeInTheDocument();
    });
});
