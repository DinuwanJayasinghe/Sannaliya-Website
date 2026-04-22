import { test, expect } from '@playwright/test';

test('Verify SLMap and Branding', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Wait for animations and data loading
  await page.waitForTimeout(3000);

  // Check for the Logo and Brand Name
  const brandName = page.locator('text=Sannaliya');
  await expect(brandName).toBeVisible();

  // Scroll to the Delivery section
  await page.locator('text=Islandwide Fast Delivery').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'verification_slmap_fixed.png' });

  // Verify Zone 1 price text
  await expect(page.locator('text=LKR 450')).toBeVisible();

  // Verify social links in footer
  await page.locator('footer').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  const facebookLink = page.locator('a[href*="facebook.com"]');
  await expect(facebookLink).toBeVisible();
});
