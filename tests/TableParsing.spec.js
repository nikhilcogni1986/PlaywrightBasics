import {expect, test} from '@playwright/test';

test('TableParsing', async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    //get the locator for table, count for rows and columns
    const table = await page.locator("#productTable");
    const columns = await table.locator("thead tr th");
    console.log("Number of columns: " + await columns.count());
    await expect(await columns.count()).toBe(4);

    const rows = await table.locator("tbody tr");
    console.log("Number of Rows: " + await rows.count());
    await expect(await rows.count()).toBe(5);

    //select the product 4 checkbox
    const matchedRow = await rows.filter({
        has: page.locator("td"),
        hasText: "Product 4"
    });
    await matchedRow.locator('input').click();
});

test('TableParsing with reusable function', async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    //get the locator for table, count for rows and columns
    const table = await page.locator("#productTable");
    const columns = await table.locator("thead tr th");
    console.log("Number of columns: " + await columns.count());
    await expect(await columns.count()).toBe(4);

    const rows = await table.locator("tbody tr");
    console.log("Number of Rows: " + await rows.count());
    await expect(await rows.count()).toBe(5);

    //select the product 4 checkbox
    await selectProduct(page, rows, "Product 1");
    await selectProduct(page, rows, "Product 3");
    await selectProduct(page, rows, "Product 5");

    async function selectProduct(page, rows, productName) {
        const matchedRow = await rows.filter({
            has: page.locator("td"),
            hasText: productName
        });
        await matchedRow.locator('input').click();
    }
});
