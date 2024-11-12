import { test } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage.ts';
import { HomePage } from '../../page-objects/HomePage.ts';
import config from '../../config/config.ts';
import fs from 'fs';
import path from 'path';

const authFilePath = path.join(__dirname, 'auth.json');

test('Log in and save authentication state', async ({ page }) => {
    // Check if the authentication state file exists
    if (fs.existsSync(authFilePath)) {
        console.log('Authentication state file already exists. Skipping login.');
        return;
    }

    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    page.on('console', msg => console.log(`Console log: ${msg.text()}`));
        
        // Intercept and log specific requests
        page.on('request', request => {
            const url = request.url();
            if (url.includes('logInWithCaptcha') || url.includes('customer')) {
                console.log('Request:', {
                    url: request.url(),
                    method: request.method()
                });
            }
        });

        // Intercept and log specific responses
        page.on('response', response => {
            const url = response.url();
            if (url.includes('logInWithCaptcha') || url.includes('customer')) {
                console.log('Response:', {
                    url: response.url(),
                    status: response.status()
                });
            }
        });

    await homePage.visit();
    await homePage.clickLoginButton();
    await loginPage.login(config.credentials.email, config.credentials.password);
    // wait 10 seconds for the login to complete
    await page.waitForTimeout(10000);

    // Save authentication state to a file
    await page.context().storageState({ path: authFilePath });
    console.log('Authentication state saved.');
});