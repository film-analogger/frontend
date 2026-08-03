import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router';
import Error500 from './Error500';

vi.mock('~/components/tools/Error/Error');

const renderComponent = () =>
    render(
        <MemoryRouter>
            <Error500 />
        </MemoryRouter>,
    );

describe('Error500', () => {
    it('renders without crashing', () => {
        renderComponent();
    });

    it('passes the correct detail prop', () => {
        renderComponent();
        expect(screen.getByTestId('detail').textContent).toBe('errors.500.detail');
    });

    it('passes the correct metaDescription prop', () => {
        renderComponent();
        expect(screen.getByTestId('metaDescription').textContent).toBe(
            'errors.500.metaDescription',
        );
    });

    it('passes the correct pageTitle prop', () => {
        renderComponent();
        expect(screen.getByTestId('pageTitle').textContent).toBe('errors.500.pageTitle');
    });

    it('passes the correct statusCode prop', () => {
        renderComponent();
        expect(screen.getByTestId('statusCode').textContent).toBe('500');
    });

    it('passes the correct title prop', () => {
        renderComponent();
        expect(screen.getByTestId('title').textContent).toBe('errors.500.title');
    });

    it('passes the correct kind and stripLabel props', () => {
        renderComponent();
        expect(screen.getByTestId('kind').textContent).toBe('errors.500.kind');
        expect(screen.getByTestId('stripLabel').textContent).toBe('errors.500.stripLabel');
    });

    it('offers a retry primary action with no target route', () => {
        renderComponent();
        expect(screen.getByTestId('primaryActionLabel').textContent).toBe('errors.actions.retry');
        expect(screen.getByTestId('primaryActionTo').textContent).toBe('');
    });

    it('sends the secondary action to the contact page', () => {
        renderComponent();
        expect(screen.getByTestId('secondaryActionLabel').textContent).toBe(
            'errors.actions.report',
        );
        expect(screen.getByTestId('secondaryActionTo').textContent).toBe('/legal/contact');
    });
});
