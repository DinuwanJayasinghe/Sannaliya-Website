const { test, expect } = require('@playwright/test');

test('Verify map and footer', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Wait for animations
  await page.waitForTimeout(2000);

  // Scroll to map
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight / 2);
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'verification/map_section.png' });

  // Scroll to footer
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'verification/footer_section.png' });
});
