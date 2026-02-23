import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import CatchAllRedirect404 from './CatchAllRedirect404';

const mockNavigate = vi.fn();

vi.mock('react-router', () => ({
    useNavigate: () => mockNavigate,
}));

describe('CatchAllRedirect404', () => {
    beforeEach(() => {
        mockNavigate.mockReset();
    });

    it('should render nothing', () => {
        mockNavigate.mockReturnValue(undefined);
        const { container } = render(<CatchAllRedirect404 />);
        expect(container.firstChild).toBeNull();
    });

    it('should navigate to /error/404 on mount', () => {
        mockNavigate.mockReturnValue(undefined);
        render(<CatchAllRedirect404 />);
        expect(mockNavigate).toHaveBeenCalledWith('/error/404', { replace: true });
    });

    it('should navigate with replace: true to avoid adding to history', () => {
        mockNavigate.mockReturnValue(undefined);
        render(<CatchAllRedirect404 />);
        const callArgs = mockNavigate.mock.calls[0];
        expect(callArgs[1]).toEqual({ replace: true });
    });

    it('should navigate exactly once on mount', () => {
        mockNavigate.mockReturnValue(undefined);
        render(<CatchAllRedirect404 />);
        expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

    it('should handle navigation returning a resolved promise', () => {
        mockNavigate.mockReturnValue(Promise.resolve());
        render(<CatchAllRedirect404 />);
        expect(mockNavigate).toHaveBeenCalledWith('/error/404', { replace: true });
    });

    it('should handle navigation returning a rejected promise without throwing', async () => {
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        mockNavigate.mockReturnValue(Promise.reject(new Error('Navigation failed')));

        render(<CatchAllRedirect404 />);

        await vi.waitFor(() => {
            expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to navigate to 404 page');
        });

        consoleErrorSpy.mockRestore();
    });

    it('should not log error when navigation succeeds with a promise', async () => {
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        mockNavigate.mockReturnValue(Promise.resolve());

        render(<CatchAllRedirect404 />);

        await new Promise((resolve) => setTimeout(resolve, 0));

        expect(consoleErrorSpy).not.toHaveBeenCalled();
        consoleErrorSpy.mockRestore();
    });

    it('should not log error when navigation returns undefined', async () => {
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        mockNavigate.mockReturnValue(undefined);

        render(<CatchAllRedirect404 />);

        await new Promise((resolve) => setTimeout(resolve, 0));

        expect(consoleErrorSpy).not.toHaveBeenCalled();
        consoleErrorSpy.mockRestore();
    });
});
