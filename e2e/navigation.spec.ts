import { test, expect } from '@playwright/test';

test.describe('Public Navigation, Routes & IA E2E Verification', () => {
  test('navigates across key public pages with proper layout and breadcrumbs', async ({ page }) => {
    // 1. Visit About overview
    await page.goto('/about');
    await expect(page).toHaveTitle(/About Genius Hub/i);
    await expect(page.getByRole('heading', { level: 1, name: 'About Genius Hub' })).toBeVisible();
    await expect(page.getByRole('navigation', { name: /breadcrumb/i })).toBeVisible();

    // 2. Visit Leadership
    await page.goto('/about/leadership');
    await expect(page).toHaveTitle(/Leadership/i);
    await expect(page.getByRole('heading', { name: 'Isimeme Whyte' })).toBeVisible();

    // 3. Visit Focus Areas
    await page.goto('/focus-areas');
    await expect(page).toHaveTitle(/Focus Areas/i);

    // 4. Visit Programmes & dynamic programme shell
    await page.goto('/programmes');
    await expect(page).toHaveTitle(/Training Programmes/i);
    await page
      .getByRole('link', { name: /view curriculum/i })
      .first()
      .click();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // 5. Visit Impact
    await page.goto('/impact');
    await expect(page).toHaveTitle(/Impact Overview/i);
    await expect(page.getByText('50,000+')).toBeVisible();

    // 6. Visit Events
    await page.goto('/events');
    await expect(page).toHaveTitle(/Events & Workshops/i);

    // 7. Visit Stories
    await page.goto('/stories');
    await expect(page).toHaveTitle(/Stories & News/i);

    // 8. Visit Shop
    await page.goto('/shop');
    await expect(page).toHaveTitle(/Shop & Social Enterprise/i);

    // 9. Visit Direct CTAs
    await page.goto('/apply');
    await expect(page).toHaveTitle(/Apply for Training/i);

    await page.goto('/partner');
    await expect(page).toHaveTitle(/Partner With Us/i);

    await page.goto('/donate');
    await expect(page).toHaveTitle(/Support Our Mission/i);

    await page.goto('/contact');
    await expect(page).toHaveTitle(/Contact Us/i);
  });

  test('global search modal opens, filters, and navigates', async ({ page }) => {
    await page.goto('/');

    // Open search modal via search button
    const searchBtn = page.getByRole('button', { name: /open search dialog/i });
    await searchBtn.click();

    const searchDialog = page.getByRole('dialog', { name: /global site search/i });
    await expect(searchDialog).toBeVisible();

    // Type query
    const searchInput = page.getByRole('searchbox', { name: /search keywords/i });
    await searchInput.fill('Garment');

    // Check query feedback
    await expect(searchDialog.getByText(/searching for/i)).toBeVisible();

    // Close on Escape
    await page.keyboard.press('Escape');
    await expect(searchDialog).not.toBeVisible();
  });

  test('mobile navigation drawer opens and functions on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const mobileMenuBtn = page.getByRole('button', { name: /open navigation menu/i });
    await expect(mobileMenuBtn).toBeVisible();
    await mobileMenuBtn.click();

    const mobileNav = page.getByRole('dialog', { name: /mobile navigation/i });
    await expect(mobileNav).toBeVisible();

    // Check accordions
    const whatWeDoBtn = mobileNav.getByRole('button', { name: /what we do/i });
    await whatWeDoBtn.click();
    await expect(mobileNav.getByRole('link', { name: /focus areas/i })).toBeVisible();

    // Close menu
    const closeBtn = mobileNav.getByRole('button', { name: /close navigation menu/i });
    await closeBtn.click();
    await expect(mobileNav).not.toBeVisible();
  });

  test('footer contains structured links and contact info', async ({ page }) => {
    await page.goto('/');

    const footer = page.locator('footer');
    await expect(footer.getByRole('link', { name: 'About Genius Hub' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Leadership & Team' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Focus Areas' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Success Stories' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Privacy Policy' })).toBeVisible();
  });
});
