import {expect, test} from '@playwright/test';

test('Checkbox.spec.js', async ({page}) => {
    await page.goto("https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html");

    //click on Option1 checkbox
    await page.getByLabel('Option 1').check();
    await expect(page.getByLabel('Option 1')).toBeChecked();

    //check if option2 is unchecked
    expect(await page.isChecked("#checkboxes label input[value='option-2']")).toBeFalsy();
    expect(await page.isChecked("#checkboxes label input[value='option-3']")).toBeTruthy();
});

test('Checkbox Example2', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/checkboxes');

    //check whether checkboxes are checked or unchecked
    await expect(page.locator("#checkboxes")).toBeVisible();
    expect(await page.isChecked('input[type=checkbox]:nth-child(1)')).toBeFalsy();
    expect(await page.isChecked('input[type=checkbox]:nth-child(3)')).toBeTruthy();

    //click option1
    await page.check("input[type='checkbox']:nth-child(1)");

    //Un-check checkbox 2
    await page.uncheck('input[type=checkbox]:nth-child(3)');

    //Assert checkbox1 is now checked
    expect(await page.isChecked('input[type=checkbox]:nth-child(1)')).toBeTruthy();

    //Assert checkbox2 is now un-checked
    expect(await page.isChecked('input[type=checkbox]:nth-child(3)')).toBeFalsy();
});

test('Demo on checkboxes Example3', async ({page}) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/checkbox-demo");
    await page.locator("#isAgeSelected").check();
    await expect(page.locator("#txtAge")).toBeVisible();
    await expect(page.locator('.mt-30 > div > div > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > input')
        .isDisabled()).toBeTruthy();
});