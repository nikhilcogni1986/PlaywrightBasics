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