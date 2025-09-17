import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check if the page title is correct
    await expect(page).toHaveTitle(/Science 1B/);
    
    // Check if the main heading is visible
    await expect(page.getByRole('heading', { name: /Welcome to Science 1B/ })).toBeVisible();
    
    // Check if navigation is present
    await expect(page.getByRole('navigation')).toBeVisible();
    
    // Check if footer is present
    await expect(page.getByRole('contentinfo')).toBeVisible();
  });

  test('should navigate to different pages', async ({ page }) => {
    await page.goto('/');
    
    // Test navigation to About page
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL('/about');
    
    // Test navigation to Gallery page
    await page.getByRole('link', { name: 'Gallery' }).click();
    await expect(page).toHaveURL('/gallery');
    
    // Test navigation to Articles page
    await page.getByRole('link', { name: 'Articles' }).click();
    await expect(page).toHaveURL('/articles');
    
    // Test navigation to Contact page
    await page.getByRole('link', { name: 'Contact' }).click();
    await expect(page).toHaveURL('/contact');
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check if mobile menu button is visible
    await expect(page.getByRole('button', { name: /menu/i })).toBeVisible();
    
    // Check if main content is visible
    await expect(page.getByRole('heading', { name: /Welcome to Science 1B/ })).toBeVisible();
  });
});
