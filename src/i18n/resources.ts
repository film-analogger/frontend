import en from './locales/en/translation.json';
import fr from './locales/fr/translation.json';

const resources = {
    en: {
        translation: en,
    },
    fr: {
        translation: fr,
    },
} as const;

export default resources;
