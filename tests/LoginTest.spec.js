import {expect, test} from '@playwright/test';

test('Login with valid credentials', async ({page}) => {
    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=common/home");
    const actual_Url = await page.url();
    const expected_url = "https://naveenautomationlabs.com/opencart/index.php?route=common/home";
    await expect(expected_url).toContain(actual_Url);

    //Validate options available on click of My Account
    await page.getByText('My Account Register Login').click();
    await expect(page.getByRole('link', {name: "Register"})).toBeVisible();
    await expect(page.getByRole('link', {name: "Login"})).toBeVisible();

    //click on Login and assert for the registration page
    await page.getByRole('link', {name: "Login"}).click();
    await expect(page.getByRole('heading', {name: 'Returning Customer'})).toBeVisible();
    await expect(page.getByRole('heading', {name: 'New Customer'})).toBeVisible();

    //Enter the credentials
    await page.getByPlaceholder("E-Mail Address").fill("nikhilcogni@gmail.com");
    await page.getByPlaceholder("Password").fill("Password1234");
    await page.getByRole('button', {name: 'Login'}).click();

    //Assert if you are on right page
    await expect(page.locator('#content').getByRole('heading', {name: 'My Account'})).toBeVisible();
    const myAccountUrl = await page.url();
    await expect(myAccountUrl).toContain("route=account/account");

    //Logout from the account
    await page.getByRole('link', {name: ' My Account'}).click();
    await page.locator('#top-links').getByRole('link', {name: 'Logout'}).click();

    //Assert if user has logged out
    await expect(page.getByRole('heading', {name: "Account Logout"})).toBeVisible();
    await expect(page.url()).toContain("route=account/logout");
});