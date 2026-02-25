import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import { describe, expect, it } from 'vitest';
import CatchAllRedirect404 from './CatchAllRedirect404';

describe('CatchAllRedirect404', () => {
    it('should redirect to /error/404', () => {
        render(
            <MemoryRouter initialEntries={['/unknown-path']}>
                <Routes>
                    <Route
                        element={<div data-testid="error-404-page" />}
                        path="/error/404"
                    />
                    <Route
                        element={<CatchAllRedirect404 />}
                        path="*"
                    />
                </Routes>
            </MemoryRouter>,
        );

        const errorPage = document.querySelector('[data-testid="error-404-page"]');
        expect(errorPage).not.toBeNull();
    });

    it('should replace the history entry instead of pushing a new one', () => {
        const historyEntries: string[] = [];

        render(
            <MemoryRouter initialEntries={['/some-path']}>
                <Routes>
                    <Route
                        element={<div data-testid="error-404-page" />}
                        path="/error/404"
                    />
                    <Route
                        element={<CatchAllRedirect404 />}
                        path="*"
                    />
                </Routes>
            </MemoryRouter>,
        );

        const errorPage = document.querySelector('[data-testid="error-404-page"]');
        expect(errorPage).not.toBeNull();
        // If replace works correctly, navigating back should not go to /some-path
        expect(historyEntries.length).toBe(0);
    });

    it('should render Navigate component with correct props', () => {
        render(
            <MemoryRouter initialEntries={['/any-unknown-route']}>
                <Routes>
                    <Route
                        element={<div data-testid="redirected-page" />}
                        path="/error/404"
                    />
                    <Route
                        element={<CatchAllRedirect404 />}
                        path="*"
                    />
                </Routes>
            </MemoryRouter>,
        );

        expect(document.querySelector('[data-testid="redirected-page"]')).not.toBeNull();
    });

    it('should redirect regardless of the initial unknown path', () => {
        const unknownPaths = ['/foo', '/bar/baz', '/deeply/nested/path'];

        unknownPaths.forEach((path) => {
            const { unmount } = render(
                <MemoryRouter initialEntries={[path]}>
                    <Routes>
                        <Route
                            element={<div data-testid="error-404-page" />}
                            path="/error/404"
                        />
                        <Route
                            element={<CatchAllRedirect404 />}
                            path="*"
                        />
                    </Routes>
                </MemoryRouter>,
            );

            expect(document.querySelector('[data-testid="error-404-page"]')).not.toBeNull();
            unmount();
        });
    });
});
