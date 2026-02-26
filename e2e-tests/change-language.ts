import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page.getByRole('link', { name: 'Home' })).toContainText('Home');
    await page.getByRole('button', { name: 'language-select-toggle' }).click();
    await page.getByRole('menuitem', { name: 'Français' }).click();
    await expect(page.getByRole('link', { name: 'Accueil' })).toContainText('Accueil');
    await page.getByRole('button', { name: 'language-select-toggle' }).click();
    await page.getByRole('menuitem', { name: 'English' }).click();
    await expect(page.getByRole('link', { name: 'Home' })).toContainText('Home');
});
