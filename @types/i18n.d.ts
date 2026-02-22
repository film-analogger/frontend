import 'i18next';

import ressources from '../src/i18n/ressources';

declare module 'i18next' {
    interface CustomTypeOptions {
        resources: typeof ressources;
    }
}
