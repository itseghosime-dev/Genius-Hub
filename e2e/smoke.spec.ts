import { test, expect } from '@playwright/test';

test.describe('Genius Hub Application Smoke Test', () => {
  test('serves the foundation landing page with correct title and heading', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Genius Hub/i);
    await expect(page.getByRole('heading', { level: 1, name: /genius hub/i })).toBeVisible();
    await expect(page.getByText(/digital platform/i)).toBeVisible();
    await expect(page.getByText(/engineering foundation/i)).toBeVisible();
  });

  test('serves robots.txt correctly', async ({ page }) => {
    const response = await page.goto('/robots.txt');
    expect(response?.status()).toBe(200);
    const text = await response?.text();
    expect(text).toContain('User-Agent: *');
  });

  test('handles 404 not found route gracefully', async ({ page }) => {
    const response = await page.goto('/non-existent-page-path');
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1, name: /404/i })).toBeVisible();
  });
});
