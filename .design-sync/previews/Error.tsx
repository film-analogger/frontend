import { Error } from '@film-analogger/frontend';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CameraRollIcon from '@mui/icons-material/CameraRoll';
import BiotechIcon from '@mui/icons-material/Biotech';
import FactoryIcon from '@mui/icons-material/Factory';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import ShieldIcon from '@mui/icons-material/Shield';
import ErrorIcon from '@mui/icons-material/Error';
import RefreshIcon from '@mui/icons-material/Refresh';
import FlagIcon from '@mui/icons-material/Flag';

// Ported verbatim from the real route usages (src/routes/errors/Error404,
// Error403, Error500) — title/detail/pageTitle/etc are i18next translation
// keys the component calls t() on internally, from
// src/i18n/locales/en/translation.json, not literal display text.
// Error403's real caller wires primaryAction.onClick to keycloak.login() —
// swapped for a no-op here since the preview doesn't compose the Keycloak
// route wrapper, only the Error component itself (which never touches auth).
export const NotFound404 = () => (
    <Error
        detail="errors.404.detail"
        icon={<SearchOffIcon />}
        kind="errors.404.kind"
        links={[
            { labelKey: 'errors.links.home', icon: <HomeRoundedIcon />, to: '/' },
            { labelKey: 'errors.links.films', icon: <CameraRollIcon />, to: '/data/films' },
            {
                labelKey: 'errors.links.chemistries',
                icon: <BiotechIcon />,
                to: '/data/chemistries',
            },
            {
                labelKey: 'errors.links.manufacturers',
                icon: <FactoryIcon />,
                to: '/data/manufacturers',
            },
        ]}
        linksLabel="errors.links.tryInstead"
        metaDescription="errors.404.metaDescription"
        pageTitle="errors.404.pageTitle"
        primaryAction={{
            labelKey: 'errors.actions.backToLog',
            icon: <LocalPrintshopIcon />,
            to: '/sessions',
        }}
        secondaryAction={{
            labelKey: 'errors.actions.previousPage',
            icon: <ArrowBackIcon />,
            onClick: () => {},
        }}
        statusCode={404}
        stripLabel="errors.404.stripLabel"
        title="errors.404.title"
    />
);

export const Forbidden403 = () => (
    <Error
        accent="secondary"
        detail="errors.403.detail"
        icon={<LockIcon />}
        kind="errors.403.kind"
        links={[
            {
                labelKey: 'errors.links.filmsRepository',
                icon: <CameraRollIcon />,
                to: '/data/films',
            },
            {
                labelKey: 'errors.links.chemistriesRepository',
                icon: <BiotechIcon />,
                to: '/data/chemistries',
            },
        ]}
        linksLabel="errors.links.publicContent"
        metaDescription="errors.403.metaDescription"
        pageTitle="errors.403.pageTitle"
        primaryAction={{
            labelKey: 'errors.actions.login',
            icon: <LoginIcon />,
            onClick: () => {},
        }}
        safety={{ icon: <ShieldIcon />, messageKey: 'errors.403.safety' }}
        secondaryAction={{
            labelKey: 'errors.actions.backToLog',
            icon: <ArrowBackIcon />,
            to: '/sessions',
        }}
        statusCode={403}
        stripLabel="errors.403.stripLabel"
        title="errors.403.title"
    />
);

export const ServerError500 = () => (
    <Error
        accent="secondary"
        detail="errors.500.detail"
        icon={<ErrorIcon />}
        kind="errors.500.kind"
        metaDescription="errors.500.metaDescription"
        pageTitle="errors.500.pageTitle"
        primaryAction={{
            labelKey: 'errors.actions.retry',
            icon: <RefreshIcon />,
            onClick: () => {},
        }}
        secondaryAction={{
            labelKey: 'errors.actions.report',
            icon: <FlagIcon />,
            to: '/legal/contact',
        }}
        statusCode={500}
        stripLabel="errors.500.stripLabel"
        title="errors.500.title"
    />
);
