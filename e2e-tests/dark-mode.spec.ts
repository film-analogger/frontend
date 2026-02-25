import { test, expect } from '@playwright/test';

import { colorSchemes } from '../src/Theme/themePrimitives';

import AxeBuilder from '@axe-core/playwright';

test.describe('dark mode', () => {
    test('Color scheme toggle', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('body')).toHaveCSS(
            'background-color',
            colorSchemes.light.palette.background.default,
        );
        await page.getByLabel('color-scheme-toggle').click();
        await page.getByRole('menuitem', { name: 'Dark' }).click();
        await expect(page.locator('body')).toHaveCSS(
            'background-color',
            colorSchemes.dark.palette.background.default,
        );
        await page.getByLabel('color-scheme-toggle').click();
        await page.getByRole('menuitem', { name: 'System' }).click();
        await expect(page.locator('body')).toHaveCSS(
            'background-color',
            colorSchemes.light.palette.background.default,
        );
    });

    test('dark mode home accessibility', async ({ page }) => {
        await page.goto('/');

        await page.getByLabel('color-scheme-toggle').click();
        await page.getByRole('menuitem', { name: 'Dark' }).click();
        await expect(page.locator('body')).toHaveCSS(
            'background-color',
            colorSchemes.dark.palette.background.default,
        );

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('footer dark mode', async ({ page }) => {
        await page.goto('/');

        await page.getByLabel('color-scheme-toggle').click();
        await page.getByRole('menuitem', { name: 'Dark' }).click();
        await expect(page.locator('footer')).toHaveCSS(
            'background-color',
            colorSchemes.dark.palette.background.paper,
        );
    });
});
