import { expect, Locator, Page} from "@playwright/test"
import { AbstractPage } from "./AbstractPage"

export class SelectServicePage extends AbstractPage {
    readonly selectYourGroomingHeader: Locator;
    readonly bathAndFullHaircutButton: Locator;
    readonly errorMessage: Locator;
    readonly loadingSpinner: Locator;
    
    constructor(page: Page) {
        super(page);
        this.selectYourGroomingHeader = page.locator('//div[contains(text(), "Select your grooming service")]');
        this.bathAndFullHaircutButton = page.locator('(//*[@class="styleguide__primary-cta styleguide__primary-cta styleguide__new-design content-styles__category-image-card-cta"]/span)[3]');
        this.errorMessage = page.locator('//h1[contains(text(), "uh-oh!")]');
        this.loadingSpinner = page.locator('#app > div > div.select-service__grooming-service-selection-page > div');
    }

    async checkSelectYourGroomingHeaderVisible() {
        // await this.page.waitForLoadState('networkidle');
        // await this.errorMessage.waitFor({ state: 'visible', timeout: 60000 }).catch(() => false);
        // console.log('Waiting for 5 seconds to load the page');
        // await this.page.waitForTimeout(5000);
        let errorMessageVisible = await this.errorMessage.isVisible();  
        let loadingSpinnerVisible = await this.loadingSpinner.isVisible();   
        let result;  
        if (errorMessageVisible) {
             
            while (errorMessageVisible) {
                console.log('Error message visible');
                await this.page.reload();
                console.log('Reloading the page');
                // await this.page.waitForTimeout(10000);
                loadingSpinnerVisible = await this.loadingSpinner.isVisible();                
                if (loadingSpinnerVisible) {
                    console.log('Waiting for the loading spinner to disappear');
                    result = await this.loadingSpinner.waitFor({ state: 'hidden', timeout: 50000 }).catch(() => false);
                    console.log(`Loading spinner detached: ${result}`);
                }   

                if (!result) {
                    errorMessageVisible = await this.errorMessage.isVisible();
                    console.log(`Error message visible: ${errorMessageVisible}`);
                    if (errorMessageVisible) {
                        console.log('Reloading the page');
                    } else {
                        await expect(this.selectYourGroomingHeader).toBeVisible();
                        break;
                    }
                } else {
                    console.log('in the else block');
                    errorMessageVisible = await this.errorMessage.isVisible();
                    console.log(`Error message visible: ${errorMessageVisible}`);
                    if (!errorMessageVisible) {
                        break;
                    }
                }
            }
        } else {

            console.log('Waiting for the loading spinner to disappear');
            result = await this.loadingSpinner.waitFor({ state: 'detached', timeout: 50000 }).catch(() => false);
            console.log(`Loading spinner detached: ${result}`);
                              
            if (!result) {
                errorMessageVisible = await this.errorMessage.isVisible();  
                while (errorMessageVisible) {
                    await this.page.reload();
                    console.log('Reloading the page');
                    // await this.page.waitForTimeout(10000);
                    loadingSpinnerVisible = await this.loadingSpinner.isVisible();
                    if (loadingSpinnerVisible) {
                        console.log('Waiting for the loading spinner to disappear');
                        result = await this.loadingSpinner.waitFor({ state: 'detached', timeout: 50000 }).catch(() => false);
                        console.log(`Loading spinner detached: ${result}`);
                    }                  
                    if (!result) {
                        await expect(this.selectYourGroomingHeader).toBeVisible();
                        break;
                    } else {
                        errorMessageVisible = await this.errorMessage.isVisible();
                        console.log(`Error message visible: ${errorMessageVisible}`);
                        if (!errorMessageVisible) {
                            break;
                        }// Ruh roh! Something went terribly wrong!

                    }
                }                
            }
        }   
                
        // await this.selectYourGroomingHeader.waitFor({ state: 'visible', timeout: 60000 });
        await expect(this.selectYourGroomingHeader).toBeVisible();
    }

    async clickBathAndFullHaircutButton() {
        await this.page.waitForTimeout(1000);
        await this.bathAndFullHaircutButton.click();
        await this.page.waitForTimeout(1000);
        // wait for 10 seconds
        // console.log('Waiting for 20 seconds');
        // await this.page.waitForTimeout(20000);
    }
}