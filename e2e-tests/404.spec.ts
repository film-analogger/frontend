import { test, expect } from '@playwright/test';

import AxeBuilder from '@axe-core/playwright'; // 1

test.describe('404 error page', () => {
    test('not found navigate redirects to 404', async ({ page }) => {
        await page.goto('http://localhost:3000/pouet');

        await page.waitForURL('http://localhost:3000/error/404');
        await expect(page.getByText('404')).toBeVisible();
    });

    test('404 error accessibility', async ({ page }) => {
        await page.goto('http://localhost:3000/error/404');
        await expect(page.getByText('404')).toBeVisible();

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    });
});
