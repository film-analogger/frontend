import { test, expect } from '@playwright/test';

import AxeBuilder from '@axe-core/playwright';

test.describe('500 error page', () => {
    test('500 error page', async ({ page }) => {
        await page.goto('http://localhost:3000/error/500');

        await expect(page.getByText('500')).toBeVisible();
    });

    test('500 error accessibility', async ({ page }) => {
        await page.goto('http://localhost:3000/error/500');
        await expect(page.getByText('500')).toBeVisible();

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    });
});
