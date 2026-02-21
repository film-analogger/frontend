import { type RouteConfig, index, layout, prefix, route } from '@react-router/dev/routes';

export default [
    index('routes/Home.tsx'),
    layout('./modules/dashboard/Dashboard.tsx', [
        index('./modules/dashboard/Home.tsx'),
        // child routes
        route('settings', './modules/dashboard/Settings.tsx'),
    ]),
    ...prefix('error', [
        layout('./modules/errors/BaseError.tsx', [
            route('404', './modules/errors/Error404.tsx'),
            route('403', './modules/errors/Error403.tsx'),
            route('500', './modules/errors/Error500.tsx'),
        ]),
    ]),
    route('*', './modules/errors/CatchAllRedirect404.tsx'),
] satisfies RouteConfig;
