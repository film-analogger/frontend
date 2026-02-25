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

    it('should render main navigation items', () => {
        renderSideMenu();
        expect(screen.getByText('components.sidemenu.home')).toBeInTheDocument();
        expect(screen.getByText('components.sidemenu.filmLogSheet')).toBeInTheDocument();
        expect(screen.getByText('components.sidemenu.developmentCharts')).toBeInTheDocument();
        expect(screen.getByText('components.sidemenu.printLogSheet')).toBeInTheDocument();
    });

    it('should render secondary navigation items', () => {
        renderSideMenu();
        expect(screen.getByText('components.sidemenu.films')).toBeInTheDocument();
        expect(screen.getByText('components.sidemenu.photoPaper')).toBeInTheDocument();
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
        expect(
            screen.getByLabelText('components.sidemenu.filmLogSheet').closest('a'),
        ).toHaveAttribute('href', '/film-log-sheet');
    });
});
