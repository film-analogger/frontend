import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '@playwright/test';

test.describe('Footer Links', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/');
    });

    test('footer privacy link available and accessible', async ({ page }) => {
        await page.getByRole('link', { name: 'Privacy Policy' }).click();
        await expect(page.getByRole('heading', { name: 'Privacy Policy' })).toBeVisible();
        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    });
    test('footer terms link available and accessible', async ({ page }) => {
        await page.getByRole('link', { name: 'Terms of Use' }).click();
        await expect(page.getByRole('heading', { name: 'Terms of Use' })).toBeVisible();
        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    });
    test('footer cookies link available and accessible', async ({ page }) => {
        await page.getByRole('link', { name: 'Cookie Management' }).click();
        await expect(page.getByRole('heading', { name: 'Cookie Management' })).toBeVisible();
        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    });
    test('footer legal notices link available and accessible', async ({ page }) => {
        await page.getByRole('link', { name: 'Legal Notices' }).click();
        await expect(page.getByRole('heading', { name: 'Legal Notices' })).toBeVisible();
        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    });
    test('footer contact link available and accessible', async ({ page }) => {
        await page.getByRole('link', { name: 'Contact' }).click();
        await expect(page.getByRole('heading', { name: 'Contact us' })).toBeVisible();
        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    });
});
