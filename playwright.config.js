// @ts-check
const {defineConfig, devices} = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
    testDir: './tests',
    retries: 1,
    /* Run tests in files in parallel */
    fullyParallel: false,
    reporter: 'html',
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        // baseURL: 'http://127.0.0.1:3000',

    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'Chrome',
            use:
                {
                    browserName: 'chromium',
                    headless: false,
                    screenshot: 'off',
                    trace: "off",
                    ignoreHTTPSErrors: true
                },
        },
        {
            name: 'Safari',
            use:
                {
                    browserName: 'webkit',
                    headless: true,
                    screenshot: 'off',
                    trace: "off"
                }
        },
        {
            name: 'Firefox',
            use:
                {
                    browserName: 'firefox',
                    headless: false,
                    screenshot: 'off',
                    trace: "off",
                    ...devices['Desktop Firefox'],
                    viewport: {height: 1080, width: 1600}
                }
        }
    ],
});