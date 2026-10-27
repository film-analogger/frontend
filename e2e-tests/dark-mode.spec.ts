import { test, expect } from '@playwright/test';

import { colorSchemes } from '../src/Theme/themePrimitives';

import AxeBuilder from '@axe-core/playwright';

/** Browsers serialize computed `background-color` as `rgb(...)`, never as hex. */
const hexToRgb = (hex: string): string => {
    const value = hex.replace('#', '');
    const r = parseInt(value.slice(0, 2), 16);
    const g = parseInt(value.slice(2, 4), 16);
    const b = parseInt(value.slice(4, 6), 16);
    return `rgb(${String(r)}, ${String(g)}, ${String(b)})`;
};

test.describe('dark mode', () => {
    test('Color scheme toggle', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('body')).toHaveCSS(
            'background-color',
            hexToRgb(colorSchemes.light.palette.background.default),
        );
        await page.getByLabel('Dark', { exact: true }).click();
        await expect(page.locator('body')).toHaveCSS(
            'background-color',
            hexToRgb(colorSchemes.dark.palette.background.default),
        );
        await page.getByLabel('Light', { exact: true }).click();
        await expect(page.locator('body')).toHaveCSS(
            'background-color',
            hexToRgb(colorSchemes.light.palette.background.default),
        );
    });

    test('darkroom (lab) mode toggle', async ({ page }) => {
        await page.goto('/');
        await page.getByLabel('Darkroom mode', { exact: true }).click();
        await expect(page.locator('body')).toHaveCSS(
            'background-color',
            hexToRgb(colorSchemes.lab.palette.background.default),
        );
    });

    test('dark mode home accessibility', async ({ page }) => {
        await page.goto('/');

        await page.getByLabel('Dark', { exact: true }).click();
        await expect(page.locator('body')).toHaveCSS(
            'background-color',
            hexToRgb(colorSchemes.dark.palette.background.default),
        );

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('footer dark mode', async ({ page }) => {
        await page.goto('/');

        await page.getByLabel('Dark', { exact: true }).click();
        await expect(page.locator('footer')).toHaveCSS(
            'background-color',
            hexToRgb(colorSchemes.dark.palette.background.paper),
        );
    });
});
