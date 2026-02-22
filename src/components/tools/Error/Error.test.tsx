import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Error from './Error';

describe('Error component', () => {
    const defaultProps = {
        statusCode: 404,
        title: 'Not Found',
        pageTitle: 'Page Not Found',
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
                detail="The page you are looking for does not exist."
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
                metaDescription="Custom meta description"
            />,
        );
        const metaTag = document.querySelector('meta[name="description"]');
        expect(metaTag).toBeInTheDocument();
        expect(metaTag).toHaveAttribute('content', 'Custom meta description');
    });

    it('renders correctly with a 500 status code', () => {
        render(
            <Error
                detail="Something went wrong on our end."
                metaDescription="500 error page"
                pageTitle="Server Error"
                statusCode={500}
                title="Internal Server Error"
            />,
        );
        expect(screen.getByTestId('error-status-code')).toHaveTextContent('500');
        expect(screen.getByTestId('error-title')).toHaveTextContent('Internal Server Error');
        expect(screen.getByTestId('error-detail')).toHaveTextContent(
            'Something went wrong on our end.',
        );
    });

    it('renders all optional props together', () => {
        render(
            <Error
                {...defaultProps}
                detail="Detailed error message"
                metaDescription="Meta description"
            />,
        );
        expect(screen.getByTestId('error-detail')).toBeInTheDocument();
        expect(document.querySelector('meta[name="description"]')).toBeInTheDocument();
    });
});
