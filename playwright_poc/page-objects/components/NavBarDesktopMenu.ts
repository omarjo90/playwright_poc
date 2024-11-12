import { expect, Locator, Page } from "@playwright/test"

export class NavBarDesktopMenu {
    // define selectors
    readonly page: Page
    readonly petServicesMenu: Locator
    readonly groomingMenu: Locator
    readonly petsHotelMenu: Locator
    readonly doggieDayCampMenu: Locator
    readonly trainingMenu: Locator
    
    // define constructor
    constructor(page: Page) {
        this.page = page
        this.petServicesMenu = page.locator('a.header__menu-item').filter({ hasText: 'pet services' })
        this.groomingMenu = page.locator('a.header__menu-item').filter({ hasText: 'grooming' })
        this.petsHotelMenu = page.locator('a.header__menu-item').filter({ hasText: 'petshotel' })
        this.doggieDayCampMenu = page.locator('a.header__menu-item').filter({ hasText: 'doggie day camp' })
        this.trainingMenu = page.locator('a.header__menu-item').filter({ hasText: 'training' })
    }

    // define action methods
    async clickOnTab(tabName: string) {
        switch (tabName) {
            case 'pet services':
                await this.petServicesMenu.click()
                break
            case 'grooming':
                await this.groomingMenu.click()
                break
            case 'petshotel':
                await this.petsHotelMenu.click()
                break
            case 'doggie day camp':
                await this.doggieDayCampMenu.click()
                break
            case 'training':
                await this.trainingMenu.click()
                break
            default:
                throw new Error(`Tab ${tabName} is not available`)
        }
    }



}