import { test, expect } from '@playwright/test';

import AxeBuilder from '@axe-core/playwright';

test.describe('403 error page', () => {
    test('403 error page', async ({ page }) => {
        await page.goto('http://localhost:3000/error/403');

        await expect(page.getByText('403')).toBeVisible();
    });

    test('403 error accessibility', async ({ page }) => {
        await page.goto('http://localhost:3000/error/403');
        await expect(page.getByText('403')).toBeVisible();

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    });
});
