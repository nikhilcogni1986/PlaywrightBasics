import {test, expect} from '@playwright/test';

test('Navigate to Registration Page', async ({page}) =>
{
    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=common/home");
    const actual_Url = await page.url();
    const expected_url = "https://naveenautomationlabs.com/opencart/index.php?route=common/home";
    await expect(expected_url).toContain(actual_Url);

    //Validate options available on click of My Account
    await page.getByText('My Account Register Login').click();
    await expect(page.getByRole('link',{name:"Register"})).toBeVisible();
    await expect(page.getByRole('link',{name:"Login"})).toBeVisible();

    //click on Register and assert for the registration page
    await page.getByRole('link',{name:"Register"}).click();
    const header_text = await page.locator("#content h1").textContent();
    await expect(header_text).toContain("Register Account");
});