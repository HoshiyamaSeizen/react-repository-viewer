import { test, expect } from '@playwright/test';

const searchRepo = 'HoshiyamaSeizen/react-repository-viewer';

const url = process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://127.0.0.1:5173';
test.beforeEach(async ({ page }) => {
	await page.goto(url);
});

test('search for repository', async ({ page }) => {
	await page.goto(url);
	await expect(page).toHaveTitle(/Repository Viewer/);

	const input = page.locator('form input[type="text"]');
	expect(input).toBeVisible();
	await input.fill(searchRepo);

	await page.waitForSelector('.repo-list-container');

	const button = page.locator('form button');
	expect(button).toBeVisible();
	await button.click();

	await page.waitForSelector('.repo-list-container');

	const link = page.locator('.repo-list-container a').getByText(searchRepo, { exact: true });
	await expect(link).toBeVisible();
});
