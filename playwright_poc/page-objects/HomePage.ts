import { Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'
import config from '../config/config.ts'

export class HomePage extends AbstractPage {
    readonly loginButton: Locator;
    readonly groomingButton: Locator;

    constructor(page: Page) {
        super(page);
        this.loginButton = page.locator('.login__login > a');
        this.groomingButton = page.locator('//div[@class="home__image-wrapper"]//span[contains(text(), "Grooming")]');
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async visit() {
        await this.page.goto(config.baseUrl);
        // await this.page.waitForLoadState('networkidle')
    }

    async clickGroomingButton() {
        // Add explicit wait for the element to be visible
        await this.groomingButton.waitFor({ state: 'visible' });

        const isVisible = await this.groomingButton.isVisible();
        console.log(`Grooming button visibility: ${isVisible}`);
        if (!isVisible) {
            // Capture screenshot in headless mode
            await this.page.screenshot({ path: 'grooming-button-not-visible.png' });
            throw new Error('Grooming button is not visible');
        }
        await this.groomingButton.click();
    }
}