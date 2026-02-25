import { describe, it, expect, vi, beforeEach } from 'vitest';
import i18n from './i18n';

describe('i18n', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should export i18n instance', () => {
        expect(i18n).toBeDefined();
    });

    it('should be initialized', () => {
        expect(i18n.isInitialized).toBe(true);
    });

    it('should have English translations loaded', () => {
        expect(i18n.getResourceBundle('en', 'translation')).toBeDefined();
    });

    it('should have French translations loaded', () => {
        expect(i18n.getResourceBundle('fr', 'translation')).toBeDefined();
    });

    it('should have fallback language set to English', () => {
        expect(i18n.options.fallbackLng).toStrictEqual(['en']);
    });

    it('should have interpolation escapeValue disabled', () => {
        expect(i18n.options.interpolation?.escapeValue).toBe(false);
    });

    it('should translate keys correctly', async () => {
        const translation = await i18n.t('common.key');
        expect(translation).toBeDefined();
    });

    it('should change language', async () => {
        await i18n.changeLanguage('fr');
        expect(i18n.language).toBe('fr');
        await i18n.changeLanguage('en');
    });
});
