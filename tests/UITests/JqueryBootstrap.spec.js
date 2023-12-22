import {expect, test} from '@playwright/test';

test('@WebUI JqueryBootstrap Drop down', async ({page}) => {
    await page.goto("http://seleniumpractise.blogspot.com/2016/08/bootstrap-dropdown-example-for-selenium.html");

    //click on the dropdown button
    await page.locator("#menu1").click();

    //get the list of elements present in the dropdown
    const options = await page.locator("ul.dropdown-menu li a").count();
    await console.log(options);
    await expect(options).toEqual(4);

    for (let i = 0; i < options; i++) {
        let innertext_option = await page.locator("ul.dropdown-menu li a").nth(i).textContent();
        if (innertext_option === "HTML" || innertext_option === "Angular JS") {
            await page.locator("ul.dropdown-menu li a").nth(i).click();
        }
    }
});

test('@WebUI Bootstrap Dual List Demo', async ({page}) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/bootstrap-dual-list-box-demo");

    const left_listbox = await page.locator("ul.list-group.sp_list_group li");
    const left_listbox_count = await left_listbox.count() / 2;
    await console.log(left_listbox_count);

    //for loop to select the options from left list box
    for (let i = 0; i < left_listbox_count; i++) {
        let left_list_text = await left_listbox.nth(i).textContent();
        await console.log(left_list_text);
        if (left_list_text === "Kedungjenar" || left_list_text === "Danville") {
            await left_listbox.nth(i).click();
        }
    }

    //add the items selected to right list box
    await page.getByRole('button', {name: '>'}).nth(1).click();

    const right_list_box = await page.locator("ul.list-group.sp_list_group li.list-group-item.active");
    const right_list_count = await right_list_box.count();
    await console.log(right_list_count);

    let iselected = false;
    //for loop to verify if selected items are added to right list box
    for (let i = 0; i < right_list_count; i++) {
        let right_list_text = await right_list_box.nth(i).textContent();
        await console.log(right_list_text);
        if (right_list_text === "Kedungjenar" || right_list_text === "Danville") {
            iselected = true;
        }
    }
    await expect(iselected).toBeTruthy();
});