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

test('Table data extraction', async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    //get the locator for table, count for rows and columns
    const table = await page.locator("#productTable");
    const columns = await table.locator("thead tr th");
    const rows = await table.locator("tbody tr");

    for (let i = 0; i < await rows.count(); i++) {
        const selectRow = rows.nth(i);
        const selectedColumn = selectRow.locator("td");
        for (let j = 0; j < await selectedColumn.count() - 1; j++) {
            await console.log(await selectedColumn.nth(j).textContent());
        }
    }
});

test('Table data extraction along with pagination', async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    //get the locator for table, count for rows and columns
    const table = await page.locator("#productTable");
    const columns = await table.locator("thead tr th");
    const rows = await table.locator("tbody tr");

    // get the count of total pages
    const pages = await page.locator("ul#pagination li a");
    const numberOfPages = await pages.count();

    for (let k = 0; k < numberOfPages; k++) {
        if (k > 0) {
            await pages.nth(k).click();
        }
        for (let i = 0; i < await rows.count(); i++) {
            const selectRow = rows.nth(i);
            const selectedColumn = selectRow.locator("td");
            for (let j = 0; j < await selectedColumn.count() - 1; j++) {
                await console.log(await selectedColumn.nth(j).textContent());
            }
        }
    }
});