import {expect, request, test} from '@playwright/test';
const {APiUtils} = require('../Utils/APIUtils');
const loginPayLoad = {userEmail: "nikhilrao@test.com", userPassword: "Password1234"};
let response;
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "6262e95ae26b7e1a10e89bf0"}]}

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext,loginPayLoad);
    response =  await apiUtils.createOrder(orderPayload);
    })
test('WebAPIPart1', async ({page}) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    }, response.token );

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.waitForLoadState('networkidle');

    //API Order implementation

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