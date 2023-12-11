import {expect} from "@playwright/test";

class APIUtils
{
    constructor(apiContext, loginPayload)
    {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }
    async getToken()
    {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayload
            })
        await expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        token = await loginResponseJson.token;
        await console.log(token);
        return token;
    }

    async createOrder(orderPayload)
    {
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers:{
                    'Authorization': this.getToken(),
                    'Content-Type': 'Application/Json'
                }
            });
        const orderResponseJson = await orderResponse.json();
        response.orderId = orderResponseJson.orders[0];
        return response;
    }
}
module.exports = {APIUtils};