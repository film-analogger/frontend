import React from 'react';
import { Links, Meta, Scripts, ScrollRestoration } from 'react-router';

export const Layout = ({ children }: { readonly children: React.ReactNode }) => {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    content="width=device-width, initial-scale=1"
                    name="viewport"
                />
                <Meta />
                <Links />
            </head>
            <body>
                <h1 className="text-3xl font-bold underline">Hello world!</h1>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
};
