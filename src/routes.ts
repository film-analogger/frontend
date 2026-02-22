import { type RouteConfig, index, layout, prefix, route } from '@react-router/dev/routes';

export default [
    layout('./routes/dashboard/Dashboard.tsx', [
        index('./routes/dashboard/Home.tsx'),
        // child routes
        route('settings', './routes/dashboard/Settings.tsx'),
    ]),
    ...prefix('error', [
        layout('./routes/errors/BaseError/BaseError.tsx', [
            route('404', './routes/errors/Error404/Error404.tsx'),
            route('403', './routes/errors/Error403/Error403.tsx'),
            route('500', './routes/errors/Error500/Error500.tsx'),
        ]),
    ]),
    route('*', './routes/errors/CatchAllRedirect404/CatchAllRedirect404.tsx'),
] satisfies RouteConfig;
