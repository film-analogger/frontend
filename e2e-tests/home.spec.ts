import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Film Analogger/);
});

test('Home h1 title', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    await expect(page.getByText('Home')).toBeVisible();
});

test('500 error page', async ({ page }) => {
    await page.goto('http://localhost:3000/error/500');

    await expect(page.getByText('500')).toBeVisible();
});

test('not found navigate redirects to 404', async ({ page }) => {
    await page.goto('http://localhost:3000/pouet');

    await page.waitForURL('http://localhost:3000/error/404');
    await expect(page.getByText('404')).toBeVisible();
});
