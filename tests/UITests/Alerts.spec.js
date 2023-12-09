import {expect, test} from '@playwright/test';

test('Alerts with Ok', async ({page}) => {
    //Before we click on alert or pop up we need to handle via handler
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain("I am an alert box!");
        await dialog.accept();
    })
    await page.goto("https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo");
    await page.locator("button[class='btn btn-dark my-30 mx-10 hover:bg-lambda-900 hover:border-lambda-900']").click();
});

test('Alerts with Ok and Cancel', async ({page}) => {
    //Before we click on alert or pop up we need to handle via handler
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('confirm');
        expect(dialog.message()).toContain("Press a button!");
        await dialog.accept();
    })
    await page.goto("https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo");
    await page.locator("p[class='text-gray-900 text-size-16 mt-10 text-black font-bold'] button[type='button']").click();
    await expect(page.locator('#confirm-demo')).toHaveText("You pressed OK!");
});

test('Alerts with Prompt box', async ({page}) => {
    //Before we click on alert or pop up we need to handle via handler
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('prompt');
        expect(dialog.message()).toContain("Please enter your name");
        expect(dialog.defaultValue()).toContain("Enter name");
        await dialog.accept('Harry Potter');

    })
    await page.goto("https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo");
    await page.locator("div:nth-child(3) p:nth-child(1) button:nth-child(1)").click();
});
