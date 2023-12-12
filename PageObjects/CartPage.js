const {expect} = require("@playwright/test");

class CartPage {
    constructor(page) {
        this.page = page;
        this.cartProducts = page.locator("div li").first();
        this.btnCheckout = page.locator("text=Checkout");
        this.lnkOrders = page.locator("button[routerlink*='myorders']");
    }

    async VerifyProductIsDisplayed(productName) {
        await this.cartProducts.waitFor();
        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();
    }

    getProductLocator(productName) {
        return this.page.locator("h3:has-text('" + productName + "')");
    }

    async checkout() {
        await this.btnCheckout.click();
    }
}

module.exports = {CartPage};