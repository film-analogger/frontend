import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShieldIcon from '@mui/icons-material/Shield';
import AppTheme from '~/Theme/Theme';
import Error from './Error';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: string) => key }),
}));

const renderWithProviders = (ui: React.ReactElement) =>
    render(
        <AppTheme>
            <MemoryRouter>{ui}</MemoryRouter>
        </AppTheme>,
    );

describe('Error component', () => {
    const defaultProps: React.ComponentProps<typeof Error> = {
        statusCode: 404,
        title: 'errors.404.title',
        pageTitle: 'errors.404.pageTitle',
    };

    it('renders the error container', () => {
        renderWithProviders(<Error {...defaultProps} />);
        expect(screen.getByTestId('error-container')).toBeInTheDocument();
    });

    it('renders the status code', () => {
        renderWithProviders(<Error {...defaultProps} />);
        expect(screen.getByTestId('error-status-code')).toHaveTextContent('404');
    });

    it('renders a display code override instead of the status code', () => {
        renderWithProviders(
            <Error
                {...defaultProps}
                code="OFF"
                statusCode={0}
            />,
        );
        expect(screen.getByTestId('error-status-code')).toHaveTextContent('OFF');
    });

    it('renders the title', () => {
        renderWithProviders(<Error {...defaultProps} />);
        expect(screen.getByTestId('error-title')).toHaveTextContent('errors.404.title');
    });

    it('renders the page title', () => {
        renderWithProviders(<Error {...defaultProps} />);
        expect(document.querySelector('title')).toHaveTextContent('errors.404.pageTitle');
    });

    it('does not render detail when not provided', () => {
        renderWithProviders(<Error {...defaultProps} />);
        expect(screen.queryByTestId('error-detail')).not.toBeInTheDocument();
    });

    it('renders detail when provided', () => {
        renderWithProviders(
            <Error
                {...defaultProps}
                detail="errors.404.detail"
            />,
        );
        expect(screen.getByTestId('error-detail')).toHaveTextContent('errors.404.detail');
    });

    it('does not render meta description when not provided', () => {
        renderWithProviders(<Error {...defaultProps} />);
        expect(document.querySelector('meta[name="description"]')).not.toBeInTheDocument();
    });

    it('renders meta description when provided', () => {
        renderWithProviders(
            <Error
                {...defaultProps}
                metaDescription="errors.404.metaDescription"
            />,
        );
        const metaTag = document.querySelector('meta[name="description"]');
        expect(metaTag).toBeInTheDocument();
        expect(metaTag).toHaveAttribute('content', 'errors.404.metaDescription');
    });

    it('does not render the kind chip when not provided', () => {
        renderWithProviders(<Error {...defaultProps} />);
        expect(screen.queryByTestId('error-kind')).not.toBeInTheDocument();
    });

    it('renders the kind chip when provided', () => {
        renderWithProviders(
            <Error
                {...defaultProps}
                icon={<HomeRoundedIcon />}
                kind="errors.404.kind"
            />,
        );
        expect(screen.getByTestId('error-kind')).toHaveTextContent('errors.404.kind');
    });

    it('does not render actions when primaryAction is not provided', () => {
        renderWithProviders(<Error {...defaultProps} />);
        expect(screen.queryByTestId('error-primary-action')).not.toBeInTheDocument();
    });

    it('renders a link-based primary action', () => {
        renderWithProviders(
            <Error
                {...defaultProps}
                primaryAction={{
                    labelKey: 'errors.actions.backToLog',
                    icon: <LocalPrintshopIcon />,
                    to: '/sessions',
                }}
            />,
        );
        const action = screen.getByTestId('error-primary-action');
        expect(action).toHaveTextContent('errors.actions.backToLog');
        expect(action).toHaveAttribute('href', '/sessions');
    });

    it('renders a callback-based secondary action', () => {
        const onClick = vi.fn();
        renderWithProviders(
            <Error
                {...defaultProps}
                primaryAction={{
                    labelKey: 'errors.actions.retry',
                    icon: <ArrowBackIcon />,
                    onClick,
                }}
                secondaryAction={{
                    labelKey: 'errors.actions.previousPage',
                    icon: <ArrowBackIcon />,
                    onClick,
                }}
            />,
        );
        const secondary = screen.getByTestId('error-secondary-action');
        expect(secondary).toHaveTextContent('errors.actions.previousPage');
        secondary.click();
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('does not render the links section when not provided', () => {
        renderWithProviders(<Error {...defaultProps} />);
        expect(screen.queryByTestId('error-links')).not.toBeInTheDocument();
    });

    it('renders quick escape links', () => {
        renderWithProviders(
            <Error
                {...defaultProps}
                links={[
                    { labelKey: 'errors.links.home', icon: <HomeRoundedIcon />, to: '/' },
                    {
                        labelKey: 'errors.links.films',
                        icon: <LocalPrintshopIcon />,
                        to: '/data/films',
                    },
                ]}
                linksLabel="errors.links.tryInstead"
            />,
        );
        const section = screen.getByTestId('error-links');
        expect(section).toHaveTextContent('errors.links.tryInstead');
        expect(screen.getByRole('link', { name: /errors.links.home/ })).toHaveAttribute(
            'href',
            '/',
        );
        expect(screen.getByRole('link', { name: /errors.links.films/ })).toHaveAttribute(
            'href',
            '/data/films',
        );
    });

    it('does not render the safety notice when not provided', () => {
        renderWithProviders(<Error {...defaultProps} />);
        expect(screen.queryByTestId('error-safety')).not.toBeInTheDocument();
    });

    it('renders the safety notice when provided', () => {
        renderWithProviders(
            <Error
                {...defaultProps}
                safety={{ icon: <ShieldIcon />, messageKey: 'errors.403.safety' }}
            />,
        );
        expect(screen.getByTestId('error-safety')).toHaveTextContent('errors.403.safety');
    });
});
