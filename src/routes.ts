import { type RouteConfig, index, layout, prefix, route } from '@react-router/dev/routes';

export default [
    layout('./routes/dashboard/Dashboard/Dashboard.tsx', [
        index('./routes/dashboard/Home.tsx'),
        // child routes
        route('settings', './routes/dashboard/Settings.tsx'),
        route('profile', './routes/dashboard/Profile.tsx'),
        route('sessions', './routes/sessions/SessionList.tsx'),
        route('sessions/new', './routes/sessions/wizard/NewSessionWizard.tsx'),
        route('sessions/:sessionId', './routes/sessions/SessionDetail.tsx'),
        ...prefix('data', [
            route('films', './routes/data/films/FilmList.tsx'),
            route('films/:filmId', './routes/data/films/FilmDetail.tsx'),
            route('manufacturers', './routes/data/manufacturers/ManufacturerList.tsx'),
            route(
                'manufacturers/:manufacturerId',
                './routes/data/manufacturers/ManufacturerDetail.tsx',
            ),
            route('chemistries', './routes/data/chemistries/ChemistryList.tsx'),
            route('chemistries/:chemistryId', './routes/data/chemistries/ChemistryDetail.tsx'),
        ]),
        ...prefix('legal', [
            route('contact', './routes/legal/contact/Contact.tsx'),
            route('privacy', './routes/legal/privacy/Privacy.tsx'),
            route('terms', './routes/legal/terms/Terms.tsx'),
            route('cookies', './routes/legal/cookies/Cookies.tsx'),
            route('legals', './routes/legal/legals/Legals.tsx'),
        ]),
        ...prefix('error', [
            layout('./routes/errors/BaseError/BaseError.tsx', [
                route('404', './routes/errors/Error404/Error404.tsx'),
                route('403', './routes/errors/Error403/Error403.tsx'),
                route('500', './routes/errors/Error500/Error500.tsx'),
                route('503', './routes/errors/Error503/Error503.tsx'),
                route('offline', './routes/errors/ErrorOffline/ErrorOffline.tsx'),
            ]),
        ]),
    ]),

    route('*', './routes/errors/CatchAllRedirect404/CatchAllRedirect404.tsx'),
] satisfies RouteConfig;
