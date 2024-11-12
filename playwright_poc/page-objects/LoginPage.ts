import { expect, Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class LoginPage extends AbstractPage {
    readonly loginEmailInput: Locator;
    readonly loginPasswordInput: Locator;
    readonly loginButton: Locator;
    readonly accountHeader: Locator;
    readonly errorMessage: Locator;


    constructor(page: Page) {
        super(page);
        this.loginEmailInput = page.locator('#loginEmail');
        this.loginPasswordInput = page.locator('#loginPassword');
        this.loginButton = page.locator('//span[@class="styleguide__button-content" and contains(text(), "log in")]');
        this.accountHeader = page.locator('//a[@class="header__account" and contains(text(), "Hello")]');
        this.errorMessage = page.locator('.login__error-message');

    }

    async login(username: string, password: string) {
        let attempt = 0;
        const maxRetries = 3;

        while (attempt < maxRetries) {
            if (attempt > 0) {
                console.log(`Login attempt ${attempt + 1}`);
                await this.page.locator('.login__login > a').click();
                
            }
            // await this.page.waitForTimeout(1000);
            await this.loginEmailInput.fill(username);
            // await this.page.waitForTimeout(1000);
            await this.loginPasswordInput.fill(password);
            // await this.page.waitForTimeout(1000);
            await this.loginButton.click();

            // Wait for a short period to allow the error message to appear
            await this.page.waitForTimeout(5000);

            // Check if the error message is visible
            let isErrorMessageVisible = await this.errorMessage.waitFor({ state: 'visible', timeout: 60000 }).catch(() => false);
            try {
                // await this.errorMessage.waitFor({ state: 'visible', timeout: 60000 }).catch(() => false);
                isErrorMessageVisible = await this.errorMessage.isVisible();
            } catch (error) {
                console.log('Error message not found:', error);
            }
            console.log(`Error message visible: ${isErrorMessageVisible}`);

            if (!isErrorMessageVisible) {
                // Wait for account header to be visible
                try {
                    await this.accountHeader.waitFor({ state: 'visible' });
                    console.log('Login successful');
                    return;
                } catch (error) {
                    console.log('Account header not found:', error);
                }
            }

            attempt++;
            // reload the page
            await this.page.reload();
        }

        throw new Error('Login failed after maximum retries');
    }
}