import {test} from '@playwright/test';

test('FrameDemo.spec.js', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const framesPage = await page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();

    const subscriber_text = await framesPage.locator("div.text h2 span").textContent();
    await console.log(subscriber_text);
});