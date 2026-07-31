import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import SideMenu from './SideMenu';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

vi.mock('~/components/Widgets/AppLogo/AppLogo', () => ({
    AppLogo: () => <div data-testid="app-logo">Logo</div>,
}));

vi.mock('../OpenSource/OpenSource', () => ({
    default: () => <div data-testid="open-source">OpenSource</div>,
}));

vi.mock('./useNavCounts', () => ({
    useNavCounts: () => ({ films: 12, chemistries: 9, manufacturers: 6, sessions: 28 }),
}));

const mockSetAppearance = vi.fn();
vi.mock('~/Theme/useAppearanceMode', () => ({
    useAppearanceMode: () => ({ current: 'dark', setAppearance: mockSetAppearance }),
}));

const renderSideMenu = () =>
    render(
        <BrowserRouter>
            <SideMenu />
        </BrowserRouter>,
    );

describe('SideMenu', () => {
    it('should render the component', () => {
        renderSideMenu();
        expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('should render app logo', () => {
        renderSideMenu();
        expect(screen.getByTestId('app-logo')).toBeInTheDocument();
    });

    it('should render logbook navigation items', () => {
        renderSideMenu();
        expect(screen.getByText('components.sidemenu.home')).toBeInTheDocument();
        expect(screen.getByText('components.sidemenu.sessions')).toBeInTheDocument();
        expect(screen.getByText('components.sidemenu.filmLogSheet')).toBeInTheDocument();
        expect(screen.getByText('components.sidemenu.developmentCharts')).toBeInTheDocument();
    });

    it('should render reference navigation items with counts', () => {
        renderSideMenu();
        expect(screen.getByText('components.sidemenu.films')).toBeInTheDocument();
        expect(screen.getByText('components.sidemenu.chemistries')).toBeInTheDocument();
        expect(screen.getByText('components.sidemenu.manufacturers')).toBeInTheDocument();
        expect(screen.getByText('components.sidemenu.photoPaper')).toBeInTheDocument();
        expect(screen.getByText('12')).toBeInTheDocument();
        expect(screen.getByText('9')).toBeInTheDocument();
        expect(screen.getByText('6')).toBeInTheDocument();
    });

    it('should render "soon" items as disabled', () => {
        renderSideMenu();
        expect(screen.getByLabelText('components.sidemenu.filmLogSheet')).toHaveAttribute(
            'aria-disabled',
            'true',
        );
    });

    it('should render the lab mode toggle', () => {
        renderSideMenu();
        expect(screen.getByText('components.sidemenu.labMode')).toBeInTheDocument();
    });

    it('should render open source section', () => {
        renderSideMenu();
        expect(screen.getByTestId('open-source')).toBeInTheDocument();
    });

    it('should have correct href attributes for navigation items', () => {
        renderSideMenu();
        expect(screen.getByLabelText('components.sidemenu.home').closest('a')).toHaveAttribute(
            'href',
            '/',
        );
        expect(screen.getByLabelText('components.sidemenu.sessions').closest('a')).toHaveAttribute(
            'href',
            '/sessions',
        );
    });
});
