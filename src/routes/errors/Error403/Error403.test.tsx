import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import Error403 from './Error403';

vi.mock('~/components/tools/Error/Error');

const loginMock = vi.fn();

vi.mock('~/keycloak/useKeycloak', () => ({
    useKeycloak: () => ({ keycloak: { login: loginMock }, authenticated: false }),
}));

const renderComponent = () =>
    render(
        <MemoryRouter>
            <Error403 />
        </MemoryRouter>,
    );

describe('Error403', () => {
    it('renders without crashing', () => {
        renderComponent();
    });

    it('passes the correct detail prop', () => {
        renderComponent();
        expect(screen.getByTestId('detail').textContent).toBe('errors.403.detail');
    });

    it('passes the correct metaDescription prop', () => {
        renderComponent();
        expect(screen.getByTestId('metaDescription').textContent).toBe(
            'errors.403.metaDescription',
        );
    });

    it('passes the correct pageTitle prop', () => {
        renderComponent();
        expect(screen.getByTestId('pageTitle').textContent).toBe('errors.403.pageTitle');
    });

    it('passes the correct statusCode prop', () => {
        renderComponent();
        expect(screen.getByTestId('statusCode').textContent).toBe('403');
    });

    it('passes the correct title prop', () => {
        renderComponent();
        expect(screen.getByTestId('title').textContent).toBe('errors.403.title');
    });

    it('passes the correct kind and stripLabel props', () => {
        renderComponent();
        expect(screen.getByTestId('kind').textContent).toBe('errors.403.kind');
        expect(screen.getByTestId('stripLabel').textContent).toBe('errors.403.stripLabel');
    });

    it('offers a login primary action', () => {
        renderComponent();
        expect(screen.getByTestId('primaryActionLabel').textContent).toBe('errors.actions.login');
    });

    it('has a safety notice', () => {
        renderComponent();
        expect(screen.getByTestId('safety').textContent).toBe('errors.403.safety');
    });

    it('lists the public repositories as quick links', () => {
        renderComponent();
        expect(screen.getByTestId('linksLabel').textContent).toBe('errors.links.publicContent');
        expect(screen.getByTestId('links').textContent).toBe(
            'errors.links.filmsRepository,errors.links.chemistriesRepository',
        );
    });

    it('sends the secondary action back to the logbook', () => {
        renderComponent();
        expect(screen.getByTestId('secondaryActionLabel').textContent).toBe(
            'errors.actions.backToLog',
        );
        expect(screen.getByTestId('secondaryActionTo').textContent).toBe('/sessions');
    });
});
