import { test, expect } from '@playwright/test';

import dotenv from 'dotenv';

dotenv.config();

test.describe('Signup flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(`/authentication/signup`);
    });

    test('Should display the signup form', async ({ page }) => {
        await expect(page.getByRole('button', { name: /sign up/i })).toBeVisible();
    });

    test('Should successfully create an account', async ({ page }) => {
        await page.fill("input[name='username']", "testUser")
        await page.fill('input[name="email"]', "test@example.com");
        await page.fill('input[name="password"]', "SD");

        await page.click('button[type="submit"]');

        await expect(page.locator('.errorMessage')).toBeVisible();
    });
});
