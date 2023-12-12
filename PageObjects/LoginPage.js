class LoginPage {
    constructor(page) {
        this.page = page;
        this.txtUserName = page.locator("#userEmail");
        this.txtPassword = page.locator("#userPassword");
        this.btnLogin = page.locator("[value='Login']");
    }

    async loadUrl() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async loginToApp(username, password) {
        await this.txtUserName.fill(username);
        await this.txtPassword.fill(password);
        await this.btnLogin.click();
    }
}

module.exports = {LoginPage};