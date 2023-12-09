import {expect, test} from '@playwright/test';

test('Simple Form Demo', async ({page}) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/simple-form-demo");

    const message = "Sample Message";
    await page.getByPlaceholder('Please enter your Message').fill(message);
    await page.locator("#showInput").click();

    await expect(page.locator("p#message")).toContainText(message);
});