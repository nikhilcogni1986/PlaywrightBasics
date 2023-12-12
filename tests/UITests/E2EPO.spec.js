import {test} from '@playwright/test';
import {LoginPage} from '../../PageObjects/LoginPage'

test('E2EPO.spec.js', async ({page}) => {
    const username = "nikhilrao@test.com";
    const password = "Password1234";
    const loginPage = new LoginPage(page);

    //Login to Application
    await loginPage.loadUrl();
    await loginPage.loginToApp(username, password);
    await page.waitForLoadState('networkidle');

    //Search the product and add it to cart


});