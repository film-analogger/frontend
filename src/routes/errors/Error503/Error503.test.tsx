import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Error503 from './Error503';

vi.mock('~/components/tools/Error/Error');

describe('Error503', () => {
    it('renders without crashing', () => {
        render(<Error503 />);
    });

    it('passes the correct detail prop', () => {
        render(<Error503 />);
        expect(screen.getByTestId('detail').textContent).toBe('errors.503.detail');
    });

    it('passes the correct metaDescription prop', () => {
        render(<Error503 />);
        expect(screen.getByTestId('metaDescription').textContent).toBe(
            'errors.503.metaDescription',
        );
    });

    it('passes the correct pageTitle prop', () => {
        render(<Error503 />);
        expect(screen.getByTestId('pageTitle').textContent).toBe('errors.503.pageTitle');
    });

    it('passes the correct statusCode prop', () => {
        render(<Error503 />);
        expect(screen.getByTestId('statusCode').textContent).toBe('503');
    });

    it('passes the correct title prop', () => {
        render(<Error503 />);
        expect(screen.getByTestId('title').textContent).toBe('errors.503.title');
    });

    it('passes the correct kind and stripLabel props', () => {
        render(<Error503 />);
        expect(screen.getByTestId('kind').textContent).toBe('errors.503.kind');
        expect(screen.getByTestId('stripLabel').textContent).toBe('errors.503.stripLabel');
    });

    it('offers a reload primary action with no target route', () => {
        render(<Error503 />);
        expect(screen.getByTestId('primaryActionLabel').textContent).toBe('errors.actions.reload');
        expect(screen.getByTestId('primaryActionTo').textContent).toBe('');
    });

    it('has no secondary action or quick links', () => {
        render(<Error503 />);
        expect(screen.getByTestId('secondaryActionLabel').textContent).toBe('');
        expect(screen.getByTestId('links').textContent).toBe('');
    });
});
