import axios, { type AxiosInstance, type AxiosResponse, type RawAxiosRequestConfig } from 'axios';

const cacheTtlMs = 15_000;

interface CacheEntry {
    promise: Promise<AxiosResponse>;
    expiresAt: number | null;
}

const keyFor = (config: RawAxiosRequestConfig): string => {
    const headers = config.headers as Record<string, unknown> | undefined;
    const locale = headers?.['X-LOCALE'];
    return `${config.url ?? ''}::${typeof locale === 'string' ? locale : ''}`;
};

/**
 * Wraps a fresh axios instance so identical GET requests (same URL + locale)
 * share a single in-flight promise and a short-lived cached response. This
 * collapses the duplicate fetches that come from React StrictMode's dev-only
 * double-effect-invocation and from independent components (e.g. the side
 * menu badge counts and a page) requesting the same collection on mount.
 * Any non-GET request clears the cache so mutations are reflected immediately.
 */
export const createCachedAxios = (): AxiosInstance => {
    const instance = axios.create();
    const cache = new Map<string, CacheEntry>();
    const originalRequest = instance.request.bind(instance);

    instance.request = ((config: RawAxiosRequestConfig) => {
        const method = (config.method ?? 'get').toLowerCase();

        if (method !== 'get') {
            return originalRequest(config).then((response) => {
                cache.clear();
                return response;
            });
        }

        const key = keyFor(config);
        const cached = cache.get(key);
        if (cached && (cached.expiresAt === null || cached.expiresAt > Date.now())) {
            return cached.promise;
        }

        const promise: Promise<AxiosResponse> = originalRequest(config)
            .then((response) => {
                const entry = cache.get(key);
                if (entry) {
                    entry.expiresAt = Date.now() + cacheTtlMs;
                }
                return response;
            })
            .catch((error: unknown) => {
                cache.delete(key);
                throw error;
            });

        cache.set(key, { promise, expiresAt: null });
        return promise;
    }) as typeof instance.request;

    return instance;
};
