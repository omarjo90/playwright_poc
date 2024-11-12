import { PlaywrightTestConfig } from "@playwright/test"

const config: PlaywrightTestConfig = {
    timeout: 500000,
    retries: 0,
    testDir: 'tests/e2e',
    use: {
        launchOptions: {
            args: ['--start-maximized'],
        },
        // Browser options
        headless: false,
        // Context options
        viewport: null,
        // viewport: { width: 1920, height: 1080 }, for headless configuration
        // Artifacts
        screenshot: "only-on-failure",
        video: "retain-on-failure",
        actionTimeout: 50000,
        ignoreHTTPSErrors: true,
    },

    projects: [
        {
            name: 'chrome',
            use: { 
                browserName: 'chromium',
                // launchOptions: {
                //     args: ['--start-maximized'],
                // }, 
            },
        },
        {
            name: 'firefox',
            use: { browserName: 'firefox' },
        },
        {
            name: 'webkit',
            use: { browserName: 'webkit' },
        },
        {
            name: 'edge',
            use: { 
                browserName: 'chromium',
                channel: 'msedge'
            },
        },
    ],
}

export default config