import { Error } from '@film-analogger/frontend';

// title/detail/pageTitle/metaDescription are i18next translation keys — the
// component calls t() on them internally — so these are the app's real keys
// from src/i18n/locales/en/translation.json, not literal display text.
export const NotFound404 = () => (
    <Error
        detail="errors.404.detail"
        metaDescription="errors.404.metaDescription"
        pageTitle="errors.404.pageTitle"
        statusCode={404}
        title="errors.404.title"
    />
);

export const Forbidden403 = () => (
    <Error
        detail="errors.403.detail"
        metaDescription="errors.403.metaDescription"
        pageTitle="errors.403.pageTitle"
        statusCode={403}
        title="errors.403.title"
    />
);

export const ServerError500 = () => (
    <Error
        detail="errors.500.detail"
        metaDescription="errors.500.metaDescription"
        pageTitle="errors.500.pageTitle"
        statusCode={500}
        title="errors.500.title"
    />
);
