import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router';
import Error404 from './Error404';

vi.mock('~/components/tools/Error/Error');

const renderComponent = () =>
    render(
        <MemoryRouter>
            <Error404 />
        </MemoryRouter>,
    );

describe('Error404', () => {
    it('renders without crashing', () => {
        renderComponent();
    });

    it('passes the correct detail prop', () => {
        renderComponent();
        expect(screen.getByTestId('detail').textContent).toBe('errors.404.detail');
    });

    it('passes the correct metaDescription prop', () => {
        renderComponent();
        expect(screen.getByTestId('metaDescription').textContent).toBe(
            'errors.404.metaDescription',
        );
    });

    it('passes the correct pageTitle prop', () => {
        renderComponent();
        expect(screen.getByTestId('pageTitle').textContent).toBe('errors.404.pageTitle');
    });

    it('passes the correct statusCode prop', () => {
        renderComponent();
        expect(screen.getByTestId('statusCode').textContent).toBe('404');
    });

    it('passes the correct title prop', () => {
        renderComponent();
        expect(screen.getByTestId('title').textContent).toBe('errors.404.title');
    });

    it('passes the correct kind and stripLabel props', () => {
        renderComponent();
        expect(screen.getByTestId('kind').textContent).toBe('errors.404.kind');
        expect(screen.getByTestId('stripLabel').textContent).toBe('errors.404.stripLabel');
    });

    it('sends the primary action back to the logbook', () => {
        renderComponent();
        expect(screen.getByTestId('primaryActionLabel').textContent).toBe(
            'errors.actions.backToLog',
        );
        expect(screen.getByTestId('primaryActionTo').textContent).toBe('/sessions');
    });

    it('has a previous-page secondary action with no target route', () => {
        renderComponent();
        expect(screen.getByTestId('secondaryActionLabel').textContent).toBe(
            'errors.actions.previousPage',
        );
        expect(screen.getByTestId('secondaryActionTo').textContent).toBe('');
    });

    it('lists the four main destinations as quick links', () => {
        renderComponent();
        expect(screen.getByTestId('linksLabel').textContent).toBe('errors.links.tryInstead');
        expect(screen.getByTestId('links').textContent).toBe(
            'errors.links.home,errors.links.films,errors.links.chemistries,errors.links.manufacturers',
        );
    });
});
