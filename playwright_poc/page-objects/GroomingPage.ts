import { expect, Locator, Page } from "@playwright/test"
import { AbstractPage } from "./AbstractPage.ts"
import config from '../config/config.ts'

export class GroomingPage extends AbstractPage {

    // define selectors
    readonly GroomingSalonH1: Locator
    readonly appointmentTypeSelect: Locator
    readonly bookNowButton: Locator
    readonly storeNameLocator: (storeName: string) => Locator


    // define constructor
    constructor(page: Page) {
        super(page);
        this.GroomingSalonH1 = page.locator('//h1[contains(text(), "Grooming Salon")]')
        this.appointmentTypeSelect = page.getByText('Select', { exact: true })        
        this.bookNowButton = page.locator('#grooming-landing-book-now > span')
        this.storeNameLocator = (storeName: string) => this.page.locator(`(//*[contains(text(), "${storeName}")])[2]`)  //page.locator('(//*[contains(text(), "${storeName}")])[2]')
    }

    // define login page methods
    async  checkGroomingSalonHeaderVisible() {
        // await this.GroomingSalonH1.waitFor({ state: 'visible' });
        await expect(this.GroomingSalonH1).toBeVisible(); 
    }

    async checkStoreNameVisible(storeName: string) {
        await this.page.waitForTimeout(30000);
        await expect(this.storeNameLocator(storeName)).toBeVisible();
        await expect(this.storeNameLocator(storeName)).toContainText(storeName);
    }

    async visit() {
        await this.page.goto(config.groomingUrl);        
    }

    async selectAppointmentType() {
        await this.page.waitForTimeout(1000);
        await this.appointmentTypeSelect.click();
        await this.page.waitForTimeout(1000);
        await this.page.getByText('New appointment', { exact: true }).click();
    }

    async clickBookNowButton() {
        console.log('Clicking the book now button');
        await this.page.waitForTimeout(1000);
        await this.bookNowButton.click();
        await this.page.waitForTimeout(1000);
    }
}