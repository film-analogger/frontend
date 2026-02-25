import { test, expect } from '@playwright/test';

import AxeBuilder from '@axe-core/playwright';

test.describe('Home page', () => {
    test('has title', async ({ page }) => {
        await page.goto('/');

        // Expect a title "to contain" a substring.
        await expect(page).toHaveTitle(/Film Analogger/);
    });

    test('Home h1 title', async ({ page }) => {
        await page.goto('/');

        await expect(page.getByText('Home')).toBeVisible();
    });

    test('Home accessibility', async ({ page }) => {
        await page.goto('/');
        await expect(page.getByText('Home')).toBeVisible();

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    });
});
