import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Error500 from './Error500';

describe('Error500', () => {
    it('renders without crashing', () => {
        render(<Error500 />);
    });

    it('passes the correct detail prop', () => {
        render(<Error500 />);
        expect(screen.getByTestId('detail').textContent).toBe('errors.500.detail');
    });

    it('passes the correct metaDescription prop', () => {
        render(<Error500 />);
        expect(screen.getByTestId('metaDescription').textContent).toBe(
            'errors.500.metaDescription',
        );
    });

    it('passes the correct pageTitle prop', () => {
        render(<Error500 />);
        expect(screen.getByTestId('pageTitle').textContent).toBe('errors.500.pageTitle');
    });

    it('passes the correct statusCode prop', () => {
        render(<Error500 />);
        expect(screen.getByTestId('statusCode').textContent).toBe('500');
    });

    it('passes the correct title prop', () => {
        render(<Error500 />);
        expect(screen.getByTestId('title').textContent).toBe('errors.500.title');
    });

    it('renders the Error component with all required props', () => {
        render(<Error500 />);
        expect(screen.getByTestId('detail')).toBeDefined();
        expect(screen.getByTestId('metaDescription')).toBeDefined();
        expect(screen.getByTestId('pageTitle')).toBeDefined();
        expect(screen.getByTestId('statusCode')).toBeDefined();
        expect(screen.getByTestId('title')).toBeDefined();
    });
});
