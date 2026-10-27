import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import ErrorOffline from './ErrorOffline';

vi.mock('~/components/tools/Error/Error');

const reloadMock = vi.fn();

beforeEach(() => {
    reloadMock.mockClear();
    Object.defineProperty(window, 'location', {
        value: { reload: reloadMock },
        writable: true,
    });
});

describe('ErrorOffline', () => {
    it('renders without crashing', () => {
        render(<ErrorOffline />);
    });

    it('passes a non-HTTP status code with an OFF display code', () => {
        render(<ErrorOffline />);
        expect(screen.getByTestId('statusCode').textContent).toBe('0');
        expect(screen.getByTestId('code').textContent).toBe('OFF');
    });

    it('passes the correct detail prop', () => {
        render(<ErrorOffline />);
        expect(screen.getByTestId('detail').textContent).toBe('errors.offline.detail');
    });

    it('passes the correct metaDescription prop', () => {
        render(<ErrorOffline />);
        expect(screen.getByTestId('metaDescription').textContent).toBe(
            'errors.offline.metaDescription',
        );
    });

    it('passes the correct pageTitle prop', () => {
        render(<ErrorOffline />);
        expect(screen.getByTestId('pageTitle').textContent).toBe('errors.offline.pageTitle');
    });

    it('passes the correct title, kind and stripLabel props', () => {
        render(<ErrorOffline />);
        expect(screen.getByTestId('title').textContent).toBe('errors.offline.title');
        expect(screen.getByTestId('kind').textContent).toBe('errors.offline.kind');
        expect(screen.getByTestId('stripLabel').textContent).toBe('errors.offline.stripLabel');
    });

    it('offers a retry-connection primary action with no target route', () => {
        render(<ErrorOffline />);
        expect(screen.getByTestId('primaryActionLabel').textContent).toBe(
            'errors.actions.retryConnection',
        );
        expect(screen.getByTestId('primaryActionTo').textContent).toBe('');
    });

    it('has a safety notice', () => {
        render(<ErrorOffline />);
        expect(screen.getByTestId('safety').textContent).toBe('errors.offline.safety');
    });

    it('reloads automatically once the connection comes back', () => {
        render(<ErrorOffline />);
        expect(reloadMock).not.toHaveBeenCalled();
        window.dispatchEvent(new Event('online'));
        expect(reloadMock).toHaveBeenCalledTimes(1);
    });
});
