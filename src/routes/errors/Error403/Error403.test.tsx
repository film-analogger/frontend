import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Error403 from './Error403';

describe('Error403', () => {
    it('renders without crashing', () => {
        render(<Error403 />);
    });

    it('passes the correct detail prop', () => {
        render(<Error403 />);
        expect(screen.getByTestId('detail').textContent).toBe('errors.403.detail');
    });

    it('passes the correct metaDescription prop', () => {
        render(<Error403 />);
        expect(screen.getByTestId('metaDescription').textContent).toBe(
            'errors.403.metaDescription',
        );
    });

    it('passes the correct pageTitle prop', () => {
        render(<Error403 />);
        expect(screen.getByTestId('pageTitle').textContent).toBe('errors.403.pageTitle');
    });

    it('passes the correct statusCode prop', () => {
        render(<Error403 />);
        expect(screen.getByTestId('statusCode').textContent).toBe('403');
    });

    it('passes the correct title prop', () => {
        render(<Error403 />);
        expect(screen.getByTestId('title').textContent).toBe('errors.403.title');
    });

    it('renders the Error component with all required props', () => {
        render(<Error403 />);
        expect(screen.getByTestId('detail')).toBeDefined();
        expect(screen.getByTestId('metaDescription')).toBeDefined();
        expect(screen.getByTestId('pageTitle')).toBeDefined();
        expect(screen.getByTestId('statusCode')).toBeDefined();
        expect(screen.getByTestId('title')).toBeDefined();
    });
});
