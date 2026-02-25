/* eslint-disable react/no-multi-comp */

/* eslint-disable react-refresh/only-export-components */
import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from 'react-router';

import { CacheProvider } from '@emotion/react';

import React from 'react';

import 'src/i18n/i18n';

import type { Route } from './+types/root';
import createEmotionCache from './createCache';
import AppTheme from './Theme';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const links: Route.LinksFunction = () => [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
    },
    {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
    },
];

export const Layout = ({ children }: { readonly children: React.ReactNode }) => {
    const { t } = useTranslation();

    return (
        <html
            lang="en"
            suppressHydrationWarning
        >
            <head>
                <meta charSet="utf-8" />
                <meta
                    content="width=device-width, initial-scale=1"
                    name="viewport"
                />
                <title>{t('app.title')}</title>
                <meta
                    content={t('app.description')}
                    name="description"
                />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
};

const cache = createEmotionCache();

const App: React.FunctionComponent = () => {
    if (typeof window !== 'undefined') {
        return (
            <React.StrictMode>
                <CacheProvider value={cache}>
                    <AppTheme>
                        <Outlet />
                    </AppTheme>
                </CacheProvider>
            </React.StrictMode>
        );
    }
    return (
        <React.StrictMode>
            <CacheProvider value={cache}>
                <AppTheme>
                    <Outlet />
                </AppTheme>
            </CacheProvider>
        </React.StrictMode>
    );
};

export default App;

export const ErrorBoundary = ({ error }: Route.ErrorBoundaryProps) => {
    let message = 'Oops!';
    let details = 'An unexpected error occurred.';
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? '404' : 'Error';
        details =
            error.status === 404
                ? 'The requested page could not be found.'
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <Box
            component="main"
            sx={{ pt: 8, p: 2, maxWidth: 'lg', mx: 'auto' }}
        >
            <h1>{message}</h1>
            <p>{details}</p>
            {stack ? (
                <Box
                    component="pre"
                    sx={{ width: '100%', p: 2, overflowX: 'auto' }}
                >
                    <code>{stack}</code>
                </Box>
            ) : null}
        </Box>
    );
};
