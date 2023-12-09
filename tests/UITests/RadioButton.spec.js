import {expect, test} from '@playwright/test';

test('Demo on Radio Button Example1', async ({page}) => {
    await page.goto("https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html");
    await page.locator("input[name='color'][value='green']").click();
    await expect(page.locator("input[name='color'][value='green']")).toBeChecked();
});

test('Demo on Radio Button Example2', async ({page}) => {
    await page.goto("https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html");
    await page.locator("input[name='color']").nth(1).click();
    await expect(page.locator("input[name='color'][value='blue']")).toBeChecked();

    //check whether radio button is disabled
    console.log(await (await page.$("input[name='vegetable'][value='cabbage']")).isDisabled());

    //check if radio button is checked or not
    console.log(await page.locator("input[name='vegetable'][value='lettuce']").isChecked());
});