import {test} from '@playwright/test';
import {LoginPage} from '../../PageObjects/LoginPage'
import {DashboardPage} from '../../PageObjects/DashboardPage'
import {CartPage} from '../../PageObjects/CartPage'

test('E2EPO.spec.js', async ({page}) => {
    const username = "nikhilrao@test.com";
    const password = "Password1234";
    const productName = 'zara coat 3'
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const cartPage = new CartPage(page);

    //Login to Application
    await loginPage.loadUrl();
    await loginPage.loginToApp(username, password);
    await page.waitForLoadState('networkidle');

    //Search the product and add it to cart
    await dashboardPage.searchProductAddToCart(productName);
    await dashboardPage.navigateToCart();

    //Verify if product is added to the cart
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.checkout();


});