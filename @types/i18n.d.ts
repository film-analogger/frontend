import 'i18next';

import resources from '../src/i18n/resources';

declare module 'i18next' {
    interface CustomTypeOptions {
        resources: typeof resources;
    }
}
