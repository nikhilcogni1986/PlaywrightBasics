import {expect, request, test} from '@playwright/test';

const payload = {userEmail: "nikhilrao@test.com", userPassword: "Password1234"};
let token = "";
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: payload
        })
    await expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = await loginResponseJson.token;
    await console.log(token);
})
test('WebAPIPart1', async ({page}) => {
    await console.log("START");
    const products = page.locator(".card-body");
    const productName = 'zara coat 3';

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);
    await page.goto("https://rahulshettyacademy.com/client/");

    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();

    //get the titles of all the products
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    const count = await products.count();
    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            //add to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();

    //validate whether product is visible on the cart page
    const bool = await page.getByRole('heading', {name: 'zara coat 3'}).isVisible();
    await expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();

    //Checkout process
    await page.locator("[placeholder*='Country']").pressSequentially("Ind", {delay: 100});

    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text === " India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    await expect(page.locator("div.user__name label[type='text']")).toHaveText("nikhilrao@test.com");
    await page.locator(".action__submit").click();

    //Orders Page
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");


    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
});