/* eslint-disable react/no-multi-comp */

/* eslint-disable react-refresh/only-export-components */
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts } from 'react-router';

// import { CacheProvider } from '@emotion/react';

import React from 'react';

import 'src/i18n/i18n';

import './root.css';
import type { Route } from './+types/root';
// import createEmotionCache from './createCache';
import AppTheme from './Theme';
import { Box, CssBaseline } from '@mui/material';
import { useTranslation } from 'react-i18next';
import KeycloakProvider from './keycloak/KeycloakProvider';

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
    {
        rel: 'stylesheet',

        href: 'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css',
        integrity:
            'sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==',
        crossOrigin: 'anonymous',
        referrerPolicy: 'no-referrer',
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
                <CssBaseline />
                {children}
                <Scripts />
            </body>
        </html>
    );
};

// const cache = createEmotionCache();

const App: React.FunctionComponent = () => {
    return (
        <React.StrictMode>
            <AppTheme>
                <KeycloakProvider>
                    <Outlet />
                </KeycloakProvider>
            </AppTheme>
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
            sx={{ paddingTop: 8, padding: 2, maxWidth: 'lg', marginX: 'auto' }}
        >
            <h1>{message}</h1>
            <p>{details}</p>
            {stack ? (
                <Box
                    component="pre"
                    sx={{ width: '100%', padding: 2, overflowX: 'auto' }}
                >
                    <code>{stack}</code>
                </Box>
            ) : null}
        </Box>
    );
};
