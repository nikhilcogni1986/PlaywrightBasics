import {expect, test} from '@playwright/test';

test('DropdownDemo.spec.js', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.getByRole('heading', {name: 'Practice Page'})).toBeVisible();

    //select a value from the dropdown
    await page.locator("#dropdown-class-example").selectOption('Option1');

    await page.waitForTimeout(2000);
    await page.locator("#dropdown-class-example").selectOption('Option2');
    console.log(await page.locator("#dropdown-class-example").textContent());
    await expect((await (page.locator("#dropdown-class-example").textContent())).includes("Option2")).toBeTruthy();
});

test("Drop down demo on web", async ({page}) => {
    await page.goto("https://the-internet.herokuapp.com/dropdown");
    await page.locator("#dropdown").selectOption({index: 1});
    await page.waitForTimeout(2000)
    await expect(page.locator("#dropdown")).toHaveValue("1");
});

test('Drop down demo on web uni', async ({page}) => {
    await page.goto("https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html");
    await page.locator("#dropdowm-menu-2").selectOption({label: 'Maven'});
    await expect(page.locator("#dropdowm-menu-2")).toHaveValue("maven");
});

test('Drop down demo on web uni with disabled option', async ({page}) => {
    await page.goto("https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html");
    let dropdown = await page.$("select.dropdown-menu-lists");
    let options = await dropdown.$$('option');
    console.log(await options.length);

    for (let i = 0; i < options.length; i++) {
        let dropdown_option = await options[i];
        let value = await dropdown_option.textContent();
        await console.log(value);
    }
});

test('Handle Auto suggestive drop down',
    async ({page}) => {
        await page.goto("https://webdriveruniversity.com/Autocomplete-TextField/autocomplete-textfield.html");
        await expect(page.locator("h2[name='contactme']")).toBeVisible();
        await page.locator("#myInput").pressSequentially("Ba");

        const options = await page.locator("div#myInputautocomplete-list div input");
        let No_Of_Options = await options.count();
        await console.log(No_Of_Options);
        let food_item = "Barley";

        //loop through the options and get value from each element and select the desired element
        for (let i = 0; i < No_Of_Options; i++) {
            const option_value = await options.nth(i).getAttribute("value");
            await console.log(option_value);
            if (option_value === food_item) {
                await page.getByText(food_item).click();
                break;
            }
        }
        await page.locator("#submit-button").click();
    });

test('Auto Suggestions in a frame window', async ({page}) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/jquery-dropdown-search-demo");
    await expect(page.getByRole('heading', {name: 'Jquery Dropdown Search Demo'})).toBeVisible();

    await selectCountry("India");
    await selectCountry("Australia");
    await selectCountry("Denmark");
    await selectCountry("South Africa");
    await page.waitForTimeout(3000)

    async function selectCountry(countryName) {
        await page.locator("#country+span").click();
        await page.locator("ul.select2-results__options")
            .locator('li', {hasText: countryName}).click();
    }
})

test('Demo on static drop downs', async ({page}) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/select-dropdown-demo");
    await page.locator("#select-demo").selectOption({label: 'Sunday'});
    await expect(page.locator("p.selected-value")).toContainText('Sunday');
    await page.waitForTimeout(2000);
    await page.locator("#select-demo").selectOption({index: 5});
    await page.waitForTimeout(2000);
    await expect(page.locator("p.selected-value")).toContainText('Thursday');
});

test('Demo on Multi select drop downs', async ({page}) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/select-dropdown-demo");
    await page.locator("#multi-select").selectOption([
        {
            label: "Texas"
        }, {
            index: 2
        }, {
            value: "Washington"
        }
    ]);

    await page.getByRole('button', {name: 'First Selected'}).click();
    await expect(page.locator("span.genderbutton")).toContainText("Texas");

    await page.locator("#printAll").click();
    await expect(page.locator(".groupradiobutton.block.break-words")).toContainText("Washington");

});

test('Validate the options selected in multi select drop down', async ({page}) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/jquery-dropdown-search-demo");
    await page.locator("span.select2-selection__arrow").first().click();

    await page.locator("span.select2-dropdown.select2-dropdown--below span input.select2-search__field").fill("India");
    await page.getByRole('treeitem', {name: 'India'}).click();
});

test('Multiple value selection from the drop down', async ({page}) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/jquery-dropdown-search-demo");
    await page.getByPlaceholder("Select state(s)").click();

    await selectCountry("Idaho");
    await page.locator("li.select2-search.select2-search--inline input").click();
    await selectCountry("Iowa");

    async function selectCountry(expected_country_name) {
        //Approach1
        const option_locator = await page.locator("li.select2-results__option");
        const options_count = await option_locator.count();
        await console.log(options_count);

        //loop to select the country names
        for (let i = 0; i < options_count; i++) {
            let country_name = await option_locator.nth(i).textContent();
            await console.log(country_name)
            if (country_name === expected_country_name) {
                await option_locator.nth(i).click();
                break;
            }
        }
    }
})