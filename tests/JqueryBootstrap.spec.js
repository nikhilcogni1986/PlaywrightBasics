import {expect, test} from '@playwright/test';

test('JqueryBootstrap Drop down', async ({page}) => {
    await page.goto("https://www.jquery-az.com/boots/demo.php?ex=63.0_1");

    //click on the dropdown button
    await page.locator(".multiselect.dropdown-toggle.btn.btn-default").click();

    //get the list of elements present in the dropdown
    const options = await page.locator("ul.multiselect-container.dropdown-menu li a label input").count();
    await console.log(options);
    await expect(options).toEqual(5);
});