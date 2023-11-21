import {test, expect} from '@playwright/test';

test('DropdownDemo.spec.js', async ({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.getByRole('heading',{name:'Practice Page'})).toBeVisible();

    //select a value from the dropdown
    await page.locator("#dropdown-class-example").selectOption('Option1');

    await page.waitForTimeout(2000);
    await page.locator("#dropdown-class-example").selectOption('Option2');
    console.log(await page.locator("#dropdown-class-example").textContent());
    await expect((await (page.locator("#dropdown-class-example").textContent())).includes("Option2")).toBeTruthy();
});

test("Drop down demo on web", async({page}) =>
{
   await page.goto("https://the-internet.herokuapp.com/dropdown");
   await page.locator("#dropdown").selectOption({index:1});
   await page.waitForTimeout(2000)
   await expect(page.locator("#dropdown")).toHaveValue("1");
});

test('Drop down demo on web uni', async({page})=>
{
    await page.goto("https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html");
    await page.locator("#dropdowm-menu-2").selectOption({label:'Maven'});
    await expect(page.locator("#dropdowm-menu-2")).toHaveValue("maven");
});

test('Drop down demo on web uni with disabled option', async({page})=>
{
    await page.goto("https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html");
    let dropdown = await page.$("select.dropdown-menu-lists");
    let options = await dropdown.$$('option');
    console.log(await options.length);

    for(let i=0 ; i<options.length ; i++)
    {
        let dropdown_option = await options[i];
        let value = await dropdown_option.textContent();
        await console.log(value);
    }
});