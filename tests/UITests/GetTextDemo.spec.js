import {expect, test} from '@playwright/test';

test('@WebUI GetTextDemo.spec.js', async ({page}) => {
    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=common/home");
    await page.getByText('My Account Register Login').click();

    //click on Login and assert for the registration page
    await page.getByRole('link', {name: "Login"}).click();

    //Enter the credentials
    await page.getByPlaceholder("E-Mail Address").fill("nikhilcogni@gmail.com");
    await page.getByPlaceholder("Password").fill("Password1234");
    await page.getByRole('button', {name: 'Login'}).click();

    //Assert if you are on right page
    await expect(page.locator('#content').getByRole('heading', {name: 'My Account'})).toBeVisible();
    const myAccountUrl = await page.url();
    await expect(myAccountUrl).toContain("route=account/account");

    await page.getByRole('link', {name: 'Desktops'}).click();
    await page.getByRole('link', {name: 'Show All Desktops'}).click();

    //get the text of all product names
    const productNames = await page.locator(".product-thumb .caption h4 a").allTextContents();
    console.log(productNames);
});

test('@WebUI Demonstrate the text content function', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByRole("link", {name: 'Shop'}).click();

    //get the product names
    const productNames = await page.locator("h4.card-title a").allTextContents();
    console.log(productNames);

    //get the first product name
    console.log("First Product Name=>" + await page.locator("h4.card-title a").nth(1).textContent());
})