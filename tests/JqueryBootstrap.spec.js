import {expect, test} from '@playwright/test';

test('JqueryBootstrap Drop down', async ({page}) => {
    await page.goto("http://seleniumpractise.blogspot.com/2016/08/bootstrap-dropdown-example-for-selenium.html");

    //click on the dropdown button
    await page.locator("#menu1").click();

    //get the list of elements present in the dropdown
    const options = await page.locator("ul.dropdown-menu li a").count();
    await console.log(options);
    await expect(options).toEqual(4);

    for (let i = 0; i < options; i++) {
        let innertext_option = await page.locator("ul.dropdown-menu li a").textContent();
        if (innertext_option === "HTML" || innertext_option === "Angular JS") {
            await page.locator("ul.dropdown-menu li a").click();
        }
    }
});