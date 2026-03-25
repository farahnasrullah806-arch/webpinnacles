import { expect, test } from '@playwright/test'

test('homepage to contact CTA flow', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await page.getByRole('link', { name: /Book Free/i }).first().click()
  await expect(page).toHaveURL(/\/contact\/?$/)
})
