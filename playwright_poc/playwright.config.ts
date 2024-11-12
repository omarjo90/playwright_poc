import { PlaywrightTestConfig } from "@playwright/test"

const config: PlaywrightTestConfig = {
    timeout: 60000,
    retries: 1,
    use: {
        // Browser options
        headless: true,
        // Context options
        viewport: { width: 1920, height: 1080 },//{ width: 1280, height: 720 },
        // Artifacts
        screenshot: "only-on-failure",
        video: "retain-on-failure",
        actionTimeout: 10000,
        ignoreHTTPSErrors: true,
    },

    projects: [
        {
            name: 'chrome',
            use: { browserName: 'chromium' },
        },
        {
            name: 'firefox',
            use: { browserName: 'firefox' },
        },
        {
            name: 'webkit',
            use: { browserName: 'webkit' },
        },
    ],
}

export default config