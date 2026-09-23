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

  test('serves the internal design system showcase correctly', async ({ page }) => {
    await page.goto('/dev/design-system');

    await expect(page).toHaveTitle(/Design System Showcase/i);
    await expect(page.getByRole('heading', { level: 1, name: /design system/i })).toBeVisible();
    await expect(page.getByText(/01. Color Architecture/i)).toBeVisible();
    await expect(page.getByText(/05. Actions & Accessible Forms/i)).toBeVisible();

    // Verify robots noindex meta tag
    const robotsMeta = page.locator('meta[name="robots"]');
    await expect(robotsMeta).toHaveAttribute('content', /noindex.*nofollow/i);
  });
});
