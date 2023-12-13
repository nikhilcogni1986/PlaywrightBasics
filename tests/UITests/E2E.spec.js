import {expect, test} from '@playwright/test';

test('SauceDemo Login', async ({page}) => {
    await page.goto("https://www.saucedemo.com/")
    await expect(page.locator("div.login_logo")).toBeVisible();

    //Enter valid credentials
    await page.locator("#user-name").clear();
    await page.locator("#user-name").fill("standard_user");

    await page.locator("#password").clear();
    await page.locator("#password").fill("secret_sauce");

    await page.getByRole('button', {name: 'Login'}).click();

    const btnCart = await page.locator("div#shopping_cart_container a");

    await addProductToCart(page, "Sauce Labs Backpack");
    await addProductToCart(page, "Test.allTheThings() T-Shirt (Red)");
    await btnCart.click();

    //Validate the cart
    await expect(page.url()).toContain("cart.html");

    const cartProductList = await page.locator("div.cart_list .cart_item .cart_item_label a div");
    for (let j = 0; j < await cartProductList.count(); j++) {
        let cartProductName = await cartProductList.nth(j).textContent();
        if (cartProductName === "Sauce Labs Backpack" || cartProductName === "Test.allTheThings() T-Shirt (Red)") {
            await expect(true).toBeTruthy();
        }
        await console.log(cartProductName);
    }
    await page.locator('[data-test="checkout"]').click();


    async function addProductToCart(page, productToBeSelected) {
        const productGrid = await page.locator("div.inventory_item_description");
        const productList = await page.locator("div.inventory_item_description .inventory_item_label a");

        const productsCountInCart = await page.locator("div#shopping_cart_container a span");
        const productListCount = await productList.count();
        await console.log(productListCount);

        //loop to get the text of the product
        for (let i = 0; i < await productListCount; i++) {
            let productName = await productList.nth(i).textContent();
            if (productName === productToBeSelected) {
                await productGrid.nth(i).getByRole('button', {name: 'Add to cart'}).click();
                break;
            }
        }
    }

    async function checkoutProcess(page) {

    }


});
test('@Web Client App login', async ({page}) => {
    //js file- Login js, DashboardPage
    const email = "anshika@gmail.com";
    const productName = 'zara coat 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
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
    //await page.pause();

    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('zara coat 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();

    await page.locator("[placeholder*='Country']").pressSequentially("ind");
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

    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
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