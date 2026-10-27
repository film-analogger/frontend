const mockRequest = vi.fn();

vi.mock('axios', () => ({
    default: {
        create: () => ({ request: mockRequest }),
    },
}));

import { createCachedAxios } from './requestCache';

const response = (data: unknown) => ({ data, status: 200, statusText: 'OK', headers: {} });

beforeEach(() => {
    mockRequest.mockReset();
});

it('dedupes concurrent identical GET requests into a single call', async () => {
    mockRequest.mockResolvedValue(response({ hello: 'world' }));
    const instance = createCachedAxios();

    const [first, second] = await Promise.all([
        instance.request({ method: 'get', url: '/films' }),
        instance.request({ method: 'get', url: '/films' }),
    ]);

    expect(mockRequest).toHaveBeenCalledTimes(1);
    expect(first.data).toEqual({ hello: 'world' });
    expect(second.data).toEqual({ hello: 'world' });
});

it('serves a resolved GET from cache on a later call', async () => {
    mockRequest.mockResolvedValue(response({ hello: 'world' }));
    const instance = createCachedAxios();

    await instance.request({ method: 'get', url: '/films' });
    await instance.request({ method: 'get', url: '/films' });

    expect(mockRequest).toHaveBeenCalledTimes(1);
});

it('does not share the cache across different URLs', async () => {
    mockRequest.mockResolvedValue(response({}));
    const instance = createCachedAxios();

    await Promise.all([
        instance.request({ method: 'get', url: '/films' }),
        instance.request({ method: 'get', url: '/chemistries' }),
    ]);

    expect(mockRequest).toHaveBeenCalledTimes(2);
});

it('does not share the cache across different locales', async () => {
    mockRequest.mockResolvedValue(response({}));
    const instance = createCachedAxios();

    await Promise.all([
        instance.request({ method: 'get', url: '/films', headers: { 'X-LOCALE': 'en' } }),
        instance.request({ method: 'get', url: '/films', headers: { 'X-LOCALE': 'fr' } }),
    ]);

    expect(mockRequest).toHaveBeenCalledTimes(2);
});

it('never caches non-GET requests', async () => {
    mockRequest.mockResolvedValue(response({}));
    const instance = createCachedAxios();

    await instance.request({ method: 'post', url: '/films' });
    await instance.request({ method: 'post', url: '/films' });

    expect(mockRequest).toHaveBeenCalledTimes(2);
});

it('clears the cache after a mutation so the next GET refetches', async () => {
    mockRequest.mockResolvedValue(response({}));
    const instance = createCachedAxios();

    await instance.request({ method: 'get', url: '/films' });
    await instance.request({ method: 'post', url: '/films' });
    await instance.request({ method: 'get', url: '/films' });

    expect(mockRequest).toHaveBeenCalledTimes(3);
});

it('does not cache a rejected GET request', async () => {
    mockRequest.mockRejectedValueOnce(new Error('boom'));
    mockRequest.mockResolvedValueOnce(response({ ok: true }));
    const instance = createCachedAxios();

    await expect(instance.request({ method: 'get', url: '/films' })).rejects.toThrow('boom');
    await instance.request({ method: 'get', url: '/films' });

    expect(mockRequest).toHaveBeenCalledTimes(2);
});
