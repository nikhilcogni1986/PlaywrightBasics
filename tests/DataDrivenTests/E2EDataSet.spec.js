import {expect, test} from '@playwright/test';
import {LoginPage} from '../../PageObjects/LoginPage'
import {DashboardPage} from '../../PageObjects/DashboardPage'
import {CartPage} from '../../PageObjects/CartPage'
import {OrdersReviewPage} from '../../PageObjects/OrdersReviewPage';
import {OrdersHistoryPage} from '../../PageObjects/OrdersHistoryPage';

const dataset = JSON.parse(JSON.stringify(require("../../TestData/placeOrderTestDataSet.json")));

for (const data of dataset) {
    test(`@WebUI Place an order for ${data.productName}`, async ({page}) => {

        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        const cartPage = new CartPage(page);
        const ordersReviewPage = new OrdersReviewPage(page);
        const ordersHistoryPage = new OrdersHistoryPage(page);

        //Login to Application
        await loginPage.loadUrl();
        await loginPage.loginToApp(data.username, data.password);
        await page.waitForLoadState('networkidle');

        //Search the product and add it to cart
        await dashboardPage.searchProductAddToCart(data.productName);
        await dashboardPage.navigateToCart();

        //Verify if product is added to the cart
        await cartPage.VerifyProductIsDisplayed(data.productName);
        await cartPage.checkout();

        //Select the country and fill order details
        await ordersReviewPage.searchCountryAndSelect('ind', 'India');
        await ordersReviewPage.VerifyEmailId(data.username);
        const orderId = await ordersReviewPage.SubmitAndGetOrderId();
        await console.log(orderId);
        await dashboardPage.navigateToOrders();

        //Validate the Orders History page for added product
        await ordersHistoryPage.searchOrderAndSelect(orderId);
        expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

    });
}