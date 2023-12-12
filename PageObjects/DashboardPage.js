class DashboardPage {
    constructor(page) {
        this.page = page;
        this.productsText = page.locator(".card-body b");
        this.products = page.locator(".card-body");
        this.btnCart = page.locator("[routerlink*='cart']")
    }

    async searchProductAddToCart(productName) {
        await this.productsText.first().waitFor();
        const titles = await this.productsText.allTextContents();
        console.log(titles);
        const count = await this.products.count();
        for (let i = 0; i < count; ++i) {
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                //add to cart
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }

    async navigateToCart() {
        await this.btnCart.click();
    }
}

module.exports = {DashboardPage};