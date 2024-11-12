import { expect, Locator, Page } from "@playwright/test"
import { AbstractPage } from "./AbstractPage.ts"

export class BookingPage extends AbstractPage {

    // define selectors
    readonly bookingHeader: Locator
    readonly petNameLocator: (petName: string) => Locator
    readonly storeNameLocator: Locator
    readonly serviceNameLocator: (serviceName: string) => Locator
    readonly 
    addPetNameButton: (petName: string) => Locator
    readonly choosePetContinueButton: Locator
    readonly addOnsSelectButton: Locator
    readonly makeChangesButton: Locator
    
    // define constructor
    constructor(page: Page) {
        super(page);
        this.bookingHeader = page.getByText('Grooming Salon', { exact: true })
        this.petNameLocator = (petName: string) => this.page.getByText(`${petName}`, { exact: true }) 
        this.storeNameLocator = page.locator('div.booking__header-display-value > div:nth-child(1)')
        this.serviceNameLocator = (serviceName: string) => this.page.locator(`(//*[contains(text(), "${serviceName}")])[1]`)
        this.addPetNameButton = (petName: string) => this.page.locator(`//span[contains(text(), "${petName}")]/..`)
        this.choosePetContinueButton = page.locator('(//button[@type="submit"]/span/div[contains(text(), "continue")])[1]')
        this.addOnsSelectButton = page.locator('(//button//span//div[contains(text(), "select")])[1]')
        this.makeChangesButton = page.getByText('yes, make changes', { exact: true })
    }


    // define login page methods
    async checkBookingHeaderVisible() {
        await this.page.waitForTimeout(1000);
        // await this.bookingHeader.waitFor({ state: 'visible' });
        console.log('Checking if the booking header is visible');
        await expect(this.bookingHeader).toBeVisible();
    }

    // async checkPetNameVisible(petName: string) {
    //     await this.page.waitForTimeout(1000);
        
    //     const element = await this.page.locator(`//div[@class="booking__header-display-value" and contains(text(), "${petName}")]`);
    //     await element.scrollIntoViewIfNeeded();
    //     await expect(this.petNameLocator(petName)).toBeVisible();
    //     // await expect(this.petNameLocator(petName)).toBeAttached();    
    // }

    async checkStoreNameVisible(storeName: string) {
        await this.page.waitForTimeout(1000);
        await expect(this.storeNameLocator).toBeVisible();
        await expect(this.storeNameLocator).toContainText(storeName);
    }

    async checkServiceNameVisible(serviceName: string) {
        await this.page.waitForTimeout(1000);
        await expect(this.serviceNameLocator(serviceName)).toBeVisible();
        await expect(this.serviceNameLocator(serviceName)).toContainText(serviceName);
    }

    
    // async checkElementBackgroundColor() {
    //     const backgroundColor = await this.page.$eval('#PET_SELECTION > div.booking__step-header.booking__in-progress', (element) => {
    //         return window.getComputedStyle(element).backgroundColor;
    //     });

    //     console.log(`Background color: ${backgroundColor}`);
    //     return backgroundColor === 'rgb(0, 125, 180)'; // #007db4 in RGB format
    // }
    
    async checkChoosePetOptionIsActive(petName: string) {
        await this.page.waitForTimeout(1000);
        // const result = await this.checkElementBackgroundColor();
        let result = await this.addPetNameButton(petName).isVisible();
        console.log('Checking if the pet name is visible');
        if (result) {
            console.log('Add a pet option visible');
            await this.page.waitForTimeout(1000);
            await this.addPetNameButton(petName).click();
            console.log('Pet name selected');
            await this.page.waitForTimeout(1000);
            // await this.choosePetContinueButton.click();
            await this.page.locator('#top-anchor > div > div.pet-selection__continue-container > div > button').click();
            console.log('Continue button clicked');
            await this.page.waitForTimeout(1000);
            if (await this.makeChangesButton.isVisible()) {
                await this.makeChangesButton.click();
                await this.page.waitForTimeout(1000);
                console.log('Make changes button clicked');
            }
        }    
        else {  
            console.log('not enabled');
        }
    }

    async clickOptionstoBookAnAppointment() {
        console.log('Clicking on the options to book an appointment');
        await this.page.waitForTimeout(40000);
        console.log('Waiting for 40 seconds');
        await this.addOnsSelectButton.click();
        await this.page.locator('(//button//span//div[contains(text(), "select")])[2]').click();
        await this.page.waitForTimeout(1000);
        await this.page.locator('(//button//span[contains(text(), "continue")])[2]').click();
        console.log('Waiting for 90 seconds');
        await this.page.waitForTimeout(90000);
        await this.page.locator('(//button//span[contains(text(), "select")])').click();
        await this.page.waitForTimeout(1000);
        await this.page.locator('(//button//span//div[contains(text(), "continue")])[2]').click();
        await this.page.waitForTimeout(1000);
        await this.page.locator('#services-booking-website > div:nth-child(128) > div > div > div > div:nth-child(2) > div.styleguide__cta-container > button > span').click();
        await this.page.waitForTimeout(1000);
        await this.page.getByText('complete booking', { exact: true }).click();
    }

    async checkBookingConfirmation() {
        await this.page.waitForTimeout(1000);
        await expect(this.page.getByText('woohoo! your appointment has been booked.', { exact: true })).toBeVisible();
    }

}