import { test, expect } from '@playwright/test';

test.describe('Genius Hub Application Smoke Test', () => {
  test('serves the public landing page with correct title and navigation shell', async ({
    page,
  }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Genius Hub/i);
    await expect(
      page.getByRole('heading', { level: 1, name: /human capital development/i }),
    ).toBeVisible();
    await expect(page.getByText(/global development organization/i).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /apply for training/i }).first()).toBeVisible();
  });

  test('serves robots.txt correctly', async ({ page }) => {
    const response = await page.goto('/robots.txt');
    expect(response?.status()).toBe(200);
    const text = await response?.text();
    expect(text).toContain('User-Agent: *');
  });

  test('serves sitemap.xml correctly', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');
    expect(response?.status()).toBe(200);
    const text = await response?.text();
    expect(text).toContain('/about');
    expect(text).toContain('/focus-areas');
    expect(text).toContain('/programmes');
  });

  test('serves the internal design system showcase correctly', async ({ page }) => {
    await page.goto('/dev/design-system');

    await expect(page).toHaveTitle(/Design System Showcase/i);
    await expect(page.getByRole('heading', { level: 1, name: /design system/i })).toBeVisible();

    // Verify robots noindex meta tag
    const robotsMeta = page.locator('meta[name="robots"]');
    await expect(robotsMeta).toHaveAttribute('content', /noindex.*nofollow/i);
  });
});
