import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Error from './Error';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => {
            const translations: Record<string, string> = {
                'errors.404.title': 'Not Found',
                'errors.404.pageTitle': 'Page Not Found',
                'errors.404.metaDescription': 'The page you are looking for does not exist.',
                'errors.404.detail': 'The page you are looking for does not exist.',
                'errors.500.title': 'Internal Server Error',
                'errors.500.detail': 'Internal Server Error Detail',
                'errors.500.metaDescription': 'Internal Server Error Meta Description',
                'errors.500.pageTitle': 'Internal Server Error Page Title',
            };
            return translations[key] ?? key;
        },
    }),
}));

describe('Error component', () => {
    const defaultProps: React.ComponentProps<typeof Error> = {
        statusCode: 404,
        title: 'errors.404.title',
        pageTitle: 'errors.404.pageTitle',
    };

    it('renders the error container', () => {
        render(<Error {...defaultProps} />);
        expect(screen.getByTestId('error-container')).toBeInTheDocument();
    });

    it('renders the status code', () => {
        render(<Error {...defaultProps} />);
        expect(screen.getByTestId('error-status-code')).toHaveTextContent('404');
    });

    it('renders the title', () => {
        render(<Error {...defaultProps} />);
        expect(screen.getByTestId('error-title')).toHaveTextContent('Not Found');
    });

    it('renders the page title', () => {
        render(<Error {...defaultProps} />);
        expect(document.querySelector('title')).toHaveTextContent('Page Not Found');
    });

    it('does not render detail when not provided', () => {
        render(<Error {...defaultProps} />);
        expect(screen.queryByTestId('error-detail')).not.toBeInTheDocument();
    });

    it('renders detail when provided', () => {
        render(
            <Error
                {...defaultProps}
                detail="errors.404.detail"
            />,
        );
        expect(screen.getByTestId('error-detail')).toHaveTextContent(
            'The page you are looking for does not exist.',
        );
    });

    it('does not render meta description when not provided', () => {
        render(<Error {...defaultProps} />);
        expect(document.querySelector('meta[name="description"]')).not.toBeInTheDocument();
    });

    it('renders meta description when provided', () => {
        render(
            <Error
                {...defaultProps}
                metaDescription="errors.404.metaDescription"
            />,
        );
        const metaTag = document.querySelector('meta[name="description"]');
        expect(metaTag).toBeInTheDocument();
        expect(metaTag).toHaveAttribute('content', 'The page you are looking for does not exist.');
    });

    it('renders correctly with a 500 status code', () => {
        render(
            <Error
                detail="errors.500.detail"
                metaDescription="errors.500.metaDescription"
                pageTitle="errors.500.pageTitle"
                statusCode={500}
                title="errors.500.title"
            />,
        );
        expect(screen.getByTestId('error-status-code')).toHaveTextContent('500');
        expect(screen.getByTestId('error-title')).toHaveTextContent('Internal Server Error');
        expect(screen.getByTestId('error-detail')).toHaveTextContent(
            'Internal Server Error Detail',
        );
    });

    it('renders all optional props together', () => {
        render(
            <Error
                {...defaultProps}
                detail="errors.404.detail"
                metaDescription="errors.404.metaDescription"
            />,
        );
        expect(screen.getByTestId('error-detail')).toBeInTheDocument();
        expect(document.querySelector('meta[name="description"]')).toBeInTheDocument();
    });
});
