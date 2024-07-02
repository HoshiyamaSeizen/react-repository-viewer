import { test, expect } from '@playwright/test';

const url = process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://127.0.0.1:5173/';

test.beforeEach(async ({ page }) => {
	await page.goto(url);
	await expect(page).toHaveTitle(/Repository Viewer/);
});

/*
	- open page
	- search for repository
	- look for results
	- check that repository is found and has link
	- click on the link
	- check that info page loaded
*/
test('search for repository and open info', async ({ page }) => {
	const searchRepo = 'HoshiyamaSeizen/react-repository-viewer';
	const name = 'react-repository-viewer';

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

	await link.click();

	await expect(page).toHaveTitle(/Repository Viewer/);

	await page.waitForSelector('.repository-info-page');

	const header = page.locator('h2').first();
	expect(header).toHaveText(name);
});

/*
	- open page
	- search 'github'
	- check that button of the 1st page is disabled
	- check that button of the 4th page is enabled
	- go to 4th page
	- check that the only disabled button now is 4th
*/
test('go on different pages', async ({ page }) => {
	const search = 'github';

	const input = page.locator('form input[type="text"]');
	expect(input).toBeVisible();
	await input.fill(search);

	await page.waitForSelector('.repo-list-container');

	const button = page.locator('form button');
	expect(button).toBeVisible();
	await button.click();

	await page.waitForSelector('.repo-list-container');

	const paginator = page.locator('.paginator');
	await expect(paginator).toBeVisible();

	const page1btn = page.locator('.paginator button').getByText('1', { exact: true });
	await expect(page1btn).toBeDisabled();

	const page4btn = page.locator('.paginator button').getByText('4', { exact: true });
	await expect(page4btn).toBeEnabled();

	await page4btn.click();
	await expect(page1btn).toBeEnabled();
	await expect(page4btn).toBeDisabled();
});
